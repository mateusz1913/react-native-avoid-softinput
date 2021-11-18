import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import { styles } from '../consts/styles';
import { ROUTES } from '../navigation/routes';
import type { RootStackNavigationProp } from '../navigation/types';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <SafeAreaView edges={[ 'left', 'right', 'bottom' ]} style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <View style={styles.item}>
          <Button
            onPress={() => navigation.navigate(ROUTES.ModuleExamples)}
            title="Module Examples"
          />
        </View>
        <View style={styles.item}>
          <Button
            onPress={() => navigation.navigate(ROUTES.ViewExamples)}
            title="View Examples"
          />
        </View>
      </View>
      {Platform.OS === 'android' ? <View style={localStyles.adjustContainer}>
        <View style={localStyles.adjustItem}>
          <Button
            onPress={() => AvoidSoftInput.setAdjustNothing()}
            title="Adjust Nothing"
          />
        </View>
        <View style={localStyles.adjustItem}>
          <Button
            onPress={() => AvoidSoftInput.setAdjustPan()}
            title="Adjust Pan"
          />
        </View>
        <View style={localStyles.adjustItem}>
          <Button
            onPress={() => AvoidSoftInput.setAdjustResize()}
            title="Adjust Resize"
          />
        </View>
        <View style={localStyles.adjustItem}>
          <Button
            onPress={() => AvoidSoftInput.setAdjustUnspecified()}
            title="Adjust Unspecified"
          />
        </View>
        <View style={localStyles.adjustItem}>
          <Button
            onPress={() => AvoidSoftInput.setDefaultAppSoftInputMode()}
            title="Default softinput mode"
          />
        </View>
      </View> : null}
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  adjustContainer: {
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingHorizontal: 40,
  },
  adjustItem: {
    marginVertical: 10,
  },
});

export default HomeScreen;
