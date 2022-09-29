import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { ROUTES } from './routes';

export type RootStackParamList = {
  [ROUTES.BottomSheet]: undefined;
  [ROUTES.CustomAnimationConfigModule]: undefined;
  [ROUTES.CustomAnimationConfigView]: undefined;
  [ROUTES.EnabledViewProp]: undefined;
  [ROUTES.Form]: undefined;
  [ROUTES.Home]: undefined;
  [ROUTES.KeyboardType]: undefined;
  [ROUTES.Modal]: undefined;
  [ROUTES.ModalFormSheet]: undefined;
  [ROUTES.Reanimated]: undefined;
  [ROUTES.ScreensNativeModal]: undefined;
  [ROUTES.StickyFooter]: undefined;
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
