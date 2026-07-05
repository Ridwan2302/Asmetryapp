import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts } from '../theme/tokens';

export function Pill({ label, tone = 'ink', style }: { label: string; tone?: 'ink' | 'paper'; style?: ViewStyle }) {
  const isPaper = tone === 'paper';
  return (
    <View style={[styles.base, { borderColor: isPaper ? 'rgba(244,242,237,0.3)' : colors.borderStrong }, style]}>
      <Text style={[styles.label, { color: isPaper ? colors.paper : colors.ink }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: fonts.ui500,
    fontSize: 10,
    letterSpacing: 1,
  },
});
