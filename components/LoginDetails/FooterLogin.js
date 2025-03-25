import { View, Text } from 'react-native'
import React from 'react'

export default function FooterLogin() {
  return (
    <View>
      <ForgotPassword />
    </View>
  )
}

const ForgotPassword = () => (
  <Text 
    style={{
      textDecorationLine: 'underline',
      alignSelf: 'center',
      fontSize: 20,
      fontWeight: '300',
      color: 'black',
      marginTop: 40
    }}
  >
    Forgot Password
  </Text>
)
