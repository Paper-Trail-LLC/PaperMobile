import React from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, StatusBar } from "react-native"
import { Screen, MyBookDetails, BookOverviewComponent} from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { spacing } from "../../theme"
import { AddBookProps } from "./add-book.props"
import { Book, UserBook, useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { Appbar, useTheme, Button } from 'react-native-paper';

export const backBttn = require("../book-detail-screen/back_arrow.png")

export const AddBookScreen = observer(function AddBookScreen(props: AddBookProps) {
  // Pull in one of our MST stores
  const { bookStore, userBookStore } = useStores()
  // OR
  const selectedIndex: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(selectedIndex);
  const { colors } = useTheme();
  // Pull in navigation via hook
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();

  var authorCopy = [];
  for(var i=0; i<bookInfo.authors.length; i++) {
    authorCopy.push(bookInfo.authors[i]);
  }

  const bookCopy: Book = {
    id: bookInfo.id,
    coverURI: bookInfo.coverURI,
    title: bookInfo.title,
    authors: authorCopy,
    isbn13: bookInfo.isbn13,
    releaseDate: bookInfo.releaseDate
  }

  var userBook: UserBook = {
    id: '123',
    ownerId: '456',
    book: bookCopy,
    location: [18.220833, -66.590149],
  }

  const addBookToLibrary = () => {
    userBookStore.addToLibrary(userBook);
    _goBack();
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={styles.full}>
      <StatusBar translucent={true} />
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={'Add to Library'}/>
      </Appbar.Header>
        <Screen style={[styles.container, {backgroundColor: colors.background}]} preset="scroll" backgroundColor={colors.background}>
          <BookOverviewComponent book={bookInfo} exclude={[3]} />
          <MyBookDetails userBook={userBook} editable={true} style={{ color: colors.primary, borderColor: colors.primary, marginBottom: spacing[2] }}/>
          <Button mode={'contained'} onPress={() => addBookToLibrary()}>Add</Button>
        </Screen>
    </View>
  )
})

const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    padding: spacing[2]
  },
})
