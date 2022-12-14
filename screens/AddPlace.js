import PlaceForm from "../components/places/PlaceForm"
import { insertPlace } from "../utils/database"

export default function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    // store place into sqlite
    await insertPlace(place)
    navigation.navigate("AllPlaces")
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />
}
