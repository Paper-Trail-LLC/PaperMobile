import React from "react"
import { observer } from "mobx-react-lite"
import { StatusBar, StyleSheet, View } from "react-native"
import { BookOverviewComponent, MyBookDetails, Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { spacing } from "../../theme"
import { Appbar, Button, useTheme } from "react-native-paper"
import { Book, User, UserBook, useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"

export const EditBookScreen = observer(function EditBookScreen() {
  // Pull in one of our MST stores
  const { bookStore } = useStores() 
  const selectedIndex: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(selectedIndex);
  const { colors } = useTheme();
  const [editing, setEditing] = React.useState(false);
  // Pull in navigation via hook
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();

  //Dummy
  var user: User = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    email: 'johndoe@test.com',
    memberSince: new Date()
  }
  var userBook: UserBook = {
    id: '1234',
    owner: user,
    book: bookInfo,
    status: 'available',
    selling: false,
    lending: true,
  }
  
  return (
    <View style={styles.full}>
      <StatusBar translucent={true} />
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={'Add to Library'}/>
        <Appbar.Action icon="book-edit-outline" onPress={() => {setEditing(true)}} accessibilityValue={{text:"Search nearby"}}/>
      </Appbar.Header>
        <Screen style={[styles.container, {backgroundColor: colors.background}]} preset="scroll" backgroundColor={colors.background}>
          <BookOverviewComponent book={bookInfo} exclude={[3]} />
          <MyBookDetails editable={editing} userBook={userBook} style={{ color: colors.primary, borderColor: colors.primary, marginBottom: spacing[2] }} />
          {editing && <Button mode={'contained'} onPress={() => { setEditing(false) }}>Save</Button>}
          {editing && <Button mode={'contained'} onPress={() => { setEditing(false) }} color={'#EBD234'}>Cancel</Button>}
          {editing && <Button mode={'contained'} onPress={() => { console.log('Hello') }} color={'red'}>Delete</Button>}
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
