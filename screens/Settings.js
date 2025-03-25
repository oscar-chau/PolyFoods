import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Switch,TextInput } from 'react-native';
import { Divider } from 'react-native-elements';
import BottomTabs from '../components/BottomTabs';
import GeneralSetting from '../components/Settings/GeneralSetting';


export default function Settings ({ navigation, isDarkMode, setIsDarkMode, value, setValue , loginId}) {
  //const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState("General");

  const renderContent = () => {
        return <GeneralSetting isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} value={value} setValue={setValue} loginId={loginId} />;
    }


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#333" : "#fff"}]}>
      <View style={styles.contentContainer}>
        <Divider orientation="vertical" width={1} />
        <View style={styles.content}>{renderContent()}</View>
      </View>
      <Divider width={1} color={isDarkMode ? '#444' : '#ddd'}/>
      <BottomTabs navigation={navigation} isDarkMode={isDarkMode} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: '27%',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  tabText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  contentText: {
    fontSize: 18,
  },
});
