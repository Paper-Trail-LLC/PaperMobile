import * as React from "react"
import { Alert, Image, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { TouchableOpacity } from "react-native"
import { Text } from "react-native-paper"
import { spacing } from "../../theme"
import { BorrowAgreement, PurchaseAgreement } from "../../models"

export interface AgreementHistoryItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  request: PurchaseAgreement | BorrowAgreement

}

/**
 * Describe your component here
 */
export const AgreementHistoryItem = observer(function AgreementHistoryItem(props: AgreementHistoryItemProps) {
  const { style, request } = props;

  function instanceOfPurchaseAgreement(object: any): object is PurchaseAgreement {
    return 'cost' in object;
  }

  // function instanceOfBorrowAgreement(object: any): object is BorrowAgreement {
  //   return 'returnDate' in object;
  // }

  const reqType = (instanceOfPurchaseAgreement(request)) ? 'purchase' : 'borrow';

  //Check which is the other user in the transaction
  var otherUser = 'Jane Doe';

  var backgroundColor = '#c92ca2';
  
  //purchased from, sold to, borrowed from, or lent to
  var transactionType = 'lent to:';
  // if (request.agreement.requester.email !== session.user.email) {
  //   if(instanceOfPurchaseAgreement(request)) {
  //     backgroundColor = instanceOfPurchaseAgreement(request) ? '#12a314' : '#c92ca2';
  //     otherUser = request.agreement.requester.firstName + ' ' + request.agreement.requester.lastName;
  //     transactionType = instanceOfPurchaseAgreement(request) ? 'sold to:' : 'lent to:';
  //   }
  // }
  // else {
  //   backgroundColor = instanceOfPurchaseAgreement(request) ? '#de8d00' : '#4600de';
  //   otherUser = request.agreement.userBook.owner.firstName + ' ' + request.agreement.userBook.owner.lastName;
  //   transactionType = instanceOfPurchaseAgreement(request) ? 'purchased from' : 'borrowed from';
  // }

  

  return (
    <TouchableOpacity onPress={() => {Alert.alert(reqType + ' agreement pressed')}} style={[styles.container, {backgroundColor: backgroundColor},style]}>
      <Image source={{ uri: 'https://place-hold.it/90x160/FF00FF.png&text=Book' }} style={styles.image}></Image>
      <View style={styles.text}>
        <Text style={{color: 'white'}}>{transactionType}</Text>
        <Text style={{color: 'white'}}>{otherUser}</Text>
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