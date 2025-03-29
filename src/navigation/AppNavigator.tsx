import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BOOK_COLORS } from '../utils/colors';
import HomeScreen from '../screens/HomeScreen';
import ReadingScreen from '../screens/ReadingScreen';
import QuotesScreen from '../screens/QuotesScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import AddBookScreen from '../screens/AddBookScreen';

// Define the stack navigator param list types
export type RootStackParamList = {
  Home: undefined;
  Reading: { bookColor: string };
  Quotes: undefined;
  BookDetail: { bookColor: string };
  AddBook: undefined;
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
        <Stack.Screen 
          name="Quotes" 
          options={{ headerShown: false }}
          component={QuotesScreen} 
        />
        <Stack.Screen 
          name="BookDetail" 
          options={{ headerShown: false }}
          component={BookDetailScreen} 
        />
        <Stack.Screen 
          name="AddBook" 
          options={{ headerShown: false }}
          component={AddBookScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 