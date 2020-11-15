import React from "react"
import { observer } from "mobx-react-lite"
import { Image, View, StyleSheet, SafeAreaView } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { Book, useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Appbar, Menu } from 'react-native-paper';

export const backButton = require("./back_arrow.png")
export const bookPicTemp = require("./book_image.png")
export const bground = require("./book_stack.png")

export const BookDetailScreen = observer(function BookDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { bookStore } = useStores();
  const isbn13: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(isbn13);

  const [visible, setVisible] = React.useState(false);
  // Pull in navigation via hook
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();
  const _handleMore = () => openMenu();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const _moveToAdd = () => {
    closeMenu();
    navigation.navigate("add_book");
  }
  const _moveToNearbyListings = () => {
    closeMenu();
    navigation.navigate("nearby_listings");
  }
  


  return (
    <SafeAreaView style={styles.full} accessible={false}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content/>
        <Appbar.Action icon="magnify" onPress={_moveToNearbyListings} accessibilityValue={{text:"Search nearby"}}/>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={_handleMore} />}>
          <Menu.Item icon="library-plus" onPress={_moveToAdd} title="Add to Library" />
          <Menu.Item icon="pen" onPress={() => {}} title="Create Petition" />
        </Menu>
        
      </Appbar.Header>
      <Screen style={styles.container} preset="scroll">
        <Image source={{ uri: bookInfo.coverURI }} style={styles.bigImage}></Image>
        <Text style={styles.titleText}>{bookInfo.title}</Text>
        <Text style={styles.regText}>{"Author: " + bookInfo.authors}</Text>
        <Text style={[styles.regText, { marginBottom: spacing[6] }]}>{"Published on: " + bookInfo.releaseDate.toLocaleDateString()}</Text>
        <Text style={styles.description}>Description:</Text>
        {bookInfo.synopsis === '' && <Text style={styles.descText}>No description.</Text>}
        {bookInfo.synopsis !== '' && <Text style={styles.descText}>{bookInfo.synopsis}</Text>}
        <View style={styles.buttonContainer}>
          <Button onPress={_moveToNearbyListings} style={styles.searchNearby} textStyle={styles.buttonText} text={"Search Nearby"}></Button>
          <Button onPress={_moveToAdd} style={styles.addToLibrary} textStyle={styles.buttonText} text={"Add to Library"}></Button>
        </View>
      </Screen>

    </SafeAreaView>
  )
})


const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: color.background
    // alignContent:'space-around'
  },
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: color.transparent,
    paddingHorizontal: spacing[2]
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingLeft: spacing[6],
    paddingBottom: spacing[4] - 1,
    paddingHorizontal: 0,
  },
  regText: {
    fontFamily: typography.primary,
    color: color.primaryBlue,
    fontSize: 20
  },
  titleText: {
    fontFamily: typography.primary,
    color: color.primaryBlue,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10
  },
  description: {
    fontFamily: typography.primary,
    color: color.primaryBlue,
    fontSize: 24,
    marginBottom: 10
  },
  descText: {
    fontFamily: typography.primary,
    color: color.primaryBlue,
    fontStyle: 'italic'
  },
  bigImage: {
    alignSelf: 'center',
    marginBottom: spacing[5],
    width: 107,
    height: 165,
    padding: 10
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginVertical: spacing[5]
  },
  buttonText: {
    fontSize: 18,
    marginVertical: spacing[3],
    marginHorizontal: -5
  },
  searchNearby: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: color.primaryBlue
  },
  addToLibrary: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: color.warning
  }
})