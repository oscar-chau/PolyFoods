import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import CurrentDay from "../components/todayView/CurrentDay";
import ProgressBar from "../components/todayView/ProgressBar";
import BottomTabs from "../components/BottomTabs"; // Import BottomTabs
import { Divider } from "react-native-elements";
import SubInfo from "../components/todayView/SubInfo";

//NOTES (- King Louis):
// 1. The "route" parameter in Today() is used for Previous.js aswell...for example when you finally click on
// any date in the calendar it navigates you to the today screen and the route is to update the date that was chosen
//
// 2. selecteDate: if there wasn't a selected date i.e you didn't use the calendar, you used Today as is then it will
// simply use todays date.
//
// 3. Most of this Logical stuff is in Previous.js (screen) & in CurrentDay.js (subcomponent of todayView)

export default function Today({ route, navigation, loginId, value }) {
  const initialDate = route.params?.selectedDate || new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(initialDate);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Today's Nutritional Stats</Text>
      </View>
      <CurrentDay navigation ={navigation} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <ProgressBar selectedDate={selectedDate} loginId={loginId} value={value}/>
      <View>
        <SubInfo selectedDate={selectedDate} loginId={loginId}/>
      </View>
      <Divider width={1} />
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#fff"
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
