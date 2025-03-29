/**
 * BookSelf - A React Native Library App
 */

// Add type declaration for PNG files
declare module '*.png';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

// Ignore specific warnings if needed
LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native',
]);

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
