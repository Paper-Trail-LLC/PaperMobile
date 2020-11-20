import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, Picker, Platform, StatusBar, StyleSheet, View, ViewStyle } from "react-native"
import { Screen, UserBookOverviewComponent } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { Appbar, Divider, Subheading, Text, useTheme, TextInput, Button, Title } from "react-native-paper"
import DateTimePicker from '@react-native-community/datetimepicker';
import { EventEmitter } from "expo-location"
import { Book, User, UserBook, useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

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
  const [requestType, setRequestType] = React.useState('borrow');
  const [price, setPrice] = React.useState(0);

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
        <UserBookOverviewComponent userBook={userBook}></UserBookOverviewComponent>
        <Subheading>Status:</Subheading>
        <Title>{'Available'}</Title>
        <Divider />
        <Subheading>Request Type:</Subheading>
        <Picker
          style={styles.picker}
          selectedValue={requestType}
          onValueChange={(itemValue: any, itemPosition: number) => {
            setRequestType(itemValue);
          }}
          itemStyle={{ color: colors.text, height: 110 }}
        >
          <Picker.Item label={'Borrow'} value={'borrow'} />
          <Picker.Item label={'Purchase'} value={'purchase'} />
        </Picker>
        {/* <View style={styles.row}> */}
        <Subheading>{(requestType === 'borrow') ? 'Desired Return Date:' : 'Desired Price: ($)'}</Subheading>
        {requestType === 'purchase' && <TextInput
          label={'Price'}
          mode="outlined"
          keyboardType='decimal-pad'
          onChangeText={price => { setPrice(+price) }}
          showSoftInputOnFocus={true}
          focusable={true}></TextInput>}
        {requestType === 'borrow' && <DateTimePicker

          value={returnDate}
          style={{ height: 120, marginVertical: (Platform.OS === 'ios') ? -spacing[6] : spacing[0] }}
          textColor={colors.text}
          mode={'date'}
          minimumDate={new Date()}
          display={'default'}
          onChange={(event, selectedDate) => setReturnDate(selectedDate)}
        />}
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
    marginVertical: (Platform.OS === 'ios') ? -spacing[7] : spacing[0], 
    // backgroundColor:'blue', 
    width: '50%', 
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
  },
  pickerHeight: {
    height: spacing[7]
  }
})