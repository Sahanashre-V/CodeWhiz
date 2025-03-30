import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './Components/Register';
import Login from './Components/Login';
import AIChatScreen from './Components/AIChatScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Register">
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="AI Chat" component={AIChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
