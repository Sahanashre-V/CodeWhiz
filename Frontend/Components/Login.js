import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://10.1.13.176:5000/api/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            Alert.alert("Success", "Login successful!");
            navigation.navigate("CodeGenerator");
        } catch (error) {
            Alert.alert("Error", error.response?.data?.message || "Login failed!");
        }
    };

    return (
        <View>
            <Text>Login</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <TouchableOpacity onPress={handleLogin}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
