import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginOrSignup({ navigation }) {
    const[activeTab, setActiveTab] = useState("Light");

    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#064E3B', '#0D3D14', '#1B5E20', '#E5E5E5']}
                    style={styles.background}
                    />
                    <Image source={require('../assets/splash-icon.png')} style={styles.logo} resizeMode="contain"/>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("SignIn")}>
                    <View style={styles.button} >
                        <Text style={styles.buttonText}>Login</Text>
                    </View>
                </TouchableOpacity>

                {/* Working on the new Singup page currently named Signup2 */}
                <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("Signup")}>
                    <View style={[styles.button, {marginTop: 15}]}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </View>
                </TouchableOpacity>



            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    logo: {
        width: 300,
        marginTop: 150,
    },
    button: {
        width: 250,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#f5eebe',
        justifyContent:'center',


    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '4  00'
    },
    guest:{
        marginTop: 60,
        fontSize: 18,
        fontWeight: '600',
        color: '#f5f5f5'
    }
});
