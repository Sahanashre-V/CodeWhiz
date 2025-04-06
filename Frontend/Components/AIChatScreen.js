import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AIChatScreen = () => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem("token");

            const res = await axios.post(
                "http://192.168.140.40:5000/api/gemini",
                { prompt: input },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );

            // console.log("response->=>=>", res);
            setResponse(res.data.message);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setResponse("Failed to fetch response.");
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.responseBox}>
                <Text style={styles.responseText}>{response}</Text>
            </ScrollView>
            <TextInput
                style={styles.input}
                placeholder="Enter your prompt..."
                value={input}
                onChangeText={setInput}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={sendMessage}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Thinking..." : "Send"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    responseBox: {
        flex: 1,
        marginBottom: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    responseText: {
        fontSize: 16,
        color: "#333",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
    },
    button: {
        marginTop: 10,
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AIChatScreen;
