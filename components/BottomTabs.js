import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabs({ navigation, isDarkMode, loginId }) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "#fff" },
      ]}>
        <Icon
          icon="home"
          text="Home"
          navigation={navigation}
          screen="Home"
          isDarkMode={isDarkMode}
        />
        <Icon
          icon="wrench"
          text="Settings"
          navigation={navigation}
          screen="Settings"
          isDarkMode={isDarkMode}
        />
        <Icon
          icon="plus-circle"
          text="Add"
          navigation={navigation}
          screen="Main"
          isDarkMode={isDarkMode}
        />
        <Icon
          icon="heart"
          text="Liked"
          navigation={navigation}
          screen="Favorites"
          isDarkMode={isDarkMode}
        />
        <Icon
          icon="user"
          text="Account"
          navigation={navigation}
          screen={loginId !== 0 ? "Profile" : "SignIn"} 
          isDarkMode={isDarkMode}
        />
    </View>
  );
}

const Icon = ({ navigation, isDarkMode, ...props }) => (
  <TouchableOpacity onPress={() => navigation.navigate(props.screen)} style={styles.iconContainer}>
      <FontAwesome5
        name={props.icon}
        size={25}
        color={isDarkMode ? '#fff' : '#000'}
      />
      <Text style={[styles.iconText, { color: isDarkMode ? '#fff' : '#000' }]}>
        {props.text}
      </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVerticla: 10,
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2),"
  },
  iconContainer: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 5,
  },
  iconText: {
    fontSize: 12,
    marginTop: 3,
  },
});
