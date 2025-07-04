import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput, AvoidSoftInputView } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import SingleInput from '../components/SingleInput';
import { royalblueColor, spacerColor } from '../consts/colors';

export const CustomAnimationConfigViewExample = () => {
  const onFocusEffect = useCallback(function onFocusEffectFunc() {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  return (
    <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}>
      <AvoidSoftInputView
        easing="easeOut"
        hideAnimationDelay={1000}
        hideAnimationDuration={600}
        showAnimationDelay={1000}
        showAnimationDuration={1200}
        style={styles.contentContainer}>
        <SingleInput placeholder="1" />
        <View style={styles.spacer}>
          <Text style={styles.label}>SPACER</Text>
        </View>
      </AvoidSoftInputView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
  contentContainer: {
    alignSelf: 'stretch',
    flexDirection: 'column-reverse',
    flexGrow: 1,
  },
  label: {
    color: royalblueColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    alignItems: 'center',
    backgroundColor: spacerColor,
    flex: 1,
    justifyContent: 'center',
  },
});
