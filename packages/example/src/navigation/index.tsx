import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { BottomSheetExample } from '../screens/BottomSheetExample';
import { CustomAnimationConfigModuleExample } from '../screens/CustomAnimationConfigModuleExample';
import { CustomAnimationConfigViewExample } from '../screens/CustomAnimationConfigViewExample';
import { EnabledViewPropExample } from '../screens/EnabledViewPropExample';
import { FormExample } from '../screens/FormExample';
import { HomeScreen } from '../screens/HomeScreen';
import { KeyboardTypeExample } from '../screens/KeyboardTypeExample';
import { ModalExample } from '../screens/ModalExample';
import { ModalFormSheetExample } from '../screens/ModalFormSheetExample';
import { PasswordFormExample } from '../screens/PasswordFormExample';
import { ReanimatedExample } from '../screens/ReanimatedExample';
import { ScreensNativeModalExample } from '../screens/ScreensNativeModalExample';
import { StickyFooterExample } from '../screens/StickyFooterExample';

import { ROUTES } from './routes';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: true, fullScreenGestureEnabled: true }}>
      <Stack.Screen name={ROUTES.Home} component={HomeScreen} />
      <Stack.Screen name={ROUTES.BottomSheet} component={BottomSheetExample} />
      <Stack.Screen name={ROUTES.CustomAnimationConfigModule} component={CustomAnimationConfigModuleExample} />
      <Stack.Screen name={ROUTES.CustomAnimationConfigView} component={CustomAnimationConfigViewExample} />
      <Stack.Screen name={ROUTES.EnabledViewProp} component={EnabledViewPropExample} />
      <Stack.Screen name={ROUTES.Form} component={FormExample} />
      <Stack.Screen name={ROUTES.KeyboardType} component={KeyboardTypeExample} />
      <Stack.Screen name={ROUTES.Modal} component={ModalExample} />
      <Stack.Screen name={ROUTES.ModalFormSheet} component={ModalFormSheetExample} />
      <Stack.Screen name={ROUTES.PasswordForm} component={PasswordFormExample} />
      <Stack.Screen name={ROUTES.Reanimated} component={ReanimatedExample} />
      <Stack.Screen
        name={ROUTES.ScreensNativeModal}
        component={ScreensNativeModalExample}
        options={{ animation: 'default', headerShown: false, presentation: 'formSheet' }}
      />
      <Stack.Screen name={ROUTES.StickyFooter} component={StickyFooterExample} />
    </Stack.Navigator>
  );
};
