import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, Image, ImageStyle, Platform, View, ViewStyle, TouchableOpacity } from "react-native"
import { MyBookItem, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const background2 = require("../../../assets/book_stack.png")


const FULL: ViewStyle = { flex: 1 }

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const BACKGROUND: ImageStyle = {
  position: "absolute",
  right: "0%",
  bottom: "7%",
  zIndex: -1
}

const ADD: ImageStyle = {
  position: "absolute",
  top: 0,
  left: 35,
  zIndex: 1
}

const BOOK_LIST_ITEM: ViewStyle = {
  margin: 5,

  backgroundColor: "#FFFCFC",
  borderRadius: 8,

  shadowColor: "#E14A00",
  shadowOffset: {
    width: 0,
    height: 4
  },
  shadowOpacity: 0.5,
  shadowRadius: 1
}

export const MyLibraryScreen = observer(function MyLibraryScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={FULL}>
      <Image
          style={BACKGROUND}
          source={background2}/>
      <View style={CONTAINER}>
        <TouchableOpacity
          onPress={() => Alert.alert("Add book is pressed!")}
          style={{ top: 65, marginBottom: 110 }}>
          <MaterialCommunityIcons name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <MyBookItem
         style={BOOK_LIST_ITEM}
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
