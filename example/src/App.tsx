import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Screens from './screens';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
