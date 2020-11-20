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
      padding: spacing[2],
      flex:1
    }

  })
  return (
    <SafeAreaView style={styles.ROOT}>
      <SearchBar></SearchBar>
      <Screen style={{backgroundColor: colors.background}} preset="scroll" backgroundColor={colors.background}>
        {/* <StatusBar barStyle={'default'} translucent={true} backgroundColor={color.palette.indigo} /> */}
        <CoverSideScroll></CoverSideScroll>
      </Screen>
    </SafeAreaView>
  )





});
