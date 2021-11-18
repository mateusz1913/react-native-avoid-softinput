import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import ExamplesList from '../../../components/ExamplesList';
import { styles } from '../../../consts/styles';
import { VIEW_FULL_SCREEN_EXAMPLES } from '../../../navigation/screens';

const ViewFullScreenExamples: React.FC = () => {
  return <SafeAreaView edges={[ 'left', 'right', 'bottom' ]} style={styles.screenContainer}>
    <ExamplesList data={VIEW_FULL_SCREEN_EXAMPLES} />
  </SafeAreaView>;
};

export default ViewFullScreenExamples;
