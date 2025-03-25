import React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import SubCafes from "../components/Locations/SubCafes";
import BottomTabs from "../components/BottomTabs";
import SubCafeHeader from "../components/Locations/SubCafeHeader";
import SearchBar from "../components/main/SearchBar";
import { useState } from "react";

export default function LOCATIONS({ route, navigation, isDarkMode }) {
  const { parentVenue } = route.params || {}; // Safely extract parentVenue
  const { header } = route.params || {}; // Safely extract parentVenue

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#333" : "#fff" }]}>
      <View>
        <SubCafeHeader header={header} isDarkMode={isDarkMode} />
      </View>
      <Divider width={1.8} color={isDarkMode ? '#777' : '#ccc'} style={styles.divider} />
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
      <ScrollView showsVerticalScrollIndicator={true} style={[styles.scrollView, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
        <SubCafes parentVenue={parentVenue} navigation={navigation} isDarkMode={isDarkMode} searchQuery={searchQuery} />
      </ScrollView>
      <Divider width={1} color={isDarkMode ? '#777' : '#ccc'} />
      <BottomTabs navigation={navigation} isDarkMode={isDarkMode} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  divider: {
    marginVertical: 10,
  },
});