import * as React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

const RIPPLE_CONFIG = {
  borderless: true,
  color: '#ccc',
  foreground: true,
};

interface Props {
  onPress?: () => void;
}

const CloseButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable
      android_ripple={RIPPLE_CONFIG}
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <View style={[styles.line, styles.minusLine]} />
      <View style={[styles.line, styles.plusLine]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    borderRadius: 15,
    height: 30,
    margin: 15,
    padding: 15,
    width: 30,
  },
  line: {
    backgroundColor: 'royalblue',
    position: 'absolute',
    top: 5,
    left: 14,
    height: 20,
    width: 2,
  },
  minusLine: {
    transform: [{ rotate: '-45deg' }],
  },
  plusLine: {
    transform: [{ rotate: '45deg' }],
  },
  pressed: Platform.select({
    ios: {
      opacity: 0.4,
    },
    default: {},
  }),
});

export default CloseButton;
