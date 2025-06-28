import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput, useSoftInputState } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import SingleInput from '../components/SingleInput';
import { royalblueColor, spacerColor } from '../consts/colors';

export const CustomAnimationConfigModuleExample = () => {
  const onFocusEffect = useCallback(function onFocusEffectFunc() {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
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
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  const softInputState = useSoftInputState();

  return (
    <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}>
      <View style={styles.contentContainer}>
        <SingleInput placeholder="1" />
        <View style={styles.spacer}>
          <Text style={styles.label}>isVisible: {JSON.stringify(softInputState.isSoftInputShown)}</Text>
          <Text style={styles.label}>height: {softInputState.softInputHeight}</Text>
        </View>
      </View>
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
