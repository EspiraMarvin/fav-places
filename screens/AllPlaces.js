import { useEffect, useState } from "react"
import PlacesList from "../components/places/PlacesList"
import { useIsFocused } from "@react-navigation/native"
import { fetchPlace } from "../utils/database"

export default function AllPlaces({ route, navigation }) {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlace()
      setLoadedPlaces(places)
    }
    if (isFocused) {
      loadPlaces()
    }
  }, [isFocused])
  return <PlacesList places={loadedPlaces} />
}
