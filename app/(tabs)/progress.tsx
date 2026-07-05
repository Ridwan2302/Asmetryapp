import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { deltaColor, signedDelta } from '../../src/lib/calc';
import { useAppStore } from '../../src/state/store';
import { colors, fonts } from '../../src/theme/tokens';

export default function ProgressScreen() {
  const scans = useAppStore((s) => s.scans);

  if (scans.length === 0) {
    return (
      <Screen>
        <Text style={styles.moduleLabel}>MODULE 03</Text>
        <Text style={styles.title}>Progress</Text>
        <Pressable style={styles.emptyCard} onPress={() => router.push('/(tabs)/scan')}>
          <Text style={styles.emptyTitle}>No scans yet</Text>
          <Text style={styles.emptySub}>RUN YOUR FIRST ANALYSIS →</Text>
        </Pressable>
      </Screen>
    );
  }

  const latest = scans[scans.length - 1];
  const prev = scans.length > 1 ? scans[scans.length - 2] : latest;
  const progDelta = latest.overall - prev.overall;

  const recent = scans.slice(-4);
  const maxS = Math.max(...recent.map((x) => x.overall));
  const minS = Math.min(...recent.map((x) => x.overall)) - 6;
  const span = Math.max(1, maxS - minS + 1);

  const trendDeltaNum = latest.overall - scans[0].overall;
  const scanArchive = [...scans].reverse();

  return (
    <Screen>
      <Text style={styles.moduleLabel}>MODULE 03</Text>
      <Text style={styles.title}>Progress</Text>

      <View style={styles.headlineRow}>
        <View>
          <Text style={styles.headlineLabel}>CURRENT SCORE</Text>
          <Text style={styles.headlineScore}>{latest.overall}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.headlineLabel}>VS LAST SCAN</Text>
          <Text style={[styles.headlineDelta, { color: deltaColor(progDelta) }]}>{signedDelta(progDelta)}</Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartHeaderRow}>
          <Text style={styles.chartHeaderLabel}>HARMONY INDEX · TREND</Text>
          <Text style={styles.chartHeaderDelta}>{signedDelta(trendDeltaNum)} SINCE BASELINE</Text>
        </View>
        <View style={styles.chartBarsRow}>
          {recent.map((s, i) => (
            <View key={s.id} style={styles.chartBarCol}>
              <Text style={styles.chartBarScore}>{s.overall}</Text>
              <View
                style={[
                  styles.chartBar,
                  {
                    height: Math.round(((s.overall - minS) / span) * 70 + 20),
                    backgroundColor: i === recent.length - 1 ? colors.accent : 'rgba(20,17,14,0.25)',
                  },
                ]}
              />
              <Text style={styles.chartBarDate}>{s.date}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.archiveHeader}>EVERY SCAN</Text>
      {scanArchive.map((s, i) => {
        const older = scanArchive[i + 1];
        const delta = older ? s.overall - older.overall : 0;
        const note = !older ? 'BASELINE' : delta > 0 ? 'IMPROVED' : delta < 0 ? 'DIPPED' : 'HELD';
        return (
          <View key={s.id} style={styles.archiveRow}>
            <View style={styles.archiveThumb}>{s.thumb && <Image source={{ uri: s.thumb }} style={[StyleSheet.absoluteFill, styles.mirrored]} contentFit="cover" />}</View>
            <View style={{ flex: 1 }}>
              <Text style={styles.archiveTitle}>{s.title}</Text>
              <Text style={styles.archiveMeta}>
                {s.date} · {note}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.archiveScore}>{s.overall}</Text>
              <Text style={[styles.archiveDelta, { color: older ? deltaColor(delta) : colors.soft }]}>{older ? signedDelta(delta) : 'BASE'}</Text>
            </View>
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  moduleLabel: { fontFamily: fonts.ui600, fontSize: 11, letterSpacing: 3, color: colors.soft },
  title: { fontFamily: fonts.display, fontSize: 34, color: colors.ink, marginTop: 4, marginBottom: 22 },
  headlineRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22 },
  headlineLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1.5, color: colors.soft },
  headlineScore: { fontFamily: fonts.display, fontSize: 72, color: colors.ink, lineHeight: 62, marginTop: 4 },
  headlineDelta: { fontFamily: fonts.display, fontSize: 32, lineHeight: 34 },
  chartCard: { borderWidth: 1, borderColor: colors.border, borderRadius: 22, padding: 22, paddingHorizontal: 20, backgroundColor: colors.card, marginBottom: 28 },
  chartHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 },
  chartHeaderLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1.5, color: colors.soft },
  chartHeaderDelta: { fontFamily: fonts.ui500, fontSize: 11, color: colors.ink },
  chartBarsRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, height: 130 },
  chartBarCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: 8 },
  chartBarScore: { fontFamily: fonts.display, fontSize: 18, color: colors.ink },
  chartBar: { width: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  chartBarDate: { fontFamily: fonts.ui500, fontSize: 8, color: colors.soft, letterSpacing: 0.5 },
  archiveHeader: { fontFamily: fonts.ui600, fontSize: 10, letterSpacing: 2, color: colors.ink, marginBottom: 12 },
  archiveRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    backgroundColor: colors.card,
  },
  archiveThumb: { width: 52, height: 64, borderRadius: 10, overflow: 'hidden', backgroundColor: '#E7E3DA' },
  mirrored: { transform: [{ scaleX: -1 }] },
  archiveTitle: { fontFamily: fonts.display, fontSize: 20, color: colors.ink },
  archiveMeta: { fontFamily: fonts.ui500, fontSize: 9, color: colors.soft, letterSpacing: 1 },
  archiveScore: { fontFamily: fonts.display, fontSize: 28, color: colors.ink, lineHeight: 30 },
  archiveDelta: { fontFamily: fonts.ui500, fontSize: 9 },
  emptyCard: { borderWidth: 1, borderColor: colors.borderStrong, borderStyle: 'dashed', borderRadius: 20, padding: 30, alignItems: 'center' },
  emptyTitle: { fontFamily: fonts.display, fontSize: 20, color: '#3B352D' },
  emptySub: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1, color: colors.soft, marginTop: 6 },
});
