import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { ROUTES } from './routes';

export type RootStackParamList = {
  [ROUTES.AppliedOffsetEvents]: undefined;
  [ROUTES.BottomScrollView]: undefined;
  [ROUTES.BottomScrollViewWithFlex]: undefined;
  [ROUTES.CustomAnimationConfigComponent]: undefined;
  [ROUTES.CustomAnimationConfigModule]: undefined;
  [ROUTES.Form]: undefined;
  [ROUTES.FullScreenScrollView]: undefined;
  [ROUTES.FullScreenScrollViewWithSingleInput]: undefined;
  [ROUTES.FullScreenView]: undefined;
  [ROUTES.FullScreenViewWithOffset]: undefined;
  [ROUTES.Home]: undefined;
  [ROUTES.ModalScrollView]: undefined;
  [ROUTES.ModalView]: undefined;
  [ROUTES.MultilineForm]: undefined;
  [ROUTES.TopScrollView]: undefined;
  [ROUTES.TopScrollViewWithFlex]: undefined;
  [ROUTES.HalfScrollView]: undefined;
  [ROUTES.HalfScrollViewWithFlex]: undefined;
  [ROUTES.NestedHorizontalScrollView]: undefined;
  //
  [ROUTES.ModuleExamples]: undefined
  [ROUTES.ModuleFullScreenExamples]: undefined
  [ROUTES.ModuleScrollExamples]: undefined
  //
  [ROUTES.ViewExamples]: undefined
  [ROUTES.ViewFullScreenExamples]: undefined
  [ROUTES.ViewModalExamples]: undefined
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
