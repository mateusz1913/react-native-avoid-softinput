import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { ROUTES } from './routes';

export type RootStackParamList = {
  [ROUTES.AppliedOffsetEvents]: undefined;
  [ROUTES.BottomScrollView]: undefined;
  [ROUTES.BottomScrollViewWithFlex]: undefined;
  [ROUTES.CustomAnimationConfigComponent]: undefined;
  [ROUTES.CustomAnimationConfigModule]: undefined;
  [ROUTES.FullScreenScrollView]: undefined;
  [ROUTES.FullScreenScrollViewWithSingleInput]: undefined;
  [ROUTES.FullScreenView]: undefined;
  [ROUTES.FullScreenViewWithOffset]: undefined;
  [ROUTES.Home]: undefined;
  [ROUTES.ModalScrollView]: undefined;
  [ROUTES.ModalView]: undefined;
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
