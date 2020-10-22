import * as React from "react"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { typography } from "../../theme"
import { Text } from "../"
import { MyBookItemProps } from "./my-book-item.props"
import { useNavigation } from "@react-navigation/native"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start"
}

const STATUS_TEXT: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start"
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontStyle: "italic",
  color: "#E14A00",
}

const REG_TEXT: TextStyle = {
  ...TEXT,
  fontSize: 16
}

const AVAILABLE: TextStyle = {
  ...REG_TEXT,
  color: "#00A939"
}

const UNAVAILABLE: TextStyle = {
  ...REG_TEXT,
  color: "#FFBD00"
}

const LENDED: TextStyle = {
  ...REG_TEXT,
  color: "#FF0000"
}

const TITLE_TEXT: TextStyle = {
  ...TEXT,
  fontWeight: "bold",
  fontSize: 20,
  marginBottom: 10
}

const IMAGE_COLUMN: ViewStyle = {
  width: "25%",
  alignItems: 'center',
  padding: 5
}

const INFO_COLUMN: ViewStyle = {
  width: "75%",
  padding: 10
}

/**
 * Describe your component here
 */
export const MyBookItem = observer(function MyBookItem(props: MyBookItemProps) {
  
  const navigation = useNavigation()
  const nextScreen = () => {
    // navigation.navigate("detail");
  }

  let availabilityStyle;
  if(props.status === 'available') {
    availabilityStyle = AVAILABLE;
  }
  else if(props.status === 'unavailable') {
    availabilityStyle = UNAVAILABLE;
  }
  else {
    availabilityStyle = LENDED;
  }

  return (
    <TouchableOpacity
      onPress={nextScreen}>
      <View style={[CONTAINER, props.style]}>
        <View style={IMAGE_COLUMN}>
          <Image
            source={{uri: props.bookImage}}
            style={{height: "100%", resizeMode: "contain"}}/>
        </View>
        <View style={INFO_COLUMN}>
          <Text style={TITLE_TEXT}>{props.title}</Text>
          <View style={STATUS_TEXT}>
            <Text style={REG_TEXT} text={"Status: "}></Text>
            <Text style={availabilityStyle} text={props.status}></Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})
