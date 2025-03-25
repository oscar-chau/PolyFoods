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
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput, Button } from "react-native-paper";
import axios from "axios";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const API_BASE_URL = "https://csc308-t2-inv.onrender.com";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (
      !username ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users`,
        {
          username,
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }
      );

      console.log("Signup Success:", response.data);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("Error", "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <LinearGradient
          colors={["#064E3B", "#0D3D14", "#1B5E20", "#E5E5E5"]}
          style={styles.gradientBackground}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/splash-icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inputContainer}>
              <View style={styles.iconInputContainer}>
                <FontAwesome5Icon name="user-alt" size={24} style={styles.inputIcon}/>
                <TextInput
                  label={<Text style={{ color: "black" }}>Username</Text>}
                  mode="flat"
                  value={username}
                  onChangeText={setUsername}
                  underlineColor="transparent"
                  cursorColor="black"
                  selectionColor="black"
                  activeUnderlineColor="transparent"
                  style={styles.input}
                  theme={{colors: {primary: 'black', onSurfaceVariant: 'black'}}}
                />
              </View>
              <View style={styles.iconInputContainer}>
                <FontAwesome5Icon name="user-alt" size={24} style={styles.inputIcon}/>
                <TextInput
                  label={<Text style={{ color: "black" }}>First Name</Text>}
                  mode="flat"
                  value={firstName}
                  onChangeText={setFirstName}
                  underlineColor="transparent"
                  cursorColor="black"
                  selectionColor="black"
                  activeUnderlineColor="transparent"
                  style={styles.input}
                />
              </View>
              <View style={styles.iconInputContainer}>
                <FontAwesome5Icon name="user-alt" size={24} style={styles.inputIcon}/>
                <TextInput
                  label={<Text style={{ color: "black" }}>Last Name</Text>}
                  mode="flat"
                  value={lastName}
                  onChangeText={setLastName}
                  underlineColor="transparent"
                  cursorColor="black"
                  selectionColor="black"
                  activeUnderlineColor="transparent"
                  style={styles.input}
                />
              </View>
              <View style={styles.iconInputContainer}>
                <Entypo name="mail" color="black" size={24} style={styles.inputIcon} />
                <TextInput
                  label={<Text style={{ color: "black" }}>Email</Text>}
                  mode="flat"
                  value={email}
                  onChangeText={setEmail}
                  underlineColor="transparent"
                  cursorColor="black"
                  selectionColor="black"
                  activeUnderlineColor="transparent"
                  style={styles.input}
                />
              </View>
              <View style={styles.iconInputContainer}>
                <FontAwesome5Icon name="lock" size={24} style={styles.inputIcon}/>
                <TextInput
                  label={<Text style={{ color: "black" }}>Password</Text>}
                  mode="flat"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  underlineColor="transparent"
                  cursorColor="black"
                  selectionColor="black"
                  activeUnderlineColor="transparent"
                  autoCapitalize="none"
                  textContentType="oneTimeCode"
                  autoComplete="off"
                  numberOfLines={1}
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.iconInputContainer}>
                <FontAwesome5Icon name="lock" size={24} style={styles.inputIcon}/>
                <TextInput
                  label={<Text style={{ color: "black" }}>Confirm Password</Text>}
                  mode="flat"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  underlineColor="transparent"
                  cursorColor="black"
                  selectionColor="black"
                  activeUnderlineColor="transparent"
                  autoCapitalize="none"
                  textContentType="oneTimeCode"
                  autoComplete="off"
                  numberOfLines={1}
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={22}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Button
              mode="contained"
              onPress={handleSignup}
              loading={isLoading}
              style={styles.button}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>

            <View
              style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}
            >
              <Text
                style={styles.alreadyAccount}
                onPress={() => navigation.navigate("SignIn")}
              >
                Already have an account? Log in here
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 40,
  },
  logo: {
    width: 300,
    height: 200,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  inputContainer: {
    width: "100%",
    gap: 15,
  },
  iconInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5eebe",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
    color: "#595b58",
  },
  input: {
    backgroundColor: "#transparent",
    flex: 1,
    marginLeft: -5
  },
  eyeIcon: {
    marginLeft: 10,
    color: "#595b58",
  },
  button: {
    width: 150,
    marginTop: 20,
    backgroundColor: "#209a20",
    alignSelf: "center",
  },
  bottomText: {
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  alreadyAccount: {
    fontSize: 14,
    fontWeight: "400",
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  loginText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
