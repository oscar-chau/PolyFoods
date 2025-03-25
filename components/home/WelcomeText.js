import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from "axios";

const API_BASE_URL = "https://csc308-t2-inv.onrender.com";

export default function WelcomeText({ loginId }) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        console.log('Current loginId:', loginId); // Debugging log
    
        const fetchUser = async () => {
            if (!loginId || loginId === 0) {  
                setUsername("Guest");
                return;
            }
    
            try {
                const response = await axios.get(`${API_BASE_URL}/api/users/${loginId}`);
                console.log('Fetched user:', response.data);  // Log full response
                setUsername(response.data.data.username);
            } catch (error) {
                console.error('Error fetching user:', error.response ? error.response.data : error.message);
                setUsername("Guest");
            }
        };
    
        fetchUser();
    }, [loginId]);
    

    return (
        <View>
            <Text 
                style={{
                    color: '#3A913F',
                    fontSize: 50,
                    fontWeight: '500',
                    fontFamily: "Chalkboard SE",
                    alignSelf: 'center',
                    marginTop: 75
                }}
            >
                 Poly Meals
            </Text>
            <Text
                style={{
                    color: '#3A913F',
                    fontSize: 30,
                    fontWeight: '200',
                    fontFamily: "Chalkboard SE",
                    alignSelf: 'center',
                    marginTop: 10
                }}
            >
                Welcome Back! {username || 'Loading...'}
            </Text>
        </View>
    );
}
