import type React from 'react';

// import AppliedOffsetEvents from '../screens/AppliedOffsetEvents';
import BottomScrollView from '../screens/BottomScrollView';
import BottomScrollViewWithFlex from '../screens/BottomScrollViewWithFlex';
import CustomAnimationConfigComponent from '../screens/CustomAnimationConfigWithComponent';
import CustomAnimationConfigModule from '../screens/CustomAnimationConfigWithModule';
import FullScreenScrollView from '../screens/FullScreenScrollView';
import FullScreenScrollViewWithSingleInput from '../screens/FullScreenScrollViewWithSingleInput';
import FullScreenView from '../screens/FullScreenView';
import FullScreenViewWithOffset from '../screens/FullScreenViewWithOffset';
import ModalScrollView from '../screens/ModalScrollView';
import ModalView from '../screens/ModalView';

import { ROUTES } from './routes';

type Example = {
  name: typeof ROUTES[keyof typeof ROUTES];
  description: string;
  component: React.FC;
};

export const SCREENS: Array<Example> = [
  {
    name: ROUTES.FullScreenScrollView,
    description: 'Full screen scroll view with multiple inputs',
    component: FullScreenScrollView,
  },
  {
    name: ROUTES.FullScreenView,
    description:
      'Full screen not scrollable view with input in bottom part of the screen',
    component: FullScreenView,
  },
  {
    name: ROUTES.BottomScrollViewWithFlex,
    description:
      'Screen with scroll view (positioned with flex) in bottom half of screen',
    component: BottomScrollViewWithFlex,
  },
  {
    name: ROUTES.BottomScrollView,
    description:
      'Screen with scroll view (with fixed height) in bottom half of screen',
    component: BottomScrollView,
  },
  {
    name: ROUTES.ModalScrollView,
    description: 'Modal with scroll view with multiple inputs',
    component: ModalScrollView,
  },
  {
    name: ROUTES.ModalView,
    description: 'Modal with not scrollable view with input in bottom part of the screen',
    component: ModalView,
  },
  {
    name: ROUTES.FullScreenViewWithOffset,
    description:
      'Full screen not scrollable view with input in bottom part of the screen, with additional offset applied',
    component: FullScreenViewWithOffset,
  },
  {
    name: ROUTES.FullScreenScrollViewWithSingleInput,
    description:
      'Full screen scrollable view with input in bottom part of the screen',
    component: FullScreenScrollViewWithSingleInput,
  },
  // {
  //   name: ROUTES.AppliedOffsetEvents,
  //   description:
  //     'Screen content with animation that depends on soft input applied offset value',
  //   component: AppliedOffsetEvents,
  // },
  {
    name: ROUTES.CustomAnimationConfigModule,
    description:
      'Example with custom animation config for module',
    component: CustomAnimationConfigModule,
  },
  {
    name: ROUTES.CustomAnimationConfigComponent,
    description:
      'Example with custom animation config for component',
    component: CustomAnimationConfigComponent,
  },
];
