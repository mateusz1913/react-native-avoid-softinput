import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import * as AvoidSoftinput from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';
import MultipleInputs from '../components/MultipleInputs';

const FullScreenScrollView: React.FC = () => {
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
    <SafeAreaView edges={['left', 'bottom', 'right']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        contentInsetAdjustmentBehavior="always"
      >
        <MultipleInputs />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
});

export default FullScreenScrollView;
