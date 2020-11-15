import React from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, ViewStyle } from "react-native"
import { Screen, Text, SearchBar, CoverSideScroll } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={styles.ROOT} preset="scroll">
      <SearchBar></SearchBar>
      <CoverSideScroll></CoverSideScroll>
    </Screen>
  )
})

const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: color.background,
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between'
  }

});
