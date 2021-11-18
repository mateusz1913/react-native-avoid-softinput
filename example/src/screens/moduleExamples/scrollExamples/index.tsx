import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import ExamplesList from '../../../components/ExamplesList';
import { styles } from '../../../consts/styles';
import { MODULE_SCROLL_EXAMPLES } from '../../../navigation/screens';

const ModuleScrollExamples: React.FC = () => {
  return <SafeAreaView edges={[ 'left', 'right', 'bottom' ]} style={styles.screenContainer}>
    <ExamplesList data={MODULE_SCROLL_EXAMPLES} />
  </SafeAreaView>;
};

export default ModuleScrollExamples;
