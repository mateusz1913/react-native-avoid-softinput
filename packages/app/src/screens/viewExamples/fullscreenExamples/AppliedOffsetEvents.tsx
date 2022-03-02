import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AvoidSoftInput, AvoidSoftInputView } from 'react-native-avoid-softinput';
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import SingleInput from '../../../components/SingleInput';
import { useSoftInputAppliedOffsetHandler, useSoftInputHandler } from '../../../hooks/useSoftInputHandler';

const AnimatedAvoidSoftInputView = Animated.createAnimatedComponent(AvoidSoftInputView);

const AppliedOffsetEvents: React.FC = () => {
  const scaleProgress = useSharedValue(0);
  const colorProgress = useSharedValue(0);
  const animatedLoaderStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(colorProgress.value, [ 0, 200 ], [ 'green', 'lightgreen' ], 'RGB');
    const scale = interpolate(scaleProgress.value, [ 0, 300 ], [ 1, 3 ], Extrapolate.CLAMP);

    return { backgroundColor, transform: [{ scale }]};
  });
  const softInputAppliedOffsetHandler = useSoftInputAppliedOffsetHandler({
    onSoftInputAppliedOffsetChange: (e) => {
      'worklet';
      console.log({ onSoftInputAppliedOffsetChange: e.appliedOffset });
      colorProgress.value = e.appliedOffset;
    },
  });
  const softInputHandler = useSoftInputHandler({
    onSoftInputHidden: (e) => {
      'worklet';
      console.log({ onSoftInputHidden: e.softInputHeight });
      scaleProgress.value = withTiming(e.softInputHeight, { duration: 300 });
    },
    onSoftInputShown: (e) => {
      'worklet';
      console.log({ onSoftInputShown: e.softInputHeight });
      scaleProgress.value = withTiming(e.softInputHeight, { duration: 300 });
    },
  });

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();

    return () => {
      AvoidSoftInput.setDefaultAppSoftInputMode();
    };
  }, []);

  useFocusEffect(onFocusEffect);

  return <SafeAreaView edges={[ 'left', 'right', 'bottom' ]} style={styles.container}>
    <AnimatedAvoidSoftInputView
      easing="easeIn"
      onSoftInputAppliedOffsetChange={softInputAppliedOffsetHandler}
      onSoftInputShown={softInputHandler}
      style={styles.softInputWrapper}
      >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        contentInsetAdjustmentBehavior="always"
      >
        <SingleInput />
        <View style={styles.loaderContainer}>
          <Animated.View style={[ styles.loader, animatedLoaderStyle ]}></Animated.View>
        </View>
      </ScrollView>
    </AnimatedAvoidSoftInputView>
  </SafeAreaView>;
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
    backgroundColor: 'lightgray',
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

export default AppliedOffsetEvents;
