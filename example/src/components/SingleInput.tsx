import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {}

const SingleInput: React.FC<Props> = (props) => {
  return <TextInput {...props} style={[styles.input, props.style]} />;
};

const styles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    fontSize: 10,
    height: 60,
    marginBottom: 30,
    padding: 10,
  },
});

export default SingleInput;
