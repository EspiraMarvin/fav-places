import { useCallback, useLayoutEffect, useState } from "react"
import { Alert, StyleSheet } from "react-native"
import MapView, { Marker } from "react-native-maps"

import IconButton from "../components/ui/IconButton"

export default function Map({ navigation, route }) {
  // set init location if route params has location coordinates
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  }

  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const region = {
    latitude: initialLocation ? initialLocation.lat : -1.286389,
    longitude: initialLocation ? initialLocation.lng : 36.817223,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  function selectLocationHandler(event) {
    // console.log("event", event)
    if (initialLocation) {
      return
    }
    const lat = event.nativeEvent.coordinate.latitude
    const lng = event.nativeEvent.coordinate.longitude

    setSelectedLocation({ lat: lat, lng: lng })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No Location Picked",
        "You have to pick a location (by tapping on the map) first!"
      )
      return
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    })
  }, [navigation, selectedLocation])

  useLayoutEffect(() => {
    if (initialLocation) {
      return
    }
    navigation.setOptions({
      // add right header button
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    })
  }, [navigation, savePickedLocationHandler, initialLocation])

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})
