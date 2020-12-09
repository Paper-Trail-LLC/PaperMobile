import * as React from "react"
import { View, ViewStyle, StyleSheet, Keyboard } from "react-native"
import { observer } from "mobx-react-lite"
import { typography, spacing } from "../../theme"
import { TextInput, useTheme } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native"
import { BookStore } from "../../models";

export interface SearchBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  bookStore: BookStore
}

/**
 * Describe your component here
 */
export const SearchBar = observer(function SearchBar(props: SearchBarProps) {
  const { style } = props
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goToScanScreen = () => {
    navigation.navigate("scan");
  };
  const searchBook= () => {
    navigation.navigate("search")
  }


  return (
    <View style={styles.container}>
    <TextInput
      left={<TextInput.Icon name="magnify" color={colors.primary}/>}
      right={<TextInput.Icon name="barcode-scan" color={colors.primary}
        onPress={() => {
          goToScanScreen();
          Keyboard.dismiss();
        }} />}
      label="Search Book"
      onSubmitEditing={searchBook}
      // value={searchQuery}
      // onChangeText={onChangeSearch }
      mode="outlined"
      showSoftInputOnFocus={true}
      focusable={true}
      style={styles.search} />
  </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'stretch',
  },
  search: {
    flex: 1,
    // backgroundColor: color.transparent,
    // color: color.primaryBlue
  },
});