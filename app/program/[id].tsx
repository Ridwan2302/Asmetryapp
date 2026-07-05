import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AnatomyPlate } from '../../src/components/AnatomyPlate';
import { OutlineButton, PrimaryButton } from '../../src/components/Button';
import { Screen } from '../../src/components/Screen';
import { getProgram } from '../../src/data/programs';
import { cancelProgramReminder, scheduleProgramReminder } from '../../src/lib/notifications';
import { useAppStore } from '../../src/state/store';
import { colors, fonts } from '../../src/theme/tokens';

export default function ProgramDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const program = getProgram(id);
  const [openWeek, setOpenWeek] = useState(1);
  const started = useAppStore((s) => s.started);
  const toggleProgram = useAppStore((s) => s.toggleProgram);
  const notificationsEnabled = useAppStore((s) => s.settings.notifications);

  if (!program) {
    return (
      <Screen>
        <Text>Program not found.</Text>
      </Screen>
    );
  }

  const isActive = started.some((s) => s.id === program.id);

  const handleToggle = () => {
    toggleProgram(program.id);
    if (isActive) {
      cancelProgramReminder(program.id);
    } else {
      scheduleProgramReminder({ id: program.id, done: 0, checks: {}, reminder: '08:00' }, notificationsEnabled);
    }
  };

  return (
    <Screen>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backLink}>← PROGRAMS</Text>
      </Pressable>
      <Text style={styles.sectionLabel}>{program.section}</Text>
      <Text style={styles.name}>{program.name}</Text>
      <Text style={styles.tagline}>{program.tagline}</Text>

      <View style={styles.hero}>
        {program.img ? (
          <Image source={program.img} style={StyleSheet.absoluteFill} contentFit="cover" />
        ) : (
          <View style={styles.platePad}>
            <AnatomyPlate plate={program.plate} />
          </View>
        )}
        <View style={styles.heroCaptionWrap}>
          <Text style={styles.heroCaption}>TARGET · {program.anatomy}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <StatTile value="28" label="DAYS" />
        <StatTile value={String(program.mins)} label="MIN / DAY" />
        <StatTile value={program.level} label="LEVEL" small />
      </View>

      <Text style={styles.overview}>{program.overview}</Text>

      <Text style={styles.protocolHeader}>THE 4-WEEK PROTOCOL</Text>
      {program.weeks.map((w) => {
        const open = openWeek === w.n;
        return (
          <View key={w.n} style={styles.weekCard}>
            <Pressable style={styles.weekHeaderRow} onPress={() => setOpenWeek(open ? 0 : w.n)}>
              <View>
                <Text style={styles.weekLabel}>WEEK {w.n}</Text>
                <Text style={styles.weekFocus}>{w.focus}</Text>
              </View>
              <Text style={styles.chevron}>{open ? '▾' : '▸'}</Text>
            </Pressable>
            {open && (
              <View style={styles.weekTasks}>
                {w.tasks.map((task, i) => (
                  <View key={i} style={styles.taskRow}>
                    <View style={styles.taskDot} />
                    <Text style={styles.taskText}>{task}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}

      {isActive ? (
        <OutlineButton label="STOP PROGRAM" onPress={handleToggle} style={{ marginTop: 22 }} />
      ) : (
        <PrimaryButton label="START PROGRAM" onPress={handleToggle} style={{ marginTop: 22 }} />
      )}
      {isActive && (
        <Pressable onPress={() => router.push('/(tabs)')} style={{ marginTop: 10, alignItems: 'center' }}>
          <Text style={styles.goHomeLink}>GO TO TODAY'S CHECKLIST →</Text>
        </Pressable>
      )}
    </Screen>
  );
}

function StatTile({ value, label, small }: { value: string; label: string; small?: boolean }) {
  return (
    <View style={styles.statTile}>
      <Text style={[styles.statValue, small && { fontSize: 15, paddingTop: 8 }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backLink: { fontFamily: fonts.ui500, fontSize: 11, letterSpacing: 1, color: colors.soft, marginBottom: 16 },
  sectionLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 2, color: colors.soft },
  name: { fontFamily: fonts.display, fontSize: 38, color: colors.ink, marginTop: 4, lineHeight: 40 },
  tagline: { fontFamily: fonts.displayItalic, fontSize: 19, color: '#3B352D', marginTop: 4, marginBottom: 20 },
  hero: {
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 22,
    height: 230,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  platePad: { width: '80%', height: '84%' },
  heroCaptionWrap: { position: 'absolute', bottom: 10, left: 14, backgroundColor: 'rgba(244,242,237,0.7)', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  heroCaption: { fontFamily: fonts.ui500, fontSize: 8, color: colors.soft, letterSpacing: 1 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 22 },
  statTile: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 12, alignItems: 'center' },
  statValue: { fontFamily: fonts.display, fontSize: 26, color: colors.ink },
  statLabel: { fontFamily: fonts.ui500, fontSize: 8, letterSpacing: 1, color: colors.soft },
  overview: { fontFamily: fonts.displayMedium, fontSize: 19, lineHeight: 26, color: '#3B352D', marginBottom: 24 },
  protocolHeader: { fontFamily: fonts.ui600, fontSize: 10, letterSpacing: 2, color: colors.ink, marginBottom: 12 },
  weekCard: { borderWidth: 1, borderColor: colors.border, borderRadius: 16, marginBottom: 10, overflow: 'hidden', backgroundColor: colors.card },
  weekHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingHorizontal: 16 },
  weekLabel: { fontFamily: fonts.ui600, fontSize: 9, letterSpacing: 1.5, color: colors.soft },
  weekFocus: { fontFamily: fonts.display, fontSize: 20, color: colors.ink, marginTop: 2 },
  chevron: { fontFamily: fonts.ui500, fontSize: 14, color: colors.soft },
  weekTasks: { paddingHorizontal: 16, paddingBottom: 14 },
  taskRow: { flexDirection: 'row', gap: 12, paddingVertical: 8, borderTopWidth: 1, borderTopColor: colors.borderSoft },
  taskDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.accent, marginTop: 9 },
  taskText: { flex: 1, fontFamily: fonts.displayMedium, fontSize: 17, lineHeight: 22, color: colors.ink },
  goHomeLink: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1, color: colors.soft, textDecorationLine: 'underline' },
});
