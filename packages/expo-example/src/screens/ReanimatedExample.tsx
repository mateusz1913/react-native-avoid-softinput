import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AvoidSoftInput, AvoidSoftInputView } from 'react-native-avoid-softinput';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import SingleInput from '../components/SingleInput';
import { useSoftInputAppliedOffsetHandler, useSoftInputHandler } from '../hooks/useSoftInputHandler';
import { lightGrayColor } from '../consts/colors';

const AnimatedAvoidSoftInputView = Animated.createAnimatedComponent(AvoidSoftInputView);

export const ReanimatedExample = () => {
  const scaleProgress = useSharedValue(0);
  const colorProgress = useSharedValue(0);

  const animatedLoaderStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(colorProgress.value, [0, 200], ['green', 'lightgreen'], 'RGB');
    const scale = interpolate(scaleProgress.value, [0, 300], [1, 3], Extrapolation.CLAMP);

    return { backgroundColor, transform: [{ scale }] };
  });

  const softInputAppliedOffsetHandler = useSoftInputAppliedOffsetHandler({
    onSoftInputAppliedOffsetChange: e => {
      'worklet';
      console.log({ onSoftInputAppliedOffsetChange: e.appliedOffset });
      colorProgress.value = e.appliedOffset;
    },
  });

  const softInputHandler = useSoftInputHandler({
    onSoftInputHeightChange: e => {
      'worklet';
      console.log({ onSoftInputHeightChange: e.softInputHeight });
      scaleProgress.value = withTiming(e.softInputHeight, { duration: 300 });
    },
  });

  const onFocusEffect = useCallback(function onFocusEffectFunc() {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);

    return () => {
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.container}>
      <AnimatedAvoidSoftInputView
        easing="easeIn"
        onSoftInputAppliedOffsetChange={softInputAppliedOffsetHandler}
        onSoftInputShown={softInputHandler}
        style={styles.softInputWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContainer} contentInsetAdjustmentBehavior="always">
          <SingleInput />
          <View style={styles.loaderContainer}>
            <Animated.View style={[styles.loader, animatedLoaderStyle]} />
          </View>
        </ScrollView>
      </AnimatedAvoidSoftInputView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loader: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  loaderContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: lightGrayColor,
    flex: 1,
    flexShrink: 0.5,
    justifyContent: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'column-reverse',
    flexGrow: 1,
  },
  softInputWrapper: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
