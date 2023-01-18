import * as React from 'react';
import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';

const MultilineInput = React.forwardRef<TextInput, TextInputProps>(({ multiline = true, style, ...rest }, ref) => {
  return <TextInput multiline={multiline} placeholderTextColor="#2E8555" {...rest} ref={ref} style={[ styles.input, style ]} />;
});

const styles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    fontSize: 18,
    height: 500,
    marginBottom: 30,
    padding: 10,
    textAlignVertical: 'top',
  },
});

export default MultilineInput;
