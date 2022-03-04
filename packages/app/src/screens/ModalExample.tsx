import React, { useState  } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { AvoidSoftInputView } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import CloseButton from '../components/CloseButton';
import MultilineInput from '../components/MultilineInput';
import SingleInput from '../components/SingleInput';
import { styles as commonStyles } from '../consts/styles';

export const ModalExample: React.FC = () => {
  const [ modalVisible, setModalVisible ] = useState(false);

  function closeModal() {
    setModalVisible(false);
  }

  function openModal() {
    setModalVisible(true);
  }

  return <SafeAreaView edges={[ 'left', 'right' ]} style={commonStyles.screenContainer}>
    <Button
      onPress={openModal}
      title="Open modal"
    />
    <Modal
      animationType="slide"
      onRequestClose={closeModal}
      statusBarTranslucent={true}
      style={styles.modal}
      supportedOrientations={[ 'landscape', 'portrait' ]}
      transparent={true}
      visible={modalVisible}
    >
      <SafeAreaView edges={[ 'left', 'right', 'bottom' ]} style={styles.modalContent}>
        <View style={styles.container}>
          <View style={commonStyles.stretch}>
            <CloseButton onPress={closeModal} />
          </View>
          <AvoidSoftInputView style={commonStyles.stretch}>
            <ScrollView
              bounces={false}
              contentContainerStyle={commonStyles.scrollContainer}
              contentInsetAdjustmentBehavior="always"
              overScrollMode="always"
              showsVerticalScrollIndicator={true}
              style={commonStyles.stretch}
            >
              <View style={styles.spacer} />
              <View style={styles.formContainer}>
                <SingleInput placeholder="Single line" />
                <MultilineInput placeholder="Multiline" />
                <Button
                  onPress={closeModal}
                  title="Submit"
                />
              </View>
            </ScrollView>
          </AvoidSoftInputView>
        </View>
      </SafeAreaView>
    </Modal>
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 100,
    marginHorizontal: 10,
    marginTop: 80,
    overflow: 'hidden',
  },
  formContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 80,
    marginHorizontal: 10,
  },
  modal: {
    alignSelf: 'stretch',
  },
  modalContent: {
    alignSelf: 'stretch',
    backgroundColor: '#00000033',
    flex: 1,
  },
  spacer: {
    height: 400,
  },
});
