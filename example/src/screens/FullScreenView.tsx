import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput, useSoftInputState } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import SingleInput from '../components/SingleInput';

const FullScreenView: React.FC = () => {
  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustNothing();
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
    };
  }, []);
  
  useFocusEffect(onFocusEffect);
  
  const { isSoftInputShown, softInputHeight } = useSoftInputState();

  return (
    <SafeAreaView edges={[ 'left', 'bottom', 'right' ]} style={styles.container}>
      <View style={styles.contentContainer}>
        <SingleInput placeholder="1" />
        <View style={styles.spacer}>
          <Text style={styles.label}>SPACER</Text>
          <Text style={styles.label}>{`Is soft input shown: ${isSoftInputShown}`}</Text>
          <Text style={styles.label}>{`Soft input height: ${softInputHeight}`}</Text>
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
    flexGrow: 1,
    flexDirection: 'column-reverse',
  },
  label: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    alignItems: 'center',
    backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'center',
  },
});

export default FullScreenView;
