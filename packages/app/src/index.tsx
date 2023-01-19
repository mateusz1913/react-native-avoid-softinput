import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from './navigation';

function onNavigationReady() {
  RNBootSplash.hide({ fade: true });
}

export const App: React.FC = () => {
  return <GestureHandlerRootView style={styles.rootView}>
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <NavigationContainer onReady={onNavigationReady}>
          <Navigation />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>;
};

const styles = StyleSheet.create({
  rootView: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
