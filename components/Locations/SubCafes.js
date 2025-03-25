import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import { locationList } from "../DATA";

export default function SubCafes({ navigation, parentVenue, isDarkMode, searchQuery }) {
  const filteredLocations = locationList.filter(
    (item) => item.ParentVenue === parentVenue && item.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {filteredLocations.map((location, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 30 }}
          onPress={() =>
            navigation.navigate("FOODS", {
              parentLocation: location.Name,
              parentImage: location.Image,
              parentName: location.Name,
            })
          }
        >
          <View
            style={[
              styles.cafeContainer,
              { backgroundColor: isDarkMode ? "#333" : "white", borderColor: isDarkMode ? '#666' : '#ddd' },
            ]}
          >
            <SubCafeteria image={location.Image} />
            <SubCafeteriaInfo name={location.Name} isDarkMode={isDarkMode} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const SubCafeteria = ({ image }) => (
  <Image source={image} style={styles.image} />
);

const SubCafeteriaInfo = ({ name, isDarkMode }) => (
  <View style={styles.infoContainer}>
    <Text style={[styles.infoText, { color: isDarkMode ? "#fff" : "#000" }]}>
      {name}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 30,
  },
  cafeContainer: {
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
});