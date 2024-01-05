import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import SingleInput from '../components/SingleInput';
import { styles as commonStyles } from '../consts/styles';

const Backdrop: React.FC = () => <View style={styles.backdrop} />;

export const BottomSheetExample: React.FC = () => {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  function dismissBottomSheet() {
    bottomSheetModalRef.current?.dismiss();
  }

  function presentBottomSheet() {
    bottomSheetModalRef.current?.present();
  }

  const onFocusEffect = React.useCallback(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    AvoidSoftInput.setAvoidOffset(70);

    return () => {
      AvoidSoftInput.setAvoidOffset(0);
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  return <SafeAreaView edges={['left', 'right']} style={commonStyles.screenContainer}>
    <Button
      onPress={presentBottomSheet}
      title="Open bottom sheet"
    />
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backdropComponent={Backdrop}
      enableDismissOnClose
      enableDynamicSizing
      enablePanDownToClose
      index={0}
    >
      <BottomSheetView style={styles.bottomSheet}>
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.bottomSheet}>
          <Text style={styles.header}>Header</Text>
          <SingleInput style={styles.input} />
          <View style={styles.submitButtonContainer}>
            <Button
              onPress={dismissBottomSheet}
              title="Submit"
            />
          </View>
        </SafeAreaView>
      </BottomSheetView>
    </BottomSheetModal>
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  header: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 40,
    paddingTop: 30,
  },
  input: {
    marginHorizontal: 50,
  },
  submitButtonContainer: {
    alignSelf: 'stretch',
    marginBottom: 30,
  },
});
