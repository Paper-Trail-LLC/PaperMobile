import React, { useState, useEffect } from "react";
import { TextStyle, View, ViewStyle, TouchableOpacity, Vibration, StyleSheet, Alert, Dimensions } from "react-native";
import { observer } from "mobx-react-lite";
import { color, typography } from "../../theme";
import { Text } from "../";
import { Camera, BarCodeScanningResult } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Book, useStores } from "../../models";

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;
const { width: winWidth, height: winHeight } = Dimensions.get('window');
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
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  let camera = null;
  let scannedBook: Book;
  const bookStore = useStores().bookStore;

  
  const onBarcodeRead = async (barcode: BarCodeScanningResult) => {
    setScanned(true);
    scannedBook = await bookStore.getBookByISBN(barcode.data);
    console.log(scannedBook);
    Alert.alert("Barcode value is" + barcode.data, "Barcode type is" + barcode.type);
    console.log(barcode);
    Vibration.vibrate(1000);
  }
  // const componentDidMount = async () => {
  //   const camera = await Permissions.askAsync(Permissions.CAMERA);
  //   const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  //   const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
  //   state.hasCameraPermission =hasCameraPermission ;
  // };
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

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{flex:1}}
        ref={cam => camera = cam}
        type={type}
        onBarCodeScanned={scanned ? undefined : onBarcodeRead}>

        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.TEXT}> Flip </Text>
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
  }
});