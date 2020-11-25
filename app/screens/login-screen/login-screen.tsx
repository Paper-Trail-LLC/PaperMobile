import React from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, Image, StatusBar, Alert } from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { Button, Text, TextInput, useTheme } from "react-native-paper"

const logo = require("../../../assets/splash.png");

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const { dark, colors } = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  var error = '';

  return (
    <View style={styles.full}>
      <StatusBar translucent={true} />
      <Screen style={styles.screen} preset="fixed" backgroundColor={color.transparent}>
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.image} />
        </View>
        <View style={styles.loginForm}>
          <Text style={{ fontSize: 44, fontWeight: '600', alignSelf: 'center' }}>Login</Text>
          <Text style={{color: 'red', alignSelf: 'center'}}>{error}</Text> 
          <TextInput value={email} label={'email'} mode={'outlined'} autoCapitalize={'none'} onChangeText={text => setEmail(text)} style={{ marginVertical: spacing[3] }} />
          <TextInput value={password} label={'password'} mode={'outlined'} autoCapitalize={'none'} secureTextEntry={true} onChangeText={pass => setPassword(pass)} style={{ marginVertical: spacing[3] }} />
          <View style={styles.buttonContainer}>
            <Button onPress={() => Alert.alert('sign in')} style={{ marginVertical: spacing[5], borderColor: colors.text, borderWidth: 1 }} mode={'outlined'}>Sign In</Button>
          </View>
          <Text style={{alignSelf: 'center'}}>Not registered yet?</Text>
          <View style={styles.buttonContainer}>
            <Button onPress={() => Alert.alert('sign up')} mode={'text'}>Sign Up</Button>
          </View>
        </View>
      </Screen>
    </View>
  )
})

const styles = StyleSheet.create({
  full: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'space-around',
  },
  screen: {
    flex: 1,
    // backgroundColor: 'black',
    padding: spacing[2]
  },
  imageContainer: {
    flex: 0.32,
    alignSelf: 'center'
  },
  loginForm: {
    flex: 0.68
  },
  image: { //Didn't work with flex!
    height: '100%',
    resizeMode: 'contain'
  },
  buttonContainer: { //Using flex causes text to disappear when interacting with one of the text fields
    // flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
