import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, Image, ImageStyle, Platform, View, ViewStyle, TouchableOpacity, StyleSheet } from "react-native"
import { MyBookItem, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';

export const background2 = require("../../../assets/book_stack.png")

const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'space-around'
  },
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4]
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
    backgroundColor: color.primaryOrange,
  },
  bookListItem: {
    margin: 5,

    backgroundColor: color.background,
    borderRadius: 8,

    shadowColor: '#E14A00',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 1
  }
})

export const MyLibraryScreen = observer(function MyLibraryScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={styles.full}>
      <Image
        style={styles.background}
        source={background2} />
      <View style={styles.container}>

      </View>
      <FAB
          style={styles.fabAdd}
          icon="plus"
          onPress={() => console.log('Pressed')}
        />
      <Screen style={styles.container} preset="scroll" backgroundColor={color.transparent}>
        <MyBookItem
          style={styles.bookListItem}
          bookImage={"https://kbimages1-a.akamaihd.net/d47f06aa-0e2c-4d49-9e32-85e4901a6d8f/1200/1200/False/artemis-fowl-and-the-time-paradox.jpg"}
          id={"123"}
          title={"Artemis Fowl: The Time Paradox"}
          status={"available"}
        >
        </MyBookItem>
      </Screen>
    </View>
  )
})
