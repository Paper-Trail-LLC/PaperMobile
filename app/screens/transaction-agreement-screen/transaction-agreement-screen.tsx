import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, Picker, StatusBar, StyleSheet, View } from "react-native"
import { BookOverviewComponent, Screen, UserBookOverviewComponent } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { Appbar, Divider, Subheading, useTheme, TextInput, Button, Title } from "react-native-paper"
import DateTimePicker from '@react-native-community/datetimepicker';
import { Book, User, UserBook, useStores } from "../../models"

export const TransactionAgreementScreen = observer(function TransactionAgreementScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const bookStore = useStores().bookStore;
  const { colors } = useTheme();

  const isbn13: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(isbn13);
  
  const today = new Date();
  today.setMonth(today.getMonth() + 1);
  const [returnDate, setReturnDate] = React.useState(today);
  const [price, setPrice] = React.useState(0);

  //Dummy
  var user: User = {
    id: '123',
    firstname: 'John',
    lastname: 'Doe',
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

  const [requestType, setRequestType] = React.useState(userBook.lending ? 'borrow' : 'purchase');

  // Pull in navigation via hook
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();
  return (
    <View style={styles.full}>
      <StatusBar translucent={true} />
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={'Request Book'} />
      </Appbar.Header>
      <Screen style={[styles.container, { backgroundColor: colors.background }]} preset="scroll" backgroundColor={colors.background}>
        <BookOverviewComponent book={bookInfo} exclude={[1,2,3]}></BookOverviewComponent>
        <UserBookOverviewComponent userBook={userBook}></UserBookOverviewComponent>
        <Divider/>
        <Subheading>Request Type:</Subheading>
        <Picker
          style={styles.picker}
          selectedValue={requestType}
          onValueChange={(itemValue: any, itemPosition: number) => {
            setRequestType(itemValue);
          }}
          itemStyle={{ color: colors.text }}
        >
          {userBook.lending && <Picker.Item label={'Borrow'} value={'borrow'} />}
          {userBook.selling && <Picker.Item label={'Purchase'} value={'purchase'} />}
        </Picker>
        {/* <View style={styles.row}> */}
        <Subheading>{(requestType === 'borrow') ? 'Desired Return Date:' : 'Desired Price: ($)'}</Subheading>
        {requestType === 'purchase' && <TextInput
          label={'Price'}
          mode="outlined"
          value={price.toString()}
          keyboardType='number-pad'
          onChangeText={price => { setPrice(+price) }}
          showSoftInputOnFocus={true}
          focusable={true}></TextInput>}
        {requestType === 'borrow' && <DateTimePicker

          value={returnDate}
          style={{ flex: 0.25 }}
          textColor={colors.text}
          mode={'date'}
          minimumDate={new Date()}
          display={'default'}
          onChange={(event, selectedDate) => setReturnDate(selectedDate)}
        />}
        <Divider />
        <Button mode={'contained'} onPress={() => {Alert.alert('Request Book pressed!')}}>request book</Button>
      </Screen>
    </View >
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
    padding: spacing[2]
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  picker: {
    width: '50%',
    flex: 0.15, 
    alignSelf: 'center',
    justifyContent: 'center'
  },
  menuItem: {
    color: color.primaryBlue
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})