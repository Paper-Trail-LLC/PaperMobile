import * as React from "react"
import { Alert, Image, TextStyle, View, ViewStyle } from "react-native"
import { typography } from "../../theme"
import { Text } from "../"
import { BookListItemProps } from "./book-list-item.props"
import { TouchableOpacity } from "react-native-gesture-handler"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start"
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontStyle: "italic",
  color: "#390099",
}

const REG_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 16
}

const TITLE_TEXT: TextStyle = {
  ...TEXT,
  fontWeight: "bold",
  fontSize: 20,
  marginBottom: 10
}

const IMAGE_COLUMN: ViewStyle = {
  width: "25%",
  alignItems: 'center',
  padding: 5
}

const INFO_COLUMN: ViewStyle = {
  width: "75%",
  padding: 10
}

/**
 * Describe your component here
 */
export function BookListItem(props: BookListItemProps) {

  const author: string = "Author: " + props.author;
  const releaseDate: string = "Release Date: " + props.releaseDate;

  return (
    <TouchableOpacity
      onPress={() => Alert.alert("Book list item pressed!")}>
      <View style={[CONTAINER, props.style]}>
        <View style={IMAGE_COLUMN}>
          <Image
            source={require("../../screens/search-screen/book_image.png")}
            style={{height: "100%", resizeMode: "contain"}}/>
        </View>
        <View style={INFO_COLUMN}>
          <Text style={TITLE_TEXT}>{props.title}</Text>
          <Text style={REG_TEXT}>{author}</Text>
          <Text style={REG_TEXT}>{releaseDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
