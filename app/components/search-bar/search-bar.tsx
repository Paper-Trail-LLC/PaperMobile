import * as React from "react"
import { TextStyle, View, ViewStyle, StyleSheet, Keyboard } from "react-native"
import { color, typography, spacing } from "../../theme"
import { TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native"

export interface SearchBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export function SearchBar(props: SearchBarProps) {
  const { style } = props
  let searchQuery = '';
  let setSearchQuery = function (query: string) {
    // Alert.alert(query);
  }
  
  const onChangeSearch = query => setSearchQuery(query);

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goToScanScreen = () => {
    navigation.navigate("scan");
  };
  return (
    <View style={styles.container}>
    <TextInput
      left={<TextInput.Icon name="magnify" color={color.primaryBlue} />}
      right={<TextInput.Icon name="barcode-scan" color={color.primaryBlue}
        onPress={() => {
          goToScanScreen();
          Keyboard.dismiss();
        }} />}
      label="Search Book"
      // value={searchQuery}
      // onChangeText={onChangeSearch}
      mode="outlined"
      showSoftInputOnFocus={true}
      focusable={true}
      style={styles.search} />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'stretch',
    padding: spacing[2]
  },
  search: {
    flex: 1,
    // backgroundColor: color.transparent,
    color: color.primaryBlue
  },
});