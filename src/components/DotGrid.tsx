import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Svg, { Circle, Pattern, Rect } from 'react-native-svg';

/** Subtle pulsing dotted-grid background for the score hero card. */
export function DotGrid() {
  const opacity = useRef(new Animated.Value(0.15)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.35, duration: 3000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.15, duration: 3000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity }]} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Pattern id="dotGrid" width={22} height={22} patternUnits="userSpaceOnUse">
          <Circle cx={1} cy={1} r={1} fill="#F4F2ED" />
        </Pattern>
        <Rect width="100%" height="100%" fill="url(#dotGrid)" />
      </Svg>
    </Animated.View>
  );
}
