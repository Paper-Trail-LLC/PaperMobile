import React from "react"
import { observer } from "mobx-react-lite"
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Button, NearbyListingItem, Screen, BookOverviewComponent  } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { useStores, Book } from "../../models"
import { Appbar, Menu, Text} from 'react-native-paper';

export const NearbyListingsScreen = observer(function NearbyListingsScreen() {

  const { bookStore } = useStores();

  const isbn13: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(isbn13);

  // Pull in navigation via hook
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();

  const moveToCreatePetition = () => {
    navigation.navigate("create_petition");
  }

  return (
    <SafeAreaView style={styles.full}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={"Nearby Listing"} />
      </Appbar.Header>
      <Screen style={styles.container} preset="scroll">
        <BookOverviewComponent book={bookInfo}></BookOverviewComponent>
        <Text style={styles.regText}>{"Don't see a good nearby listing?"}</Text>
        <Button onPress={moveToCreatePetition} style={[styles.blueButton, { marginBottom: spacing[4] }]} textStyle={styles.buttonText} text={'create a book petition'}></Button>
        <NearbyListingItem
          style={styles.ListItem}
          owner={'Alexander Hamilton'}
          ownerRating={1.3}
          lending={true}
          selling={false}
          distance={4}
        ></NearbyListingItem>
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
    // alignContent:'space-around'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: color.transparent,
    paddingHorizontal: spacing[2]
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
  blueButton: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: color.primaryBlue
  },
  addToLibrary: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: color.warning
  },
  ListItem: {
    margin: 5,

    backgroundColor: color.background,
    borderRadius: 8,

    shadowColor: color.primaryBlue,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  textIcon: {

  }
})
