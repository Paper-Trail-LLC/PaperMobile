import React from "react"
import { observer } from "mobx-react-lite"
import { Image, TextStyle, View, ViewStyle, TouchableHighlight } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { Book, useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"

export const backButton = require("./back_arrow.png")
export const bookPicTemp = require("./book_image.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
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

export const BookDetailScreen = observer(function BookDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const {bookStore} = useStores();

  const selectedIndex: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(selectedIndex);

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  

  return (
    <View style={FULL}>
      <View>
        <TouchableHighlight
          onPress={goBack}
        >
          <Image source={backButton}></Image>
        </TouchableHighlight>
      </View>
      <Screen style={CONTAINER} preset="scroll">
        <Image source={bookPicTemp}></Image>
        <Text style={TITLE_TEXT}>{bookInfo.title}</Text>
        <Text style={REG_TEXT}>{"Author: " + bookInfo.author}</Text>
        <Text style={REG_TEXT}>{"Published on: " + bookInfo.releaseDate}</Text>
        <Text style={DESCRIPTION}>Description:</Text>
        <Text style={DESC_TEXT}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</Text>
        <Button></Button>
      </Screen>
    </View>
  )
})
