# `react-native-avoid-softinput`

Native solution for common React Native problem of focused views being covered by soft input view. It is solved by listening for soft input events and applying bottom padding to react root view entirely on native side and only if currently focused view is covered by soft input frame. It supports focused views being positioned in scroll views and regular views (check out example app).

# Table of Contents

1. [Installation](#Installation)
2. [Usage](#Usage)
   - [iOS](#usage-ios)
   - [Android](#usage-android)
   - [Listening to events](#listening-events)
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
import * as AvoidSoftinput from "react-native-avoid-softinput";

//...
React.useEffect(() => {
  AvoidSoftinput.setEnabled(true);
}, []);
//...
```

### Android <a name="usage-android"></a>

Enable module:

**Before using module on Android, check if system support (`android:windowSoftInputMode="adjustResize"` in Android manifest for <activity> tag) is enough for your use case.**

If you cannot use system support, then enable module and set `android:windowSoftInputMode` attribute to `adjustNothing` either in manifest or programmatically with `setAdjustNothing` method

> :warning: **Do not enable module with `adjustResize` value set, as it will result in padding being applied to already resized android window**

```ts
import React from "react";
import * as AvoidSoftinput from "react-native-avoid-softinput";

//...
React.useEffect(() => {
  AvoidSoftinput.setAdjustNothing();
  AvoidSoftinput.setEnabled(true);
}, []);
//...
```

### Listening to events <a name="listening-events"></a>

If you want to listen to events when soft input is shown/hidden:

```ts
import React from "react";
import * as AvoidSoftinput from "react-native-avoid-softinput";

//...
React.useEffect(() => {
  const unsubscribeShown = AvoidSoftinput.onSoftInputShown(
    ({ softInputHeight }) => {
      console.log("soft input shown", softInputHeight); // Soft input is shown with height
    }
  );
  const unsubscribeHidden = AvoidSoftInput.onSoftInputHidden(() => {
    console.log("soft input hidden"); // Soft input is hidden
  });

  return () => {
    unsubscribeShown.remove();
    unsubscribeHidden.remove();
  };
}, []);
//...
```

### `android:windowSoftInputMode` attribute (Android only) <a name="android-window-soft-input-mode"></a>

Library exposes methods for managing `android:windowSoftInputMode` value:

#### `setAdjustNothing`

Sets `android:windowSoftInputMode` to `adjustNothing` value

```ts
import * as AvoidSoftinput from "react-native-avoid-softinput";

//...
AvoidSoftinput.setAdjustNothing();
//...
```

#### `setAdjustPan`

Sets `android:windowSoftInputMode` to `adjustPan` value

```ts
import * as AvoidSoftinput from "react-native-avoid-softinput";

//...
AvoidSoftinput.setAdjustPan();
//...
```

#### `setAdjustResize`

Sets `android:windowSoftInputMode` to `adjustResize` value

```ts
import * as AvoidSoftinput from "react-native-avoid-softinput";

//...
AvoidSoftinput.setAdjustResize();
//...
```

#### `setAdjustUnspecified`

Sets `android:windowSoftInputMode` to `adjustUnspecified` value

```ts
import * as AvoidSoftinput from "react-native-avoid-softinput";

//...
AvoidSoftinput.setAdjustUnspecified();
//...
```

#### `setDefaultAppSoftInputMode`

sets `android:windowSoftInputMode` to default value from Android manifest

```ts
import * as AvoidSoftinput from "react-native-avoid-softinput";

//...
AvoidSoftinput.setDefaultAppSoftInputMode();
//...
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
