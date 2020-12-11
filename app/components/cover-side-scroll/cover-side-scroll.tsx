import * as React from "react"
import { View, StyleSheet, ViewStyle, FlatList, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text, Title, TouchableRipple, useTheme, Surface } from "react-native-paper"
import { BookStore } from "../../models"
import { useNavigation } from "@react-navigation/native"


export interface CoverSideScrollProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  bookStore: BookStore
}


/**
 * Describe your component here
 */
export const CoverSideScroll = observer(function CoverSideScroll(props: CoverSideScrollProps) {
  const { style, bookStore } = props
  const { colors, dark } = useTheme();
  const navigation = useNavigation()

  if(!bookStore.areSugestionsLoaded()){
    bookStore.loadSuggestions();
  }

  // bookStore.clear();
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
        data={bookStore.nearbyBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.isbn13}
        extraData={bookStore.choice}
        horizontal={true}
      />
      {/* </View> */}
      <Title>Just for you</Title>
      <FlatList
        data={bookStore.forMeBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.isbn13}
        extraData={bookStore.choice}
        horizontal={true}
      />
      <Title>Popular in your area</Title>
      <FlatList
        data={bookStore.popularBooks}
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