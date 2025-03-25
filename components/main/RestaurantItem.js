import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import newmarket from "../../assets/1901.jpg";
import vgs from "../../assets/vg.jpg";
import pcv from "../../assets/pcv.jpg";
import campusmarket from "../../assets/campusmarket.jpg";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import LOCATIONS from "../../screens/LOCATIONS";
import { venueList } from "../DATA";

export default function RestaurantItem({
  navigation,
  searchQuery,
  isDarkMode,
}) {
  const filteredVenues = venueList.filter((venue) =>
    venue.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {filteredVenues.length > 0 ? (
        filteredVenues.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() =>
              navigation.navigate("LOCATIONS", {
                parentVenue: item.Name,
                header: item.SubImage,
              })
            }
          >
            <View
              style={[
                styles.cafeteriaContainer,
                { backgroundColor: isDarkMode ? '#444' : '#fff' }
              ]}
            >
              <Cafeteria image={item.Image} />
              <CafeteriaInfo name={item.Name} isDarkMode={isDarkMode} />
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.noRestaurantContainer}>
          <Text
            style={[
              styles.noRestaurantText,
              { color: isDarkMode ? '#fff' : '#gray' },
            ]}
          >
            No Restaurants Found
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const Cafeteria = ({ image }) => (
  <Image source={image} style={styles.cafeteriaImage} />
);

const CafeteriaInfo = ({ name, isDarkMode }) => (
  <View style={styles.cafeteriaInfoContainer}>
    <Text
      style={[styles.cafeteriaName, { color: isDarkMode ? "#fff" : "#000" }]}
    >
      {name}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
  },
  cafeteriaContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
    borderWidth: 0.7,
    borderColor: '#ddd',
  },
  cafeteriaImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  cafeteriaInfoContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  noRestaurantsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  noRestaurantsText: {
    fontSize: 16,
  },
});
