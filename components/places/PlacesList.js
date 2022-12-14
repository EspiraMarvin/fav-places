import { useNavigation } from "@react-navigation/native"
import { FlatList, Text, View, StyleSheet } from "react-native"
import { Colors } from "../../constants/colors"
import PlacesItem from "./PlaceItem"

export default function PlacesList({ places }) {
  const navigation = useNavigation()

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    )
  }

  function selectedPlaceHandler(id) {
    navigation.navigate("PlaceDetails", { placeId: id })
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlacesItem place={item} onSelect={selectedPlaceHandler} />
      )}
      style={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 24,
    marginVertical: 4,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
})
