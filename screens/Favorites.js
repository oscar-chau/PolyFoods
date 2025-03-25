import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, Alert, Button, TouchableOpacity, Modal } from 'react-native';
import BottomTabs from '../components/BottomTabs';
import { Divider } from 'react-native-elements';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const API_BASE_URL = "https://csc309-backend-3h2q.onrender.com";

export default function Favorites({ navigation, isDarkMode, loginId }) {
  const [favorites, setFavorites] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // To track which item is expanded
  const currentDate = new Date().toISOString().split("T")[0];

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedDate, setSelectedDate] = useState(currentDate); // State for selected date

  useEffect(() => {
    console.log('Current loginId:', loginId);
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/likes/${loginId}`);
        if (response.data && Array.isArray(response.data.data)){
          setFavorites(response.data.data);
        } else{
          setFavorites([]);
        }
      } catch (error) {
        //console.log('Error', 'Unable to fetch favorites.');
      }
    };

    fetchFavorites();
  }, [navigation, loginId]);

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: isDarkMode ? '#bbb' : '#888'}]}>No favorites yet!</Text>
      <Text style={[styles.emptySubText, { color: isDarkMode ? '#bbb' : '#888'}]}>Your favorite items will appear here.</Text>
    </View>
  );

  const handleAddToNutrition = async (item, date) => {
    try {
      await axios.post(`${API_BASE_URL}/api/tracker/spec/add`, {
        item_id: item.id,
        day: date,
        user_id: loginId,
      });
      Alert.alert('Success', 'Item added to Nutrition');
      setModalVisible(false); // Close the modal after adding
    } catch (error) {
      Alert.alert('Error', 'Unable to add item to Nutrition.');
    }
  };

  const handleRemoveFromFavorites = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/likes/${loginId}/${itemId}`);
      setFavorites(favorites.filter(item => item.id !== itemId)); // Update local state to remove item
      Alert.alert('Success', 'Item removed from favorites');
    } catch (error) {
      Alert.alert('Error', 'Unable to remove item from favorites.');
    }
  };

  const toggleDropdown = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle the dropdown
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

  const renderItem = ({ item, index }) => (
    <View style={[styles.itemContainer, { backgroundColor: isDarkMode ? '#333' : '#fff'}]}>
      <TouchableOpacity onPress={() => toggleDropdown(index)}>
        <Text style={[styles.itemText, { color: isDarkMode ? '#fff' : '#000'}]}>{item.item_name}</Text>
      </TouchableOpacity>

      {expandedIndex === index && (
        <View style={[styles.dropdownStyle, { backgroundColor: isDarkMode ? '#444' : '#f8f8f8'}]}>
          <Text style={[styles.detailsText, { color: isDarkMode ? "#ddd" : "#555" }]}>Calories: {item.calories}</Text>
          <Text style={[styles.detailsText, { color: isDarkMode ? "#ddd" : "#555" }]}>Protein: {item.protein}</Text>
          <Text style={[styles.detailsText, { color: isDarkMode ? "#ddd" : "#555" }]}>Fat: {item.fat}</Text>
          <Text style={[styles.detailsText, { color: isDarkMode ? "#ddd" : "#555" }]}>Carbs: {item.carbs}</Text>
          <Button
            title="Add to Nutrition"
            onPress={() => handleAddToNutrition(item, currentDate)}
          />
          <Button
            title="Pick Date for Nutrition"
            onPress={() => setModalVisible(true)} // Open the modal
          />
          <Button
            title="Remove from Favorites"
            onPress={() => handleRemoveFromFavorites(item.id)}
          />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff'}]}>
      <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#000'}]}> Favorite Foods</Text>
      <Divider width={1} color={isDarkMode ? '#777' : '#ccc'} style={{ marginBottom: 10 }} />

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyList} // Show this when the list is empty
      />

      <Divider width={1} color={isDarkMode ? '#777' : '#ccc'} />
      <BottomTabs navigation={navigation} isDarkMode={isDarkMode}/>

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
                handleAddToNutrition(favorites[expandedIndex], selectedDate);
              }}
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
  emptySubText: {
    fontSize: 14,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
  },
  dropdownStyle: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    paddingVertical: 2,
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