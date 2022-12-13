import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import AppNavigation from "./navigation/AppNavigation"

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#000000" />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
