/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import { WelcomeScreen, DemoScreen } from "../screens"
import { SearchScreen } from "../screens/search-screen/search-screen"
import { BookDetailScreen } from "../screens"
import { MyLibraryScreen } from "../screens/my-library-screen/my-library-screen"
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons}  from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomNavigation, Text } from 'react-native-paper';
import { color } from "../theme";
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  search: undefined
  detail: undefined
  my_library: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()
// const Tab = createMaterialBottomTabNavigator({
//   Search: { screen: BookSearchTab },
//   Library: { screen: MyLibraryTab }
// }, {
//   initialRouteName: "Search",
//   activeColor: color.selected
// });
const Tab = createMaterialBottomTabNavigator();

export function PrimaryNavigator() {
  return (
    // <BottomNavigation
    //   navigationState={{ index, routes }}
    //   onIndexChange={setIndex}
    //   renderScene={renderScene}
    // />
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({focused, color}) => {
          let icon;

          if(route.name === "searchTab") {
            icon = 'book-search';
          }
          else if(route.name === "profileTab") {
            icon = 'account';
          }
          else if(route.name === "myLibraryTab") {
            icon = 'library';
          }

          return <MaterialCommunityIcons name={icon} size={24} color={color} />
        }
      })}
      labeled={false}
      style={{
        backgroundColor: color.bottomBar
      }}
    >
      <Tab.Screen name="searchTab" component={BookSearchTab}></Tab.Screen>
      <Tab.Screen name="myLibraryTab" component={MyLibraryTab}></Tab.Screen>
    </Tab.Navigator>
  )
}

function BookSearchTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="detail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}

function MyLibraryTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="my_library" component={MyLibraryScreen} />
    </Stack.Navigator>
  );
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
