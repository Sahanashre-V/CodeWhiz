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
    ScrollView
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Register = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        try {
            const response = await axios.post(
                "http://192.168.140.40:5000/api/register",
                { name, email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 201) {
                const token = response.data.accessToken;
                await AsyncStorage.setItem("token", token);
                Alert.alert("Success", "Account created successfully!");
                navigation.navigate("AIChatScreen");
            } else {
                Alert.alert("Error", response.data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            Alert.alert("Error", "Failed to register. Please try again.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.container}>
                <Navbar />

                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.title}>Register</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                    />

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

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <Text style={styles.loginText}>
                        Already have an account?
                        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
                            {" "}Login
                        </Text>
                    </Text>
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
    content: {
        flexGrow: 1,
        justifyContent: "center",  
        alignItems: "center",      
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 10,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    loginText: {
        marginTop: 20,
        fontSize: 14,
    },
    link: {
        color: "#007bff",
        fontWeight: "bold",
    },
});

export default Register;
