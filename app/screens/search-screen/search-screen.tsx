import React from "react"
import { observer } from "mobx-react-lite"
import { View, Image, StyleSheet, Keyboard, SafeAreaView } from "react-native"
import { Screen, BookListItem } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
// import { TextInput } from "react-native-gesture-handler"
import { TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native"

export const background = require("../../../assets/book_stack.png")

let searchQuery = '';
let setSearchQuery = function (query: string) {
  // Alert.alert(query);
}

const onChangeSearch = query => setSearchQuery(query);

export const SearchScreen = observer(function SearchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const bookStore = useStores().bookStore;
  // Pull in navigation via hook
  const navigation = useNavigation()
  const goToScanScreen = () => {
    navigation.navigate("scan");
  };

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
    <SafeAreaView style={styles.full}>
      <Image
        style={styles.background}
        source={background} />
      <View style={styles.container}>
        <TextInput
          left={<TextInput.Icon name="magnify" color={color.primaryBlue} />}
          right={<TextInput.Icon name="barcode-scan" color={color.primaryBlue}
            onPress={() => {
              goToScanScreen();
              Keyboard.dismiss();
            }} />}
          label="Search Book"
          // value={searchQuery}
          // onChangeText={onChangeSearch}
          mode="outlined"
          showSoftInputOnFocus={true}
          focusable={true}
          style={styles.search} />
      </View>
      <Screen style={styles.containerList} preset="scroll" backgroundColor={color.transparent}>
        {bookList}
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
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'stretch',
    padding: spacing[2]
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