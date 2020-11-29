import React from "react"
import { observer } from "mobx-react-lite"
import { StatusBar, StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native"
import { PendingAgreement, ProfileBook, Screen, TabPicker } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { Appbar, Menu, useTheme, Text, Title, Avatar } from "react-native-paper"
import { Agreement, Book, BorrowAgreement, PurchaseAgreement, User, UserBook, useStores } from "../../models"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export const ProfileScreen = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const { bookStore } = useStores();
  const bookInfo: Book = bookStore.getBook(bookStore.choice);
  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [visible, setVisible] = React.useState(false);
  //initialize depending on if on own profile or other's profile ('requests' vs 'book' respectively)
  const [selection, setSelection] = React.useState('requests');

  const _handleMore = () => openMenu();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { colors } = useTheme();

  //Avatar background color depending on name
  var stringToColour = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  //Take from session if on profile tab or from other user store when going to another profile
  const dummyUser: User = {
    id: '123',
    firstName: 'Anibal',
    lastName: 'Pagan',
    email: 'john.doe@test.com',
    gender: 'male',
    memberSince: new Date()
  }

  //Get appropriate content by comparing profile's user to session's user
  var dummyBooks = [];
  for (let i = 0; i < bookStore.books.length; i++) {
    let newBook: UserBook = { //Replace with appropriate store later!
      id: i.toString(),
      owner: dummyUser,
      book: bookStore.books[i],
      selling: false,
      lending: i===2 ? false : true,
      status: 'available',
    }
    let bookImage = <ProfileBook userBook={newBook}></ProfileBook>
    dummyBooks.push(bookImage);
  }

  //Get pending requests from appropriate store
  var pendingRequests = []; 
  for (let i=0; i<dummyBooks.length; i++) {
    let agreement: Agreement = {
      id: '123',
      userBook: dummyBooks[i],
      requester: dummyUser,
      status: 'incomplete',
      created_on: new Date(),
      updated_on: new Date()
    }
    if(i%2 === 0) {
      let request: BorrowAgreement = {
        agreement: agreement,
        returnDate: new Date()
      }
      let component = <PendingAgreement style={{backgroundColor: colors.primary, borderRadius: 10}} request={request}></PendingAgreement>
      pendingRequests.push(component);
    }
    else {
      let request: PurchaseAgreement = {
        agreement: agreement,
        cost: 25
      }
      let component = <PendingAgreement style={{backgroundColor: colors.accent, borderRadius: 10}} request={request}></PendingAgreement>
      pendingRequests.push(component);
    }
  }

  return (
    <View style={styles.full}>
      <StatusBar translucent={true} />
      <Appbar.Header style={{ backgroundColor: color.transparent }}>
        <Appbar.Content title={dummyUser.firstName + ' ' + dummyUser.lastName} color={colors.text} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" color={colors.text} onPress={_handleMore} />}>
          <Menu.Item icon="account-edit" title="Edit Profile" />
          <Menu.Item icon="settings" title="Settings" />
          <Menu.Item icon="logout" title="Logout" />
        </Menu>
      </Appbar.Header>
      <Screen style={styles.container} preset="scroll" backgroundColor={color.transparent}>
        <View style={styles.profileTop}>
          <View style={styles.profileRow}>
            <Avatar.Text size={70} label={dummyUser.firstName.charAt(0) + dummyUser.lastName.charAt(0)} color={'white'} style={{ backgroundColor: stringToColour(dummyUser.firstName + dummyUser.lastName) }}></Avatar.Text>
            <View style={styles.bookCount}>
              <Title>13</Title>
              <Text>Books</Text>
            </View>
            <View style={styles.bookCount}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name={'star'} color={'orange'} size={20}></MaterialCommunityIcons>
                <Title>4.3</Title>
              </View>
              <Text>Rating</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <TabPicker isOtherUserProfile={false} selection={selection} selectionToggle={setSelection}></TabPicker>
          <View style={styles.wrapColumns}>
            {selection === 'books' && dummyBooks}
            {selection === 'requests' && pendingRequests}
          </View>
        </View>
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
    flexDirection: 'column',
    padding: spacing[2]
  },
  profileTop: {
    flex: 0.15
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  bookCount: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 0.85,
  },
  wrapColumns: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  petitionItems: {

  },
})