import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AllPlaces from "../screens/AllPlaces"
import AddPlace from "../screens/AddPlace"
import IconButton from "../components/ui/IconButton"
import { Colors } from "../constants/colors"

const Stack = createNativeStackNavigator()

export default function AppNavigation() {
  function goToAdd() {
    console.log("youre ")
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.gray700,
        headerStyle: { backgroundColor: Colors.primary500 },
        contentStyle: { backgroundColor: Colors.gray700 }, // background color for nav screens
      }}
    >
      <Stack.Screen
        name="AllPlaces"
        component={AllPlaces}
        options={({ navigation }) => ({
          title: "Your Favorite Places",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={26}
              color={tintColor}
              onPress={() => navigation.navigate("AddPlace")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlace}
        options={{
          title: "Add a new place",
        }}
      />
    </Stack.Navigator>
  )
}
