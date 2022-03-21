import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import type { TextInput } from 'react-native';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import SingleInput from '../components/SingleInput';
import { styles as commonStyles } from '../consts/styles';

type InputsRef = {
  plain: TextInput | null,
  email: TextInput | null,
  password: TextInput | null,
  decimal: TextInput | null,
  webSearch: TextInput | null,
  numeric: TextInput | null,
}

export const KeyboardTypeExample: React.FC = () => {
  const inputsRef = useRef<InputsRef>({
    plain: null,
    email: null,
    password: null,
    decimal: null,
    webSearch: null,
    numeric: null,
  });

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setDefaultAppSoftInputMode();
    };
  }, []);

  useFocusEffect(onFocusEffect);

  function onSubmit() {
    Object.values(inputsRef.current).map((ref) => {
      if (ref?.isFocused()) {
        ref.blur();
      }
    });
  }

  function onPlainInputSubmit() {
    inputsRef.current.email?.focus();
  }

  function onEmailInputSubmit() {
    inputsRef.current.password?.focus();
  }

  function onPasswordInputSubmit() {
    inputsRef.current.decimal?.focus();
  }

  function onDecimalInputSubmit() {
    inputsRef.current.webSearch?.focus();
  }

  function onWebSearchInputSubmit() {
    inputsRef.current.numeric?.focus();
  }

  return <SafeAreaView edges={[ 'bottom', 'left', 'right' ]} style={commonStyles.screenContainer}>
    <ScrollView
      bounces={false}
      contentContainerStyle={commonStyles.scrollContainer}
      contentInsetAdjustmentBehavior="always"
      overScrollMode="always"
      showsVerticalScrollIndicator={true}
      style={commonStyles.stretch}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          source={require('../../assets/AppIconTransparent.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <SingleInput
          ref={(instance) => inputsRef.current.plain = instance}
          placeholder="Single line input"
          onSubmitEditing={onPlainInputSubmit}
        />
        <SingleInput
          ref={(instance) => inputsRef.current.email = instance}
          placeholder="Email input"
          keyboardType="email-address"
          onSubmitEditing={onEmailInputSubmit}
        />
        <SingleInput
          ref={(instance) => inputsRef.current.password = instance}
          placeholder="Password input"
          secureTextEntry
          onSubmitEditing={onPasswordInputSubmit}
        />
        <SingleInput
          ref={(instance) => inputsRef.current.decimal = instance}
          placeholder="Decimal input"
          keyboardType="decimal-pad"
          onSubmitEditing={onDecimalInputSubmit}
        />
        <SingleInput
          ref={(instance) => inputsRef.current.webSearch = instance}
          placeholder="Web search input"
          keyboardType="web-search"
          onSubmitEditing={onWebSearchInputSubmit}
        />
        <SingleInput
          ref={(instance) => inputsRef.current.numeric = instance}
          placeholder="Numeric input"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.submitButtonContainer}>
        <Button
          onPress={onSubmit}
          title="Submit"
        />
      </View>
    </ScrollView>
  </SafeAreaView>;
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
