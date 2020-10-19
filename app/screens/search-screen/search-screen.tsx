import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Image, ImageStyle, Alert, Platform, StyleSheet } from "react-native"
import { Screen, BookListItem } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { TextInput } from "react-native-gesture-handler"
import { TouchableHighlight } from "react-native"
import { MaterialCommunityIcons}  from '@expo/vector-icons/MaterialCommunityIcons';
import { Searchbar } from 'react-native-paper';

export const background = require("../../../assets/book_stack.png")
export const blueMagnifying = require("./blue_magnifying.png")
export const scan = require("./scan.png")

let searchQuery = '';
let setSearchQuery = function (query:string)  {
  Alert.alert(query);
}
const onChangeSearch = query => setSearchQuery(query);
const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    // alignContent:'space-around'
  },
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4]
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8
  },
  containerList: {
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4]
  },
  background: {
    position: "absolute",
    right: "0%",
    bottom: "7%",
    zIndex: -1
  },
  textField: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    fontSize: 18,
    paddingLeft: 50,
    paddingRight: 50,
    borderColor: color.primaryBlue,
    borderWidth: 2,
    borderRadius: 100,
    backgroundColor: color.background,
    zIndex: -1,
    alignSelf: 'center'
  },
  bookListItem: {
    margin: 5,

    backgroundColor: color.background,
    borderRadius: 8,
  
    shadowColor: color.primaryBlue,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  textIcon: {

  }
});

export const SearchScreen = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const { bookStore } = useStores();
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
  for (let i = 0; i < bookStore.books.length; i++) {
    bookList.push(
      <BookListItem
        style={styles.bookListItem}
        id={bookStore.books[i].id}
        bookImage={bookStore.books[i].bookImage}
        title={bookStore.books[i].title}
        author={bookStore.books[i].author}
        releaseDate={bookStore.books[i].releaseDate}
      ></BookListItem>
    )
  }

  return (
    <View style={styles.full}>
      <Image
        style={styles.background}
        source={background} />
      <View style={styles.container}>
      <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      showSoftInputOnFocus={true}
      accessibilityValue={0}
      focusable={true}
      />
        {/* <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color={color.primaryBlue} />
          <TextInput
            style={styles.textField}
            placeholderTextColor={color.primaryBlue}
            placeholder="Search Book"
          ></TextInput>
          <TouchableHighlight
            onPress={() => Alert.alert("Scan barcode is pressed!")}
          >
            <MaterialCommunityIcons name="barcode-scan" size={24} color={color.primaryBlue} />
          </TouchableHighlight>
        </View> */}
      </View>
      <Screen style={styles.containerList} preset="scroll" backgroundColor={color.transparent}>
        {bookList}
      </Screen>
    </View>
  )
})
