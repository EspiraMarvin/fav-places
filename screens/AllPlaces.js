import { useEffect, useState } from "react"
import PlacesList from "../components/places/PlacesList"
import { useIsFocused } from "@react-navigation/native"

export default function AllPlaces({ route, navigation }) {
  const [allPlaces, setAllPlaces] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused && route.params) {
      setAllPlaces((curPlaces) => [...curPlaces, route.params.place])
    }
  }, [isFocused, route])
  return <PlacesList places={allPlaces} />
}
