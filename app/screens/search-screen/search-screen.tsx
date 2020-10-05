import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, SafeAreaView, View, Image, ImageStyle, Alert } from "react-native"
import { Screen, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"

export const whiteMagnifying = require("./selected_search.png")
export const person = require("./unselected_profile.png")
export const background = require("./book_stack.png")
export const blueMagnifying = require("./blue_magnifying.png")
export const scan = require("./scan.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const FOOTER: ViewStyle = { backgroundColor: "#FF0054" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[0],
  paddingHorizontal: spacing[0],
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  flexDirection: 'row',
}

const BACKGROUND: ImageStyle = {
  position: "absolute",
  right: "0%",
  bottom: "18%", //will change later to cover other devices
  zIndex: -1
}

const BLUESEARCH: ImageStyle = {
  position: "absolute",
  top: 68, //will change later to cover other devices
  left: "8%", //will change later to cover other devices
  zIndex: 1
}

const SCANCODE: ImageStyle = {
  position: "absolute",
  top: "7.5%", //will change later to cover other devices
  right: "8.5%", //will change later to cover other devices
  zIndex: 1
}

const BOTTOM_BAR_ITEM: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  width: "50%",
}

const TEXTFIELD: ViewStyle = {
  padding: 15,
  paddingLeft: "11%",
  paddingRight: "12%",
  margin: "5%",
  marginTop: 55,
  borderColor: "#390099",
  borderWidth: 2,
  borderTopLeftRadius: 100,
  borderBottomLeftRadius: 100,
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  backgroundColor: "#FFFFFF",
  zIndex: -1
}

const BOTTOM_BUTTON_COLOR: ViewStyle = {
  ...BOTTOM_BAR_ITEM,
  backgroundColor: "#FF0054"
}


export const SearchScreen = observer(function SearchScreen() {
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
        source={background}
      ></Image>
      <Image
        style={BLUESEARCH}
        source={blueMagnifying}
      ></Image>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => { Alert.alert('Scan code pressed!') }}
        style={{ zIndex: 1, top: 66 }}>
        <Image
          style={SCANCODE}
          source={scan}
        ></Image>
      </TouchableOpacity>
      <TextInput
        style={TEXTFIELD}
        placeholderTextColor="#390099"
        placeholder="Search Book"
      ></TextInput>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            style={BOTTOM_BUTTON_COLOR}
          >
            <Image
              source={whiteMagnifying}
            ></Image>
          </Button>
          <Button
            style={BOTTOM_BUTTON_COLOR}
          >
            <Image
              source={person}
            ></Image>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  )
})
