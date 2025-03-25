import React from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import WelcomeText from "../components/home/WelcomeText";
import SelectView from "../components/home/SelectView";
import SelectView2 from "../components/home/SelectView2";
import BottomTabs from "../components/BottomTabs";
import { Divider } from "react-native-elements";

export default function Home({ navigation, isDarkMode, loginId }) {
  return (
    // View: The Container
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff', flex: 1}]}>
      <View style={styles.content}>
        {/* Subcomponent: Welcome + Go to */}
        <WelcomeText loginId={loginId} isDarkMode={isDarkMode} />
        <View style={styles.selectionContainer}>
          {/* Today Image + Today Text */}
          <SelectView navigation={navigation} isDarkMode={isDarkMode}/>
          {/* Subcomponent: Previous Image + Previous Text */}
          <SelectView2 navigation={navigation} isDarkMode={isDarkMode}/>
        </View>
      </View>
        {/* Barely Visible Divider between Container & BottomTabs */}
        {/* Imported Bottom Tabs from Home Folder */}
      <Divider width={1} color={isDarkMode ? '#444' : '#ddd'}/>
      <BottomTabs navigation={navigation} isDarkMode={isDarkMode}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 1,
  },
  bottomTabContainer: {
    bottom: 0,
    width: "100%",
    //paddingBottom: 10,
  },
});
