import * as React from "react"
import { TextStyle, View, ViewStyle, StyleSheet, Keyboard } from "react-native"
import { color, typography, spacing } from "../../theme"
import { TextInput, useTheme } from 'react-native-paper';
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
  const { colors } = useTheme();
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
      left={<TextInput.Icon name="magnify" color={colors.primary}/>}
      right={<TextInput.Icon name="barcode-scan" color={colors.primary}
        onPress={() => {
          goToScanScreen();
          Keyboard.dismiss();
        }} />}
      label="Search Book"
      // value={searchQuery}
      // onChangeText={onChangeSearch }
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
  },
  search: {
    flex: 1,
    // backgroundColor: color.transparent,
    // color: color.primaryBlue
  },
});