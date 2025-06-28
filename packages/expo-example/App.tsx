import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from './src/navigation';

const App = () => {
  // DUMMY
  return (
    <GestureHandlerRootView style={styles.rootView}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootView: {
    alignSelf: 'stretch',
    flex: 1,
  },
});

export default App;
