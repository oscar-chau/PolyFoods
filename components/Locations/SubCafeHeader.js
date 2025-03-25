import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native-elements";

const title = 'Dining Areas'

export default function SubCafeHeader({ header, isDarkMode }) {
  return (
    <View>
      <MainPicture headerImg={header} />
      <Title title={title} isDarkMode={isDarkMode} />
    </View>
  )
}

const MainPicture = ({ headerImg }) => (
  <Image source={headerImg} style={styles.image} />
);

const Title = ({ title, isDarkMode}) => (
  <Text
    style={[styles.title, { color: isDarkMode ? '#fff' : '#000'}]}
  >
    {title}
  </Text>
);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    fontSize: 29,
    fontWeight: '600',
    marginTop: 10,
    marginHorizontal: 15,
    alignSelf: 'center',
  },
});
