import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.navText}>AI Chat App</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        width: "100%",
        height: 60,
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },
    navText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Navbar;
