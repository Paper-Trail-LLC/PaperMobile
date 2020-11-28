import React from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, Picker, Alert, Platform } from "react-native"
import { Screen, BookOverviewComponent } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { Marker, UrlTile } from 'react-native-maps';
import MapView from 'react-native-maps';
import { color, spacing, typography } from "../../theme"
import { Book, BookPetition, useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { TextInput, Text, Appbar, Subheading, Divider, Button, useTheme, Switch } from "react-native-paper"
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

export const BookOfferScreen = observer(function BookOfferScreen() {

  const { colors } = useTheme();
  // Petition values for form
  const today = new Date();
  today.setMonth(today.getMonth() + 1);
  const [expdate, setDate] = React.useState(today);
  const [locationPermission, askLocationPermission, getLocationPermission] = Permissions.usePermissions(Permissions.LOCATION, { ask: true });
  const [petitionLocation, setPetitionLocation] = React.useState('new location');
  const [selling, setSelling] = React.useState(false);
  const [lending, setLending] = React.useState(false);

  // Stores to be used to get book and save petition to store
  const { bookStore, bookPetitionStore } = useStores();

  // Get currently selected book information
  const isbn13: string = bookStore.choice;
  const bookInfo: Book = bookStore.getBook(isbn13);

  // Pull in navigation via hook
  const navigation = useNavigation()
  const _goBack = () => navigation.goBack()
  /*
  For refernce, below URL is for OpenStreetMap:
  var tileUrl = "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png";
  */
  const tileUrl = "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const [region, setRegion] = React.useState({
    latitude: 18.220833,
    longitude: -66.590149,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  async function getLocation() {
    if (!locationPermission || locationPermission.status !== 'granted') {
      askLocationPermission();
    }
    if (!getLocationPermission()) {
      Alert.alert('Location permission not granted');
    }
    else {
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      });
    }
  }

  return (
    <View style={styles.full}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={"Book Offer"} />
      </Appbar.Header>

      <Screen style={[styles.container, {backgroundColor: colors.background}]} preset="scroll" backgroundColor={colors.background}>
        <BookOverviewComponent book={bookInfo}></BookOverviewComponent>
        <Subheading>Offering book to:</Subheading>
        <Divider />
        {/* Add name of person who made petition! */}
        {/* <Title>{bookPetitionStore}</Title> */} 
        <Subheading>Are you...?</Subheading>
        {/* Disable them depending on petition and who is viewing petition */}
        <Divider />
          <View style={styles.item}>
            <View style={styles.row}>
              <Text style={styles.regText}>Selling: </Text>
              <View style={styles.item}>
                <Switch
                  value={selling}
                  onValueChange={() => {
                    setSelling(!selling);
                  }}
                />
              </View>
              <Text style={styles.regText}>Lending: </Text>
              <View style={styles.item}>
                <Switch
                  value={lending}
                  onValueChange={() => {
                    setLending(!lending);
                  }}
                />
              </View>
            </View>
        </View>
        {/* LOCATION */}
        <Subheading>Where?</Subheading>
        <Divider />
        <Picker
          selectedValue={petitionLocation}
          onValueChange={(itemValue: any, itemPosition: number) => {
            setPetitionLocation(itemValue);
          }}
          itemStyle={[styles.regText, {color:colors.text, height: 120}]}
        >
          <Picker.Item label={'New Location'} value={'new location'} />
          <Picker.Item label={'Your Saved Location'} value={'your saved location'} />
        </Picker>
        {petitionLocation === 'new location' &&
          <Button onPress={getLocation} mode={'contained'} icon={'crosshairs-gps'} style={{ alignSelf: 'center', justifyContent: 'center', margin: 10 }}>Locate me!</Button>
        }
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={region} provider={null} region={region}
            mapType={Platform.OS == "android" ? "none" : "standard"} rotateEnabled={false}>
            <UrlTile urlTemplate={tileUrl} maximumZ={19} />
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}></Marker>
          </MapView>
        </View>
        <Subheading>Description:</Subheading>
        <Divider />
        <TextInput
          // accessibilityValue={{text:'Offer details'}}
          multiline={true}
          numberOfLines={4}
          label={'Write it here!'}
          focusable={true}
        />
        {/* Show buttons depending on who's petition this is (compare with session) */}
        <Button onPress={() => {Alert.alert('Create book petition pressed!')}} style={[styles.blueButton, { marginBottom: spacing[4] }]} color={'white'}>Request Book</Button>
        <Button onPress={() => {Alert.alert('decline pressed!')}} style={[styles.redButton, { marginBottom: spacing[4] }]} color={'white'}>Decline</Button>
        <Button onPress={() => {Alert.alert('edit pressed!')}} style={[styles.blueButton, { marginBottom: spacing[4] }]} color={'white'}>Edit Offer</Button>
        <Button onPress={() => {Alert.alert('cancel pressed!')}} style={[styles.redButton, { marginBottom: spacing[4] }]} color={'white'}>Cancel Offer</Button>
      </Screen>
    </View>
  )
})

const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: color.transparent
  },
  container: {
    paddingHorizontal: spacing[2],
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-around'
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
    fontSize: 20
  },
  titleText: {
    fontFamily: typography.primary,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10
  },
  description: {
    fontFamily: typography.primary,
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
    backgroundColor: color.primaryBlue,
  },
  redButton: {
    margin: spacing[3],
    borderRadius: 13,
    paddingVertical: spacing[4],
    backgroundColor: 'red',
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
  mapContainer: {
    flexDirection: 'column',
    height: 200,
  },
  map: {
    flex: 1,
  }
})
