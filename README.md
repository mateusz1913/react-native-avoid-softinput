# `react-native-avoid-softinput`

<div align="center">
  <div style="padding: 30px">
    <img src="./static/AppIcon.svg" alt="React Native Avoid SoftInput logo" width="50%" />
  </div>
  <blockquote>Handle keyboard in React Native apps like a Pro</blockquote>
</div>

Native solution for common React Native problem of focused views being covered by soft input view. It is solved by listening for soft input events and applying translation to react root view (or bottom padding if focused element's parent is scroll view) entirely on native side and only if currently focused view is covered by soft input frame. It supports focused views being positioned in scroll views and regular views (check out example app). It also supports modal content, when content is wrapped in [AvoidSoftInputView](https://mateusz1913.github.io/react-native-avoid-softinput/docs/api/view/).

## Documentation

Check package [documentation](https://mateusz1913.github.io/react-native-avoid-softinput/)

## Installation

Version 3.x.x supports React Native 0.65+ (old architecture) and has support for Android API 21+ and iOS 11.0+. It also supports Fabric & TurboModules (new architecture) with React Native 0.70+.

Library supports Android & iOS, for out-of-tree platforms, `View` component is used as fallback.

1. Install library with your package manager:

```sh
yarn add react-native-avoid-softinput
```

or

```sh
npm i --save react-native-avoid-softinput
```

2. (iOS-only) Install pods:

```sh
npx pod-install
```

3. (iOS-only) Create and configure bridging header in your iOS project, if it doesn't exist (the easiest way is to create empty .swift file in XCode)

For reference, you can visit [Getting started](https://mateusz1913.github.io/react-native-avoid-softinput/docs/guides/) section

## Expo

- ✅ You can use this library with [Development Builds](https://docs.expo.dev/development/introduction/). No config plugin is required.
- ❌ This library can't be used in the "Expo Go" app because it [requires custom native code](https://docs.expo.dev/workflow/customizing/).

## Usage

Check usage guides for [module](https://mateusz1913.github.io/react-native-avoid-softinput/docs/guides/usage-module) and [view](https://mateusz1913.github.io/react-native-avoid-softinput/docs/guides/usage-view)

## Alternatives

If library does not suite your needs, you can check [alternatives section](https://mateusz1913.github.io/react-native-avoid-softinput/docs/guides/alternatives)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
