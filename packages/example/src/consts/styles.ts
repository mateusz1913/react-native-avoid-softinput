import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  item: {
    marginHorizontal: 40,
    marginVertical: 10,
  },
  label: {
    color: 'black',
    fontSize: 15,
    marginVertical: 10,
  },
  screenContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    alignSelf: 'stretch',
    flexGrow: 1,
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: 'gray',
    height: StyleSheet.hairlineWidth,
  },
  stretch: {
    alignSelf: 'stretch',
  },
});
