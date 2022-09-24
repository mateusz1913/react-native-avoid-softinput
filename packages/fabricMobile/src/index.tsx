// import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from './navigation';

function onNavigationReady() {
  RNBootSplash.hide({ fade: true });
}

export const App: React.FC = () => {
  React.useEffect(() => {
    onNavigationReady();
  }, []);

  return <SafeAreaProvider>
    {/* <NavigationContainer onReady={onNavigationReady}> */}
       <Navigation />
    {/* </NavigationContainer> */}
  </SafeAreaProvider>;
};
