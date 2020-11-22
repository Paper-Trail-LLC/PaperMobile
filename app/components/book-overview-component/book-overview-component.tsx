import * as React from "react"
import { View, ViewStyle, Image, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography, spacing } from "../../theme"
import { Text, Title, Paragraph, Subheading } from "react-native-paper"
import { Book } from "../../models/book/book"
import { useTheme } from 'react-native-paper'
/**
 *
 *
 * @enum {number}
 */
enum BookInfo {
  'title',
  'author',
  'releaseDate',
  'synopsis'
}

export interface BookOverviewComponentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  book: Book
  /**
   * 0=title;
   * 1=author;
   * 2=releaseDate;
   * 3=synopsis;
   * @type {BookInfo[]}
   * @memberof BookOverviewComponentProps
   */
  exclude?: BookInfo[]
}

/**
 * Describe your component here
 */
export const BookOverviewComponent = observer(function BookOverviewComponent(props: BookOverviewComponentProps) {
  const { style, book, exclude } = props
  const { colors } = useTheme();

  let excluding: BookInfo[];
  exclude ? excluding = exclude : excluding = [];

  return (
    <View style={[styles.CONTAINER, style]}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: book.coverURI }} style={styles.bigImage} resizeMode={'contain'}></Image>
      </View>
      {!excluding.includes(BookInfo.title) && <Title style={{ color: colors.primary }}>{book.title}</Title>}
      {!excluding.includes(BookInfo.author) && <Text>{'Author' + (book.authors.length > 1 ? 's' : '') + ': ' + book.authors}</Text>}
      {!excluding.includes(BookInfo.releaseDate) && <Text>{"Published on: " + book.releaseDate.toLocaleDateString()}</Text>}
      {!excluding.includes(BookInfo.synopsis) && <Subheading>Synopsis:</Subheading>}
      {!excluding.includes(BookInfo.synopsis) && <Paragraph>{book.synopsis === '' ? 'Not found.' : book.synopsis}</Paragraph>}
    </View>
  )
})
const styles = StyleSheet.create({
  CONTAINER: {
    flex: 0.45,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bigImage: {
    flex: 0.4,
  }
})