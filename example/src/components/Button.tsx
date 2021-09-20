import React, { useMemo } from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  onPress: () => void;
  title: string;
}

const Button: React.FC<Props> = ({ onPress, title }) => {
  const formattedTitle = useMemo(() => {
    if (Platform.OS === 'android') {
      return title.toUpperCase();
    }

    return title;
  }, [ title ]);

  return (
    <Pressable
      android_ripple={{
        borderless: false,
        color: '#2196F3',
      }}
      onPress={onPress}
      style={({ pressed }) => [ styles.button, pressed && styles.pressedButton ]}>
      <Text style={styles.text}>{formattedTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: Platform.select({
    default: {},
    ios: {},
    android: {
      elevation: 4,
      backgroundColor: '#2196F3',
      borderRadius: 2,
    },
  }),
  pressedButton: Platform.select({
    default: {},
    ios: {
      opacity: 0.6,
    },
    android: {},
  }),
  text: {
    textAlign: 'center',
    margin: 8,
    ...Platform.select({
      default: {},
      ios: {
        color: '#007AFF',
        fontSize: 16,
      },
      android: {
        color: 'white',
        fontWeight: '500',
      },
    }),
  },
});

export default Button;
