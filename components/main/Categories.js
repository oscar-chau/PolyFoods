import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React from "react";

const items = [
  {
    image: require("../../assets/images/shopping-bag.png"),
    text: "All",
  },
  {
    image: require("../../assets/images/soft-drink.png"),
    text: "Drinks",
  },
  // {
  // image: require("../assets/images/bread.png"),
  // text: "Bakery Items",
  // },
  {
    image: require("../../assets/images/fast-food.png"),
    text: "Combos",
  },
  {
    image: require("../../assets/images/deals.png"),
    text: "Vegeterian",
  },
  // {
  // image: require("../assets/images/coffee.png"),
  // text: "Coffee & Tea",
  // },
  {
    image: require("../../assets/images/desserts.png"),
    text: "Desserts",
  },
];

export default function Categories({ isDarkMode }) {
  return (
    <View
      style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff'}]}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={{ alignItems: "center", marginRight: 30 }}>
            <Image
              source={item.image}
              style={styles.image}
            />
            <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingVertical: 10,
    paddingLeft: 20,
  },
  image: {
    width: 50,
    height: 40,
    resizeModel: "contain",
  },
  text: {
    width: 50,
    height: 40,
    resizeMode: "contain",
  },
});
