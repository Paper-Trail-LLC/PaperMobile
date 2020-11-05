import React, { useState, useEffect } from "react";
import { TextStyle, View, ViewStyle, TouchableOpacity, Vibration, StyleSheet, Alert, Dimensions, Platform } from "react-native";
import { observer } from "mobx-react-lite";
import { color, typography } from "../../theme";
import { Text } from "../";
import { Camera, BarCodeScanningResult } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons'
import { Book, useStores } from "../../models";
import { useNavigation } from "@react-navigation/native"
import { ActivityIndicator } from 'react-native-paper';

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
  const [bookLoaded, setBookLoaded] = React.useState(false);
  const [flashMode, setFlash] = React.useState(Camera.Constants.FlashMode);
  const type = Camera.Constants.Type.back;
  const bookStore = useStores().bookStore;
  const navigation = useNavigation();

  let camera: Camera = null;
  let scannedBook: Book;
  let aspectRatios;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
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
      if (scannedBook) {
        setBookLoaded(true);
        setScanned(false);
      }
      goToDetails(scannedBook.isbn13);
    } catch (err) {
      __DEV__ && console.tron.error("BarcodeScan Component: Error on getting book by ISBN.",err);
    }

  }

  const goToDetails = (isbn13: string) => {
    bookStore.setChoice(isbn13);
    navigation.navigate("detail");
  }

  return (
    <View style={{ flex: 1 }}>
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
          <ActivityIndicator animating={scanned && !bookLoaded} color={color.primaryOrange} size="large" />
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
  }
});