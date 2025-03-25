import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import daily from '../../assets/daily.png'
import monthly from '../../assets/monthly.png'
import { Divider } from 'react-native-elements'

export default function SelectView({navigation}) {
  return (
    <View style={{flexDirection: 'Column'}}>
      <TouchableOpacity 
      activeOpacity={0.7}
      onPress={()=>navigation.navigate("Previous")}
      >
        <Image source={monthly} borderRadius={25}
         style={{
            marginTop: 100,
            width: 175,
            height:175,
            }}
        />
      </TouchableOpacity>
      <Text style={{
                      color: '#3A913F',
                      fontSize: 28,
                      fontWeight: '400',
                      fontFamily: "Chalkboard SE",
                      alignSelf: 'center',
                      marginTop: 10,
                  }}
              >
                  Previous
              </Text>
    </View>
  )
}
