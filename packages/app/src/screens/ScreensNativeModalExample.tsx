import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Button, Image, ScrollView, StyleSheet, View } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import CloseButton from '../components/CloseButton';
import SingleInput from '../components/SingleInput';
import { styles as commonStyles } from '../consts/styles';
import type { RootStackNavigationProp } from '../navigation/types';

const icon = require('../../assets/AppIconTransparent.png');

export const ScreensNativeModalExample: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onFocusEffect = React.useCallback(() => {
    AvoidSoftInput.setEnabled(true);
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    return () => {
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
      AvoidSoftInput.setEnabled(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  function closeModal() {
    navigation.goBack();
  }

  return <SafeAreaView edges={[ 'left', 'right', 'bottom' ]} style={styles.modalContent}>
    <View style={styles.container}>
      <View style={styles.closeContainer}>
        <CloseButton onPress={closeModal} />
      </View>
      <ScrollView
        bounces={false}
        contentContainerStyle={commonStyles.scrollContainer}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}
        style={commonStyles.stretch}
      >
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            source={icon}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <Button
            onPress={closeModal}
            title="Submit"
          />
          <Button
            onPress={closeModal}
            title="Submit"
          />
          <Button
            onPress={closeModal}
            title="Submit"
          />
          <Button
            onPress={closeModal}
            title="Submit"
          />
          <Button
            onPress={closeModal}
            title="Submit"
          />
        </View>
      </ScrollView>
      <SingleInput placeholder="Single line" />
    </View>
  </SafeAreaView>;
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
  modalContent: {
    alignSelf: 'stretch',
    backgroundColor: '#00000033',
    flex: 1,
  },
});
