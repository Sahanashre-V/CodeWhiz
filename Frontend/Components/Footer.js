import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 AI Chat App</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        width: "100%",
        height: 50,
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
    },
    footerText: {
        color: "#fff",
        fontSize: 14,
    },
});

export default Footer;
