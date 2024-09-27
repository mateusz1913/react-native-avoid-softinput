import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { Image, Modal, ScrollView, StyleSheet, View } from 'react-native';
import { AvoidSoftInput, AvoidSoftInputView } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import CloseButton from '../components/CloseButton';
import MultilineInput from '../components/MultilineInput';
import SingleInput from '../components/SingleInput';
import { styles as commonStyles } from '../consts/styles';

const icon = require('../../assets/AppIconTransparent.png');

export const ModalExample: React.FC = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const onFocusEffect = React.useCallback(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    return () => {
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  function closeModal() {
    setModalVisible(false);
  }

  function openModal() {
    setModalVisible(true);
  }

  return (
    <SafeAreaView edges={['left', 'right']} style={commonStyles.screenContainer}>
      <Button onPress={openModal} title="Open modal" />
      <Modal
        animationType="slide"
        onRequestClose={closeModal}
        statusBarTranslucent={true}
        style={styles.modal}
        supportedOrientations={['landscape', 'portrait']}
        transparent={true}
        visible={modalVisible}>
        <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.modalContent}>
          <View style={styles.container}>
            <View style={styles.closeContainer}>
              <CloseButton onPress={closeModal} />
            </View>
            <AvoidSoftInputView style={commonStyles.stretch}>
              <ScrollView
                bounces={false}
                contentContainerStyle={commonStyles.scrollContainer}
                contentInsetAdjustmentBehavior="always"
                overScrollMode="always"
                showsVerticalScrollIndicator={true}
                style={commonStyles.stretch}>
                <View style={styles.logoContainer}>
                  <Image resizeMode="contain" source={icon} style={styles.logo} />
                </View>
                <View style={styles.formContainer}>
                  <SingleInput placeholder="Single line" />
                  <MultilineInput placeholder="Multiline" />
                  <Button onPress={closeModal} title="Submit" />
                </View>
              </ScrollView>
            </AvoidSoftInputView>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closeContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 999,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 80,
    marginHorizontal: 10,
    marginTop: 60,
    overflow: 'hidden',
  },
  formContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 80,
    marginHorizontal: 10,
  },
  logo: {
    height: 200,
    width: 200,
  },
  logoContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 100,
  },
  modal: {
    alignSelf: 'stretch',
  },
  modalContent: {
    alignSelf: 'stretch',
    backgroundColor: '#00000033',
    flex: 1,
  },
});
