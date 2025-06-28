import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import type { TextInput } from 'react-native';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import SingleInput from '../components/SingleInput';
import { styles as commonStyles } from '../consts/styles';

type InputsRef = {
  plain: TextInput | null;
  email: TextInput | null;
  password: TextInput | null;
  decimal: TextInput | null;
  webSearch: TextInput | null;
  numeric: TextInput | null;
};

export const KeyboardTypeExample = () => {
  const inputsRef = useRef<InputsRef>({
    plain: null,
    email: null,
    password: null,
    decimal: null,
    webSearch: null,
    numeric: null,
  });

  const onFocusEffect = useCallback(function onFocusEffectFunc() {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  const onSubmit = useCallback(function onSubmitFunc() {
    Object.values(inputsRef.current).map(ref => {
      if (ref?.isFocused()) {
        ref.blur();
      }
    });
  }, []);

  const onPlainInputSubmit = useCallback(function onPlainInputSubmitFunc() {
    inputsRef.current.email?.focus();
  }, []);

  const onEmailInputSubmit = useCallback(function onEmailInputSubmitFunc() {
    inputsRef.current.password?.focus();
  }, []);

  const onPasswordInputSubmit = useCallback(function onPasswordInputSubmitFunc() {
    inputsRef.current.decimal?.focus();
  }, []);

  const onDecimalInputSubmit = useCallback(function onDecimalInputSubmitFunc() {
    inputsRef.current.webSearch?.focus();
  }, []);

  const onWebSearchInputSubmit = useCallback(function onWebSearchInputSubmitFunc() {
    inputsRef.current.numeric?.focus();
  }, []);

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
          <Image
            accessibilityIgnoresInvertColors
            resizeMode="contain"
            source={require('../../assets/AppIconTransparent.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <SingleInput
            ref={instance => {
              inputsRef.current.plain = instance;
            }}
            placeholder="Single line input"
            onSubmitEditing={onPlainInputSubmit}
          />
          <SingleInput
            ref={instance => {
              inputsRef.current.email = instance;
            }}
            placeholder="Email input"
            keyboardType="email-address"
            onSubmitEditing={onEmailInputSubmit}
          />
          <SingleInput
            ref={instance => {
              inputsRef.current.password = instance;
            }}
            placeholder="Password input"
            secureTextEntry
            onSubmitEditing={onPasswordInputSubmit}
          />
          <SingleInput
            ref={instance => {
              inputsRef.current.decimal = instance;
            }}
            placeholder="Decimal input"
            keyboardType="decimal-pad"
            onSubmitEditing={onDecimalInputSubmit}
          />
          <SingleInput
            ref={instance => {
              inputsRef.current.webSearch = instance;
            }}
            placeholder="Web search input"
            keyboardType="web-search"
            onSubmitEditing={onWebSearchInputSubmit}
          />
          <SingleInput
            ref={instance => {
              inputsRef.current.numeric = instance;
            }}
            placeholder="Numeric input"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.submitButtonContainer}>
          <Button onPress={onSubmit} title="Submit" />
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
  submitButtonContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 100,
  },
});
