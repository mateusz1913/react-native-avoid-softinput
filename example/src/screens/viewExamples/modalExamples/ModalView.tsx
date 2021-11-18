import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput, AvoidSoftInputView } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import CloseButton from '../../../components/CloseButton';
import SingleInput from '../../../components/SingleInput';

const ModalView: React.FC = () => {
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
        onDismiss={() => setIsModalVisible(false)}
        onRequestClose={() => setIsModalVisible(false)}
        statusBarTranslucent={true}
        transparent={true}
        visible={isModalVisible}>
        <SafeAreaView edges={[ 'left', 'bottom', 'right' ]} style={styles.modal}>
          <AvoidSoftInputView
            onSoftInputAppliedOffsetChange={(e) => {
              console.log('VIEW', { appliedOffset: e.nativeEvent.appliedOffset });
            }}
            onSoftInputHidden={(e) => {
              console.log('VIEW', { softInputHeight: e.nativeEvent.softInputHeight });
            }}
            onSoftInputShown={(e) => {
              console.log('VIEW', { softInputHeight: e.nativeEvent.softInputHeight });
            }}
            style={styles.modalContainer}>
            <CloseButton onPress={() => setIsModalVisible(false)} />
            <View style={styles.contentContainer}>
              <View style={styles.spacer}>
                <Text style={styles.label}>SPACER</Text>
              </View>
              <SingleInput placeholder="1" />
            </View>
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
  contentContainer: {
    alignSelf: 'stretch',
    flexGrow: 1,
    flex: 1,
  },
  label: {
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    flexGrow: 1,
    marginBottom: 100,
    marginTop: 50,
    paddingBottom: 50,
  },
  modal: {
    alignSelf: 'stretch',
    backgroundColor: '#00000033',
    paddingTop: 50,
    flex: 1,
  },
  spacer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'pink',
    flex: 1,
    justifyContent: 'center',
  },
});

export default ModalView;
