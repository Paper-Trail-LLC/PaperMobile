import * as React from "react"
import { Picker, StyleSheet, View, Alert } from "react-native"
// import {  } from "../../components"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { MyBookDetailProps } from "./my-book-details.props"
import { Text, TextInput, Button, Subheading, Divider, Checkbox, useTheme } from 'react-native-paper'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { useStores } from "../../models"

export const MyBookDetails = observer(function MyBookDetails(props: MyBookDetailProps) {
  const { style } = props
  const [selectedValue, setSelectedValue] = React.useState('available');
  const [selectedSelling, setSelling] = React.useState(false);
  const [selectedLending, setLending] = React.useState(false);
  const [locationPermission, askLocationPermission, getLocationPermission] = Permissions.usePermissions(Permissions.LOCATION, { ask: true });
  const [location, setLocation] = React.useState(null);
  const { colors } = useTheme();
  // const myBookDetails = useStores().userBookStore;

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
      // myBookDetails.setLocation(location.coords.latitude, location.coords.longitude);
    }
  }

  return (
    <View style={[styles.container, style]}>
      <Subheading>Book Availability</Subheading>
      <Divider />
      <View style={styles.row}>
        <Text>Available for selling:</Text>
        <Checkbox
          status={selectedSelling? 'checked':'unchecked'}
          onPress={() => {
            setSelling(!selectedSelling);
            // myBookDetails.setSelling(!selectedSelling);
          }}
        />
      </View>
      <View style={styles.row}>
        <Text>Available for lending:</Text>
        <Checkbox
          status={selectedLending? 'checked':'unchecked'}
          onPress={() => {
            setLending(!selectedLending);
            // myBookDetails.setLending(!selectedLending);
          }}
        />
      </View>
      <View style={styles.location}>
        <Subheading>Location</Subheading>
        <Divider />
        <Button onPress={getLocation} mode={'contained'}>Locate Me</Button>
      </View>
      <View style={styles.row}>
        <TextInput
          // onChangeText={}
          mode="outlined"
          showSoftInputOnFocus={true}
          focusable={false}
          value={location}
          style={[styles.locationInput, props.style, { marginTop: -spacing[7] }]} />
      </View>

    </View >
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  regText: {
    fontFamily: typography.primary,
    fontSize: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  locationInput: {
    flex: 1,
    backgroundColor: color.transparent
  },
  location: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  }

})