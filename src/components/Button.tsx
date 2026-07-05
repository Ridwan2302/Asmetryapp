import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts } from '../theme/tokens';

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function PrimaryButton({ label, onPress, disabled, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={styles.primaryLabel}>{label}</Text>
    </Pressable>
  );
}

export function OutlineButton({ label, onPress, disabled, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.outline, pressed && !disabled && styles.pressedOutline, style]}
    >
      <Text style={styles.outlineLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.ink,
    borderRadius: 20,
    paddingVertical: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryLabel: {
    color: colors.paper,
    fontFamily: fonts.ui600,
    fontSize: 12,
    letterSpacing: 2,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 20,
    paddingVertical: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineLabel: {
    color: colors.ink,
    fontFamily: fonts.ui600,
    fontSize: 12,
    letterSpacing: 2,
  },
  disabled: { opacity: 0.35 },
  pressed: { opacity: 0.85 },
  pressedOutline: { opacity: 0.6 },
});
