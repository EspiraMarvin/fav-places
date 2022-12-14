import { useCallback, useState } from "react"
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native"
import { Colors } from "../../constants/colors"
import { Place } from "../../models/places"
import Button from "../ui/Button"
import ImagePicker from "./ImagePicker"
import LocationPicker from "./LocationPicker"

export default function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("")
  const [selectedImage, setSelectedImage] = useState()
  const [pickedLocation, setPickedLocation] = useState()

  function changeTitle(enteredText) {
    setEnteredTitle(enteredText)
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri)
  }

  // prevent pickLocationHandler from being called unnecessarily
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location)
  }, [])

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation)
    onCreatePlace(placeData)
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitle}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakenImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 1,
    backgroundColor: Colors.primary50,
  },
})
