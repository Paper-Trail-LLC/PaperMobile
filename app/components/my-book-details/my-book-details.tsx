import * as React from "react"
import { Picker, StyleSheet, View, Switch, Alert } from "react-native"
import { Button } from "../../components"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../"
import { MyBookDetailProps } from "./my-book-details.props"
import { TextInput } from 'react-native-paper'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { useStores } from "../../models"

export const MyBookDetails = observer(function MyBookDetails(props: MyBookDetailProps) {
  const { style } = props
  const [selectedValue, setSelectedValue] = React.useState('available');
  const [selectedSelling, setSelling] = React.useState(false);
  const [selectedLending, setLending] = React.useState(false);
  const [locationPermission, askLocationPermission, getLocationPermission] = Permissions.usePermissions(Permissions.LOCATION, {ask: true});
  const [location, setLocation] = React.useState(null);

  const myBookDetails = useStores().userBookStore;

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
      myBookDetails.setLocation(location.coords.latitude, location.coords.longitude);
    }
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text text={'status:'} style={[styles.regText, props.style]}></Text>
        </View>
        <View style={styles.item}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue: any, itemPosition: number) => {
              setSelectedValue(itemValue);
              myBookDetails.setStatus(itemValue);
            }}
            itemStyle={props.style}
          >
            <Picker.Item label={'available'} value={'available'} />
            <Picker.Item label={'unavailable'} value={'unavailable'} />
          </Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Text style={[styles.regText, props.style]} text={'for selling'}></Text>
            <View style={styles.item}>
              <Switch
                value={selectedSelling}
                onValueChange={() => {
                  setSelling(!selectedSelling);
                  myBookDetails.setSelling(!selectedSelling);
                }}
              />
            </View>
            <Text style={[styles.regText, props.style]} text={'for lending'}></Text>
            <View style={styles.item}>
              <Switch
                value={selectedLending}
                onValueChange={() => {
                  setLending(!selectedLending);
                  myBookDetails.setLending(!selectedLending);
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <Text text={'location:'} style={[styles.regText, props.style, { marginLeft: spacing[3] }]}></Text>
        <Button onPress={getLocation} text={'locate me!'} style={styles.locateMeButtonStyle} textStyle={styles.buttonText}></Button>
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

    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: color.background,
  },
  regText: {
    fontFamily: typography.primary,
    fontSize: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginVertical: spacing[2]
  },
  item: {
    padding: spacing[3],
    width: '50%'
  },
  buttonText: {
    fontSize: 18
  },
  locateMeButtonStyle: {
    height: spacing[4],
    borderRadius: 13,
    backgroundColor: color.warning
  },
  addImageButtonStyle: {
    borderRadius: 13,
    backgroundColor: color.primaryBlue
  },
  locationInput: {
    flex: 1,
    backgroundColor: color.transparent
  },

})