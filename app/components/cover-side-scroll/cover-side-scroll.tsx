import * as React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text, Title } from "react-native-paper"


export interface CoverSideScrollProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export const CoverSideScroll = observer(function CoverSideScroll(props: CoverSideScrollProps) {
  const { style } = props

  return (
    <View style={[styles.CONTAINER, style]}>
      <Title>Nearby Listings</Title>

      <Title>Just for you</Title>

      <Title>Popular in your area</Title>
    </View>
  )
})

const styles = StyleSheet.create( {
  CONTAINER: {
    flex: 1,
    padding: spacing[2],
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  },
  TEXT: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: color.primaryBlue,
  }
});