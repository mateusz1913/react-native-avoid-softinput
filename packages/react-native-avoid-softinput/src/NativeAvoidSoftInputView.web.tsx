import React, { Component } from 'react';
import { Animated } from 'react-native';

import type { AvoidSoftInputViewProps } from './types';

type WebAvoidSoftInputViewState = {
  isSoftInputShown: boolean;
  previousSoftInputHeight: number;
}

export class NativeAvoidSoftInputView extends Component<AvoidSoftInputViewProps, WebAvoidSoftInputViewState> {
  private isVisualViewportSupported = () => {
    return !!window.visualViewport;
  }

  private onResize = (ev: Event) => {
    console.log(ev);
    const softInputHeight = window.innerHeight - window.visualViewport.height;

    if (
      !this.state.isSoftInputShown
      && this.state.previousSoftInputHeight !== softInputHeight
      && softInputHeight > this.MIN_SOFT_INPUT_HEIGHT_THRESHOLD
    ) {
      // softInputShown;
      this.setState({ isSoftInputShown: true, previousSoftInputHeight: softInputHeight });
      // new Event()
      // this.props.onSoftInputShown?.({ nativeEvent: { softInputHeight } })
      console.log('VIEW - SHOW', softInputHeight, window.innerHeight, window.visualViewport.height);
    } else if (
      this.state.isSoftInputShown
      && this.state.previousSoftInputHeight !== softInputHeight
      && softInputHeight > this.MIN_SOFT_INPUT_HEIGHT_THRESHOLD
    ) {
      // softInputHeightChanged;
      this.setState({ previousSoftInputHeight: softInputHeight });
      console.log('VIEW - RESIZE', softInputHeight, window.innerHeight, window.visualViewport.height);
    } else if (this.state.isSoftInputShown) {
      // softInputHidden;
      this.setState({ isSoftInputShown: false, previousSoftInputHeight: 0 });
      console.log('VIEW - HIDE', window.innerHeight, window.visualViewport.height);
    }
  }

  private MIN_SOFT_INPUT_HEIGHT_THRESHOLD = 60

  state: WebAvoidSoftInputViewState = {
    isSoftInputShown: false,
    previousSoftInputHeight: 0,
  }

  componentDidMount() {
    if (!this.isVisualViewportSupported()) {
      return;
    }

    window.visualViewport.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.visualViewport.removeEventListener('resize', this.onResize);
  }

  render() {
    return <Animated.View style={[ this.props.style ]}>{this.props.children}</Animated.View>;
  }
}
