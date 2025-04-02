import React, { useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    Alert 
} from "react-native";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        try {
            const response = await axios.post(
                "http://192.168.140.40:5000/api/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                Alert.alert("Success", "Login successful!");
                navigation.navigate("AIChatScreen"); // Navigate to AIChatScreen
            } else {
                Alert.alert("Error", response.data.message || "Login failed!");
            }
        } catch (error) {
            console.error("Login Error:", error);
            Alert.alert("Error", "Failed to login. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Navbar />

            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.loginText}>
                    Don't have an account?  
                    <Text style={styles.link} onPress={() => navigation.navigate("Register")}> Register</Text>
                </Text>
            </View>

            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        marginBottom: 15,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        width: "100%",
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    loginText: {
        fontSize: 16,
        color: "#666",
    },
    link: {
        color: "#007bff",
        fontWeight: "bold",
    },
});

export default Login;
