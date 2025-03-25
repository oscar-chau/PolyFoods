import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios'

const API_BASE_URL = "https://csc308-t2-inv.onrender.com";

export default function SubInfo({ selectedDate , loginId }) {
  const [nutritionData, setNutritionData] = useState({
    protein: 0,
    fat: 0,
    carbs: 0
  });

  useEffect(() => {
    // Fetch data from the API
    const fetchNutritionData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/tracker/spec/DaU/${selectedDate}/${loginId}`);
        // Sum up the nutrients (protein, fat, carbs) from the data
        const totalProtein = response.data.data.reduce((acc, item) => acc + item.protein, 0);
        const totalFat = response.data.data.reduce((acc, item) => acc + item.fat, 0);
        const totalCarbs = response.data.data.reduce((acc, item) => acc + item.carbs, 0);

        // Update state with the total values
        setNutritionData({
          protein: totalProtein,
          fat: totalFat,
          carbs: totalCarbs
        });
      } catch (error) {
        setNutritionData({
          protein: 0,
          fat: 0,
          carbs: 0
        })
      }
    };

    fetchNutritionData();
  }, [selectedDate]);

  return (
    <View>
      <Text style={styles.infoText}>Protein: {nutritionData.protein}g</Text>
      <Text style={styles.infoText}>Fat: {nutritionData.fat}g</Text>
      <Text style={styles.infoText}>Carbohydrates: {nutritionData.carbs}g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoText: {
    fontSize: 20,
  },
});
