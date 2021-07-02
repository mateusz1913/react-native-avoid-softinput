import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { EXAMPLES } from './Examples';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      {EXAMPLES.map((example) => <Stack.Screen
        key={example.name}
        name={example.name}
        component={example.component}
      />)}
    </Stack.Navigator>
  );
};

export default Navigation;
