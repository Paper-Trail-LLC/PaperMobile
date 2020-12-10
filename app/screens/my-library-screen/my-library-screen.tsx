import React from "react"
import { observer } from "mobx-react-lite"
import { Image, View, StyleSheet, SafeAreaView } from "react-native"
import { MyBookItem, Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { FAB, Text, Title } from 'react-native-paper';
import { useStores } from "../../models"

export const background2 = require("../../../assets/book_stack.png")

export const MyLibraryScreen = observer(function MyLibraryScreen() {

  const { userBookStore } = useStores();

  // myBookStore.addToLibrary({
  //   id: "123",
  //   bookImage: "https://kbimages1-a.akamaihd.net/d47f06aa-0e2c-4d49-9e32-85e4901a6d8f/1200/1200/False/artemis-fowl-and-the-time-paradox.jpg",
  //   title: "Artemis Fowl, The Time Paradox",
  //   author: "Eoin Colfer",
  //   releaseDate: "July 2008",
  //   status: "available",
  //   lending: true,
  //   selling: false
  // });

  const myBooks = [];
  for (let i = 0; i < userBookStore.myLibraryBooks.length; i++) {
    myBooks.push(
      <MyBookItem
        style={styles.bookListItem}
        id={userBookStore.myLibraryBooks[i].id}
        bookImage={userBookStore.myLibraryBooks[i].book.coverURI}
        title={userBookStore.myLibraryBooks[i].book.title}
        status={userBookStore.myLibraryBooks[i].status}
      ></MyBookItem>
    )
  }

  return (
    <SafeAreaView style={styles.full}>
      <Image
        style={styles.background}
        source={background2} />
      <View style={styles.container}>

      </View>
      <FAB
        focusable={true}
        style={styles.fabAdd}
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
      <Screen style={styles.container} preset="scroll" backgroundColor={color.transparent}>
        {myBooks.length === 0 &&
          <View>
            <Title style={styles.emptyText}>It's lonely in here...</Title>
            <Text style={styles.emptyText}>Use the button on the bottom right corner to add a book to your library.</Text>
          </View>
        }
        {myBooks}
      </Screen>
    </SafeAreaView>
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
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[2]
  },
  background: {
    position: 'absolute',
    right: '0%',
    bottom: '7%',
    zIndex: -1
  },
  fabAdd: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  bookListItem: {
    margin: 5,

    backgroundColor: color.background,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  emptyText: {
    marginTop: spacing[6],
    marginHorizontal: spacing[7],
    alignSelf: 'center',
  }
})