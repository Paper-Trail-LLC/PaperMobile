import * as React from "react"
import { View, ViewStyle, Image, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography, spacing } from "../../theme"
import { Text, Title, } from "react-native-paper"
import { Book } from "../../models/book/book"



export interface BookOverviewComponentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  book: Book
}

/**
 * Describe your component here
 */
export const BookOverviewComponent = observer(function BookOverviewComponent(props: BookOverviewComponentProps) {
  const { style, book } = props

  return (
    <View style={[styles.CONTAINER, style]}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: book.coverURI }} style={styles.bigImage}></Image>
      </View>
      <Title style={styles.titleText}>{book.title}</Title>
      <Text style={styles.TEXT}>{"Author: " + book.authors}</Text>
      <Text style={styles.TEXT}>{"Published on: " + book.releaseDate}</Text>
    </View>
  )
})
const styles = StyleSheet.create({
  CONTAINER: {
    flex: 1,
    flexDirection: 'column',
  },
  TEXT: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: color.primaryBlue,
  },
  imgContainer: {
    flex: 0.30
  },
  titleText: {
    // fontFamily: typography.primary,
    color: color.primaryBlue,
    // fontWeight: 'bold',
    // fontSize: 24,
    // marginBottom: 10
  },
  description: {
    fontFamily: typography.primary,
    color: color.primaryBlue,
    fontSize: 24,
    marginBottom: 10
  },
  bigImage: {
    alignSelf: 'center',
    marginBottom: spacing[5],
    width: 107,
    height: 165,
    padding: 10
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginVertical: spacing[5]
  },
  buttonText: {
    fontSize: 18,
  },
  blueButton: {
    margin: spacing[3],
    borderRadius: 13,
    paddingVertical: spacing[4],
    backgroundColor: color.primaryBlue
  },
  addToLibrary: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: color.warning
  },
  locateMeButtonStyle: {
    margin: spacing[3],
    borderRadius: 13,
    backgroundColor: color.warning
  },
  locationInput: {
    flex: 1,
    backgroundColor: color.transparent
  },
})