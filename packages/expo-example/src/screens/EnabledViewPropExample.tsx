import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { AvoidSoftInput, AvoidSoftInputView } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import SingleInput from '../components/SingleInput';
import { styles as commonStyles } from '../consts/styles';

const icon = require('../../assets/AppIconTransparent.png');

export const EnabledViewPropExample = () => {
  const inputRef = useRef<TextInput>(null);
  const [enabled, setEnabled] = useState(false);

  const onFocusEffect = useCallback(function onFocusEffectFunc() {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    return () => {
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  const blurInput = useCallback(function blurInputFunc() {
    inputRef.current?.blur();
  }, []);

  const toggle = useCallback(function toggleFunc() {
    setEnabled(prev => !prev);
  }, []);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={commonStyles.screenContainer}>
      <AvoidSoftInputView enabled={enabled} style={commonStyles.screenContainer}>
        <ScrollView
          bounces={false}
          contentContainerStyle={commonStyles.scrollContainer}
          contentInsetAdjustmentBehavior="always"
          keyboardShouldPersistTaps="always"
          overScrollMode="always"
          showsVerticalScrollIndicator={true}
          style={commonStyles.stretch}>
          <View style={styles.logoContainer}>
            <Image accessibilityIgnoresInvertColors resizeMode="contain" source={icon} style={styles.logo} />
            <Button onPress={toggle} title={enabled ? 'ENABLED' : 'DISABLED'} />
            <Button onPress={blurInput} title="Blur input" />
          </View>
          <View style={styles.formContainer}>
            <SingleInput ref={inputRef} placeholder="Single line input" />
          </View>
        </ScrollView>
      </AvoidSoftInputView>
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
});
