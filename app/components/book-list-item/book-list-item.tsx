import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { typography } from "../../theme"
import { Text } from "../"
import { BookListItemProps } from "./book-list-item.props"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  regText: {
    fontFamily: typography.primary,
    fontStyle: "italic",
    color: "#390099",
    fontSize: 16
  },
  titleText: {
    fontFamily: typography.primary,
    fontStyle: "italic",
    color: "#390099",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10
  },
  imageColumn: {
    width: "25%",
    alignItems: 'center',
    padding: 5
  },
  infoColumn: {
    width: "75%",
    padding: 10
  }
})

/**
 * Describe your component here
 */
export function BookListItem(props: BookListItemProps) {

  const author: string = "Author: " + props.author;
  const releaseDate: string = "Release Date: " + props.releaseDate;

  const { bookStore } = useStores();

  const navigation = useNavigation()
  const nextScreen = () => {
    bookStore.setChoice(props.id);
    navigation.navigate("detail");
  }

  return (
    <TouchableOpacity
      onPress={nextScreen}>
      <View style={[styles.container, props.style]}>
        <View style={styles.imageColumn}>
          <Image
            source={{ uri: props.bookImage }}
            style={{ height: "100%", resizeMode: "contain" }} />
        </View>
        <View style={styles.imageColumn}>
          <Text style={styles.titleText}>{props.title}</Text>
          <Text style={styles.regText}>{author}</Text>
          <Text style={styles.regText}>{releaseDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
