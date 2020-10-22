import * as React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react-lite"
import { typography } from "../../theme"
import { Text } from "../"
import { MyBookItemProps } from "./my-book-item.props"
// import { useNavigation } from "@react-navigation/native"

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  statusText: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  regText: {
    fontFamily: typography.primary,
    fontStyle: "italic",
    color: "#E14A00",
    fontSize: 16
  },
  availableText: {
    fontFamily: typography.primary,
    fontStyle: "italic",
    color: "#00A939"
  },
  unavailableText: {
    fontFamily: typography.primary,
    fontStyle: "italic",
    color: "#FFBD00"
  },
  lendedText: {
    fontFamily: typography.primary,
    fontStyle: "italic",
    color: "#FF0000"
  },
  titleText: {
    fontFamily: typography.primary,
    fontStyle: "italic",
    color: "#E14A00",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10
  },
  imageColumn: {
    width: "25%",
    alignItems: 'center',
    padding: 5
  },
  infoColumn: {
    width: "75%",
    padding: 10
  }
})

/**
 * Describe your component here
 */
export const MyBookItem = observer(function MyBookItem(props: MyBookItemProps) {

  // const navigation = useNavigation()
  // const nextScreen = () => {
  // navigation.navigate("detail");
  // }

  let availabilityStyle;
  if (props.status === 'available') {
    availabilityStyle = styles.availableText;
  }
  else if (props.status === 'unavailable') {
    availabilityStyle = styles.unavailableText;
  }
  else {
    availabilityStyle = styles.lendedText;
  }

  return (
    <TouchableOpacity>
      {/* onPress={nextScreen}> */}
      <View style={[styles.container, props.style]}>
        <View style={styles.imageColumn}>
          <Image
            source={{ uri: props.bookImage }}
            style={{ height: "100%", resizeMode: "contain" }} />
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.titleText}>{props.title}</Text>
          <View style={styles.statusText}>
            <Text style={styles.regText} text={"Status: "}></Text>
            <Text style={availabilityStyle} text={props.status}></Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})
