import type { RefAttributes } from 'react';
import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';

import { blackColor, textFieldPlaceholderColor, whiteColor } from '../consts/colors';

const SingleInput = ({ ref, ...props }: TextInputProps & RefAttributes<TextInput>) => {
  return (
    <TextInput
      placeholderTextColor={textFieldPlaceholderColor}
      {...props}
      ref={ref}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    backgroundColor: whiteColor,
    borderColor: blackColor,
    borderRadius: 10,
    borderWidth: 1,
    color: blackColor,
    fontSize: 18,
    height: 60,
    marginBottom: 30,
    padding: 10,
  },
});

export default SingleInput;
