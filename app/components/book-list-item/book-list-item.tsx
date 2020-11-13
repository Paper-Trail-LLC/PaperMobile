import * as React from "react"
import { Image, StyleSheet, View } from "react-native"
import { typography } from "../../theme"
import { Text } from "../"
import { BookListItemProps } from "./book-list-item.props"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"

/**
 * Describe your component here
 */
export function BookListItem(props: BookListItemProps) {

  const { bookStore } = useStores();
  const navigation = useNavigation()
  const nextScreen = () => {
    bookStore.setChoice(props.book.isbn13);
    navigation.navigate("detail");
  }

  return (
    <TouchableOpacity
      onPress={nextScreen}>
      <View style={[styles.container, props.style]}>
        <View style={styles.imageColumn}>
          <Image
            source={{ uri: props.book.coverURI }}
            style={{    width: '100%', flex:1, resizeMode: "contain" }} />
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.titleText}>{props.book.title}</Text>
          <Text style={styles.regText}>Author :{props.book.authors}</Text>
          <Text style={styles.regText}>Release date: {props.book.releaseDate.toLocaleDateString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: 5
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
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  infoColumn: {
    flex: 0.75,
  }
})