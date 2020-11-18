import * as React from "react"
import { Alert, StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing, typography } from "../../theme"
import { NearbyListingItemProps } from "./nearby-listing-item.props"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import {Text, Button, useTheme, Headline, Subheading, Chip} from 'react-native-paper';
import { propOr, propSatisfies } from "ramda"
// import { useNavigation } from "@react-navigation/native"

/**
 * Describe your component here
 */
export const NearbyListingItem = observer(function NearbyListingItem(props: NearbyListingItemProps) {
  const { style } = props
  const { colors } = useTheme();
  // const navigation = useNavigation()

  var ratingColor: string = '';
  var transactions: string = '';

  if (props.ownerRating <= 1.3) {
    ratingColor = 'red';
  }
  else if (props.ownerRating > 1.3 && props.ownerRating <= 2.5) {
    ratingColor = 'orange';
  }
  else if (props.ownerRating > 2.5 && props.ownerRating <= 3.6) {
    ratingColor = '#f7df00';
  }
  else if (props.ownerRating > 3.6 && props.ownerRating <= 4.5) {
    ratingColor = 'green';
  }
  else {
    ratingColor = 'blue';
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => { Alert.alert('owner profile pressed!') }} style={styles.ownerInfoColumn}>
        <Text>{'Owner: ' + props.owner}</Text>
        <View style={styles.row}>
          <MaterialCommunityIcons name={'star'} color={'orange'} size={24}></MaterialCommunityIcons>
          <Text style={[{color: ratingColor}]}>{props.ownerRating + '/5'}</Text>
        </View>
        <View style={[styles.row]}>
          <Chip icon="bank-transfer-out" mode={props.lending?'flat':'outlined'} selected={props.lending}  disabled={!props.lending}>Lending</Chip>
          <Chip icon="currency-usd" mode={props.selling?'flat':'outlined'} selected={props.selling}   disabled={!props.selling}>Selling</Chip>
        </View>
      </TouchableOpacity>
      <View style={styles.secondColumn}>
        <View style={[styles.row]}>
          <Text>{props.distance + ' km away'}</Text>
        </View>
        <Button mode={'contained'} onPress={() => { Alert.alert("request book pressed!") }}>Request Book</Button>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  ownerInfoColumn: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondColumn: {
    alignItems: 'center',
    justifyContent: 'center'
  },
})