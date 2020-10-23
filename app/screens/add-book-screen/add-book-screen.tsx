import React from "react"
import { observer } from "mobx-react-lite"
import { Platform, StyleSheet, View } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { AddBookProps } from "./add-book.props"
import { MyBookDetails } from "../../components/my-book-details/my-book-details"

const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: Platform.OS === 'ios' ? spacing[7] : spacing[6],
    backgroundColor: color.background
    // alignContent:'space-around'
  },
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: color.transparent,
    paddingHorizontal: spacing[4]
  }
})

export const AddBookScreen = observer(function AddBookScreen(props: AddBookProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={styles.full}>
      <Screen style={styles.container} preset="scroll">
        <MyBookDetails
          style={{color: color.primaryBlue, borderColor: color.primaryBlue}}
        />
      </Screen>
    </View>
  )
})
