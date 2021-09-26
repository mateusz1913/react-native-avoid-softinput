# `react-native-avoid-softinput`

Native solution for common React Native problem of focused views being covered by soft input view. It is solved by listening for soft input events and applying translation to react root view (or bottom padding if focused element's parent is scroll view) entirely on native side and only if currently focused view is covered by soft input frame. It supports focused views being positioned in scroll views and regular views (check out example app). It also supports modal content, when content is wrapped in [AvoidSoftInputView](#AvoidSoftInputView)

# Table of Contents

1. [Installation](#Installation)
2. [Usage](#Usage)
   - [iOS](#usage-ios)
   - [Android](#usage-android)
   - [Additional offset](#additional-offset)
   - [Custom offset animation config](#animation-config)
   - [Listening to events](#listening-events)
   - [Custom hooks](#custom-hooks)
   - [AvoidSoftInputView](#AvoidSoftInputView)
   - [`android:windowSoftInputMode` attribute (Android only)](#android-window-soft-input-mode)
3. [Contributing](#Contributing)
4. [Licence](#Licence)

## Installation

```sh
yarn add react-native-avoid-softinput
```

On iOS run additionally

```sh
npx pod-install
```

> :warning: Library on iOS uses Swift. Make sure that your project has bridging header configured (the easiest way is to create empty `.swift` file in XCode, which will offer to create bridging header)

## Usage

### iOS <a name="usage-ios"></a>

Enable module:

```ts
import React from "react";
import { AvoidSoftInput } from "react-native-avoid-softinput";

//...
React.useEffect(() => {
  AvoidSoftInput.setEnabled(true);
}, []);
//...
```

### Android <a name="usage-android"></a>

Enable module:

**Before using module on Android, check if system support (`android:windowSoftInputMode="adjustResize"` in Android manifest for `<activity>` tag) is enough for your use case.**

If you cannot use system support, then enable module and set `android:windowSoftInputMode` attribute to `adjustNothing` either in manifest or programmatically with `setAdjustNothing` method

> :warning: **Do not enable module with `adjustResize` value set, as it will result in padding being applied to already resized android window**

```ts
import React from "react";
import { AvoidSoftInput } from "react-native-avoid-softinput";

//...
React.useEffect(() => {
  AvoidSoftInput.setAdjustNothing();
  AvoidSoftInput.setEnabled(true);
}, []);
//...
```

### Additional offset <a name="additional-offset"></a>

If you want to increase/decrease amount of translation/padding applied to react root view/scroll view, you can use `setAvoidOffset` method

```ts
import React from "react";
import { AvoidSoftInput } from "react-native-avoid-softinput";

//...
AvoidSoftInput.setAvoidOffset(40); // It will result in applied value 40dp greater than standard one
//...
```

> :warning **Value applied to that method is persisted, so if you want to use that in a single use case, remember to clear it (just pass 0 as an argument)**

### Custom offset animation config <a name="animation-config"></a>

You can customize applied offset animation properties: duration, delay and easing

#### duration

To customize duration of hide/show offset animation, call `setHideAnimationDuration`/`setShowAnimationDuration` method with duration value in ms. It defaults to 220ms for hide animation & 660ms for show animation

```ts
import { AvoidSoftInput } from "react-native-avoid-softinput";

AvoidSoftInput.setHideAnimationDuration(300);
AvoidSoftInput.setShowAnimationDuration(800);
```

#### delay

To customize delay of hide/show offset animation, call `setHideAnimationDelay`/`setShowAnimationDelay` method with delay value in ms. It defaults to 0ms for show animation, 0ms for hide animation on Android and 300ms for hide animation on iOS

```ts
import { AvoidSoftInput } from "react-native-avoid-softinput";

AvoidSoftInput.setHideAnimationDelay(100);
AvoidSoftInput.setShowAnimationDelay(200);
```

#### easing

To customize animation's easing, call `setEasing` method, available values are `easeIn`, `easeInOut`, `easeOut` and `linear`. Default value is `linear`

```ts
import { AvoidSoftInput } from "react-native-avoid-softinput";

AvoidSoftInput.setEasing("easeInOut"); // Changes animation's easing to `easeInOut` curve
```

### Listening to events <a name="listening-events"></a>

If you want to listen to events when soft input is shown/hidden, or current applied offset value:

```ts
import React from "react";
import { AvoidSoftInput } from "react-native-avoid-softinput";

//...
React.useEffect(() => {
  const unsubscribeShown = AvoidSoftInput.onSoftInputShown(
    ({ softInputHeight }) => {
      console.log("soft input shown", softInputHeight); // Soft input is shown with height
    }
  );
  const unsubscribeHidden = AvoidSoftInput.onSoftInputHidden(() => {
    console.log("soft input hidden"); // Soft input is hidden
  });
  const unsubscribeOffsetChange = AvoidSoftInput.onSoftInputAppliedOffsetChange(
    ({ appliedOffset }) => {
      console.log("applied offset", appliedOffset); // Current offset's value
    }
  );

  return () => {
    unsubscribeShown.remove();
    unsubscribeHidden.remove();
    unsubscribeOffsetChange.remove();
  };
}, []);
//...
```

### Custom hooks <a name="custom-hooks"></a>

Library provides custom hooks:

#### `useSoftInputHidden`

A shortcut for using `AvoidSoftInput.onSoftInputHidden` method inside `useEffect`

```ts
import React from "react";
import { useSoftInputHidden } from "react-native-avoid-softinput";

//...
useSoftInputHidden(() => {
  console.log("soft input hidden"); // Soft input is hidden
});
//...
```

#### `useSoftInputShown`

A shortcut for using `AvoidSoftInput.onSoftInputShown` method inside `useEffect`

```ts
import React from "react";
import { useSoftInputShown } from "react-native-avoid-softinput";

//...
useSoftInputShown(({ softInputHeight }) => {
  console.log("soft input shown", softInputHeight); // Soft input is shown with height
});
//...
```

#### `useSoftInputAppliedOffsetChanged`

A shortcut for using `AvoidSoftInput.onSoftInputAppliedOffsetChange` method inside `useEffect`

```ts
import React from "react";
import { useSoftInputAppliedOffsetChanged } from "react-native-avoid-softinput";

//...
useSoftInputAppliedOffsetChanged(({ appliedOffset }) => {
  console.log("applied offset", appliedOffset); // Current offset's value
});
//...
```

#### `useSoftInputState`

It returns object with properties determining whether soft input is shown and how much screen it covers

```ts
import React from "react";
import { useSoftInputState } from "react-native-avoid-softinput";

//...
const { isSoftInputShown, softInputHeight } = useSoftInputState();
//...
```

### `AvoidSoftInputView`

If your form is rendered inside modal, wrap your modal content inside AvoidSoftInputView. It will manage whether form's content should be pushed above soft input frame. It accepts regular view props with addition of `avoidOffset`, `easing`, `hideAnimationDelay`, `hideAnimationDuration`, `showAnimationDelay` and `showAnimationDuration` props, `onSoftInputShown`, `onSoftInputHidden` and `onSoftInputAppliedOffsetChange` callbacks

| Prop                             | Type                                                     | Default value       |
| -------------------------------- | -------------------------------------------------------- | ------------------- |
| `avoidOffset`                    | number                                                   | 0                   |
| `easing`                         | `easeIn` or `easeInOut` or `easeOut` or `linear`         | `linear`            |
| `hideAnimationDelay`             | number                                                   | 0                   |
| `hideAnimationDuration`          | number                                                   | 220                 |
| `onSoftInputAppliedOffsetChange` | function(e: { nativeEvent: { appliedOffset: number }})   | undefined           |
| `onSoftInputHidden`              | function(e: { nativeEvent: { softInputHeight: number }}) | undefined           |
| `onSoftInputShown`               | function(e: { nativeEvent: { softInputHeight: number }}) | undefined           |
| `showAnimationDelay`             | number                                                   | 300/0 (iOS/Android) |
| `showAnimationDuration`          | number                                                   | 660                 |

```ts
import React from "react";
import { Modal } from "react-native";
import { AvoidSoftInput } from "react-native-avoid-softinput";

const MyComponent = () => {
  //...
  function onSoftInputShown(e) {
    console.log(e.nativeEvent.softInputHeight);
    // Do sth
  }
  //...
  function onSoftInputHidden() {
    // Do sth
  }
  //...
  function onSoftInputAppliedOffsetChange(e) {
    console.log(e.nativeEvent.appliedOffset);
    // Do sth, e.g. animate content based on currently applied offset value
  }
  //...
  return (
    //...
    <Modal {...modalProps}>
      <AvoidSoftInputView
        avoidOffset={10}
        easing="easeIn"
        hideAnimationDelay={100}
        hideAnimationDuration={300}
        onSoftInputShown={onSoftInputShown}
        onSoftInputHidden={onSoftInputHidden}
        showAnimationDelay={100}
        showAnimationDuration={800}
        style={styles.avoidSoftInputView}
      >
        <View>{/** Rest of form's content */}</View>
      </AvoidSoftInputView>
    </Modal>
    //...
  );
};
```

### `android:windowSoftInputMode` attribute (Android only) <a name="android-window-soft-input-mode"></a>

Library exposes methods for managing `android:windowSoftInputMode` value:

#### `setAdjustNothing`

Sets `android:windowSoftInputMode` to `adjustNothing` value

```ts
import { AvoidSoftInput } from "react-native-avoid-softinput";

//...
AvoidSoftInput.setAdjustNothing();
//...
```

#### `setAdjustPan`

Sets `android:windowSoftInputMode` to `adjustPan` value

```ts
import { AvoidSoftInput } from "react-native-avoid-softinput";

//...
AvoidSoftInput.setAdjustPan();
//...
```

#### `setAdjustResize`

Sets `android:windowSoftInputMode` to `adjustResize` value

```ts
import { AvoidSoftInput } from "react-native-avoid-softinput";

//...
AvoidSoftInput.setAdjustResize();
//...
```

#### `setAdjustUnspecified`

Sets `android:windowSoftInputMode` to `adjustUnspecified` value

```ts
import { AvoidSoftInput } from "react-native-avoid-softinput";

//...
AvoidSoftInput.setAdjustUnspecified();
//...
```

#### `setDefaultAppSoftInputMode`

sets `android:windowSoftInputMode` to default value from Android manifest

```ts
import { AvoidSoftInput } from "react-native-avoid-softinput";

//...
AvoidSoftInput.setDefaultAppSoftInputMode();
//...
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
