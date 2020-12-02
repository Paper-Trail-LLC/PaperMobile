import * as React from "react"
import { Image, StyleSheet, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "../../theme"
import { UserBook, useStores } from "../../models"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

export interface ProfileBookProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle,

  userBook: UserBook,
}

/**
 * Describe your component here
 */
export const ProfileBook = observer(function ProfileBook(props: ProfileBookProps) {
  const { style, userBook } = props

  const { bookStore } = useStores();

  const navigation = useNavigation()
  const nextScreen = () => {
    bookStore.addBook(userBook.book);
    bookStore.setChoice(userBook.book.isbn13);
    navigation.navigate("request_book");
  }

  return (
    <TouchableOpacity disabled={!(userBook.selling || userBook.lending)} style={[styles.container, style]} onPress={nextScreen}>
      <Image source={{ uri: userBook.book.coverURI }} style={[styles.image, {opacity: userBook.lending || userBook.selling ? 1 : 0.25}]}></Image>
    </TouchableOpacity>
    
  )
})

const styles = StyleSheet.create({
  container: {
    height: 230,
    margin: spacing[2],
    width: 150
  },
  image: {
    flex: 1
  }
})
