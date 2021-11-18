import type React from 'react';

import CustomAnimationConfigModule from '../screens/moduleExamples/fullscreenExamples/CustomAnimationConfigWithModule';
import FullScreenView from '../screens/moduleExamples/fullscreenExamples/FullScreenView';
import FullScreenViewWithOffset from '../screens/moduleExamples/fullscreenExamples/FullScreenViewWithOffset';
import BottomScrollView from '../screens/moduleExamples/scrollExamples/BottomScrollView';
import BottomScrollViewWithFlex from '../screens/moduleExamples/scrollExamples/BottomScrollViewWithFlex';
import Form from '../screens/moduleExamples/scrollExamples/Form';
import FullScreenScrollView from '../screens/moduleExamples/scrollExamples/FullScreenScrollView';
import FullScreenScrollViewWithSingleInput from '../screens/moduleExamples/scrollExamples/FullScreenScrollViewWithSingleInput';
import HalfScrollView from '../screens/moduleExamples/scrollExamples/HalfScrollView';
import HalfScrollViewWithFlex from '../screens/moduleExamples/scrollExamples/HalfScrollViewWithFlex';
import MultilineForm from '../screens/moduleExamples/scrollExamples/MultilineForm';
import NestedHorizontalScrollView from '../screens/moduleExamples/scrollExamples/NestedHorizontalScrollView';
import TopScrollView from '../screens/moduleExamples/scrollExamples/TopScrollView';
import TopScrollViewWithFlex from '../screens/moduleExamples/scrollExamples/TopScrollViewWithFlex';
// import AppliedOffsetEvents from '../screens/viewExamples/fullscreenExamples/AppliedOffsetEvents';
import CustomAnimationConfigComponent from '../screens/viewExamples/fullscreenExamples/CustomAnimationConfigWithComponent';
import ModalScrollView from '../screens/viewExamples/modalExamples/ModalScrollView';
import ModalView from '../screens/viewExamples/modalExamples/ModalView';

import { ROUTES } from './routes';

export type Example = {
  name: typeof ROUTES[keyof typeof ROUTES];
  description: string;
  component: React.FC;
};

export const MODULE_FULL_SCREEN_EXAMPLES: Array<Example> = [
  {
    name: ROUTES.CustomAnimationConfigModule,
    description:
      'Example with custom animation config for module',
    component: CustomAnimationConfigModule,
  },
  {
    name: ROUTES.FullScreenView,
    description:
      'Full screen not scrollable view with input in bottom part of the screen',
    component: FullScreenView,
  },
  {
    name: ROUTES.FullScreenViewWithOffset,
    description:
      'Full screen not scrollable view with input in bottom part of the screen, with additional offset applied',
    component: FullScreenViewWithOffset,
  },
];

export const MODULE_SCROLL_EXAMPLES: Array<Example> = [
  {
    name: ROUTES.BottomScrollView,
    description:
      'Screen with scroll view (with fixed height) in bottom half of screen',
    component: BottomScrollView,
  },
  {
    name: ROUTES.BottomScrollViewWithFlex,
    description:
      'Screen with scroll view (positioned with flex) in bottom half of screen',
    component: BottomScrollViewWithFlex,
  },
  {
    name: ROUTES.Form,
    description: 'Form example',
    component: Form,
  },
  {
    name: ROUTES.FullScreenScrollView,
    description: 'Full screen scroll view with multiple inputs',
    component: FullScreenScrollView,
  },
  {
    name: ROUTES.FullScreenScrollViewWithSingleInput,
    description:
      'Full screen scrollable view with input in bottom part of the screen',
    component: FullScreenScrollViewWithSingleInput,
  },
  {
    name: ROUTES.MultilineForm,
    description: 'Multiline form example',
    component: MultilineForm,
  },
  {
    name: ROUTES.NestedHorizontalScrollView,
    description: 'Nested horizontal scroll view with inputs inside parent vertical scroll view',
    component: NestedHorizontalScrollView,
  },
  {
    name: ROUTES.TopScrollView,
    description: 'Screen with scroll view (with fixed height) in top half of screen',
    component: TopScrollView,
  },
  {
    name: ROUTES.TopScrollViewWithFlex,
    description: 'Screen with scroll view (positioned with flex) in top half of screen',
    component: TopScrollViewWithFlex,
  },
  {
    name: ROUTES.HalfScrollView,
    description: 'Screen with scroll view (with fixed height) in center of screen',
    component: HalfScrollView,
  },
  {
    name: ROUTES.HalfScrollViewWithFlex,
    description: 'Screen with scroll view (positioned with flex) in center of screen',
    component: HalfScrollViewWithFlex,
  },
];

export const VIEW_FULL_SCREEN_EXAMPLES: Array<Example> = [
  // {
  //   name: ROUTES.AppliedOffsetEvents,
  //   description:
  //     'Screen content with animation that depends on soft input applied offset value',
  //   component: AppliedOffsetEvents,
  // },
  {
    name: ROUTES.CustomAnimationConfigComponent,
    description:
      'Example with custom animation config for component',
    component: CustomAnimationConfigComponent,
  },
];

export const VIEW_MODAL_EXAMPLES: Array<Example> = [
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
];
