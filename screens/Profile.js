import React, { useState, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar, Divider } from "react-native-elements";
import dead from "../assets/profile_avatars/dead.png";
import meh from "../assets/profile_avatars/meh.png";
import sad from "../assets/profile_avatars/sad.png";
import thug from "../assets/profile_avatars/thug.png";
import worried from "../assets/profile_avatars/worried.png";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Modal, Portal, Provider, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

import { Alert } from "react-native";

const API_BASE_URL = "https://csc308-t2-inv.onrender.com";

export default function Profile({ navigation, loginId, setLoginId }) {
  const [defaultIcon, setDefaultIcon] = useState(meh);
  const [visible, setVisible] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${loginId}`);
      const userData = response.data.data;

      setUsername(userData.username || "Guest");
      setEmail(userData.email || "No Email");
      setFirstName(userData.first_name || "No First Name");
      setLastName(userData.last_name || "No Last Name");
    } catch (error) {
      setUsername("Guest");
      setEmail("No Email");
      setFirstName("No First Name");
      setLastName("No Last Name");
    }
  };

  const handleLogout = () => {
    // Clear LoginId to log out
    setLoginId(0);
    Alert.alert("Success", "Logged out successfully!");
    navigation.reset({ index: 0, routes: [{ name: "LoginOrSignup" }] });
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.optionsContainer}
              style={{ marginTop: 200 }}
            >
              <Avatar
                containerStyle={{ marginVertical: 10, borderWidth: 3 }}
                size={125}
                rounded
                source={dead}
                onPress={() => setDefaultIcon(dead)}
              />
              <Avatar
                containerStyle={{ marginVertical: 10, borderWidth: 3 }}
                size={125}
                rounded
                source={meh}
                onPress={() => setDefaultIcon(meh)}
              />
              <Avatar
                containerStyle={{ borderWidth: 3 }}
                size={125}
                rounded
                source={sad}
                onPress={() => setDefaultIcon(sad)}
              />
              <Avatar
                containerStyle={{ borderWidth: 3 }}
                size={125}
                rounded
                source={thug}
                onPress={() => setDefaultIcon(thug)}
              />
              <Avatar
                containerStyle={{ borderWidth: 3 }}
                size={125}
                rounded
                source={worried}
                onPress={() => setDefaultIcon(worried)}
              />
            </Modal>
          </Portal>

          <LinearGradient
            colors={["#95cf95", "#32CD32", "#006400"]} // Light green to dark green
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.3 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <FontAwesome5
                  name="arrow-left"
                  size={30}
                  style={{ padding: 20, marginTop: 40 }}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
              <Avatar
                size={200}
                rounded
                containerStyle={styles.profile}
                source={defaultIcon}
              >
                <Avatar.Accessory
                  size={50}
                  color="gray"
                  style={{ position: "absolute", backgroundColor: "#e8e4d4" }}
                  onPress={showModal}
                />
              </Avatar>

              <View
                style={{
                  marginTop: 100,
                  gap: 15,
                  width: "90%",
                  alignSelf: "center",
                }}
              >
                <TextInput
                  label="Calorie Goal"
                  mode="outlined"
                  value={calorieGoal}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9]/g, "");
                    if (numericValue.length <= 5) {
                      setCalorieGoal(numericValue);
                    }
                  }}
                  outlineStyle={{ borderRadius: 15 }}
                  contentStyle={{ marginLeft: 0 }}
                />
                <TextInput
                  label="Username"
                  mode="outlined"
                  value={username}
                  disabled={true}
                  outlineStyle={{ borderRadius: 15 }}
                />
                <TextInput
                  label="Email"
                  mode="outlined"
                  value={email}
                  disabled={true}
                  outlineStyle={{ borderRadius: 15 }}
                />
                <TextInput
                  label="First Name"
                  mode="outlined"
                  value={firstName}
                  disabled={true}
                  outlineStyle={{ borderRadius: 15 }}
                />
                <TextInput
                  label="Last Name"
                  mode="outlined"
                  value={lastName}
                  disabled={true}
                  outlineStyle={{ borderRadius: 15 }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 50,
                }}
              >
                <TouchableOpacity onPress={showModal}>
                  <View style={styles.editProfile}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                    <FontAwesome5
                      name="edit"
                      size={25}
                      color="gray"
                      style={{ marginTop: 25 }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                  <View style={styles.logoutContainer}>
                    <Text style={styles.logoutText}>Log Out</Text>
                    <FontAwesome5
                      name="sign-out-alt"
                      size={25}
                      color="green"
                      style={{ marginTop: 25 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ height: 100, backgroundColor: "white" }} />
            </View>
          </LinearGradient>
        </Provider>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "green", flex: 1 },
  profile: {
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: "-125",
    position: "absolute",
    borderWidth: 5,
  },
  optionsContainer: {
    width: 350,
    height: 400,
    marginTop: 300,
    alignSelf: "center",
    backgroundColor: "#e7e7e7",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    borderRadius: 20,
    position: "absolute",
  },
  infoContainer: {
    flex: 1,
    width: "100%",
    marginTop: 200,
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    position: "absolute",
  },
  logoutContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "green",
    borderRadius: 20,
    height: 80,
    width: 175,
  },
  logoutText: {
    marginTop: 25,
    fontSize: 20,
    color: "green",
    textAlign: "center",
  },
  editProfile: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: "#e8e4d4",
    borderWidth: 3,
    borderRadius: 20,
    height: 80,
    width: 175,
  },
  editProfileText: {
    marginTop: 25,
    fontSize: 20,
    color: "gray",
    textAlign: "center",
  },
});
