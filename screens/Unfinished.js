import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'

import cat from '../assets/sadcat.jpg'

export default function Unfinished() {
  return (
    <View>
      <Image source={cat} style={{width: '100%', height: 200, marginTop: 300}}/>
      <Text style={{alignSelf:'center', fontSize: 30}}>under construction sorry</Text>
    </View>
  )
}