import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import AddProject from "./src/screens/AddProject";
import Icon from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#96ffb6",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="AddProject"
          component={AddProject}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="plus" color={color} size={size} />
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
