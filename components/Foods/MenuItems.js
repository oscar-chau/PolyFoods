import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const API_BASE_URL = "https://csc308-t2-inv.onrender.com";

//fetches id from the api
const fetchFoodListById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/items/util/getAll/${id}`
    );
    console.log("Fetched list:", response.data.data);
    return response.data.data; // Return the data array directly
  } catch (error) {
    return [];
  }
};

const fetchIdByName = async (name) => {
  if (name === 'Pom & Honey')
    name = 'Pom &amp; Honey'
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/locations/util/getByName/${name}`
    );
    console.log("Fetched id:", response.data.data.id);
    return response.data.data.id; // Return the data array directly
  } catch (error) {
    console.error("Error fetching id", error);
    return [];
  }
};

// This component will be used to display the menu items
// This component will be used to display the menu items
export default function MenuItem({ parentLocation, isDarkMode, searchQuery, loginId }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [foodList, setFoodList] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];

  const [favoritedItems, setFavoritedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedDate, setSelectedDate] = useState(currentDate); // State for selected date
  const [showDatePicker, setShowDatePicker] = useState(false); // To toggle the date picker visibility

  useEffect(() => {
    const getFoodList = async () => {
      const id = await fetchIdByName(parentLocation);
      const data = await fetchFoodListById(id);
      setFoodList(data);
    };

    getFoodList();
  }, []);

  const toggleDropdown = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFoodList = foodList.filter((food) =>
    food.item_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = async (food) => {
    const isAlreadyFavorited = favoritedItems.includes(food.id);
    try {
      if (isAlreadyFavorited) {
        await axios.delete(`${API_BASE_URL}/api/likes/${loginId}/${food.id}`);
        setFavoritedItems((prev) => prev.filter((id) => id !== food.id));
        Alert.alert("Removed", "Item removed from favorites");
      } else {
        await axios.post(`${API_BASE_URL}/api/likes`, {
          user_id: loginId,
          item_id: food.id,
        });
        setFavoritedItems((prev) => [...prev, food.id]);
        Alert.alert("Success", "Items added to favorites");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to favorite this item.");
      console.error("Favorite Error:", error);
    }
  };

  const handleAddToNutrition = async (food, date) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/tracker/spec/add`,
        {
          item_id: food.id,
          day: date,
          user_id: loginId,
        }
      );
      Alert.alert("Success", "Item Added to Nutrition.");
      console.log(response.data.data);
      setModalVisible(false); // Close the modal after adding
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const generateFutureDates = () => {
    const futureDates = [];
    const today = new Date();
    
    // Generate 100 future dates (you can adjust this number for your requirements)
    for (let i = 0; i < 365; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i); // Increment the date by i days
      futureDates.push(newDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    }
    
    return futureDates;
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "#fff" },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {filteredFoodList.length > 0 ? (
        filteredFoodList.map((food, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => toggleDropdown(index)}>
              <View style={styles.menuItemStyle}>
                <FoodInfo title={food.item_name} isDarkMode={isDarkMode} />
                <Ionicons
                  name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={isDarkMode ? "#fff" : "#000"}
                />
              </View>
            </TouchableOpacity>
            {expandedIndex === index && (
              <View
                style={[
                  styles.dropdownStyle,
                  { backgroundColor: isDarkMode ? "#333" : "#f8f8f8" },
                ]}
              >
                <View style={styles.dropdownContent}>
                  <View>
                    <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
                      Calories: {food.calories}
                    </Text>
                    <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
                      Protein: {food.protein}
                    </Text>
                    <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
                      Fat: {food.fat}
                    </Text>
                    <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
                      Carbs: {food.carbs}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleFavorite(food)}
                    style={styles.favoriteIcon}
                  >
                    <Ionicons
                      name={favoritedItems.includes(food.id) ? "heart" : "heart-outline"}
                      size={30}
                      color="red"
                    />
                  </TouchableOpacity>
                </View>
                <Button
                  title="Add to Nutrition"
                  onPress={() => handleAddToNutrition(food, currentDate)}
                />
                <Button
                  title="Pick Date for Nutrition"
                  onPress={() => setModalVisible(true)} // Open the modal
                />
              </View>
            )}
            <Divider
              width={0.5}
              color={isDarkMode ? "#777" : "#ccc"}
              orientation="vertical"
              style={{ marginHorizontal: 20 }}
            />
          </View>
        ))
      ) : (
        <View style={styles.noResultsContainer}>
          <Text
            style={[
              styles.noResultsText,
              { color: isDarkMode ? "#bbb" : "gray" },
            ]}
          >
            No Menu Items Found
          </Text>
        </View>
      )}

      {/* Modal for Date Picker */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pick a Date</Text>
          {/* Picker to select a date */}
          <Picker
            selectedValue={selectedDate}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedDate(itemValue)}
          >
            {/* Dynamically generate future dates */}
            {generateFutureDates().map((date) => (
              <Picker.Item key={date} label={date} value={date} />
            ))}
          </Picker>

<View style={styles.modalButtonContainer}>
          <Button
            title="Add to Nutrition"
            onPress={() => {
              handleAddToNutrition(filteredFoodList[expandedIndex], selectedDate);
            }}
          />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const FoodInfo = ({ title, isDarkMode }) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={[styles.titleStyle, { color: isDarkMode ? "#fff" : "#000" }]}>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
    borderRadius: 8,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
  dropdownStyle: {
    padding: 10,
    borderRadius: 8,
  },
  dropdownContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noResultsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 16,
  },
  favoriteIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  picker: {
    width: "80%",
    height: 150,
  },
  modalButtonContainer: {
    marginTop: 50,
  },
});