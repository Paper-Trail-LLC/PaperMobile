import React from "react"
import { observer } from "mobx-react-lite"
import { Image, View, StyleSheet, SafeAreaView, StatusBar, ViewStyle } from "react-native"
import { Screen, BookOverviewComponent } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { Book, useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Appbar, Menu, Text, useTheme, Button } from 'react-native-paper';

export const backButton = require("./back_arrow.png")
export const bookPicTemp = require("./book_image.png")
export const bground = require("./book_stack.png")

export const BookDetailScreen = observer(function BookDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { bookStore } = useStores();
  const isbn13: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(isbn13);
  const { colors } = useTheme();
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
    <View style={styles.full}>
      <StatusBar translucent={true}  />
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content/>
        <Appbar.Action icon="magnify" onPress={_moveToNearbyListings} accessibilityValue={{text:"Search nearby"}}/>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" color={colors.text} onPress={_handleMore}/>}>
          <Menu.Item icon="library-plus"  onPress={_moveToAdd} title="Add to Library"/>
          <Menu.Item icon="pen" onPress={() => {}} title="Create Petition" />
        </Menu>
      </Appbar.Header>
      <Screen style={[styles.container, {backgroundColor: colors.background}]} preset="scroll">
        <BookOverviewComponent book={bookInfo}></BookOverviewComponent>
        <View style={styles.buttonContainer}>
          <Button mode={'contained'} onPress={_moveToNearbyListings}>Search Nearby</Button>
          <Button mode={'outlined'} onPress={_moveToAdd} >Add to Library</Button>
        </View>
      </Screen>
    </View>
  )
})


const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: spacing[2]
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  menuItem:{
    color: color.primaryBlue
  }
})