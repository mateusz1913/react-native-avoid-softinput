import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  AvoidSoftInput,
  type SoftInputAppliedOffsetEventData,
  useSoftInputAppliedOffsetChanged,
} from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import MultilineInput from '../components/MultilineInput';
import SingleInput from '../components/SingleInput';
import { styles as commonStyles } from '../consts/styles';

const icon = require('../../assets/AppIconTransparent.png');

const NOOP = () => {};

export const FormExample = () => {
  const onFocusEffect = useCallback(function onFocusEffectFunc() {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  const onAppliedOffsetChanged = useCallback(function onAppliedOffsetChangedFunc({
    appliedOffset,
  }: SoftInputAppliedOffsetEventData) {
    console.log({ appliedOffset });
  }, []);

  useSoftInputAppliedOffsetChanged(onAppliedOffsetChanged);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={commonStyles.screenContainer}>
      <ScrollView
        bounces={false}
        contentContainerStyle={commonStyles.scrollContainer}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}
        style={commonStyles.stretch}>
        <View style={styles.logoContainer}>
          <Image accessibilityIgnoresInvertColors resizeMode="contain" source={icon} style={styles.logo} />
        </View>
        <View style={styles.formContainer}>
          <SingleInput placeholder="Single line input" />
          <MultilineInput placeholder="Multiline input" style={styles.secondInput} />
          <MultilineInput placeholder="Large multiline input" />
        </View>
        <View style={styles.submitButtonContainer}>
          <Button onPress={NOOP} title="Submit" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    height: 200,
    width: 200,
  },
  logoContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 100,
  },
  secondInput: {
    height: 200,
  },
  submitButtonContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 100,
  },
});
