import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { useTheme } from 'react-native-paper';
const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const { colors, dark } = useTheme();
  const insets = useSafeArea()
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {backgroundColor: colors.background}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  const statusBarStyle = props.statusBar? props.statusBar : dark? 'light-content' : 'dark-content'

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={statusBarStyle} />
      <View style={[preset.inner, style, insetStyle, backgroundStyle]}>{props.children}</View> 
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const { colors, dark } = useTheme();
  // const insets = useSafeArea()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {backgroundColor: colors.background}
  // const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  const statusBarStyle = props.statusBar? props.statusBar : dark? 'light-content' : 'dark-content'

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={statusBarStyle} />
      <View style={[preset.outer, backgroundStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style, backgroundStyle]}
        >
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {

  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
