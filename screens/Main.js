import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import React, { useState } from "react";

import SearchBar from '../components/main/SearchBar'
import RestaurantItem from '../components/main/RestaurantItem'
import BottomTabs from '../components/BottomTabs'

export default function Main({ navigation, isDarkMode }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff'}]}>
        <View style={[styles.header, {backgroundColor: isDarkMode ? '#333' : '#fff'}]}>
            {/* <SideBar/> */}
            {/* <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/> */}
            <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#000'}]}>
              Poly Meals
            </Text>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isDarkMode={isDarkMode}/>
        </View>
        <Divider width={1} color={isDarkMode ? '#444' : '#ddd'}/>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <RestaurantItem navigation={navigation} searchQuery={searchQuery} isDarkMode={isDarkMode}/>
        </ScrollView>
        <Divider width={1} color={isDarkMode ? '#444' : '#ccc'} />
        <BottomTabs navigation={navigation} isDarkMode={isDarkMode}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    padding: 15,
  },
  headerTitle: {
    fontSize: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 1,
    width: '100%', // Ensure it takes the full width
    paddingBottom: 20,
  },
});
