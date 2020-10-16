import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, Image, ImageStyle, Platform, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"

export const background = require("../../../assets/book_stack.png")
export const add = require("../../../assets/add_icon.png")


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

const SCANCODE: ImageStyle = {
  position: "absolute",
  top: 0,
  right: 40,
  zIndex: 1
}

const TEXTFIELD: ViewStyle = {
  padding: 15,
  paddingLeft: 50,
  paddingRight: 55,
  margin: 20,
  marginTop: Platform.OS === 'ios' ? 55 : 50,
  borderColor: "#E14A00",
  borderWidth: 2,
  borderTopLeftRadius: 100,
  borderBottomLeftRadius: 100,
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  backgroundColor: "#FFFCFC",
  zIndex: -1
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
          source={background}/>
      <View style={CONTAINER}>
        <TouchableOpacity
          onPress={() => Alert.alert("Scan barcode is pressed!")}
          style={{ top: 67 }}>
          <View style={[{ backgroundColor: "#FFFFFF", width: 27, height: 27 }, SCANCODE]}>
            <Image source={add}/>
          </View>
        </TouchableOpacity>
      </View>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        
      </Screen>
    </View>
  )
})
