import { View, StyleSheet, Image, Text } from "react-native"
import { useState } from "react"

import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location"

import OutlinedButton from "../ui/OutlinedButton"
import { Colors } from "../../constants/colors"
import { getMapPreview } from "../../utils/location"

export default function LocationPicker() {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions()

  const [pickedLocation, setPickedLocation] = useState()

  async function verifyPermisions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      )
      return false
    }
    return true
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermisions()

    if (!hasPermission) {
      return
    }

    const location = await getCurrentPositionAsync()
    console.log("locationRes", location)
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }

  function pickOnMapHandler() {}

  let locationPreview = <Text>No location picked yet</Text>
  if (pickedLocation) {
    const res = getMapPreview(pickedLocation.lat, pickedLocation.lng)
    console.log("res", res)

    locationPreview = (
      <Image
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
        style={styles.image}
      />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
})
