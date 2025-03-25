import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';

export default function GeneralSetting({ isDarkMode, setIsDarkMode, value, setValue, loginId }) {
    const [inputValue, setInputValue] = useState(value);

    // Fetch current calorie goal
    useEffect(() => {
        axios.get(`https://csc308-t2-inv.onrender.com/api/goals/util/getByUserID/${loginId}`)
            .then(response => {
                if (response.data.status === "Success") {
                    setValue(response.data.data.calories.toString());
                    setInputValue(response.data.data.calories.toString());
                }
            })
            .catch(error => console.error("Error fetching calorie goal:", error));
    }, []);

    const handleCalorieChange = async () => {
        try {
            const id = await getID();
            const response = await axios.patch(`https://csc308-t2-inv.onrender.com/api/goals/${id}`, { calories: inputValue });
            if (response.data.status === "Success") {
                console.log("Calorie goal updated");
            }
        } catch (error) {
            console.error("Error updating calorie goal:", error);
        }
    };

    const getID = async () => {
        try {
            const response = await axios.get(`https://csc308-t2-inv.onrender.com/api/goals/util/getByUserID/${loginId}`);
            return response.data.data.id;
        } catch (error) {
            console.error("Error fetching user ID:", error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? "#333" : "#fff" }]}>
            <Text style={[styles.contextText, { color : isDarkMode ? '#fff' : '#000' }]}> General Settings </Text>
            <View style={styles.preferenceItem}>
                <Text style={[styles.preferenceText, { color: isDarkMode ? '#fff' : '#000' }]}>Dark Mode</Text>
                <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
            </View>
            <View style={styles.preferenceItem}>
                <Text style={[styles.preferenceText, { color: isDarkMode ? '#fff' : '#000' }]}>Calorie</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100 }}
                    onChangeText={text => setInputValue(text)} // Update local input value
                    value={inputValue}
                    keyboardType="numeric" // Ensure it's numeric input
                />
                <Button 
                    title="Update" 
                    onPress={handleCalorieChange}// Update calorie goal when button is pressed
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    contentText: {
        fontSize: 18,
    },
    preferenceItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    preferenceText: {
        fontSize: 18,
    },
});
