import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { Image } from "react-native-elements";

export default function About({ parentLocation, parentName, parentImage, isDarkMode}) {
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff'}]}>
      <CafeImage image={parentImage} />
      <CafeTitle title={parentName} isDarkMode={isDarkMode}/>
      {/* <CafeDescription description={description}/> */}
    </View>
  );
}

const CafeImage = ({image}) => (
  <Image source={image} style={styles.image} />
);

const CafeTitle = ({title, isDarkMode}) => (
  <Text
    style={[styles.title, { color: isDarkMode ? '#fff' : '#000'}]}
  >
    {title}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    marginTop: 10,
    marginHorizontal: 15,
  },
});
