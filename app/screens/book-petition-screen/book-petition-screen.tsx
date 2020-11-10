import React from "react"
import { observer } from "mobx-react-lite"
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View, Switch } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { Book, useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { backButton } from ".."
import { TextInput } from "react-native-paper"

export const BookPetitionScreen = observer(function BookPetitionScreen() {

  const [selectedToBuy, setToBuy] = React.useState(false);
  const [selectedToBorrow, setToBorrow] = React.useState(false);

  const { bookStore } = useStores();

  const isbn13: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(isbn13);

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  return (
    <SafeAreaView style={styles.full}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
        >
          <Image source={backButton}></Image>
        </TouchableOpacity>
      </View>
      <Screen style={styles.container} preset="scroll">
        <Image source={{ uri: bookInfo.coverURI }} style={styles.bigImage}></Image>
        <Text style={styles.titleText}>{bookInfo.title}</Text>
        <Text style={styles.regText}>{"Author: " + bookInfo.authors}</Text>
        <Text style={[styles.regText, { marginBottom: spacing[6] }]}>{"Published on: " + bookInfo.releaseDate}</Text>
        <Text style={styles.description}>Description:</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          label={'Write details here.'}
          focusable={true}
        />
        <View style={styles.row}>
          <View style={styles.item}></View>
          <View style={styles.row}>
            <Text style={styles.regText} text={'for selling'}></Text>
            <View style={styles.item}>
              <Switch
                value={selectedToBuy}
                onValueChange={() => {
                  setToBuy(!selectedToBuy);
                  console.log(!selectedToBuy);
                }}
              />
            </View>
            <Text style={styles.regText} text={'for lending'}></Text>
            <View style={styles.item}>
              <Switch
                value={selectedToBorrow}
                onValueChange={() => {
                  setToBorrow(!selectedToBorrow);
                  console.log(!selectedToBorrow);
                }}
              />
            </View>
          </View>
        </View>
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
    paddingHorizontal: spacing[2]
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginVertical: spacing[2]
  },
  item: {
    padding: spacing[3],
    width: '50%'
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
