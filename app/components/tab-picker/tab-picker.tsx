import * as React from "react"
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "../../theme"
import { Text } from "../"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "react-native-paper"

export interface TabPickerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle,

  selection: string,

  selectionToggle: Function,

  isOtherUserProfile: boolean,
}

/**
 * Describe your component here
 */
export const TabPicker = observer(function TabPicker(props: TabPickerProps) {
  const { selection, selectionToggle, isOtherUserProfile } = props

  const { colors } = useTheme()

  return (
    <View style={styles.tabs}>
      {isOtherUserProfile &&
        <TouchableOpacity disabled={selection === 'books'} style={[styles.tab, { backgroundColor: selection === 'books' ? 'rgba(128, 128, 128, 0.25)' : colors.background }]} onPress={() => selectionToggle('books')}>
          <MaterialCommunityIcons color={colors.text} name={'book-multiple'} size={24}></MaterialCommunityIcons>
          <Text>Books</Text>
        </TouchableOpacity>
      }
      {!isOtherUserProfile &&
        <TouchableOpacity disabled={selection === 'requests'} style={[styles.tab, { backgroundColor: selection === 'requests' ? 'rgba(128, 128, 128, 0.25)' : colors.background }]} onPress={() => selectionToggle('requests')}>
          <MaterialCommunityIcons color={colors.text} name={'timeline-text'} size={24}></MaterialCommunityIcons>
          <Text>Requests</Text>
        </TouchableOpacity>
      }
      {!isOtherUserProfile &&
        <TouchableOpacity disabled={selection === 'history'} style={[styles.tab, { backgroundColor: selection === 'history' ? 'rgba(128, 128, 128, 0.25)' : colors.background }]} onPress={() => selectionToggle('history')}>
          <MaterialCommunityIcons color={colors.text} name={'history'} size={24}></MaterialCommunityIcons>
          <Text>History</Text>
        </TouchableOpacity>
      }
      {!isOtherUserProfile &&
        <TouchableOpacity disabled={selection === 'upcoming'} style={[styles.tab, { backgroundColor: selection === 'upcoming' ? 'rgba(128, 128, 128, 0.25)' : colors.background }]} onPress={() => selectionToggle('upcoming')}>
          <MaterialCommunityIcons color={colors.text} name={'map-marker-alert'} size={24}></MaterialCommunityIcons>
          <Text>Meetings</Text>
        </TouchableOpacity>
      }
    </View>
  )
})

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: spacing[2],
    marginTop: spacing[4]
  },
  tab: {
    width: '33%',
    padding: spacing[2],
    alignItems: 'center',
  }
})