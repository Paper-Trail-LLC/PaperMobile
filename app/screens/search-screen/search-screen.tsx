import React from "react"
import { observer } from "mobx-react-lite"
import { View, Image, StyleSheet, SafeAreaView } from "react-native"
import { Screen, BookListItem, SearchBar } from "../../components"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useTheme } from "react-native-paper"
// import { useNavigation } from "@react-navigation/native"

export const background = require("../../../assets/book_stack.png")

export const SearchScreen = observer(function SearchScreen() {
  // Pull in one of our MST stores
  const { bookStore } = useStores()
  const { colors } = useTheme();
  // or
  // const bookStore = useStores().bookStore;
  // Pull in navigation via hook
  // const navigation = useNavigation()

  // bookStore.clear();

  const bookList = [];
  for (let i = 0; i < bookStore.books.length; i++) {
    bookList.push(
      <BookListItem
      key={bookStore.books[i].id}
      book={bookStore.books[i]}
      style={styles.bookListItem}
      ></BookListItem>
    )
  }

  return (
    <View style={styles.full}>
      <Image
        style={styles.background}
        source={background} />
      <SearchBar></SearchBar>
      <Screen style={styles.containerList} preset="scroll" backgroundColor={color.transparent}>
        {bookList}
      </Screen>
    </View>
  )
})

const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'space-around',
  },
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'stretch',
  },
  search: {
    flex: 1,
    // backgroundColor: color.transparent,
    color: color.primaryBlue
  },
  containerList: {
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4]
  },
  background: {
    position: 'absolute',
    right: '0%',
    bottom: '7%',
    zIndex: -1
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