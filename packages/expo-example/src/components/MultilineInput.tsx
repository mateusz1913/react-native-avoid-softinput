import type { RefAttributes } from 'react';
import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';

import { blackColor, textFieldPlaceholderColor, whiteColor } from '../consts/colors';

const MultilineInput = ({ multiline = true, style, ref, ...rest }: TextInputProps & RefAttributes<TextInput>) => {
  return (
    <TextInput
      multiline={multiline}
      placeholderTextColor={textFieldPlaceholderColor}
      {...rest}
      ref={ref}
      style={[styles.input, style]}
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
    height: 500,
    marginBottom: 30,
    padding: 10,
    textAlignVertical: 'top',
  },
});

export default MultilineInput;
