import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import AppNavigation from "./navigation/AppNavigation"
import * as SplashScreen from "expo-splash-screen"
import { init } from "./utils/database"

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  useEffect(() => {
    // initialize sqlite db
    init()
      .then(() => {
        setAppIsReady(true)
      })
      .catch((err) => console.log("err", err))
  }, [appIsReady])

  if (!appIsReady) {
    return null
  } else {
    SplashScreen.hideAsync()
  }

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
