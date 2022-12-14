import { View, Text, ScrollView, Image, StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import OutlinedButton from "../components/ui/OutlinedButton"
import { Colors } from "../constants/colors"
import { fetchPlaceDetails } from "../utils/database"

export default function PlaceDetails({ route, navigation }) {
  const [placeDetails, setPlaceDetails] = useState()

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: placeDetails.location.lat,
      initialLng: placeDetails.location.lng,
    })
  }

  // selectedPlaceId to fetch other place details
  const selectedPlaceId = route.params.placeId

  useEffect(() => {
    async function loadPlaceData() {
      const details = await fetchPlaceDetails(selectedPlaceId)
      setPlaceDetails(details)
      navigation.setOptions({
        title: details?.title,
      })
    }

    loadPlaceData()
  }, [selectedPlaceId])

  if (!placeDetails)
    return (
      <View style={styles.fallback}>
        <Text>Loading place data</Text>
      </View>
    )

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: placeDetails.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{placeDetails.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
