import React from "react"
import { observer } from "mobx-react-lite"
import { Image, TextStyle, View, ViewStyle, ImageStyle, Platform, StyleSheet } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { Book, useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native-gesture-handler"

export const backButton = require("./back_arrow.png")
export const bookPicTemp = require("./book_image.png")

export const bground = require("./book_stack.png")

const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    // alignContent:'space-around'
  },
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4]
  },
  header: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    // paddingTop: Platform.OS === 'ios' ? spacing[6] + 10 : spacing[4],
    paddingLeft: spacing[6],
    paddingBottom: spacing[4] - 1,
    paddingHorizontal: 0,
  },
  regText: {
    fontFamily: typography.primary,
    color: color.primaryBlue,
    fontSize: 20
  },
  titleText: {
    fontFamily: typography.primary,
    color: color.primaryBlue,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10
  },
  description: {
    fontFamily: typography.primary,
    color: color.primaryBlue,
    fontSize: 24,
    marginBottom: 10
  },
  descText: {
    fontFamily: typography.primary,
    color: color.primaryBlue,
    fontStyle: 'italic'
  },
  bigImage: {
    alignSelf: 'center',
    marginBottom: spacing[5]
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginVertical: spacing[5]
  },
  buttonText: {
    fontSize: 18,
    marginVertical: spacing[3],
    marginHorizontal: -5
  },
  searchNearby: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: color.primaryBlue
  },
  addToLibrary: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: color.warning
  }
})

export const BookDetailScreen = observer(function BookDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { bookStore } = useStores();

  const selectedIndex: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(selectedIndex);

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()


  return (
    <View style={styles.full}>
      {/* <Image
          style={BACKGROUND}
          source={bground}/> */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
        >
          <Image source={backButton}></Image>
        </TouchableOpacity>
      </View>
      <Screen style={styles.container} preset="scroll">
        <Image source={bookPicTemp} style={styles.bigImage}></Image>
        <Text style={styles.titleText}>{bookInfo.title}</Text>
        <Text style={styles.regText}>{"Author: " + bookInfo.author}</Text>
        <Text style={[styles.regText, { marginBottom: spacing[6] }]}>{"Published on: " + bookInfo.releaseDate}</Text>
        <Text style={styles.description}>Description:</Text>
        <Text style={styles.descText}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</Text>
        <View style={styles.buttonContainer}>
          <Button style={styles.searchNearby} textStyle={styles.buttonText} text={"Search Nearby"}></Button>
          <Button style={styles.addToLibrary} textStyle={styles.buttonText} text={"Add to Library"}></Button>
        </View>
      </Screen>
    </View>
  )
})
