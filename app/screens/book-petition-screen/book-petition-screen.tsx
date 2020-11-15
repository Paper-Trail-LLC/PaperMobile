import React from "react"
import { observer } from "mobx-react-lite"
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View, Switch, Picker, Alert, Platform } from "react-native"
import { Button, Screen, BookOverviewComponent } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { Book, BookPetition, useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { backButton } from ".."
import { TextInput, Text } from "react-native-paper"
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import DateTimePicker from '@react-native-community/datetimepicker';

export const BookPetitionScreen = observer(function BookPetitionScreen() {

  // Petition values for form
  const today = new Date();
  today.setMonth(today.getMonth() + 1);
  const [expdate, setDate] = React.useState(today);
  const [locationPermission, askLocationPermission, getLocationPermission] = Permissions.usePermissions(Permissions.LOCATION, { ask: true });
  const [location, setLocation] = React.useState(null);
  const [petitionLocation, setPetitionLocation] = React.useState('new location');
  const [buying, setBuying] = React.useState(false);
  const [borrowing, setBorrowing] = React.useState(false);
  const [maxRadius, setMaxRadius] = React.useState(2);

  // Stores to be used to get book and save petition to store
  const { bookStore, bookPetitionStore } = useStores();

  // Get currently selected book information
  const isbn13: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(isbn13);

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
    setDate(currentDate);
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
        <BookOverviewComponent book={bookInfo}></BookOverviewComponent>
        <TextInput
          // accessibilityValue={{text:'Petition details'}}
          multiline={true}
          numberOfLines={4}
          label={'Write details here.'}
          focusable={true}
        />
        <View style={styles.row}>
          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.regText}>Buying: </Text>
              <View style={styles.item}>
                <Switch
                  value={buying}
                  onValueChange={() => {
                    setBuying(!buying);
                  }}
                />
              </View>
              <Text style={styles.regText}>Borrowing: </Text>
              <View style={styles.item}>
                <Switch
                  value={borrowing}
                  onValueChange={() => {
                    setBorrowing(!borrowing);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.row, { marginBottom: Platform.OS === 'ios' ? spacing[5] : spacing[0] }]}>
          <View style={styles.item}>
            <Text style={styles.regText}>Location: </Text>
          </View>
          <View style={styles.item}>
            <Picker
              selectedValue={petitionLocation}
              onValueChange={(itemValue: any, itemPosition: number) => {
                setPetitionLocation(itemValue);
              }}
              itemStyle={styles.regText}
            >
              <Picker.Item label={'new location'} value={'new location'} />
              <Picker.Item label={'your saved location'} value={'your saved location'} />
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          {petitionLocation === 'new location' &&
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
            value={"" + maxRadius}
            onChangeText={rad => setMaxRadius(+rad)}
            keyboardType='number-pad'
            showSoftInputOnFocus={true}
            focusable={false}
            style={[styles.locationInput, { marginHorizontal: spacing[6], height: spacing[7] }]} />
          <Text style={styles.regText}>km</Text>
        </View>
        <View style={[styles.row, { marginVertical: Platform.OS === 'ios' ? spacing[7] : spacing[0] }]}>
          <Text style={styles.regText}>expires in:</Text>
          <DateTimePicker
            value={expdate}
            style={{ flex: 1 }}
            textColor={color.primaryBlue}
            mode={'date'}
            display={'default'}
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
    paddingHorizontal: spacing[2],
    flex: 1,
    flexDirection: 'column'
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
