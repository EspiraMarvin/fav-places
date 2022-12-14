import PlaceForm from "../components/places/PlaceForm"

export default function AddPlace({ navigation }) {
  function createPlaceHandler(place) {
    navigation.navigate("AllPlaces", { place: place })
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />
}
