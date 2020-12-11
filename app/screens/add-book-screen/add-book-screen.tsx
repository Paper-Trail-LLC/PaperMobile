import React from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, StatusBar } from "react-native"
import { Screen, MyBookDetails, BookOverviewComponent} from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { spacing } from "../../theme"
import { AddBookProps } from "./add-book.props"
import { Book, useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { Appbar, useTheme, Button } from 'react-native-paper';

export const backBttn = require("../book-detail-screen/back_arrow.png")

export const AddBookScreen = observer(function AddBookScreen(props: AddBookProps) {
  // Pull in one of our MST stores
  const { bookStore } = useStores()
  // OR
  const selectedIndex: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(selectedIndex);
  const { colors } = useTheme();
  // Pull in navigation via hook
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={styles.full}>
      <StatusBar translucent={true} />
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={'Add to Library'}/>
      </Appbar.Header>
        <Screen style={[styles.container, {backgroundColor: colors.background}]} preset="scroll" backgroundColor={colors.background}>
          <BookOverviewComponent book={bookInfo} exclude={[3]} />
          <MyBookDetails editable={true} style={{ color: colors.primary, borderColor: colors.primary, marginBottom: spacing[2] }}/>
          <Button mode={'contained'} onPress={() => { console.log('Hello') }}>Add</Button>
        </Screen>
    </View>
  )
})

const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    padding: spacing[2]
  },
})
