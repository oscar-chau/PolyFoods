import { View, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SearchBar({ searchQuery, setSearchQuery, isDarkMode }) {
  const clearSearch = () => {
    setSearchQuery("");
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#444" : "#eee" },
        ]}
      >
        <Ionicons
          name="search-sharp"
          size={24}
          style={[styles.icon, { color: isDarkMode ? "#ccc" : "#000" }]}
        />
        <TextInput
          style={[styles.input, { color: isDarkMode ? "#bbb" : "#888" }]}
          placeholder="Search"
          placeholderTextColor={isDarkMode ? "#bbb" : "#888"}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Updates search query
        />
        <AntDesign
          name="closecircle"
          size={20}
          style={[styles.clearIcon, { color: isDarkMode ? "#bbb" : "#888" }]}
          onPress={clearSearch}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  clearIcon: {
    marginLeft: 10,
  },
});
