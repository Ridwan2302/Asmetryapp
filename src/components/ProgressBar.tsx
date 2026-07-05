import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors } from '../theme/tokens';

interface ProgressBarProps {
  pct: number; // 0-100
  height?: number;
  trackColor?: string;
  fillColor?: string;
  style?: ViewStyle;
}

export function ProgressBar({ pct, height = 5, trackColor = colors.borderSoft, fillColor = colors.accent, style }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <View style={[{ height, borderRadius: height, backgroundColor: trackColor, overflow: 'hidden' }, style]}>
      <View style={{ height: '100%', width: `${clamped}%`, borderRadius: height, backgroundColor: fillColor }} />
    </View>
  );
}
