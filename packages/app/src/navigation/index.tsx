import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import ModuleExamples from '../screens/moduleExamples';
import ModuleFullScreenExamples from '../screens/moduleExamples/fullscreenExamples';
import ModuleScrollExamples from '../screens/moduleExamples/scrollExamples';
import ViewExamples from '../screens/viewExamples';
import ViewFullScreenExamples from '../screens/viewExamples/fullscreenExamples';
import ViewModalExamples from '../screens/viewExamples/modalExamples';

import { ROUTES } from './routes';
import { MODULE_FULL_SCREEN_EXAMPLES, MODULE_SCROLL_EXAMPLES, VIEW_FULL_SCREEN_EXAMPLES, VIEW_MODAL_EXAMPLES } from './screens';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return <Stack.Navigator>
    <Stack.Screen name={ROUTES.Home} component={HomeScreen} />
    <Stack.Screen name={ROUTES.ModuleExamples} component={ModuleExamples} />
    <Stack.Screen name={ROUTES.ModuleFullScreenExamples} component={ModuleFullScreenExamples} />
    <Stack.Screen name={ROUTES.ModuleScrollExamples} component={ModuleScrollExamples} />
    <Stack.Screen name={ROUTES.ViewExamples} component={ViewExamples} />
    <Stack.Screen name={ROUTES.ViewFullScreenExamples} component={ViewFullScreenExamples} />
    <Stack.Screen name={ROUTES.ViewModalExamples} component={ViewModalExamples} />
    {MODULE_FULL_SCREEN_EXAMPLES.map((screen) => <Stack.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
    />)}
    {MODULE_SCROLL_EXAMPLES.map((screen) => <Stack.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
    />)}
    {VIEW_FULL_SCREEN_EXAMPLES.map((screen) => <Stack.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
    />)}
    {VIEW_MODAL_EXAMPLES.map((screen) => <Stack.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
    />)}
  </Stack.Navigator>;
};

export default Navigation;
