import * as React from "react"
import { Picker, StyleSheet, View, CheckBox } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../"
import { MyBookDetailProps } from "./my-book-details.props"
// import { Checkbox } from "react-native-paper"

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: color.background,
    paddingHorizontal: spacing[4]
  },
  regText: {
    fontFamily: typography.primary,
    fontSize: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginVertical: spacing[2]
  },
  item: {
    padding: spacing[3],
    width: '50%'
  },
})

/**
 * Describe your component here
 */
export const MyBookDetails = observer(function MyBookDetails(props: MyBookDetailProps) {
  const { style } = props
  const [selectedValue, setSelectedValue] = React.useState('available');
  const [selectedSelling, setSelling] = React.useState(false);
  const [selectedLending, setLending] = React.useState(false);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text text={'status:'} style={[styles.regText, props.style]}>Hello</Text>
        </View>
        <View style={styles.item}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue: any, itemPosition: number) => {
              setSelectedValue(itemValue);
            }}
            itemStyle={props.style}
          >
            <Picker.Item label={'available'} value={'available'} />
            <Picker.Item label={'unavailable'} value={'unavailable'} />
          </Picker>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Text style={[styles.regText, props.style]} text={'for selling'}></Text>
            <View style={styles.item}>
              <CheckBox
                value={selectedSelling}
                onValueChange={() => {
                  setSelling(!selectedSelling);
                  console.log(selectedSelling);
                }}
                style={[{ width: 24, height: 24, zIndex: 1, marginLeft: spacing[2] }, props.style]}
              />
            </View>
            <Text style={[styles.regText, props.style]} text={'for lending'}></Text>
            <View style={styles.item}>
              <CheckBox
                value={selectedLending}
                onValueChange={() => {
                  setLending(!selectedLending);
                  console.log(selectedLending);
                }}
                style={[{ width: 24, height: 24, zIndex: 1, marginLeft: spacing[2] }, props.style]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
})
