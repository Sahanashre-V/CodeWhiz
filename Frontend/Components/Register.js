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
                "http://10.1.13.176:5000/api/register",
                { name, email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 201) {
                Alert.alert("Success", "Account created successfully!");
                navigation.navigate("Login");  
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
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

export default Register;
