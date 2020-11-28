import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, Picker, Platform, StyleSheet, View } from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { Appbar, useTheme, Subheading, Divider, Button } from "react-native-paper"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import MapView, { Marker, UrlTile } from "react-native-maps"
import DateTimePicker from '@react-native-community/datetimepicker';

const { colors } = useTheme();

export const MeetingAgreementScreen = observer(function MeetingAgreementScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const today = new Date();
  const originalLatDelta = 0.0922;
  today.setMonth(today.getMonth() + 1);
  const [expdate, setDate] = React.useState(today);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || today;
    setDate(currentDate);
  };

  const [locationPermission, askLocationPermission, getLocationPermission] = Permissions.usePermissions(Permissions.LOCATION, { ask: true });
  const [meetingLocation, setMeetingLocation] = React.useState('new location');
  const [place, setPlace] = React.useState('');

  const tileUrl = "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const [region, setRegion] = React.useState({
    latitude: 18.220833,
    longitude: -66.590149,
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
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      });
    }
  }

  // Pull in navigation via hook
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();

  return (
    <View style={styles.full}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={"Book Petition"} />
      </Appbar.Header>
      <Screen style={[styles.container, { backgroundColor: colors.background }]} preset="scroll" backgroundColor={colors.background}>
      <Subheading>Where?</Subheading>
        <Divider />
        <Picker
          selectedValue={meetingLocation}
          onValueChange={(itemValue: any, itemPosition: number) => {
            setMeetingLocation(itemValue);
          }}
          itemStyle={[styles.regText, {color:colors.text, height: 120}]}
        >
          <Picker.Item label={'New Location'} value={'new location'} />
          <Picker.Item label={'Your Saved Location'} value={'your saved location'} />
        </Picker>
        {meetingLocation === 'new location' &&
          <Button onPress={getLocation} mode={'contained'} icon={'crosshairs-gps'} style={{ alignSelf: 'center', justifyContent: 'center', margin: 10 }}>Locate me!</Button>
        }
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={region} provider={null} region={region}
            mapType={Platform.OS == "android" ? "none" : "standard"} rotateEnabled={false}>
            <UrlTile urlTemplate={tileUrl} maximumZ={19} />
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}></Marker>
          </MapView>
        </View>
        <Subheading>Place</Subheading>
        <Divider />
        <TextInput
          value={place}
          onChangeText={(text: string) => setPlace(text)}
          label={'Place'}
          focusable={true}
        />
        <Subheading>Expires in:</Subheading>
        <Divider />
        <DateTimePicker
          value={expdate}
          style={{ flex: 1 }}
          textColor={colors.text}
          mode={'datetime'}
          minimumDate={new Date()}
          display={'default'}
          onChange={onChange}
        ></DateTimePicker>
        <Button onPress={() => {Alert.alert('send agreement pressed!')}} style={[styles.blueButton, { marginBottom: spacing[4] }]} color={'white'}>send meeting agreement</Button>
        <Button onPress={() => {Alert.alert('edit pressed!')}} style={[styles.blueButton, { marginBottom: spacing[4] }]} color={'white'}>edit</Button>
        <Button onPress={() => {Alert.alert('accept pressed!')}} style={[styles.blueButton, { marginBottom: spacing[4] }]} color={'white'}>agree</Button>
        <Button onPress={() => {Alert.alert('decline pressed!')}} style={[styles.blueButton, { marginBottom: spacing[4] }]} color={'white'}>decline</Button>
      </Screen>
    </View>
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
  blueButton: {
    margin: spacing[3],
    borderRadius: 13,
    paddingVertical: spacing[4],
    backgroundColor: color.primaryBlue,
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
  },
  regText: {
    fontSize: 20
  },
  mapContainer: {
    flexDirection: 'column',
    height: 200,
  },
  map: {
    flex: 1,
  }
})