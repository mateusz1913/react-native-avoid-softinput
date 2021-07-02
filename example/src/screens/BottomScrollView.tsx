import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as AvoidSoftinput from 'react-native-avoid-softinput';
import {
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import MultipleInputs from '../components/MultipleInputs';

const BottomScrollView: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { height, width } = useSafeAreaFrame();
  const isLandscape = width > height;
  const HALF_SCREEN = height / 2;
  const HEADER_HEIGHT = useMemo(() => {
    let headerHeight = 0;

    if (Platform.OS === 'ios') {
      if (isLandscape) {
        headerHeight = 32;
      } else {
        headerHeight = 44;
      }
    } else {
      headerHeight = 56;
    }

    return headerHeight + insets.top;
  }, [isLandscape, insets.top]);
  const onFocusEffect = useCallback(() => {
    AvoidSoftinput.setEnabled(true);

    const unsubscribeShown = AvoidSoftinput.onSoftInputShown(
      ({ softInputHeight }) => {
        console.log('softInputShown', softInputHeight);
      }
    );
    const unsubscribeHidden = AvoidSoftinput.onSoftInputHidden(
      ({ softInputHeight }) => {
        console.log('softInputHidden', softInputHeight);
      }
    );

    return () => {
      unsubscribeShown.remove();
      unsubscribeHidden.remove();
      AvoidSoftinput.setEnabled(true);
    };
  }, []);
  useFocusEffect(onFocusEffect);

  return (
    <SafeAreaView
      edges={['left', 'bottom', 'right', 'top']}
      style={styles.container}
    >
      <View
        style={[
          styles.contentContainer,
          { height: HALF_SCREEN - insets.bottom },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          contentInsetAdjustmentBehavior="always"
        >
          <MultipleInputs />
        </ScrollView>
      </View>
      <View style={[styles.spacer, { height: HALF_SCREEN - HEADER_HEIGHT }]}>
        <Text style={styles.label}>SPACER</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    flex: 1,
    flexDirection: 'column-reverse',
  },
  contentContainer: {
    flexGrow: 1,
  },
  label: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  spacer: {
    alignItems: 'center',
    backgroundColor: 'pink',
    // justifyContent: 'center',
  },
});

export default BottomScrollView;
