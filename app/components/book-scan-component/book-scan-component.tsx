import React, { useState, useEffect } from "react";
import { TextStyle, View, ViewStyle, TouchableOpacity, Vibration, StyleSheet, Alert, Dimensions, Platform } from "react-native";
import { observer } from "mobx-react-lite";
import { color, typography } from "../../theme";
import { Text } from "../";
import { Camera, BarCodeScanningResult } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons'
import { Book, BookType, useStores } from "../../models";
import { useNavigation } from "@react-navigation/native"
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { $nonEmptyObject } from "mobx-state-tree/dist/internal";

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const isIos = Platform.OS === "ios"

export interface BookScanComponentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export const BookScanComponent = observer(function BookScanComponent(props: BookScanComponentProps) {
  const { style } = props;
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [bookSearched, setBookSearched] = React.useState(false);
  const [bookFound, setBookFound] = React.useState(false);
  const [showSnack, setShowSnack] = React.useState(false);
  const [flashMode, setFlash] = React.useState(Camera.Constants.FlashMode.off);
  const type = Camera.Constants.Type.back;
  const bookStore = useStores().bookStore;
  const navigation = useNavigation();

  let camera: Camera = null;
  let scannedBook: Book;
  let aspectRatios;
//   useEffect(() => {
//     checkNotificationsPermissions()
//     AppState.addEventListener("change", _handleAppStateChange);

//     return () => {
//         // To unsubscribe from the event listener after the component is unmounted
//         AppState.removeEventListener("change", _handleAppStateChange);
//     };
// }, [settingsStore.themeSettings.use_os_theme, settingsStore.themeSettings.dark_mode]);

// const _handleAppStateChange = (nextAppState): void => {
//     if (
//         appState.current.match(/inactive|background/) &&
//         nextAppState === "active"
//     ) {
//         checkNotificationsPermissions()
//     }

//     appState.current = nextAppState;
// };

// const checkNotificationsPermissions = async () => {

//     try {
//         await checkNotifications().then(({ status, settings }) => {

//             if (status == "granted") {
//                 set_notifications_switch(true)
//             }
//             else {
//                 set_notifications_switch(false)
//             }
//         })
//     }
//     catch (err) {
//         console.log('Error fetching notifications permission', err);
//     }
// }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    return () => {
      // To unsubscribe from the event listener after the component is unmounted
    }
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const getRatio = async () => {
    if (camera && !isIos) {
      try {
        aspectRatios = await camera.getSupportedRatiosAsync();
        console.table(aspectRatios);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const onDismissSnackBar = () => {
    setScanned(false);
    setShowSnack(false);
  };

  /**
   * Callback function when the camera detects a barcode.
   *
   * @param {BarCodeScanningResult} barcode the barcode result object from the expo-camera
   */
  const onBarcodeRead = async (barcode: BarCodeScanningResult) => {
    Vibration.vibrate(1000);
    setScanned(true);
    try {
      scannedBook = await bookStore.getBookByISBN(barcode.data);
      setBookSearched(true);
      if (scannedBook === undefined) {
        setShowSnack(true);
      } else {
        setBookFound(true);
        goToDetails(scannedBook.isbn13);
      }
    } catch (err) {
      __DEV__ && console.tron.error("BarcodeScan Component: Error on getting book by ISBN.", err);
    } finally {
      setBookFound(false);
      
      setBookSearched(false);
    }

  }

  const goToDetails = (isbn13: string) => {
    bookStore.setChoice(isbn13);
    navigation.navigate("detail");
  }

  const addNewBook = () => {
    console.log("Go to add new book screen.");
  }

  return (
    <View style={ styles.CONTAINER }>
      <Camera style={{ flex: 1 }}
        ref={ref => camera = ref}
        type={type}
        onBarCodeScanned={scanned ? undefined : onBarcodeRead}
        flashMode={flashMode}
        ratio={"16:9"}
        // barCodeScannerSettings={{
        //   barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.upc_e]
        // }}
        useCamera2Api={!isIos}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center'
          }}>
          <ActivityIndicator animating={(scanned && !showSnack) && !bookSearched} color={color.primaryOrange} size="large" />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
          }}>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setFlash(
                flashMode === Camera.Constants.FlashMode.torch
                  ? Camera.Constants.FlashMode.off
                  : Camera.Constants.FlashMode.torch
              );
            }}>
            <Ionicons name={flashMode === Camera.Constants.FlashMode.torch
              ? "md-flash"
              : "md-flash-off"} style={styles.ICON} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={getRatio}>
            <Ionicons name="ios-reverse-camera" style={styles.ICON} />
          </TouchableOpacity>
        </View>
      </Camera>
      <Snackbar
            visible={showSnack}
            style={styles.SNACK}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Add',
              onPress: addNewBook,
            }}>
            Book not found. Add new book?
      </Snackbar>
    </View>
  )

})

const styles = StyleSheet.create({
  PREVIEW: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  CONTAINER: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
  },
  TEXT: {
    fontFamily: typography.primary,
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  ICON: {
    fontSize: 36,
    color: "white",
    marginBottom: 10,
  },
  SNACK: {
    alignSelf:'flex-start'
  }
});