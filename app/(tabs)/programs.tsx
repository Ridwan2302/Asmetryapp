import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../src/components/Screen';
import { PROGRAM_SECTIONS, ASMETRY_PROGRAMS } from '../../src/data/programs';
import { cancelProgramReminder, scheduleProgramReminder } from '../../src/lib/notifications';
import { useAppStore } from '../../src/state/store';
import { colors, fonts } from '../../src/theme/tokens';

export default function ProgramsScreen() {
  const started = useAppStore((s) => s.started);
  const toggleProgram = useAppStore((s) => s.toggleProgram);
  const notificationsEnabled = useAppStore((s) => s.settings.notifications);

  function handleToggle(id: string) {
    const isStarted = started.some((s) => s.id === id);
    toggleProgram(id);
    if (isStarted) {
      cancelProgramReminder(id);
    } else {
      scheduleProgramReminder({ id, done: 0, checks: {}, reminder: '08:00' }, notificationsEnabled);
    }
  }

  return (
    <Screen>
      <Text style={styles.moduleLabel}>MODULE 02</Text>
      <Text style={styles.title}>Programs</Text>

      <View style={styles.banner}>
        <Image source={require('../../assets/images/programs-features.png')} style={StyleSheet.absoluteFill} contentFit="cover" />
        <View style={styles.bannerCaptionWrap}>
          <Text style={styles.bannerCaption}>FIG. 1 — FEATURE MAP</Text>
        </View>
      </View>
      <Text style={styles.intro}>
        Each program is a complete 4-week protocol with a daily checklist. Start one and it appears on Home.
      </Text>

      {PROGRAM_SECTIONS.map((section) => {
        const items = ASMETRY_PROGRAMS.filter((p) => p.section === section);
        return (
          <View key={section} style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>{section}</Text>
              <View style={styles.sectionRule} />
            </View>
            {items.map((p) => {
              const isActive = started.some((s) => s.id === p.id);
              return (
                <Pressable key={p.id} style={styles.card} onPress={() => router.push(`/program/${p.id}`)}>
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={styles.cardName}>{p.name}</Text>
                    <Text style={styles.cardTagline}>{p.tagline}</Text>
                    <Text style={styles.cardMeta}>
                      28 DAYS · {p.mins} MIN · {p.level}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => handleToggle(p.id)}
                    style={[styles.toggleBtn, { backgroundColor: isActive ? colors.accent : 'transparent' }]}
                  >
                    <Text style={[styles.toggleLabel, { color: isActive ? colors.paper : colors.accent }]}>
                      {isActive ? 'ACTIVE' : 'START'}
                    </Text>
                  </Pressable>
                </Pressable>
              );
            })}
          </View>
        );
      })}

      <Text style={styles.disclaimer}>Programs are educational and not medical advice. Consult a professional before starting.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  moduleLabel: { fontFamily: fonts.ui600, fontSize: 11, letterSpacing: 3, color: colors.soft },
  title: { fontFamily: fonts.display, fontSize: 34, color: colors.ink, marginTop: 4, marginBottom: 18 },
  banner: { position: 'relative', borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 22, height: 200, overflow: 'hidden', marginBottom: 10, backgroundColor: colors.card },
  bannerCaptionWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 14, paddingTop: 20, paddingBottom: 8, backgroundColor: 'rgba(20,17,14,0.4)' },
  bannerCaption: { fontFamily: fonts.ui500, fontSize: 8, color: colors.paper, letterSpacing: 1 },
  intro: { fontFamily: fonts.ui500, fontSize: 9.5, color: colors.soft, lineHeight: 15, marginBottom: 26 },
  section: { marginBottom: 26 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  sectionHeader: { fontFamily: fonts.ui600, fontSize: 10, letterSpacing: 2, color: colors.ink },
  sectionRule: { flex: 1, height: 1, backgroundColor: colors.border },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16,
    paddingHorizontal: 18,
    marginBottom: 10,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardName: { fontFamily: fonts.display, fontSize: 22, color: colors.ink, lineHeight: 24 },
  cardTagline: { fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1, color: colors.soft, marginTop: 4 },
  cardMeta: { fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1, color: colors.soft, marginTop: 8 },
  toggleBtn: { paddingVertical: 7, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: colors.borderStrong },
  toggleLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1 },
  disclaimer: { fontFamily: fonts.ui500, fontSize: 8.5, color: colors.soft, lineHeight: 14, textAlign: 'center', marginTop: 6, letterSpacing: 0.3 },
});
