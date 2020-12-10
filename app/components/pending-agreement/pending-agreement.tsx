import * as React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { TouchableOpacity } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { spacing } from "../../theme"
import { BookPetition, BorrowAgreement, MeetingAgreement, PurchaseAgreement, useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"

export interface PendingAgreementProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  request: PurchaseAgreement | BorrowAgreement | BookPetition | MeetingAgreement

}

/**
 * Describe your component here
 */
export const PendingAgreement = observer(function PendingAgreement(props: PendingAgreementProps) {
  const { style, request } = props;

  const { dark } = useTheme();

  const { authStore, bookPetitionStore, transactionStore } = useStores();

  const navigation = useNavigation();

  const _goToNextScreen = () => {
    if(instanceOfBookPetition(request)) {
      bookPetitionStore.setSelection(request.id);
      navigation.navigate('book-petition');
    }
    else if(instanceOfPurchaseAgreement(request)) {
      transactionStore.setPurchaseChoice(request.agreement.id);
      navigation.navigate('book-petition');
    }
    else if(instanceOfMeetingAgreement(request)) {

    }
  }

  function instanceOfPurchaseAgreement(object: any): object is PurchaseAgreement {
    return 'cost' in object;
  }

  function instanceOfBorrowAgreement(object: any): object is BorrowAgreement {
    return 'returnDate' in object;
  }

  function instanceOfBookPetition(object: any): object is BookPetition {
    return 'buying' in object;
  }

  function instanceOfMeetingAgreement(object: any): object is MeetingAgreement {
    return 'geolocation' in object;
  }

  const name = (instanceOfPurchaseAgreement(request) || (instanceOfBorrowAgreement(request))) ? 'Juan Del Pueblo' : instanceOfBookPetition(request) ? authStore.user.firstname + ' ' + authStore.user.lastname : 'Juana Del Valle';
  const reqType = (instanceOfPurchaseAgreement(request)) ? 'purchase' : (instanceOfBorrowAgreement(request)) ? 'borrow' : instanceOfBookPetition(request) ? 'petition' : 'meeting';

  return (
    <TouchableOpacity onPress={() => _goToNextScreen()} style={[styles.container, style]}>
      {/* <View style={{alignSelf: request.agreement.requester === session.user ? 'flex-end' : 'flex-start'}}> */}
        <Text style={{ color: (dark && reqType === 'purchase') ? 'black' : 'white' }}>{'by: ' + name}</Text>
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