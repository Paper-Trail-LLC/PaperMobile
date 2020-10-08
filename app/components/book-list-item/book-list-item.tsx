import * as React from "react"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { typography } from "../../theme"
import { Text } from "../"
import { BookListItemProps } from "./book-list-item.props"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"

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

  const {bookStore} = useStores();

  const navigation = useNavigation()
  const nextScreen = () => {
    bookStore.setChoice(props.id);
    navigation.navigate("detail");
  }

  return (
    <TouchableOpacity
      onPress={nextScreen}>
      <View style={[CONTAINER, props.style]}>
        <View style={IMAGE_COLUMN}>
          <Image
            source={{uri: props.bookImage}}
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
