import React from "react"
import { observer } from "mobx-react-lite"
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View, Switch, Picker, Alert, Platform } from "react-native"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { Book, useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { backButton } from ".."
import { TextInput } from "react-native-paper"
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import DateTimePicker from '@react-native-community/datetimepicker';

export const BookPetitionScreen = observer(function BookPetitionScreen() {

  const today = new Date();
  today.setMonth(today.getMonth()+1);
  // const [date, setDate] = React.useState(today);

  const [locationPermission, askLocationPermission, getLocationPermission] = Permissions.usePermissions(Permissions.LOCATION, {ask: true});
  const [location, setLocation] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState('new location');
  const [selectedToBuy, setToBuy] = React.useState(false);
  const [selectedToBorrow, setToBorrow] = React.useState(false);

  const { bookStore, bookPetitionStore } = useStores();

  const isbn13: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(isbn13);
  bookPetitionStore.setBook(bookInfo);

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  async function getLocation() {
    console.log('test');
    if (!locationPermission || locationPermission.status !== 'granted') {
      askLocationPermission();
    }
    if (!getLocationPermission()) {
      Alert.alert('Location permission not granted');
    }
    else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords.latitude + ", " + location.coords.longitude);
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || today;
    bookPetitionStore.setExpDate(currentDate);
  };

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
        <Text style={[styles.regText, { marginBottom: spacing[5] }]}>{"Published on: " + bookInfo.releaseDate}</Text>
        <Text style={styles.description}>Description:</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          label={'Write details here.'}
          focusable={true}
        />
        <View style={styles.row}>
          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.regText} text={'to buy'}></Text>
              <View style={styles.item}>
                <Switch
                  value={selectedToBuy}
                  onValueChange={() => {
                    setToBuy(!selectedToBuy);
                  }}
                />
              </View>
              <Text style={styles.regText} text={'to borrow'}></Text>
              <View style={styles.item}>
                <Switch
                  value={selectedToBorrow}
                  onValueChange={() => {
                    setToBorrow(!selectedToBorrow);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.row, {marginBottom: Platform.OS === 'ios' ? spacing[5] : spacing[0]}]}>
          <View style={styles.item}>
            <Text text={'location:'} style={styles.regText}></Text>
          </View>
          <View style={styles.item}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue: any, itemPosition: number) => {
                setSelectedValue(itemValue);
              }}
              itemStyle={styles.regText}
            >
              <Picker.Item label={'new location'} value={'new location'} />
              <Picker.Item label={'your saved location'} value={'your saved location'} />
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          {selectedValue === 'new location' &&
            <Button onPress={getLocation} text={'locate me!'} style={styles.locateMeButtonStyle} textStyle={styles.buttonText}></Button>
          }
          <TextInput
          mode="outlined"
          editable={false}
          showSoftInputOnFocus={true}
          focusable={false}
          value={location}
          style={styles.locationInput} />
        </View>
        <View style={styles.row}>
          <Text style={styles.regText}>max radius:</Text>
          <TextInput
          mode="outlined"
          keyboardType='number-pad'
          showSoftInputOnFocus={true}
          focusable={false}
          style={[styles.locationInput, {marginHorizontal: spacing[6], height: spacing[7]}]} />
          <Text style={styles.regText}>km</Text>
        </View>
        <View style={[styles.row, {marginVertical: Platform.OS === 'ios' ? spacing[7] : spacing[0]}]}>
          <Text style={styles.regText}>expires in:</Text>
          <DateTimePicker
            value={bookPetitionStore.getExpDate()}
            style={{flex: 1}}
            textColor={color.primaryBlue}
            mode={'date'}
            display="default"
            onChange={onChange}
          ></DateTimePicker>
        </View>
        <Button style={[styles.blueButton, { marginBottom: spacing[4] }]} textStyle={styles.buttonText} text={'create a book petition'}></Button>
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
    // justifyContent: 'space-around',
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
  },
  blueButton: {
    margin: spacing[3],
    borderRadius: 13,
    paddingVertical: spacing[4],
    backgroundColor: color.primaryBlue
  },
  addToLibrary: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: color.warning
  },
  locateMeButtonStyle: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: color.warning
  },
  locationInput: {
    flex: 1,
    backgroundColor: color.transparent
  },
})
