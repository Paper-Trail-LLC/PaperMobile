import React from "react"
import { observer } from "mobx-react-lite"
import { StatusBar, StyleSheet, View, Image } from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { Appbar, Menu, useTheme, Text, Title } from "react-native-paper"
import { Book, User, useStores } from "../../models"
import UserAvatar from 'react-native-user-avatar'
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

  //Get appropriate content by comparing profile's user to session's user
  const content = [];
  for (let i = 0; i < 10; i++) {
    let bookImage = <Image source={{ uri: bookInfo.coverURI }} style={{ flex: 0.3 }}></Image>
    content.push(bookImage);
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

  return (
    <View style={styles.full}>
      <StatusBar translucent={true} />
      <Appbar.Header style={{ backgroundColor: color.transparent }}>
        <Appbar.Content title={dummyUser.firstName + ' ' + dummyUser.lastName} color={colors.text} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" color={colors.text} onPress={_handleMore} />}>
          <Menu.Item icon="logout" title="Logout" />
        </Menu>
      </Appbar.Header>
      <View style={styles.profileTop}>
          <View style={styles.profileRow}>
            <UserAvatar style={{ height: 70, width: 70 }} size={80} name={dummyUser.firstName + ' ' + dummyUser.lastName} bgColor={stringToColour(dummyUser.firstName + dummyUser.lastName)}></UserAvatar>
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
      <Screen style={styles.container} preset="scroll" backgroundColor={color.transparent}>
        <View style={styles.content}>
          <Title style={{ alignSelf: 'center' }}>Books</Title>
          <View style={styles.bookItems}>
            {/* {content} */}
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
    marginTop: -spacing[4],
    flex: 0.87,
    flexDirection: 'column',
    padding: spacing[2]
  },
  profileTop: {
    flex: 0.13
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
    flex: 0.8,
    padding: spacing[3]
  },
  bookItems: {
    flex: 1,
    
  },
  petitionItems: {

  }
})
