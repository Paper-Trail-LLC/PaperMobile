import * as React from "react"
import { Alert, Image, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { TouchableOpacity } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { spacing } from "../../theme"
import { BorrowAgreement, BorrowMeeting, PurchaseAgreement, PurchaseMeeting } from "../../models"

export interface UpcomingMeetingItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  meeting: BorrowMeeting | PurchaseMeeting

}

/**
 * Describe your component here
 */
export const UpcomingMeetingItem = observer(function UpcomingMeetingItem(props: UpcomingMeetingItemProps) {
  const { style, meeting } = props;

  const { dark } = useTheme();

  function instanceOfPurchaseAgreement(object: any): object is PurchaseMeeting {
    return 'meetingAreement' in object;
  }

  // function instanceOfBorrowAgreement(object: any): object is BorrowMeeting {
  //   return 'borrowAgreement' in object;
  // }

  const reqType = (instanceOfPurchaseAgreement(meeting)) ? 'purchase' : 'borrow';
  var fullName: string = '';
  if(instanceOfPurchaseAgreement(meeting)) {
    fullName = meeting.purchaseRequest.agreement.requester.firstName + ' ' + meeting.purchaseRequest.agreement.requester.lastName;
  }
  else {
    fullName = meeting.borrowRequest.agreement.requester.firstName + ' ' + meeting.borrowRequest.agreement.requester.lastName;

  }

  return (
    <TouchableOpacity onPress={() => {Alert.alert(reqType + ' agreement pressed')}} style={[styles.container, style]}>
      <Image source={{ uri: 'https://place-hold.it/90x160/FF00FF.png&text=Book' }} style={styles.image}></Image>
      <View style={styles.text}>
        <Text style={{color: (dark && reqType === 'purchase') ? 'black' : 'white'}}>{'meeting with: ' + fullName}</Text>
        <Text style={{color: (dark && reqType === 'purchase') ? 'black' : 'white'}}>{meeting.meetingAreement.timestamp}</Text>
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