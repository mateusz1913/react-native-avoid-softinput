import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AvoidSoftInput, SoftInputEventData, useSoftInputHeightChanged } from 'react-native-avoid-softinput';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import SingleInput from '../components/SingleInput';
import { styles as commonStyles } from '../consts/styles';

const NOOP = () => {};

export const StickyFooterExample = () => {
  const buttonContainerPaddingValue = useSharedValue(0);

  const buttonContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: buttonContainerPaddingValue.value,
    };
  });

  const onFocusEffect = useCallback(function onFocusEffectFunc() {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);

    return () => {
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  const onHeightChange = useCallback(
    function onHeightChangeFunc({ softInputHeight }: SoftInputEventData) {
      buttonContainerPaddingValue.value = withTiming(softInputHeight);
    },
    [buttonContainerPaddingValue],
  );
  /**
   * You can also use `useSoftInputShown` & `useSoftInputHidden`
   *
   * useSoftInputShown(({ softInputHeight }) => {
   *   buttonContainerPaddingValue.value = withTiming(softInputHeight);
   * });
   *
   * useSoftInputHidden(() => {
   *   buttonContainerPaddingValue.value = withTiming(0);
   * });
   */
  useSoftInputHeightChanged(onHeightChange);

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={commonStyles.screenContainer}>
      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContainer} contentInsetAdjustmentBehavior="always">
          <SingleInput />
        </ScrollView>
      </View>
      <Animated.View style={[buttonContainerAnimatedStyle, styles.ctaButtonWrapper]}>
        <View style={styles.ctaButtonContainer}>
          <Button onPress={NOOP} title="Submit" />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ctaButtonContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 1,
  },
  ctaButtonWrapper: {
    alignSelf: 'stretch',
  },
  scrollContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 1,
    flexGrow: 1,
    justifyContent: 'center',
    margin: 5,
    padding: 10,
  },
  scrollWrapper: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
