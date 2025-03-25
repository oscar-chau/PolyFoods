import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

const API_BASE_URL = "https://csc308-t2-inv.onrender.com";

export default function Buttons({ navigation, setLoginId }) {
  return (
    <View>
      <LoginForm navigation={navigation} setLoginId={setLoginId}/>
    </View>
  )
}

const LoginForm = ({ navigation, setLoginId}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required!')
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/auth/login`, {
        email,
        password
      })
      setLoginId(response.data.data.id)
      console.log('Login Success:', response.data)
      Alert.alert('Success', 'Login successful!')

      navigation.navigate('Home')

    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View>
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Entypo name='mail' size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        {email.length > 0 && (
          <TouchableOpacity onPress={() => setEmail('')}>
            <Ionicons name="close-circle" size={24} style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Entypo name='lock' size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        {password.length > 0 && (
          <TouchableOpacity onPress={() => setPassword('')}>
            <Ionicons name="close-circle" size={24} style={styles.clearIcon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <Button
        title={isLoading ? 'Logging In...' : 'Log In'}
        onPress={handleLogin}
        buttonStyle={styles.buttonStyle}
        disabled={isLoading}
      />

      <DontHaveAnAccount navigation={navigation} />
    </View>
  )
}

const DontHaveAnAccount = ({ navigation }) => (
  <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
    <Text style={{ color: '#595b58', fontSize: 15 }}>
      Don't have an account?
      <Text
        style={styles.signUpText}
        onPress={() => navigation.navigate('Signup')}
      >
        Sign Up!
      </Text>
    </Text>
  </View>
)

//styles
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    marginTop: 20,
    paddingHorizontal: 15,
    height: 50,
  },
  icon: {
    marginRight: 10,
    color: '#595b58',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  clearIcon: {
    color: '#595b58',
    marginRight: 10,
  },
  eyeIcon: {
    color: '#595b58',
  },
  buttonStyle: {
    height: 50,
    backgroundColor: 'green',
    marginTop: 15,
    borderRadius: 50,
  },
  logoutContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  logoutButton: {
    height: 50,
    backgroundColor: 'red',
    borderRadius: 50,
  },
  signUpText: {
    color: 'black',
    fontWeight: '300',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
})

