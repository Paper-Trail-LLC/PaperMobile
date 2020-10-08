import React from "react"
import { observer } from "mobx-react-lite"
import { Image, TextStyle, View, ViewStyle, SafeAreaView, ImageStyle, Platform } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { Book, useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"

export const backButton = require("./back_arrow.png")
export const bookPicTemp = require("./book_image.png")

export const bground = require("./book_stack.png")
export const sMagnifying = require("./selected_search.png")
export const profile = require("./unselected_profile.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  // backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[2]
}

const HEADER: TextStyle = {
  position: "relative",
  backgroundColor: "white",
  paddingTop: Platform.OS === 'ios' ? spacing[6] : spacing[4],
  paddingLeft: spacing[6],
  paddingBottom: spacing[4] - 1,
  paddingHorizontal: 0,
}

const FOOTER: ViewStyle = { backgroundColor: "#FF0054" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[0],
  paddingHorizontal: spacing[0],
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  flexDirection: 'row',
}

// const BACKGROUND: ImageStyle = {
//   position: "absolute",
//   right: "0%",
//   bottom: "18%",
//   zIndex: -1
// }

const BOTTOM_BAR_ITEM: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#FF0054",
  width: "50%",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  color: "#390099"
}

const REG_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 20
}

const TITLE_TEXT: TextStyle = {
  ...TEXT,
  fontWeight: "bold",
  fontSize: 24,
  marginBottom: 10
}

const DESCRIPTION: TextStyle = {
  ...TEXT,
  fontSize: 24,
  marginBottom: 10
}

const DESC_TEXT: TextStyle = {
  ...TEXT,
  fontStyle: "italic"
}

const BIGIMAGE: ImageStyle = {
  alignSelf: "center",
  marginBottom: spacing[5]
}

const BUTTON_CONTAINER: ViewStyle = {
  width: "100%",
  justifyContent: "center",
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  marginVertical: spacing[5]
}

const BUTTON_TEXT: TextStyle = {
  fontSize: 18,
  marginVertical: spacing[3],
  marginHorizontal: -5
}

const BUTTON: ViewStyle = {
  margin: spacing[3],
  borderRadius: 13
}

const SEARCH_NEARBY: ViewStyle = {
  ...BUTTON,
  backgroundColor: "#390099"
}

const ADD_TO_LIBRARY: ViewStyle = {
  ...BUTTON,
  backgroundColor: "#FFBD00"
}

export const BookDetailScreen = observer(function BookDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { bookStore } = useStores();

  const selectedIndex: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(selectedIndex);

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()


  return (
    <View style={FULL}>
      {/* <Image
          style={BACKGROUND}
          source={bground}/> */}
      <View style={HEADER}>
        <TouchableOpacity
          onPress={goBack}
        >
          <Image source={backButton}></Image>
        </TouchableOpacity>
      </View>
      <Screen style={CONTAINER} preset="scroll">
        <Image source={bookPicTemp} style={BIGIMAGE}></Image>
        <Text style={TITLE_TEXT}>{bookInfo.title}</Text>
        <Text style={REG_TEXT}>{"Author: " + bookInfo.author}</Text>
        <Text style={[REG_TEXT, { marginBottom: spacing[6] }]}>{"Published on: " + bookInfo.releaseDate}</Text>
        <Text style={DESCRIPTION}>Description:</Text>
        <Text style={DESC_TEXT}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</Text>
        <View style={BUTTON_CONTAINER}>
          <Button style={SEARCH_NEARBY} textStyle={BUTTON_TEXT} text={"Search Nearby"}></Button>
          <Button style={ADD_TO_LIBRARY} textStyle={BUTTON_TEXT} text={"Add to Library"}></Button>
        </View>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            style={BOTTOM_BAR_ITEM}
          >
            <Image
              source={sMagnifying}
            ></Image>
          </Button>
          <Button
            style={BOTTOM_BAR_ITEM}
          >
            <Image
              source={profile}
            ></Image>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  )
})
