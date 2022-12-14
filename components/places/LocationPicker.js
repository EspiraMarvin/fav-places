import { View, StyleSheet, Image, Text } from "react-native"
import { useEffect, useState } from "react"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native"

import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location"

import OutlinedButton from "../ui/OutlinedButton"
import { Colors } from "../../constants/colors"
import { getAddress, getMapPreview } from "../../utils/location"

export default function LocationPicker({ onPickLocation }) {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions()

  const isFocused = useIsFocused() // check if its the current stack screen
  const navigation = useNavigation()
  const route = useRoute()

  const [pickedLocation, setPickedLocation] = useState()

  useEffect(() => {
    if (isFocused && route.params) {
      // check if route params have picked location data from map screen and set locations lat & lng
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      }
      setPickedLocation(mapPickedLocation)
    }
  }, [route, isFocused])

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        // format picked location to human readable address /geocode
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
        // forward picked location & address to placeForm component
        onPickLocation({ ...pickedLocation, address: address })
      }
    }

    handleLocation()
  }, [pickedLocation, onPickLocation])

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
    // console.log("locationRes", location)
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }

  function pickOnMapHandler() {
    // opens map screen
    navigation.navigate("Map")
  }

  let locationPreview = <Text>No location picked yet</Text>
  if (pickedLocation) {
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
