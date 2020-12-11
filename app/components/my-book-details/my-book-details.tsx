import * as React from "react"
import { Picker, StyleSheet, View, Alert, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../theme"
import { MyBookDetailProps } from "./my-book-details.props"
import { Text, Button, Subheading, Divider, Checkbox, useTheme } from 'react-native-paper'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
// import { useStores } from "../../models"
import MapView, { Marker, UrlTile } from "react-native-maps"

export const MyBookDetails = observer(function MyBookDetails(props: MyBookDetailProps) {
  const { style, editable, userBook } = props
  const [selectedSelling, setSelling] = React.useState(userBook.selling != undefined ? userBook.selling : false);
  const [selectedLending, setLending] = React.useState(userBook.lending != undefined ? userBook.selling : false);
  const [locationPermission, askLocationPermission, getLocationPermission] = Permissions.usePermissions(Permissions.LOCATION, { ask: true });
  const [location, setLocation] = React.useState(null);
  const { colors } = useTheme();
  const [bookLocation, setBookLocation] = React.useState('new location');
  // const myBookDetails = useStores().userBookStore;

  const tileUrl = "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const [region, setRegion] = React.useState({
    latitude: (userBook.location != undefined) ? userBook.location[0] : 18.220833,
    longitude: (userBook.location != undefined) ? userBook.location[1] : -66.590149,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta
      });
      // myBookDetails.setLocation(location.coords.latitude, location.coords.longitude);
    }
  }

  return (
    <View style={[styles.container, style]}>
      <Subheading>Book Availability</Subheading>
      <Divider />
      <View style={styles.row}>
        <Text>Available for selling:</Text>
        <View style={Platform.OS === 'ios' ? { borderWidth: 1, borderColor: colors.accent, borderRadius: spacing[2] } : {}}>
          <Checkbox
            disabled={!editable}
            status={selectedSelling ? 'checked' : 'unchecked'}
            onPress={() => {
              setSelling(!selectedSelling);
              //Alter book status if necessary
              // myBookDetails.setSelling(!selectedSelling);
            }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text>Available for lending:</Text>
        <View style={Platform.OS === 'ios' ? { borderWidth: 1, borderColor: colors.accent, borderRadius: spacing[2] } : {}}>
          <Checkbox
            disabled={!editable}
            status={selectedLending ? 'checked' : 'unchecked'}
            onPress={() => {
              setLending(!selectedLending);
            }}
          />
        </View>
      </View>
      <Subheading>Book Location</Subheading>
      <Divider />
      {editable &&
        <Picker
          selectedValue={bookLocation}
          onValueChange={(itemValue: any, itemPosition: number) => {
            setBookLocation(itemValue);
          }}
          itemStyle={[styles.regText, { color: colors.text, height: 115 }]}
        >
          <Picker.Item label={'New Location'} value={'new location'} />
          <Picker.Item label={'Your Saved Location'} value={'your saved location'} />
        </Picker>
      }
      {bookLocation === 'new location' && editable &&
        <Button onPress={getLocation} mode={'contained'} icon={'crosshairs-gps'} style={{ alignSelf: 'center', justifyContent: 'center', margin: 10 }}>Locate me!</Button>
      }
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={region} provider={null} region={region}
          mapType={Platform.OS == "android" ? "none" : "standard"} rotateEnabled={false}>
          <UrlTile urlTemplate={tileUrl} maximumZ={19} />
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}></Marker>
        </MapView>
      </View>

    </View >
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  regText: {
    fontSize: 20
  },
  locationInput: {
    flex: 1,
    backgroundColor: color.transparent
  },
  location: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  mapContainer: {
    flexDirection: 'column',
    height: 150,
  },
  map: {
    flex: 1,
  }

})