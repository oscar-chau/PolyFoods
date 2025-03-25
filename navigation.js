import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Home from "./screens/Home";
//import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Main from "./screens/Main";
import Unfinished from "./screens/Unfinished";
import Today from "./screens/Today";
import Previous from "./screens/Previous";
import Settings from "./screens/Settings";
import Favorites from "./screens/Favorites";
import LOCATIONS from "./screens/LOCATIONS";
import FOODS from "./screens/FOODS";
import StartScreen from "./screens/StartScreen";
import Profile from "./screens/Profile";
import LoginOrSignup from "./screens/LoginOrSignup";
import SignIn from "./screens/SignIn";

export default function RootNavigation ({isDarkMode, setIsDarkMode, loginId, setLoginId, value, setValue}) {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="StartScreen" screenOptions={screenOptions}>
                <Stack.Screen name='StartScreen' component={StartScreen}/>
                <Stack.Screen name='Home'>
                    {(props) => <Home {...props} isDarkMode={isDarkMode} loginId={loginId}/>}
                </Stack.Screen>
                <Stack.Screen name='Main'>
                    {(props) => <Main {...props} isDarkMode={isDarkMode} />}
                </Stack.Screen>
                <Stack.Screen name="SignIn">
                    {(props) => <SignIn {...props} setLoginId={setLoginId} />}
                </Stack.Screen>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="Unfinished" component={Unfinished}/>
                <Stack.Screen name="StartingScreen">
                    {(props) => <StartingScreen {...props} isDarkMode={isDarkMode}/>}
                </Stack.Screen>
                <Stack.Screen name="Today">
                    {(props) => <Today {...props} loginId={loginId} value = {value}/>}
                </Stack.Screen>
                <Stack.Screen name = "Previous" component={Previous}/>
                <Stack.Screen name = "Settings">
                    {(props) => <Settings {...props} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} value = {value} setValue = {setValue} loginId={loginId}/>}
                </Stack.Screen>
                <Stack.Screen name="Favorites">
                    {(props) => <Favorites {...props} loginId={loginId} isDarkMode={isDarkMode}/>}
                </Stack.Screen>
                <Stack.Screen name="LOCATIONS">
                    {(props) => <LOCATIONS {...props} isDarkMode={isDarkMode}/>}
                </Stack.Screen>
                <Stack.Screen name="FOODS">
                    {(props) => <FOODS {...props} isDarkMode={isDarkMode} loginId={loginId}/>}
                </Stack.Screen>
                <Stack.Screen name = "Profile">
                    {(props) => <Profile {...props} loginId={loginId} setLoginId={setLoginId} />}
                </Stack.Screen>
                <Stack.Screen name = "LoginOrSignup" component={LoginOrSignup}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
