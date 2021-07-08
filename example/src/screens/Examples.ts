import type React from 'react';

import BottomScrollView from './BottomScrollView';
import BottomScrollViewWithFlex from './BottomScrollViewWithFlex';
import FullScreenScrollView from './FullScreenScrollView';
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
];
