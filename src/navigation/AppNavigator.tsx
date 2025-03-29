import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BOOK_COLORS } from '../utils/colors';
import HomeScreen from '../screens/HomeScreen';
import ReadingScreen from '../screens/ReadingScreen';

// Define the stack navigator param list types
export type RootStackParamList = {
  Home: undefined;
  Reading: { bookColor: string };
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F6F3EA' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          options={{ headerShown: false }}
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Reading" 
          options={{ headerShown: false }}
          component={ReadingScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 