import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from "react";

import Home from './screens/Home';
import RootNavigation from './navigation';
import Signup from './screens/Signup';
import Login from './screens/Login';

import SubCafes, { allSubCafes } from './components/Locations/SubCafes';
import Unfinished from './screens/Unfinished';
import Today from './screens/Today';
import VENUE from './screens/FOODS';
import {useState} from "react";

// If you want to see each screen individually change the tag below to one the thingies on top

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loginId, setLoginId] = useState(0);
  const [value, setValue] = useState(0);
  // Fixed dimensions for iPhone 12
  const width = 400;
  const height = 860;

  return (
    <View style={[styles.wrapper, {backgroundColor: isDarkMode ? '#121212' : '#fff'}]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={[styles.container, { width, height }]}>
        <View style={styles.navigationWrapper}>
          <RootNavigation
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          loginId = {loginId}
          setLoginId = {setLoginId}
          value = {value}
          setValue = {setValue}
          />
        </View>
        {/* Uncomment the screen you want to display */}
        {/* <LoadingScreen /> */}
        {/*<Main />*/}
        {/* <Signup /> */}
        {/* <Login /> */}
        {/* <SubCafes /> */}
        {/* <Unfinished /> */}
        {/* <StartingScreen /> */}
        {/* <Today /> */}
        {/* <VENUE /> */}
        <View style={styles.info}>
        </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Ensure background color is set
  },
  container: {
    width: 390,
    height: 844,
    justifyContent: 'flex-start', // Changed to flex-start to align content to the top
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    backgroundColor: '#fff', // Ensure background color is set
  },
  navigationWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  info: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  text: {
    fontSize: 20,
  },
});
