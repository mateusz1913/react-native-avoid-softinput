import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import {
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import MultipleInputs from '../../../components/MultipleInputs';

const BottomScrollView: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { height, width } = useSafeAreaFrame();
  const isLandscape = width > height;
  const HALF_SCREEN = height / 2;
  const HEADER_HEIGHT = useMemo(() => {
    let headerHeight = 0;

    if (Platform.OS === 'ios') {
      if (isLandscape && !Platform.isPad) {
        headerHeight = 32;
      } else {
        headerHeight = 44;
      }
    } else {
      headerHeight = 56;
    }

    return headerHeight + insets.top;
  }, [ isLandscape, insets.top ]);
  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);

    const unsubscribeShown = AvoidSoftInput.onSoftInputShown(
      ({ softInputHeight }) => {
        console.log('softInputShown', softInputHeight);
      }
    );
    const unsubscribeHidden = AvoidSoftInput.onSoftInputHidden(
      ({ softInputHeight }) => {
        console.log('softInputHidden', softInputHeight);
      }
    );

    return () => {
      unsubscribeShown.remove();
      unsubscribeHidden.remove();
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setDefaultAppSoftInputMode();
    };
  }, []);

  useFocusEffect(onFocusEffect);

  return (
    <SafeAreaView
      edges={[ 'left', 'bottom', 'right' ]}
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
      <View style={[ styles.spacer, { height: HALF_SCREEN - HEADER_HEIGHT }]}>
        <Text style={styles.label}>SPACER</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
});

export default BottomScrollView;
