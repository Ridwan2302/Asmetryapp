import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme/tokens';

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
}

/** Standard screen padding for tab screens: safe-area top, 26px sides, clears the floating tab bar at the bottom. */
export function Screen({ children, scroll = true, style }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const padding = {
    paddingTop: insets.top + 8,
    paddingHorizontal: spacing.screenH,
    paddingBottom: spacing.screenBottom + spacing.tabBarHeight + insets.bottom,
  };

  if (!scroll) {
    return <View style={[styles.flex, padding, style]}>{children}</View>;
  }

  return (
    <ScrollView style={styles.flex} contentContainerStyle={[padding, style]} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.paper },
});
