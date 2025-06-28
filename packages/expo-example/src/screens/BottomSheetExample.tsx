import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import SingleInput from '../components/SingleInput';
import { backdropColor, blackColor, whiteColor } from '../consts/colors';
import { styles as commonStyles } from '../consts/styles';

const Backdrop = () => <View style={styles.backdrop} />;

export const BottomSheetExample = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const dismissBottomSheet = useCallback(function dismissBottomSheetFunc() {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const presentBottomSheet = useCallback(function presentBottomSheetFunc() {
    bottomSheetModalRef.current?.present();
  }, []);

  const onFocusEffect = useCallback(function onFocusEffectFunc() {
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

  return (
    <SafeAreaView edges={['left', 'right']} style={commonStyles.screenContainer}>
      <Button onPress={presentBottomSheet} title="Open bottom sheet" />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={Backdrop}
        enableDismissOnClose
        enableDynamicSizing
        enablePanDownToClose
        index={0}>
        <BottomSheetView style={styles.bottomSheet}>
          <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.bottomSheet}>
            <Text style={styles.header}>Header</Text>
            <SingleInput style={styles.input} />
            <View style={styles.submitButtonContainer}>
              <Button onPress={dismissBottomSheet} title="Submit" />
            </View>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: backdropColor,
  },
  bottomSheet: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: whiteColor,
  },
  header: {
    color: blackColor,
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
