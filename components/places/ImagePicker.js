import { View, Text, Alert, Image, StyleSheet } from "react-native"
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker"
import { useState } from "react"
import { Colors } from "../../constants/colors"
import OutlinedButton from "../ui/OutlinedButton"

export default function ImagePicker() {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions()
  const [pickedImage, setPickedImage] = useState()

  async function verifyIosPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      )
      return false
    }
    return true
  }

  async function takeImageHandler() {
    const hasPermission = await verifyIosPermissions()

    if (!hasPermission) {
      return
    }

    const imageResult = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    })
    // console.log("image", imageResult)

    if (!imageResult.canceled) {
      setPickedImage(imageResult.assets[0].uri)
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
})
