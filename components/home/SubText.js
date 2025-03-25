import React from 'react'
import { Text, View } from 'react-native'
import { Divider } from 'react-native-elements'

export default function SubText() {
  return (
    <View style={{flexDirection: 'row', }}>
        <Text style={{
                color: 'white',
                fontSize: 28,
                fontWeight: '400',
                fontFamily: "Helvetica",
                alignSelf: 'center',
            }}
        >
            Today
        </Text>
        <Text style={{
                color: 'white',
                fontSize: 28,
                fontWeight: '400',
                fontFamily: "Helvetica",
                alignSelf: 'center',
            }}
        >
            Previous
        </Text>
    </View>
  )
}
