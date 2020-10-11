import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Image, ImageStyle, Alert, Platform } from "react-native"
import { Screen, BookListItem } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { TextInput } from "react-native-gesture-handler"
import { TouchableHighlight } from "react-native"

export const background = require("./book_stack.png")
export const blueMagnifying = require("./blue_magnifying.png")
export const scan = require("./scan.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const BACKGROUND: ImageStyle = {
  position: "absolute",
  right: "0%",
  bottom: "7%",
  zIndex: -1
}

const BLUESEARCH: ImageStyle = {
  position: "absolute",
  top: 68,
  left: 50,
  zIndex: 1
}

const SCANCODE: ImageStyle = {
  position: "absolute",
  top: 0,
  right: 40,
  zIndex: 1
}

const TEXTFIELD: ViewStyle = {
  padding: 15,
  paddingLeft: 50,
  paddingRight: 55,
  margin: 20,
  marginTop: Platform.OS === 'ios' ? 55 : 50,
  borderColor: "#390099",
  borderWidth: 2,
  borderTopLeftRadius: 100,
  borderBottomLeftRadius: 100,
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  backgroundColor: "#FFFCFC",
  zIndex: -1
}

const BOOK_LIST_ITEM: ViewStyle = {
  margin: 5,

  backgroundColor: "#FFFCFC",
  borderRadius: 8,

  shadowColor: "#390099",
  shadowOffset: {
    width: 0,
    height: 4
  },
  shadowOpacity: 0.5,
  shadowRadius: 1
}

export const SearchScreen = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const {bookStore} = useStores();
  // Pull in navigation via hook
  // const navigation = useNavigation()

  // bookStore.clear();
  // bookStore.addBook({
  //   id:"123",
  //   bookImage: "https://kbimages1-a.akamaihd.net/d47f06aa-0e2c-4d49-9e32-85e4901a6d8f/1200/1200/False/artemis-fowl-and-the-time-paradox.jpg",
  //   title: "Artemis Fowl, The Time Paradox",
  //   author: "Eoin Colfer",
  //   releaseDate: "July 2008"
  // });
  // bookStore.addBook({
  //   id:"124",
  //   bookImage: "https://kbimages1-a.akamaihd.net/d47f06aa-0e2c-4d49-9e32-85e4901a6d8f/1200/1200/False/artemis-fowl-and-the-time-paradox.jpg",
  //   title: "Artemis Fowl, The Time Paradox 2",
  //   author: "Eoin Colfer",
  //   releaseDate: "July 2009"
  // });

  const bookList = [];
  for(let i=0; i<bookStore.books.length; i++) {
    bookList.push(
      <BookListItem
          style={BOOK_LIST_ITEM}
          id={bookStore.books[i].id}
          bookImage={bookStore.books[i].bookImage}
          title={bookStore.books[i].title}
          author={bookStore.books[i].author}
          releaseDate={bookStore.books[i].releaseDate}
        ></BookListItem>
    )
  }

  return (
    <View style={FULL}>
      <Image
          style={BACKGROUND}
          source={background}/>
      <View style={CONTAINER}>
        <Image
          style={BLUESEARCH}
          source={blueMagnifying}/>
        <TouchableHighlight
          onPress={() => Alert.alert("Scan barcode is pressed!")}
          style={{ top: 67 }}>
          <View style={[{ backgroundColor: "#FFFFFF", width: 27, height: 27 }, SCANCODE]}>
            <Image source={scan}/>
          </View>
        </TouchableHighlight>
        <TextInput
          style={TEXTFIELD}
          placeholderTextColor="#390099"
          placeholder="Search Book"
        ></TextInput>
      </View>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        {bookList}
      </Screen>
    </View>
  )
})
