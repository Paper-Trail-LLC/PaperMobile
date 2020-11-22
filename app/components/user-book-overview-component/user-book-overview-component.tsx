import * as React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { UserBook } from "../../models"
import { useTheme, Text, Divider, Subheading, Title } from "react-native-paper"

export interface UserBookOverviewComponentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  userBook: UserBook
}

/**
 * Describe your component here
 */
export const UserBookOverviewComponent = observer(function UserBookOverviewComponent(props: UserBookOverviewComponentProps) {
  const { style, userBook } = props;
  const { colors } = useTheme();

  return (
    <View style={[styles.CONTAINER, style]}>
      <Text>{'Owner: ' + userBook.owner.firstName + ' ' + userBook.owner.lastName + ', ' + userBook.owner.gender}</Text>
      <Divider />
      <Subheading>Status:</Subheading>
      <Title>{userBook.status}</Title>
    </View>
  )
})

const styles = StyleSheet.create({
  CONTAINER: {
    // flex: 0.45,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }
})
