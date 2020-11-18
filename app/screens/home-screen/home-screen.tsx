import React from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, StatusBar } from "react-native"
import { Screen, Text, SearchBar, CoverSideScroll } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { TextInput, useTheme } from 'react-native-paper';

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
 
  // Pull in navigation via hook
  // const navigation = useNavigation() 
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    ROOT: {
      flex: 1,
      flexDirection: 'column',
      padding: spacing[2],
      backgroundColor: colors.background
    }
})
  return (
    // <SafeAreaView>
      <Screen style={styles.ROOT} preset="scroll">
        {/* <StatusBar barStyle={'default'} translucent={true} backgroundColor={color.palette.indigo} /> */}
        <SearchBar></SearchBar>
        <CoverSideScroll></CoverSideScroll>
      </Screen>
    // </SafeAreaView>
  )





});
