import { useMemo } from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';

import { buttonBackground, buttonLabelColor, buttonRipple, whiteColor } from '../consts/colors';

const RIPPLE_CONFIG = {
  borderless: false,
  color: buttonRipple,
};

interface Props {
  onPress: () => void;
  title: string;
}

const Button = ({ onPress, title }: Props) => {
  const formattedTitle = useMemo(() => {
    if (Platform.OS === 'android') {
      return title.toUpperCase();
    }

    return title;
  }, [title]);

  return (
    <Pressable
      accessibilityRole="button"
      android_ripple={RIPPLE_CONFIG}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressedButton]}>
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
      backgroundColor: buttonBackground,
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
        color: buttonLabelColor,
        fontSize: 16,
      },
      android: {
        color: whiteColor,
        fontWeight: '500',
      },
    }),
  },
});

export default Button;
