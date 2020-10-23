import React, {useState, useEffect} from "react";
import { TextStyle, View, ViewStyle, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import { color, typography } from "../../theme";
import { Text } from "../";
import { Camera } from 'expo-camera';
import { useNavigation } from "@react-navigation/native"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primaryBlue,
}

const navigation = useNavigation();
const goBack = () => navigation.goBack();
const [hasPermission, setHasPermission] = useState(null);
export interface BookScanComponentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}
useEffect(() => {
  (async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  })();
}, []);
/**
 * Describe your component here
 */
export const BookScanComponent = observer(function BookScanComponent(props: BookScanComponentProps) {
  const { style } = props
  
  const [type, setType] = useState(Camera.Constants.Type.back);



  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
    <Camera style={{ flex: 1 }} type={type}>
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
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  </View>
  )
})
