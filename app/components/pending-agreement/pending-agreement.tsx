import * as React from "react"
import { Alert, StyleSheet, View, ViewStyle } from "react-native"
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

  request: PurchaseAgreement | BorrowAgreement // | Offer | MeetingAgreement (not confirmed)

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
    <TouchableOpacity onPress={() => { Alert.alert(reqType + ' agreement pressed') }} style={[styles.container, style]}>
      {/* <View style={{alignSelf: request.agreement.requester === session.user ? 'flex-end' : 'flex-start'}}> */}
        <Text style={{ color: (dark && reqType === 'purchase') ? 'black' : 'white' }}>{'by: ' + request.agreement.requester.firstName + ' ' + request.agreement.requester.lastName}</Text>
        <Text style={{ color: (dark && reqType === 'purchase') ? 'black' : 'white' }}>{'to: ' + reqType}</Text>
      {/* </View> */}
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    minWidth: '50%',
    margin: spacing[2],
    padding: spacing[2],
  },
})