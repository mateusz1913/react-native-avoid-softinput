import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import SingleInput from '../../../components/SingleInput';

const NestedHorizontalScrollView: React.FC = () => {
  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);

    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setDefaultAppSoftInputMode();
    };
  }, []);

  useFocusEffect(onFocusEffect);

  return (
    <SafeAreaView edges={[ 'left', 'bottom', 'right' ]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        contentInsetAdjustmentBehavior="always"
      >
        <View style={[ styles.halfScreen, styles.center ]}>
          <Text style={styles.label}>SPACER</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.center}
          horizontal={true}
          style={styles.halfScreen}
        >
          <View style={styles.input}>
            <SingleInput />
          </View>
          <View style={styles.input}>
            <SingleInput />
          </View>
          <View style={styles.input}>
            <SingleInput />
          </View>
          <View style={styles.input}>
            <SingleInput />
          </View>
          <View style={styles.input}>
            <SingleInput />
          </View>
          <View style={styles.input}>
            <SingleInput />
          </View>
          <View style={styles.input}>
            <SingleInput />
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfScreen: {
    alignSelf: 'stretch',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 0.5,
    flexGrow: 1,
  },
  input: {
    width: 300,
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
});

export default NestedHorizontalScrollView;
