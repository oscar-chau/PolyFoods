import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

//NOTES (- King Louis):
// 1. handlePreviousDay & handleNextDay are for when you press the arrows, either left or right
//    just +1 or -1, I still don't know how to connect this to backend but for now just trying to make it work dynamically.

export default function CurrentDay({navigation, selectedDate, setSelectedDate}) {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [date, setDate] = useState(new Date(selectedDate + "T00:00:00")); // Use the selected date

  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setSelectedDate(previousDay.toISOString().split("T")[0]); //update state in Today.js
  }

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay.toISOString().split("T")[0]); // Update state in Today.js
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "white"}}>
      <TouchableOpacity onPress={handlePreviousDay}>
        <Text style={styles.arrows}>
          {"<"}
        </Text>
      </TouchableOpacity>
{/* ----------------------------------- */}
  <Text style={styles.dateText}>
    {new Date(selectedDate + "T12:00:00").toDateString()}
  </Text>
{/* ----------------------------------- */}
      <TouchableOpacity onPress={handleNextDay}>
        <Text style={styles.arrows}>
          {">"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  arrows:{
    fontSize: 50,
    fontWeight: '400'
  },
  dateText: {
    fontSize: 40,
    fontWeight: "400",
    textAlign: "center",
    color: "black",
  }
})