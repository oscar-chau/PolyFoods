import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import BottomTabs from "../components/BottomTabs"; // Import BottomTabs
import { Divider } from "react-native-elements";

//NOTES (- King Louis):
// 1. this shit is messy ngl gng my fault on g.o.d
//
// 2. for now whenever you click a day it just takes you the Today.js screen with the updated
//    date however nothing else changes just yet
//
// 3. NO OTHER QUIRKY features for calendar & I still need to make the calendar more user friendly
//    cuz this shit is tiny as fuck and is annoying. IF anyone wants to help look at
//    react-native-calendars I cant read documentation to save my fucking life

export default function Previous({ navigation }) {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date
  const [markedDates, setMarkedDates] = useState({
    [today]: { selected: true, selectedColor: "gray" } // Default highlight for today
  });

  // On onDayPress I have it set to go to Today Screen; No Dynamic shit just yet
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={markedDates} // Re-enable marking selected days
          style={{
            width: 400,
            alignSelf: 'center',
            marginTop: -25,
          }}
          onDayPress={(day) => {
            // Ensure 'day' is passed correctly here
            if (day) {
              setSelectedDate(day.dateString); // Update selected date state
              navigation.navigate("Today", { selectedDate: day.dateString }); // Pass date to Today.js
            }
          }}
          renderHeader={(date) => (
            <Text style={{ fontSize: 20, fontWeight: "400", color: "black" }}>
              {new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </Text>
          )}
        />
      </View>
      <View style={styles.bottomTabsContainer}>
        <Divider width={1} />
        <BottomTabs navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  calendarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTabsContainer: {
    height: 60,
    justifyContent: "flex-end",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdown: {
    width: 250,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  option: {
    fontSize: 16,
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  nutritionalTracker: {
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  cancel: {
    fontSize: 16,
    padding: 10,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
});

// Extra stuff that could be useful in the future but not what we are looking for right now
//       {/* DROPDOWN MODAL */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.dropdown}>
            <Text style={styles.modalTitle}>Options for {selectedDate}</Text>

            <TouchableOpacity onPress={() => { alert("🔴 Marked as DogShit"); setModalVisible(false); }}>
              <Text style={styles.option}>🔴 Mark as DogShit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { alert("🟡 Marked as Yellow?"); setModalVisible(false); }}>
              <Text style={styles.option}>🟡 I am yellow</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { alert("🟢 Marked as Important"); setModalVisible(false); }}>
              <Text style={styles.option}>🟢 Mark as Important</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { alert("This should take me to Tracker but NOT DONE"); setModalVisible(false); }}>
              <Text style={styles.nutritionalTracker}>Go to Nutritional Tracker </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal> */}
