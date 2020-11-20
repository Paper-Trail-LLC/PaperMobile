import * as React from "react"
import { Image, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { UserBook } from "../../models"
import { Title, useTheme } from "react-native-paper"

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
      <View style={styles.imgContainer}>
        <Image source={{ uri: userBook.book.coverURI }} style={styles.bigImage} resizeMode={'contain'}></Image>
      </View>
      <Title style={{ color: colors.primary }}>{userBook.book.title}</Title>
        <Text>{'Owner: ' + userBook.owner.firstName + ' ' + userBook.owner.lastName + ', ' + userBook.owner.gender}</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  CONTAINER: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  imgContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bigImage: {
    flex: 0.4,
  }
})
