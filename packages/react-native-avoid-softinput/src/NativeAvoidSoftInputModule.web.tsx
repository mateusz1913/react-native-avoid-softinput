import { NativeEventEmitter } from 'react-native';

import type { Module } from './NativeAvoidSoftInputModuleType';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

class WebAvoidSoftInputModule implements Module {
  private isSoftInputShown = false
  private previousSoftInputHeight = 0
  private MIN_SOFT_INPUT_HEIGHT_THRESHOLD = 60
  private isVisualViewportSupported = () => {
    return !!window.visualViewport;
  }
  private onResize = (ev: Event) => {
    console.log(ev);
    const softInputHeight = window.innerHeight - window.visualViewport.height;

    if (
      !this.isSoftInputShown
      && this.previousSoftInputHeight !== softInputHeight
      && softInputHeight > this.MIN_SOFT_INPUT_HEIGHT_THRESHOLD
    ) {
      // softInputShown;
      // this.setState({ isSoftInputShown: true, previousSoftInputHeight: softInputHeight });
      // new Event()
      // this.props.onSoftInputShown?.({ nativeEvent: { softInputHeight } })
      console.log('MODULE - SHOW', softInputHeight, window.innerHeight, window.visualViewport.height);
    } else if (
      this.isSoftInputShown
      && this.previousSoftInputHeight !== softInputHeight
      && softInputHeight > this.MIN_SOFT_INPUT_HEIGHT_THRESHOLD
    ) {
      // softInputHeightChanged;
      // this.setState({ previousSoftInputHeight: softInputHeight });
      console.log('MODULE - RESIZE', softInputHeight, window.innerHeight, window.visualViewport.height);
    } else if (this.isSoftInputShown) {
      // softInputHidden;
      // this.setState({ isSoftInputShown: false, previousSoftInputHeight: 0 });
      console.log('MODULE - HIDE', window.innerHeight, window.visualViewport.height);
    }
  }
  addListener = (_eventType: string) => {
    console.log('ADD_LISTENER');
  };
  removeListeners = (_count: number) => {
    console.log('REMOVE_LISTENERS');
  };
  setAdjustNothing = NOOP;
  setAdjustPan = NOOP;
  setAdjustResize = NOOP;
  setAdjustUnspecified = NOOP;
  setAvoidOffset = (_offset: number) => {
    console.log('SET_AVOID_OFFSET');
  };
  setDefaultAppSoftInputMode = NOOP;
  setEasing = NOOP;
  setEnabled = (enabled: boolean) => {
    if (!this.isVisualViewportSupported()) {
      return;
    }

    if (enabled) {
      window.visualViewport.addEventListener('resize', this.onResize);
    } else {
      window.visualViewport.removeEventListener('resize', this.onResize);
    }
  };
  setHideAnimationDelay = NOOP;
  setHideAnimationDuration = NOOP;
  setShowAnimationDelay = NOOP;
  setShowAnimationDuration = NOOP;
}

export const module = new WebAvoidSoftInputModule();

export const eventEmitter = new NativeEventEmitter(module);
