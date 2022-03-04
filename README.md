# `react-native-avoid-softinput`

Native solution for common React Native problem of focused views being covered by soft input view. It is solved by listening for soft input events and applying translation to react root view (or bottom padding if focused element's parent is scroll view) entirely on native side and only if currently focused view is covered by soft input frame. It supports focused views being positioned in scroll views and regular views (check out example app). It also supports modal content, when content is wrapped in [AvoidSoftInputView](https://mateusz1913.github.io/react-native-avoid-softinput/docs/api/view/).

Check package [documentation](https://mateusz1913.github.io/react-native-avoid-softinput/)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
