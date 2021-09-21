import type React from 'react';

import AppliedOffsetEvents from './AppliedOffsetEvents';
import BottomScrollView from './BottomScrollView';
import BottomScrollViewWithFlex from './BottomScrollViewWithFlex';
import CustomAnimationConfigComponent from './CustomAnimationConfigWithComponent';
import CustomAnimationConfigModule from './CustomAnimationConfigWithModule';
import FullScreenScrollView from './FullScreenScrollView';
import FullScreenScrollViewWithSingleInput from './FullScreenScrollViewWithSingleInput';
import FullScreenView from './FullScreenView';
import FullScreenViewWithOffset from './FullScreenViewWithOffset';
import ModalScrollView from './ModalScrollView';
import ModalView from './ModalView';

type Example = {
  name: string;
  description: string;
  component: React.FC;
};

export const EXAMPLES: Array<Example> = [
  {
    name: 'FullScreenScrollView',
    description: 'Full screen scroll view with multiple inputs',
    component: FullScreenScrollView,
  },
  {
    name: 'FullScreenView',
    description:
      'Full screen not scrollable view with input in bottom part of the screen',
    component: FullScreenView,
  },
  {
    name: 'BottomScrollViewWithFlex',
    description:
      'Screen with scroll view (positioned with flex) in bottom half of screen',
    component: BottomScrollViewWithFlex,
  },
  {
    name: 'BottomScrollView',
    description:
      'Screen with scroll view (with fixed height) in bottom half of screen',
    component: BottomScrollView,
  },
  {
    name: 'ModalScrollView',
    description: 'Modal with scroll view with multiple inputs',
    component: ModalScrollView,
  },
  {
    name: 'ModalView',
    description: 'Modal with not scrollable view with input in bottom part of the screen',
    component: ModalView,
  },
  {
    name: 'FullScreenViewWithOffset',
    description:
      'Full screen not scrollable view with input in bottom part of the screen, with additional offset applied',
    component: FullScreenViewWithOffset,
  },
  {
    name: 'FullScreenScrollViewWithSingleInput',
    description:
      'Full screen scrollable view with input in bottom part of the screen',
    component: FullScreenScrollViewWithSingleInput,
  },
  {
    name: 'AppliedOffsetEvents',
    description:
      'Screen content with animation that depends on soft input applied offset value',
    component: AppliedOffsetEvents,
  },
  {
    name: 'CustomAnimationConfigModule',
    description:
      'Example with custom animation config for module',
    component: CustomAnimationConfigModule,
  },
  {
    name: 'CustomAnimationConfigComponent',
    description:
      'Example with custom animation config for component',
    component: CustomAnimationConfigComponent,
  },
];
