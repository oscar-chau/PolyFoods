import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function StartScreen({ navigation }) {
    const[activeTab, setActiveTab] = useState("Light");

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("LoginOrSignup"); // Navigate after 3 seconds
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [navigation]);

    return (
       
            <View style={styles.container}>
                <LinearGradient
                    colors={['#064E3B', '#0D3D14', '#1B5E20', '#E5E5E5']}
                    style={styles.background}
                    />
                    <Image source={require('../assets/splash-icon.png')} style={styles.logo} resizeMode="contain"/>

                    {/* Loading Animation */}
                    <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    logo: {
        width: 400,
        height: 400,
    },
    loader: {
        marginTop: 20, // Adjust spacing from logo
    }
});
