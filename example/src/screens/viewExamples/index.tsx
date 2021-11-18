import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import { styles } from '../../consts/styles';
import { ROUTES } from '../../navigation/routes';
import type { RootStackNavigationProp } from '../../navigation/types';

const ViewExamples: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return <SafeAreaView edges={[ 'left', 'right', 'bottom' ]} style={styles.screenContainer}>
    <View style={styles.item}>
      <Button
        onPress={() => navigation.navigate(ROUTES.ViewFullScreenExamples)}
        title="Full Screen Examples"
      />
    </View>
    <View style={styles.item}>
      <Button
        onPress={() => navigation.navigate(ROUTES.ViewModalExamples)}
        title="Modal Examples"
      />
    </View>
  </SafeAreaView>;
};

export default ViewExamples;
