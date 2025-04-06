import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
                const token = response.data.token;
                await AsyncStorage.setItem("token", token);
                Alert.alert("Success", "Login successful!");
                navigation.navigate("AIChatScreen");
            } else {
                Alert.alert("Error", response.data.message || "Login failed!");
            }
        } catch (error) {
            console.error("Login Error:", error);
            Alert.alert("Error", "Failed to login. Please try again.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.container}>
                <Navbar />

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.formWrapper}>
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
                            <Text
                                style={styles.link}
                                onPress={() => navigation.navigate("Register")}
                            >
                                {" "}Register
                            </Text>
                        </Text>
                    </View>
                </ScrollView>

                <Footer />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    formWrapper: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginText: {
        textAlign: "center",
        fontSize: 14,
        color: "#555",
    },
    link: {
        color: "#007bff",
        fontWeight: "bold",
    },
});

export default Login;
