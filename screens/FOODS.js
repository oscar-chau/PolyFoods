import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import MenuItem from "../components/Foods/MenuItems";
import About from "../components/Foods/About";
import SearchBar from "../components/main/SearchBar";

export default function FOODS({ route, isDarkMode, loginId }) {
  const { parentLocation } = route.params || {}; // Safely extract parentVenue
  const { parentImage } = route.params || {}; // Safely extract parentVenue
  const { parentName } = route.params || {}; // Safely extract parentVenue

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "#fff" },
      ]}
    >
      <About
        parentLocation={parentLocation}
        parentImage={parentImage}
        parentName={parentName}
        isDarkMode={isDarkMode}
      />
      <Divider
        width={1.8}
        color={isDarkMode ? "#555" : "#ddd"}
        style={{ marginVertical: 10 }}
      />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
      />
      <Divider
        width={1.8}
        color={isDarkMode ? "#555" : "#ddd"}
        style={{ marginVertical: 10 }}
      />
      <MenuItem
        parentLocation={parentLocation}
        isDarkMode={isDarkMode}
        searchQuery={searchQuery}
        loginId={loginId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
