import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import SingleInput from '../../../components/SingleInput';

const CustomAnimationConfigModule: React.FC = () => {
  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);
    AvoidSoftInput.setEasing('easeOut');
    AvoidSoftInput.setHideAnimationDelay(1000);
    AvoidSoftInput.setHideAnimationDuration(600);
    AvoidSoftInput.setShowAnimationDelay(1000);
    AvoidSoftInput.setShowAnimationDuration(1200);
    return () => {
      AvoidSoftInput.setEasing('linear');
      AvoidSoftInput.setHideAnimationDelay();
      AvoidSoftInput.setHideAnimationDuration();
      AvoidSoftInput.setShowAnimationDelay();
      AvoidSoftInput.setShowAnimationDuration();
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setDefaultAppSoftInputMode();
    };
  }, []);
  
  useFocusEffect(onFocusEffect);

  return <SafeAreaView edges={[ 'left', 'bottom', 'right' ]} style={styles.container}>
    <View style={styles.contentContainer}>
      <SingleInput placeholder="1" />
      <View style={styles.spacer}>
        <Text style={styles.label}>SPACER</Text>
      </View>
    </View>
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
  contentContainer: {
    alignSelf: 'stretch',
    flexGrow: 1,
    flexDirection: 'column-reverse',
  },
  label: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    alignItems: 'center',
    backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'center',
  },
});

export default CustomAnimationConfigModule;
