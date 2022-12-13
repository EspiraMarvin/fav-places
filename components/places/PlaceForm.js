import { useState } from "react"
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native"
import { Colors } from "../../constants/colors"
import ImagePicker from "./ImagePicker"

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState([])

  function changeTitle(enteredText) {
    setEnteredTitle(enteredText)
  }
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitle}
          value={enteredTitle}
        />
      </View>
      <ImagePicker />
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
