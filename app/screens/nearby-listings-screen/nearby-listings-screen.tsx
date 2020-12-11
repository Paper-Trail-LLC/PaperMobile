import React from "react"
import { observer } from "mobx-react-lite"
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native"
import { NearbyListingItem, Screen, BookOverviewComponent } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { useStores, Book } from "../../models"
import { Appbar, Menu, Text, Button, useTheme, Headline, Subheading, Title } from 'react-native-paper';

export const NearbyListingsScreen = observer(function NearbyListingsScreen() {

  const { bookStore } = useStores();

  const isbn13: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(isbn13);
  const { colors } = useTheme();
  // Pull in navigation via hook
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();

  const moveToCreatePetition = () => {
    navigation.navigate("create_petition");
  }

  const nearbyListings = [];
  // nearbyListings.push(
  //   <NearbyListingItem
  //     style={styles.ListItem}
  //     owner={'Alexander Hamilton'}
  //     ownerRating={1.3}
  //     lending={true}
  //     selling={false}
  //     distance={4}
  //   ></NearbyListingItem>);

  return (
    <View style={styles.full}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={"Nearby Listing"} />
      </Appbar.Header>
      <Screen style={[styles.container, { backgroundColor: colors.background }]} preset="scroll" backgroundColor={colors.background}>
        <BookOverviewComponent book={bookInfo} exclude={[2, 3]}></BookOverviewComponent>
        <Subheading>{"Don't see a good nearby listing?"}</Subheading>
        <Button onPress={moveToCreatePetition} mode={"contained"}>Create a Book Petition</Button>
        {nearbyListings.length === 0 && <Title style={styles.emptyText}>No nearby listings found</Title> }
        {nearbyListings}
      </Screen>
    </View>
  )
})

const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: spacing[2]
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
    borderRadius: 8,
    shadowColor: color.primaryBlue,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 1
  },
  emptyText: {
    marginTop: spacing[6],
    marginHorizontal: spacing[7],
    alignSelf: 'center',
  }
})
