import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from '../screens/HomeScreen';

import { ROUTES } from './routes';
import { SCREENS } from './screens';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return <Stack.Navigator>
    <Stack.Screen name={ROUTES.Home} component={HomeScreen} />
    {SCREENS.map((screen) => <Stack.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
    />)}
  </Stack.Navigator>;
};

export default Navigation;
