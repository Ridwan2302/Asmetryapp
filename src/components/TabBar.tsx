import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, fonts, spacing } from '../theme/tokens';

/** Duck-typed subset of react-navigation's BottomTabBarProps (not exported as a standalone
 * package under Expo Router's vendored react-navigation in SDK 57). `navigation` is left as
 * `any` since its real type's `emit` overloads are keyed to a closed event-name union that a
 * structural duck-type can't match without depending on that internal package. */
interface TabBarProps {
  state: { index: number; routes: { key: string; name: string }[] };
  navigation: any;
  insets: { bottom: number };
}

const ICONS: Record<string, (color: string) => React.ReactNode> = {
  index: (c) => (
    <Svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 10.5 12 3l9 7.5" />
      <Path d="M5.5 9.5V20h13V9.5" />
    </Svg>
  ),
  scan: (c) => (
    <Svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
      <Path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
      <Path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
      <Path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <Circle cx={12} cy={12} r={3} />
    </Svg>
  ),
  programs: (c) => (
    <Svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 3 3 7.5l9 4.5 9-4.5Z" />
      <Path d="M3 12l9 4.5 9-4.5" />
      <Path d="M3 16.5 12 21l9-4.5" />
    </Svg>
  ),
  progress: (c) => (
    <Svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M4 20V4" />
      <Path d="M4 20h16" />
      <Path d="M8 16l3.5-4.5 3 2L20 7" />
    </Svg>
  ),
  profile: (c) => (
    <Svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={12} cy={8} r={3.4} />
      <Path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </Svg>
  ),
};

const LABELS: Record<string, string> = {
  index: 'HOME',
  scan: 'SCAN',
  programs: 'PROGRAMS',
  progress: 'PROGRESS',
  profile: 'PROFILE',
};

export function TabBar({ state, navigation, insets }: TabBarProps) {
  return (
    <View style={[styles.wrap, { height: spacing.tabBarHeight + insets.bottom, paddingBottom: insets.bottom }]}>
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, styles.tint]} />
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const color = focused ? colors.accent : colors.soft;
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <Pressable key={route.key} onPress={onPress} style={styles.item}>
            {ICONS[route.name]?.(color)}
            <Text style={[styles.label, { color }]}>{LABELS[route.name] ?? route.name.toUpperCase()}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 14,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    overflow: 'hidden',
  },
  tint: { backgroundColor: 'rgba(244,242,237,0.8)' },
  item: { flex: 1, alignItems: 'center', gap: 6 },
  label: { fontFamily: fonts.ui600, fontSize: 8.5, letterSpacing: 1 },
});
