import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { useColorScheme } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import BasketScreen from "./screens/BasketScreen";
import { store } from "./store";
import { Provider } from "react-redux";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="RestaurantScreen"
              component={RestaurantScreen}
            />
            <Stack.Screen
              options={{ headerShown: false, presentation: "modal" }}
              name="BasketScreen"
              component={BasketScreen}
            />
            <Stack.Screen
              options={{ headerShown: false, presentation: "fullScreenModal" }}
              name="PreparingOrderScreen"
              component={PreparingOrderScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="DeliveryScreen"
              component={DeliveryScreen}
            />
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}
