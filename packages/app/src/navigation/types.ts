import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { ROUTES } from './routes';

export type RootStackParamList = {
  [ROUTES.BottomSheet]: undefined;
  [ROUTES.CustomAnimationConfigModule]: undefined;
  [ROUTES.CustomAnimationConfigView]: undefined;
  [ROUTES.Form]: undefined;
  [ROUTES.Home]: undefined;
  [ROUTES.Modal]: undefined;
  [ROUTES.Reanimated]: undefined;
  [ROUTES.StickyFooter]: undefined;
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
