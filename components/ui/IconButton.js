import { Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function IconButton({ icon, color, size, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
})
