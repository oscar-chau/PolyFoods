import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import axios from "axios";

const API_BASE_URL = "https://csc308-t2-inv.onrender.com";

export default function ProgressBar({ selectedDate, loginId, value }) {
  const [currentCalories, setCurrentCalories] = useState(0);
  const [caloriesLimit, setCaloriesLimit] = useState(2000); // Default value is 2000
  const [foodItems, setFoodItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log("Fetching new data for:", selectedDate);
    if (selectedDate && loginId) {
      fetchCaloriesData();
      fetchCalorieLimit(); // Fetch calorie limit when the component mounts or selectedDate changes
    }
  }, [selectedDate, loginId]);

  const fetchCalorieLimit = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/goals/util/getByUserID/${loginId}`);
      setCaloriesLimit(response.data.data.calories); // Set the fetched calorie limit to state
    } catch (error) {
      console.error("Error getting calories limit", error);
    }
  };

  const fetchCaloriesData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tracker/spec/DaU/${selectedDate}/${loginId}`);
      const totalCalories = response.data.data.reduce((acc, item) => acc + item.calories, 0);
      setCurrentCalories(totalCalories);
      setFoodItems(response.data.data);
    } catch (error) {
      setCurrentCalories(0);
      Alert.alert("Error", "Failed to fetch calorie data.");
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/tracker/spec/deleteFromDate`, {
        data: {
          day: selectedDate,
          user_id: loginId,
          item_id: itemId,
        },
      });
      fetchCaloriesData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Progress.Circle
        style={{ marginTop: 20 }}
        progress={currentCalories / Math.max(1, caloriesLimit)}
        size={350}
        color={"#1fd324"}
        unfilledColor={"#f0f0f0"}
        borderWidth={1}
        borderColor={"#ccc"}
        thickness={10}
        showsText={true}
        formatText={() => `${currentCalories} / ${caloriesLimit} calories`}
        textStyle={styles.progressText}
      />

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Show Items</Text>
      </TouchableOpacity>

      <Modal animationType="none" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Food Items</Text>
            <ScrollView style={styles.itemsList}>
              {foodItems.length > 0 ? (
                foodItems.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <Text style={styles.itemText}>• {item.item_name}</Text>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
                      <Text style={styles.deleteButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.itemText}>No items found.</Text>
              )}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  progressText: {
    fontSize: 20,
    color: "black",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  itemsList: {
    maxHeight: 200,
    width: "100%",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
