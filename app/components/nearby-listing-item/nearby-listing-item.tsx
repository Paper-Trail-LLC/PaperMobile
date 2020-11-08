import * as React from "react"
import { Alert, StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing, typography } from "../../theme"
import { Text } from "../"
import { NearbyListingItemProps } from "./nearby-listing-item.props"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Button } from "../../components"
import { TouchableOpacity } from "react-native-gesture-handler"
// import { useNavigation } from "@react-navigation/native"

/**
 * Describe your component here
 */
export const NearbyListingItem = observer(function NearbyListingItem(props: NearbyListingItemProps) {
  const { style } = props

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

  if (props.selling && props.lending) {
    transactions = 'lending, selling';
  }
  else if (props.selling) {
    transactions = 'selling';
  }
  else if (props.lending) {
    transactions = 'lending';
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => { Alert.alert('owner profile pressed!') }} style={styles.ownerInfoColumn}>
        <Text style={styles.bigBoldText}>{'owner: ' + props.owner}</Text>
        <View style={styles.row}>
          <MaterialCommunityIcons name={'star'} color={'orange'} size={24}></MaterialCommunityIcons>
          <Text style={[styles.boldText, {color: ratingColor}]}>{props.ownerRating + '/5'}</Text>
        </View>
        <Text style={[styles.thinText, {marginBottom: spacing[3]}]}>{transactions}</Text>
      </TouchableOpacity>
      <View style={styles.secondColumn}>
        <View style={[styles.row, {marginBottom: -spacing[3]}]}>
          <Text style={[styles.boldText, { color: '#390099' }]}>{props.distance}</Text>
          <Text style={styles.regText}>{' km away'}</Text>
        </View>
        <Button onPress={() => { Alert.alert("request book pressed!") }} style={styles.buttonStyle} textStyle={styles.buttonText} text={'request book'}></Button>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // flexWrap: "wrap",
    alignItems: "center",
    padding: 5
  },
  row: {
    flexDirection: "row"
  },
  regText: {
    fontFamily: typography.primary,
    color: "#390099",
    fontSize: 20
  },
  thinText: {
    fontFamily: typography.primary,
    color: "#390099",
    fontWeight: '200',
    fontSize: 20
  },
  bigBoldText: {
    fontFamily: typography.primary,
    color: "#390099",
    fontWeight: "bold",
    fontSize: 24
  },
  boldText: {
    fontFamily: typography.primary,
    fontWeight: "bold",
    fontSize: 24
  },
  ownerInfoColumn: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondColumn: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: '#43D000',
    paddingVertical: -5
  },
  buttonText: {
    fontSize: 18,
    marginVertical: spacing[3],
    marginHorizontal: -5
  },
})