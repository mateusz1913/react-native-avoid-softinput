import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import type { TextInput } from 'react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../../components/Button';
import MultilineInput from '../../../components/MultilineInput';
import SingleInput from '../../../components/SingleInput';

const MultilineForm: React.FC = () => {
  const singleInputRef = useRef<TextInput>(null);
  const multilineInputRef = useRef<TextInput>(null);

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
    <SafeAreaView edges={[ 'bottom', 'left', 'right' ]} style={styles.container}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContainer}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}>
        <View style={styles.logoContainer}>
          <Text>Logo</Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <SingleInput
              ref={singleInputRef}
              onSubmitEditing={() => {
                multilineInputRef.current?.focus();
              }}
              placeholder="Single input"
            />
          </View>
          <View style={styles.inputContainer}>
            <MultilineInput
              ref={multilineInputRef}
              placeholder="Multiline input"
            />
          </View>
          <View style={styles.inputContainer}>
            <MultilineInput
              ref={multilineInputRef}
              placeholder="Multiline input"
            />
          </View>
        </View>
        <View style={styles.submitButtonContainer}>
          <Button
            onPress={() => {
              if (singleInputRef.current?.isFocused()) {
                singleInputRef.current.blur();
              }

              if (multilineInputRef.current?.isFocused()) {
                multilineInputRef.current.blur();
              }
            }}
            title="Submit"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
  inputContainer: {
    alignSelf: 'stretch',
  },
  inputsContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 100,
  },
  scrollContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  submitButtonContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 100,
  },
});

export default MultilineForm;
