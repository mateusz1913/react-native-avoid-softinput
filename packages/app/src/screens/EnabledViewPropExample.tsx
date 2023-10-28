import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import type { TextInput } from 'react-native';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { AvoidSoftInput, AvoidSoftInputView } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import SingleInput from '../components/SingleInput';
import { styles as commonStyles } from '../consts/styles';

const icon = require('../../assets/AppIconTransparent.png');

export const EnabledViewPropExample: React.FC = () => {
  const inputRef = React.useRef<TextInput>(null);
  const [enabled, setEnabled] = React.useState(false);

  const onFocusEffect = React.useCallback(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    return () => {
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  function blurInput() {
    inputRef.current?.blur();
  }

  function toggle() {
    setEnabled((prev) => !prev);
  }

  return <SafeAreaView edges={['bottom', 'left', 'right']} style={commonStyles.screenContainer}>
    <AvoidSoftInputView enabled={enabled} style={commonStyles.screenContainer}>
      <ScrollView
        bounces={false}
        contentContainerStyle={commonStyles.scrollContainer}
        contentInsetAdjustmentBehavior="always"
        keyboardShouldPersistTaps="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}
        style={commonStyles.stretch}
      >
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            source={icon}
            style={styles.logo}
          />
          <Button
            onPress={toggle}
            title={enabled ? 'ENABLED' : 'DISABLED'}
          />
          <Button
            onPress={blurInput}
            title="Blur input"
          />
        </View>
        <View style={styles.formContainer}>
          <SingleInput ref={inputRef} placeholder="Single line input" />
        </View>
      </ScrollView>
    </AvoidSoftInputView>
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
});
