import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActiveProgramCard } from '../../src/components/ActiveProgramCard';
import { DotGrid } from '../../src/components/DotGrid';
import { Pill } from '../../src/components/Pill';
import { ProgressBar } from '../../src/components/ProgressBar';
import { Screen } from '../../src/components/Screen';
import { deltaVsPrior, gradeOf, greeting } from '../../src/lib/calc';
import { pickImageFromLibrary } from '../../src/lib/media';
import { useAppStore } from '../../src/state/store';
import { colors, fonts } from '../../src/theme/tokens';

export default function HomeScreen() {
  const profile = useAppStore((s) => s.profile);
  const profilePic = useAppStore((s) => s.profilePic);
  const setProfilePic = useAppStore((s) => s.setProfilePic);
  const scans = useAppStore((s) => s.scans);
  const started = useAppStore((s) => s.started);

  const hasScans = scans.length > 0;
  const latest = hasScans ? scans[scans.length - 1] : null;
  const prev = scans.length > 1 ? scans[scans.length - 2] : latest;
  const overall = latest?.overall ?? null;
  const delta = latest && prev ? latest.overall - prev.overall : 0;

  async function handlePickAvatar() {
    const uri = await pickImageFromLibrary();
    if (uri) setProfilePic(uri);
  }

  return (
    <Screen>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>{greeting()}</Text>
          <Text style={styles.name}>{profile.name || 'You'}</Text>
        </View>
        <Pressable onPress={handlePickAvatar} style={styles.avatar}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={StyleSheet.absoluteFill} contentFit="cover" />
          ) : (
            <Text style={styles.avatarPlaceholder}>SET{'\n'}PHOTO</Text>
          )}
        </Pressable>
      </View>

      <View style={styles.hero}>
        <DotGrid />
        <View style={styles.heroTopRow}>
          <Text style={styles.heroLabel}>FACIAL HARMONY INDEX</Text>
          <Pill label={overall != null ? gradeOf(overall) : 'UNSCANNED'} tone="paper" />
        </View>
        <View style={styles.heroScoreRow}>
          <Text style={styles.heroScore}>{overall ?? '—'}</Text>
          {overall != null && <Text style={styles.heroScoreMax}>/100</Text>}
        </View>
        <ProgressBar
          pct={overall ?? 0}
          height={4}
          trackColor="rgba(244,242,237,0.16)"
          fillColor={colors.paper}
          style={{ marginVertical: 22 }}
        />
        <View style={styles.heroFooterRow}>
          <Text style={styles.heroFooterText}>{overall != null ? deltaVsPrior(delta) : 'TAKE YOUR FIRST SCAN'}</Text>
          {latest && <Text style={styles.heroFooterText}>LAST SCAN {latest.date}</Text>}
        </View>
      </View>

      <Pressable style={styles.rescanCard} onPress={() => router.push('/(tabs)/scan')}>
        <View>
          <Text style={styles.rescanTitle}>New Analysis</Text>
          <Text style={styles.rescanSub}>SCAN · 90 SECONDS</Text>
        </View>
        <View style={styles.rescanArrow}>
          <Text style={styles.rescanArrowText}>→</Text>
        </View>
      </Pressable>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeader}>ACTIVE PROGRAMS · TODAY</Text>
        <Pressable onPress={() => router.push('/(tabs)/programs')}>
          <Text style={styles.libraryLink}>LIBRARY</Text>
        </Pressable>
      </View>

      {started.length === 0 ? (
        <Pressable style={styles.emptyCard} onPress={() => router.push('/(tabs)/programs')}>
          <Text style={styles.emptyTitle}>No active programs yet</Text>
          <Text style={styles.emptySub}>BROWSE THE LIBRARY →</Text>
        </Pressable>
      ) : (
        started.map((s) => <ActiveProgramCard key={s.id} started={s} />)
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 26 },
  greeting: { fontFamily: fonts.ui600, fontSize: 11, letterSpacing: 3, color: colors.soft },
  name: { fontFamily: fonts.display, fontSize: 34, color: colors.ink, marginTop: 6 },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.placeholder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholder: { fontFamily: fonts.ui600, fontSize: 8, letterSpacing: 1, color: colors.soft, textAlign: 'center', lineHeight: 11 },
  hero: { backgroundColor: colors.ink, borderRadius: 26, padding: 28, paddingTop: 30, paddingBottom: 26, overflow: 'hidden' },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 2.5, color: 'rgba(244,242,237,0.6)' },
  heroScoreRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 14 },
  heroScore: { fontFamily: fonts.display, fontSize: 96, color: colors.paper, lineHeight: 82 },
  heroScoreMax: { fontFamily: fonts.display, fontSize: 30, color: 'rgba(244,242,237,0.5)' },
  heroFooterRow: { flexDirection: 'row', justifyContent: 'space-between' },
  heroFooterText: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1, color: 'rgba(244,242,237,0.5)' },
  rescanCard: {
    marginTop: 14,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 18,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rescanTitle: { fontFamily: fonts.display, fontSize: 22, color: colors.ink },
  rescanSub: { fontFamily: fonts.ui500, fontSize: 10, color: colors.soft, letterSpacing: 1, marginTop: 2 },
  rescanArrow: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  rescanArrowText: { color: colors.paper, fontSize: 18 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 34, marginBottom: 14 },
  sectionHeader: { fontFamily: fonts.ui600, fontSize: 11, letterSpacing: 2, color: colors.ink },
  libraryLink: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1, color: colors.soft, textDecorationLine: 'underline' },
  emptyCard: { borderWidth: 1, borderColor: colors.borderStrong, borderStyle: 'dashed', borderRadius: 20, padding: 30, alignItems: 'center' },
  emptyTitle: { fontFamily: fonts.display, fontSize: 20, color: '#3B352D' },
  emptySub: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1, color: colors.soft, marginTop: 6 },
});
