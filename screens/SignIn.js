import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Keyboard,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

const API_BASE_URL = "https://csc308-t2-inv.onrender.com";

export default function SignIn({ navigation, setLoginId }) {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!input || !password) {
      Alert.alert("Error", "Email and password are required!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/auth/login`, {
        email: input,
        username: input,
        password,
      });

      const userData = response.data.data;
      if (userData) {
        setLoginId(userData.id);
        console.log("Login Success:", response.data);
        Alert.alert("Success", "Login successful!");

        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Invalid credentials. Please Try Again.");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      Alert.alert("Error", "Invalid username/email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#064E3B", "#0D3D14", "#1B5E20", "#E5E5E5"]}
          style={styles.background}
        />
        <Image
          source={require("../assets/splash-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.inputContainer}>
          <View style={styles.iconInputContainer}>
            {/* <Entypo name="user" size={24} style={styles.inputIcon} /> */}
            <FontAwesome5Icon name="user-alt" size={24} style={styles.inputIcon}/>
            <TextInput
              label={<Text style={{ color: "black" }}>Username or Email</Text>}
              mode="flat"
              value={input}
              onChangeText={setInput}
              keyboardType="email-address"
              autoCapitalize="none"
              underlineColor="transparent"
              cursorColor="black"
              selectionColor="black"
              activeUnderlineColor="transparent"
              style={styles.input}
              theme={{colors: {primary: 'black', onSurfaceVariant: 'black'}}}
            />
            {input.length > 0 && (
              <TouchableOpacity onPress={() => setInput("")}>
                <Ionicons name="close-circle" size={24} style={styles.clearIcon}/>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.iconInputContainer}>
            {/* <Entypo name="lock" size={24} style={styles.inputIcon} /> */}
            <FontAwesome5Icon name="lock" size={24} style={styles.inputIcon}/>
            <TextInput
              label={<Text style={{ color: "black" }}>Password</Text>}
              mode="flat"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              underlineColor="transparent"
              cursorColor="black"
              selectionColor="black"
              activeUnderlineColor="transparent"
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={isLoading}
          style={styles.button}
        >
          {isLoading ? "Logging In..." : "Log In"}
        </Button>

        <View style={styles.bottomContainer}>
            <Text
              style={styles.noAccount}
              onPress={() => navigation.navigate("Signup")}>
              Don't have an account?
              <Text style={styles.link}>Sign up Here</Text>
            </Text>
            <Text style={styles.forgotPasssword}>
                Forgot Password?
            </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  logo: {
    width: 300,
    marginTop: 100,
  },
  inputContainer: {
    width: "90%",
    marginTop: 30,
    gap: 15,
  },
  iconInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5eebe",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
    color: "#595b58",
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    marginLeft: -5
  },
  clearIcon: {
    color: "#595b58",
    marginLeft: 10,
  },
  eyeIcon: {
    color: "#595b58",
    marginLeft: 10,
  },
  button: {
    width: 150,
    marginTop: 50,
    backgroundColor: "#209a20",
  },
  noAccount: {
    marginTop: 0,
    fontSize: 14,
    fontWeight: "400",
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  forgotPasssword: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: "400",
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5eebe",
    borderRadius: 10,

  },
  eyeIcon: {
    marginLeft: 0,
    color: "#000",
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
