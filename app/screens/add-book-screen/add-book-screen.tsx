import React from "react"
import { observer } from "mobx-react-lite"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Button, Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { AddBookProps } from "./add-book.props"
import { MyBookDetails } from "../../components/my-book-details/my-book-details"
import { Book, useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"

export const backBttn = require("../book-detail-screen/back_arrow.png")

export const AddBookScreen = observer(function AddBookScreen(props: AddBookProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR

  const bookStore = useStores().bookStore;
  const myBookDetails = useStores().userBookStore;
  const selectedIndex: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(selectedIndex);

  // Pull in navigation via hook
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.full}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={goBack}
          >
            <Image source={backBttn}></Image>
          </TouchableOpacity>
        </View>
        <Screen style={styles.container} preset="scroll">
          <Image source={{uri: bookInfo.coverURI}} style={styles.bigImage}></Image>
          <Text style={styles.titleText}>{bookInfo.title}</Text>
          <Text style={styles.regText}>{"Author: " + bookInfo.authors}</Text>
          <Text style={[styles.regText, { marginBottom: spacing[6] }]}>{"Published on: " + bookInfo.releaseDate}</Text>
          <MyBookDetails
            style={{ color: color.primaryBlue, borderColor: color.primaryBlue }}
          />
          <Button onPress={() => { console.log(myBookDetails.selling); console.log(myBookDetails.location) }} style={styles.addButtonStyle} textStyle={styles.buttonText} text={'Add'}></Button>
        </Screen>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: color.background
  },
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: color.transparent,
    paddingHorizontal: spacing[4]
  },
  header: {
    backgroundColor: '#FFFFFF',
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
  bigImage: {
    alignSelf: 'center',
    marginBottom: spacing[5],
    width: 107,
    height: 165,
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    marginVertical: spacing[3],
    marginHorizontal: -5
  },
  addButtonStyle: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: color.primaryBlue
  },
})
