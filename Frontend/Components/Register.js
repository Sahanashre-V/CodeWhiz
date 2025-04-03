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
                Alert.alert("Success", "Account created successfully!");
                navigation.navigate("AIChatScreen"); // Navigate to AIChatScreen
            } else {
                Alert.alert("Error", response.data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            Alert.alert("Error", "Failed to register. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Navbar />

            <View style={styles.content}>
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
                    <Text style={styles.link} onPress={() => navigation.navigate("Login")}> Login</Text>
                </Text>
            </View>

            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    content: {
        width: "80%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginText: {
        marginTop: 10,
        textAlign: "center",
    },
    link: {
        color: "blue",
        fontWeight: "bold",
    },
});

export default Register;
