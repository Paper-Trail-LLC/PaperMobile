import * as React from "react"
import { View, StyleSheet, ViewStyle, FlatList, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text, Title, TouchableRipple, useTheme, Surface } from "react-native-paper"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"


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
  const { bookStore } = useStores()
  const { colors, dark } = useTheme();
  const navigation = useNavigation()
  // bookStore.clear();
  bookStore.addBook(
    {
      id: '1',
      coverURI: 'https://place-hold.it/90x160/FF00FF.png&text=coverI',
      title: 'La prueba más grande',
      authors: ['Gabriel Huertas'],
      releaseDate: Date.now(),
      isbn: '1234543210',
      isbn13: '12345654321013',
      edition: '1st',
      synopsis: 'Ain\'t nobody going to read this'
    }
  )
  bookStore.addBook(
    {
      id: '3',
      coverURI: 'https://place-hold.it/90x160/FF00FF.png&text=coverIII',
      title: 'La prueba más grande III',
      authors: ['Gabriel Huertas'],
      releaseDate: Date.now(),
      isbn: '54321234510',
      isbn13: '65432123456013',
      edition: '1st',
      synopsis: 'Ain\'t nobody going to read this^2'
    }
  )

  bookStore.addBook(
    {
      id: '2',
      coverURI: 'https://place-hold.it/90x160/FF00FF.png&text=coverII',
      title: 'La prueba más grande II',
      authors: ['Gabriel Huertas'],
      releaseDate: Date.now(),
      isbn: '98765234510',
      isbn13: '76543223456013',
      edition: '1st',
      synopsis: 'Ain\'t nobody going to read this^2'
    }
  )

  bookStore.addBook(
    {
      id: '4',
      coverURI: 'https://place-hold.it/90x160/FF00FF.png&text=coverIV',
      title: 'La prueba más grande IV',
      authors: ['Gabriel Huertas'],
      releaseDate: Date.now(),
      isbn: '54321298765',
      isbn13: '65456789056013',
      edition: '1st',
      synopsis: 'Ain\'t nobody going to read this^2'
    }
  )

  const Item = ({ item, onPress, style }) => (
    <Surface style={[styles.surface, styles.item, style]}>
      <TouchableRipple onPress={onPress}>
        <Image resizeMode={'contain'} source={{uri:item.coverURI}} style={{ padding: spacing[4], width: 90, height: 160 }} />
        {/* <Text>Hello</Text> */}
      </TouchableRipple>
    </Surface>
  );

  const renderItem = ({ item }) => {
    const surfaceH = item.isbn13 === bookStore.choice ? 6 : 2;
    return (
      <Item
        item={item}
        onPress={() => {
          bookStore.setChoice(item.isbn13);
          navigation.navigate("detail");
        }}
        style={{ elevation: surfaceH }}
      />
    );
  };

  return (
    <View style={[styles.CONTAINER, style]}>
      <Title>Nearby Listings</Title>
      {/* <View> */}
      <FlatList
        data={bookStore.books}
        renderItem={renderItem}
        keyExtractor={(item) => item.isbn13}
        extraData={bookStore.choice}
        horizontal={true}
      />
      {/* </View> */}
      <Title>Just for you</Title>
      <FlatList
        data={bookStore.books}
        renderItem={renderItem}
        keyExtractor={(item) => item.isbn13}
        extraData={bookStore.choice}
        horizontal={true}
      />
      <Title>Popular in your area</Title>
      <FlatList
        data={bookStore.books}
        renderItem={renderItem}
        keyExtractor={(item) => item.isbn13}
        extraData={bookStore.choice}
        horizontal={true}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  CONTAINER: {
    // flex: 1,
    padding: spacing[2],
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  scrollContainer: {
    flexDirection: 'row'
  },
  TEXT: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: color.primaryBlue,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  surface: {
    flexDirection: 'column',
    height: 160,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  }
});