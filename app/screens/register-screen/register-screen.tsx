import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, Image, Picker, SafeAreaView, StatusBar, StyleSheet, View } from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { Button, TextInput, useTheme, Text } from "react-native-paper"

const logo = require("../../../assets/splash.png");

export const RegisterScreen = observer(function RegisterScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const { dark, colors } = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [gender, setGender] = React.useState('male');
  const [retypedPassword, setRetypedPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  var error = '';

  return (
    <SafeAreaView style={styles.full}>
      <StatusBar translucent={true} />
      <Screen style={styles.screen} preset="scroll" backgroundColor={color.transparent}>
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.image} />
        </View>
        <View style={styles.loginForm}>
          <Text style={{ fontSize: 44, fontWeight: '600', alignSelf: 'center' }}>Register</Text>
          <Text style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>
          <TextInput value={firstName} label={'first name'} mode={'outlined'} autoCapitalize={'none'} onChangeText={first => setFirstName(first)} style={{ marginVertical: spacing[2] }} />
          <TextInput value={lastName} label={'last name'} mode={'outlined'} autoCapitalize={'none'} secureTextEntry={true} onChangeText={last => setLastName(last)} style={{ marginVertical: spacing[2] }} />
          <View style={styles.row}>
            <Text style={{alignSelf: 'center'}}>gender: </Text>
            <Picker
              style={styles.picker}
              selectedValue={gender}
              onValueChange={(itemValue: any, itemPosition: number) => {
                setGender(itemValue);
              }}
              itemStyle={{ color: colors.text, height: 120 }}
            >
              <Picker.Item label={'male'} value={'male'} />
              <Picker.Item label={'female'} value={'female'} />
              <Picker.Item label={'non-binary'} value={'non-binary'} />
              <Picker.Item label={'other'} value={'other'} />
            </Picker>
          </View>
          <TextInput value={email} label={'email'} mode={'outlined'} autoCapitalize={'none'} onChangeText={text => setEmail(text)} style={{ marginVertical: spacing[2] }} />
          <TextInput value={password} label={'password'} mode={'outlined'} autoCapitalize={'none'} secureTextEntry={true} onChangeText={pass => setPassword(pass)} style={{ marginVertical: spacing[2] }} />
          <TextInput value={retypedPassword} label={'re-type password'} mode={'outlined'} autoCapitalize={'none'} secureTextEntry={true} onChangeText={pass => setRetypedPassword(pass)} style={{ marginVertical: spacing[2] }} />
          <View style={styles.buttonContainer}>
            <Button onPress={() => Alert.alert('sign in')} style={{ marginVertical: spacing[4], borderColor: colors.text, borderWidth: 1 }} mode={'outlined'}>Sign Up</Button>
          </View>
          <Text style={{ alignSelf: 'center' }}>Already have an account?</Text>
          <View style={styles.buttonContainer}>
            <Button onPress={() => Alert.alert('sign up')} mode={'text'}>Sign In</Button>
          </View>
        </View>
      </Screen>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
  },
  screen: {
    // flex: 1,
    padding: spacing[2]
  },
  imageContainer: {
    flex: 0.28,
    alignSelf: 'center',
    marginVertical: -spacing[6]
  },
  loginForm: {
    flex: 0.72
  },
  image: { //Didn't work with flex!
    height: 220,
    resizeMode: 'contain',
  },
  picker: {
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonContainer: { //Using flex causes text to disappear when interacting with one of the text fields
    // flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});