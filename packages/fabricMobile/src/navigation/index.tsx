// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomAnimationConfigModuleExample } from '../screens/CustomAnimationConfigModuleExample';
import { CustomAnimationConfigViewExample } from '../screens/CustomAnimationConfigViewExample';
import { EnabledViewPropExample } from '../screens/EnabledViewPropExample';
import { FormExample } from '../screens/FormExample';
import { HomeScreen } from '../screens/HomeScreen';
import { KeyboardTypeExample } from '../screens/KeyboardTypeExample';
import { ModalExample } from '../screens/ModalExample';

import { ROUTES } from './routes';
// import type { RootStackParamList } from './types';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export const Navigation: React.FC = () => {
//   return <Stack.Navigator screenOptions={{ gestureEnabled: true, fullScreenGestureEnabled: true }}>
//     <Stack.Screen name={ROUTES.Home} component={HomeScreen} />
//     <Stack.Screen name={ROUTES.CustomAnimationConfigModule} component={CustomAnimationConfigModuleExample} />
//     <Stack.Screen name={ROUTES.CustomAnimationConfigView} component={CustomAnimationConfigViewExample} />
//     <Stack.Screen name={ROUTES.EnabledViewProp} component={EnabledViewPropExample} />
//     <Stack.Screen name={ROUTES.Form} component={FormExample} />
//     <Stack.Screen name={ROUTES.KeyboardType} component={KeyboardTypeExample} />
//     <Stack.Screen name={ROUTES.Modal} component={ModalExample} />
//   </Stack.Navigator>;
// };

function getChildScreenWithRoute(route: string) {
  if (route === ROUTES.CustomAnimationConfigModule) {
    return <CustomAnimationConfigModuleExample />;
  }

  if (route === ROUTES.CustomAnimationConfigView) {
    return <CustomAnimationConfigViewExample />;
  }

  if (route === ROUTES.EnabledViewProp) {
    return <EnabledViewPropExample />;
  }

  if (route === ROUTES.Form) {
    return <FormExample />;
  }

  if (route === ROUTES.KeyboardType) {
    return <KeyboardTypeExample />;
  }

  if (route === ROUTES.Modal) {
    return <ModalExample />;
  }

  return null;
}

export const Navigation: React.FC = () => {
  const [ currentRoute, setCurrentRoute ] = React.useState<string>(ROUTES.Home);

  return (
    <>
      <SafeAreaView style={styles.home}>
        <HomeScreen navigateWithRoute={setCurrentRoute} />
      </SafeAreaView>
      {currentRoute !== ROUTES.Home && 
        <View style={[ StyleSheet.absoluteFillObject, styles.childScreen ]}>
          <SafeAreaView
            // edges={[ 'top', 'left', 'right' ]}
            style={styles.childScreenHeader}>
            <Pressable
              android_ripple={{
                borderless: false,
                color: 'orange',
              }}
              onPress={() => setCurrentRoute(ROUTES.Home)}
              style={({ pressed }) => [
                styles.childScreenHeaderSideElement,
                pressed && styles.pressed,
              ]}>
              <Text style={styles.backTitle}>Back</Text>
            </Pressable>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{currentRoute}</Text>
            </View>
            <View style={styles.childScreenHeaderSideElement} />
          </SafeAreaView>
          {getChildScreenWithRoute(currentRoute)}
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  backTitle: {
    fontSize: 20,
  },
  childScreen: {
    backgroundColor: 'white',
  },
  childScreenHeader: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 80,
  },
  childScreenHeaderSideElement: {
    alignItems: 'center',
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  home: {
    alignSelf: 'stretch',
    flex: 1,
  },
  pressed: {
    opacity: Platform.select({
      ios: 0.4,
      default: 1,
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
});
