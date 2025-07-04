import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import type { ListRenderItem, PlatformOSType } from 'react-native';
import { FlatList, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import { blackColor } from '../consts/colors';
import { styles as commonStyles } from '../consts/styles';
import { ROUTES } from '../navigation/routes';
import type { RootStackNavigationProp } from '../navigation/types';

type Example = { description: string; label: string; platform?: PlatformOSType; route: keyof typeof ROUTES };

const DATA: Array<Example> = [
  {
    description: 'Check how to make your bottom sheet aware of displayed keyboard',
    label: 'Bottom sheet',
    route: ROUTES.BottomSheet,
  },
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
    description: "Check how to make your form's text fields always displayed above the keyboard",
    label: 'Form',
    route: ROUTES.Form,
  },
  {
    description: "Check how to make classic username & password form's text fields always displayed above the keyboard",
    label: 'PasswordForm',
    route: ROUTES.PasswordForm,
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
    description: 'Learn how to handle text fields rendered inside formsheet modal',
    label: 'ModalFormSheet',
    platform: 'ios',
    route: ROUTES.ModalFormSheet,
  },
  {
    description: 'Look how to implement animation with Reanimated library based on keyboard events',
    label: 'Reanimated',
    route: ROUTES.Reanimated,
  },
  {
    description: 'Learn how to handle text fields rendered inside React Navigation (Native Stack) formsheet modal',
    label: 'ScreensNativeModal',
    route: ROUTES.ScreensNativeModal,
  },
  {
    description:
      'Learn how to handle seperate parts of a form - text field in scroll component and CTA button with fixed position at the bottom of the screen',
    label: 'Sticky footer',
    route: ROUTES.StickyFooter,
  },
  {
    description: 'Check how AvoidSoftInputView when toggling enabled prop',
    label: 'Enabled/Disabled view',
    route: ROUTES.EnabledViewProp,
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const renderItem = useCallback<ListRenderItem<Example>>(
    function renderItemFunc({ item }) {
      return (
        <View style={styles.item}>
          <Button onPress={() => navigation.navigate(item.route)} title={item.label} />
          <Text style={styles.description}>{item.description}</Text>
        </View>
      );
    },
    [navigation],
  );

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={commonStyles.screenContainer}>
      <View style={commonStyles.screenContainer}>
        <FlatList
          data={DATA.filter(item => typeof item.platform === 'undefined' || item.platform === Platform.OS)}
          keyExtractor={item => item.route}
          renderItem={renderItem}
        />
      </View>
      {Platform.OS === 'android' ? (
        <View style={styles.adjustContainer}>
          <View style={styles.adjustItem}>
            <Button onPress={() => AvoidSoftInput.setAdjustNothing()} title="Adjust Nothing" />
          </View>
          <View style={styles.adjustItem}>
            <Button onPress={() => AvoidSoftInput.setAdjustPan()} title="Adjust Pan" />
          </View>
          <View style={styles.adjustItem}>
            <Button onPress={() => AvoidSoftInput.setAdjustResize()} title="Adjust Resize" />
          </View>
          <View style={styles.adjustItem}>
            <Button onPress={() => AvoidSoftInput.setAdjustUnspecified()} title="Adjust Unspecified" />
          </View>
          <View style={styles.adjustItem}>
            <Button onPress={() => AvoidSoftInput.setDefaultAppSoftInputMode()} title="Default softinput mode" />
          </View>
        </View>
      ) : null}
      <StatusBar animated={true} backgroundColor={'transparent'} barStyle={'dark-content'} translucent={true} />
    </SafeAreaView>
  );
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
  description: {
    color: blackColor,
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
});
