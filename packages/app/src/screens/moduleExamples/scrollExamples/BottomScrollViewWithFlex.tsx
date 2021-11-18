import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput, useSoftInputHidden, useSoftInputShown } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import MultipleInputs from '../../../components/MultipleInputs';

const BottomScrollViewWithFlex: React.FC = () => {
  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);

    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setDefaultAppSoftInputMode();
    };
  }, []);

  useFocusEffect(onFocusEffect);

  useSoftInputHidden(({ softInputHeight }) => {
    console.log('softInputHidden', softInputHeight);
  });
  useSoftInputShown(({ softInputHeight }) => {
    console.log('softInputShown', softInputHeight);
  });

  return (
    <SafeAreaView edges={[ 'left', 'bottom', 'right' ]} style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          contentInsetAdjustmentBehavior="always"
        >
          <MultipleInputs />
        </ScrollView>
      </View>
      <View style={styles.spacer}>
        <Text style={styles.label}>SPACER</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  contentContainer: {
    flex: 0.5,
    flexGrow: 1,
  },
  label: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  spacer: {
    alignItems: 'center',
    backgroundColor: 'pink',
    flex: 0.5,
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default BottomScrollViewWithFlex;
