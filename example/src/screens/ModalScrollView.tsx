import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet } from 'react-native';
import { AvoidSoftInput, AvoidSoftInputView } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import CloseButton from '../components/CloseButton';
import MultipleInputs from '../components/MultipleInputs';

const ModalScrollView: React.FC = () => {
  const [ isModalVisible, setIsModalVisible ] = useState(false);

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
    <SafeAreaView edges={[ 'left', 'bottom', 'right' ]} style={styles.container}>
      <Button
        onPress={() => setIsModalVisible(true)}
        title="Open Modal"
      />
      <Modal
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
        statusBarTranslucent={true}
        transparent={true} visible={isModalVisible}>
        <SafeAreaView edges={[ 'left', 'bottom', 'right' ]} style={styles.modal}>
          <AvoidSoftInputView style={styles.modalContainer}>
            <CloseButton onPress={() => setIsModalVisible(false)} />
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              contentInsetAdjustmentBehavior="always"
              style={styles.scroll}
            >
              <MultipleInputs />
            </ScrollView>
          </AvoidSoftInputView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 100,
    marginTop: 50,
  },
  modal: {
    alignSelf: 'stretch',
    backgroundColor: '#00000033',
    flex: 1,
  },
  scroll: {
    backgroundColor: 'orange',
  },
  scrollContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#00FF0066',
    flexGrow: 1,
  },
});

export default ModalScrollView;
