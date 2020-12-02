import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, Platform, StyleSheet, View } from "react-native"
import { BookOverviewComponent, Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { Appbar, Divider, Subheading, Title, useTheme, Text, Button } from "react-native-paper"
import MapView, { Marker, UrlTile } from "react-native-maps"

export const MeetingDetailsScreen = observer(function MeetingDetailsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  const { colors } = useTheme();

  const tileUrl = "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const [region, setRegion] = React.useState({
    latitude: 18.220833,
    longitude: -66.590149,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Pull in navigation via hook
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();

  return (
    <View style={styles.full}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={"Upcoming Meeting Details"} />
      </Appbar.Header>
      <Screen style={[styles.container, { backgroundColor: colors.background }]} preset="scroll" backgroundColor={colors.background}>
        <BookOverviewComponent exclude={[1, 2, 3]} book={}></BookOverviewComponent>
        <Divider />
        <Subheading>Meeting with:</Subheading>
        <Title>{ }</Title>
        <Divider />
        <Subheading>Location:</Subheading>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={region} provider={null} region={region}
            mapType={Platform.OS == "android" ? "none" : "standard"} rotateEnabled={false}>
            <UrlTile urlTemplate={tileUrl} maximumZ={19} />
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}></Marker>
          </MapView>
        </View>
        <Text>{'Place: ' }</Text>
        <Text>{'When: ' }</Text>
        <Divider />
        <Button onPress={() => {Alert.alert('accept pressed!')}} style={[styles.blueButton, { marginBottom: spacing[4] }]} color={'white'}>Confirm Transaction</Button>
        <Button onPress={() => {Alert.alert('decline pressed!')}} style={[styles.redButton, { marginBottom: spacing[4] }]} color={'white'}>Cancel Meeting</Button>
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
  redButton: {
    margin: spacing[3],
    borderRadius: 13,
    paddingVertical: spacing[4],
    backgroundColor: 'red',
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