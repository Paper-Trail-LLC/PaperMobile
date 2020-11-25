import * as React from "react"
import { Alert, Image, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { TouchableOpacity } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { spacing } from "../../theme"
import { BorrowAgreement, PurchaseAgreement } from "../../models"

export interface PendingAgreementProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  request: PurchaseAgreement | BorrowAgreement

}

/**
 * Describe your component here
 */
export const PendingAgreement = observer(function PendingAgreement(props: PendingAgreementProps) {
  const { style, request } = props;

  const { dark } = useTheme();

  function instanceOfPurchaseAgreement(object: any): object is PurchaseAgreement {
    return 'cost' in object;
  }

  function instanceOfBorrowAgreement(object: any): object is BorrowAgreement {
    return 'returnDate' in object;
  }

  const reqType = (instanceOfPurchaseAgreement(request)) ? 'purchase' : 'borrow';

  return (
    <TouchableOpacity onPress={() => {Alert.alert(reqType + ' agreement pressed')}} style={[styles.container, style]}>
      <Image source={{ uri: 'https://place-hold.it/90x160/FF00FF.png&text=Book' }} style={styles.image}></Image>
      <View style={styles.text}>
        <Text style={{color: (dark && reqType === 'purchase') ? 'black' : 'white'}}>{'by: ' + request.agreement.requester.firstName + ' ' + request.agreement.requester.lastName}</Text>
        <Text style={{color: (dark && reqType === 'purchase') ? 'black' : 'white'}}>{'to: ' + reqType}</Text>
      </View>

    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    height: 200,
    margin: spacing[2],
    padding: spacing[2],
    width: 150
  },
  image: {
    flex: 1,
    margin: spacing[1],
    width: '63%',
    alignSelf: 'center'
  },
  text: {
    alignItems: 'center'
  }
})