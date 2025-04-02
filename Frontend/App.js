import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AIChatScreen from "./Components/AIChatScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="AIChatScreen" component={AIChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
