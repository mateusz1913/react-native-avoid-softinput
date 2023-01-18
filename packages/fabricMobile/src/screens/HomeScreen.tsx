// import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import type { ListRenderItem } from 'react-native';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
// import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import { styles as commonStyles } from '../consts/styles';
import { ROUTES } from '../navigation/routes';
// import type { RootStackNavigationProp } from '../navigation/types';

type Example = { description: string, label: string, route: keyof typeof ROUTES }

const DATA: Array<Example> = [
  {
    description: 'Look how to customize offset animation config for AvoidSoftInput module',
    label: 'Custom animation config - module',
    route: ROUTES.CustomAnimationConfigModule,
  },
  {
    description: 'Look how to customize offset animation config for AvoidSoftInputView component',
    label: 'Custom animation config - view',
    route: ROUTES.CustomAnimationConfigView,
  },
  {
    description: 'Check how to make your form\'s text fields always displayed above the keyboard',
    label: 'Form',
    route: ROUTES.Form,
  },
  {
    description: 'Check how AvoidSoftInput module works with different keyboard types',
    label: 'Keyboard type',
    route: ROUTES.KeyboardType,
  },
  {
    description: 'Learn how to handle text fields rendered inside modal',
    label: 'Modal',
    route: ROUTES.Modal,
  },
  {
    description: 'Check how AvoidSoftInputView when toggling enabled prop',
    label: 'Enabled/Disabled view',
    route: ROUTES.EnabledViewProp,
  },
];

interface HomeScreenProps {
  navigateWithRoute: (route: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigateWithRoute }) => {
  // const navigation = useNavigation<RootStackNavigationProp>();

  const renderItem = React.useCallback<ListRenderItem<Example>>(({ item }) => {
    return <View style={styles.item}>
      <Button
        onPress={() => navigateWithRoute(item.route)}
        title={item.label}
      />
      <Text>{item.description}</Text>
    </View>;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SafeAreaView 
    // edges={[ 'left', 'right', 'bottom' ]}
    style={commonStyles.screenContainer}>
    <View style={commonStyles.screenContainer}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.route}
        renderItem={renderItem}
      />
    </View>
    {Platform.OS === 'android' ? <View style={styles.adjustContainer}>
      <View style={styles.adjustItem}>
        <Button
          onPress={() => AvoidSoftInput.setAdjustNothing()}
          title="Adjust Nothing"
        />
      </View>
      <View style={styles.adjustItem}>
        <Button
          onPress={() => AvoidSoftInput.setAdjustPan()}
          title="Adjust Pan"
        />
      </View>
      <View style={styles.adjustItem}>
        <Button
          onPress={() => AvoidSoftInput.setAdjustResize()}
          title="Adjust Resize"
        />
      </View>
      <View style={styles.adjustItem}>
        <Button
          onPress={() => AvoidSoftInput.setAdjustUnspecified()}
          title="Adjust Unspecified"
        />
      </View>
      <View style={styles.adjustItem}>
        <Button
          onPress={() => AvoidSoftInput.setDefaultAppSoftInputMode()}
          title="Default softinput mode"
        />
      </View>
    </View> : null}
    <StatusBar
      animated={true}
      backgroundColor={'transparent'}
      barStyle={'dark-content'}
      translucent={true}
    />
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  adjustContainer: {
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingHorizontal: 40,
  },
  adjustItem: {
    marginVertical: 10,
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
});
