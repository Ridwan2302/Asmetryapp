import { Image } from 'expo-image';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { OutlineButton, PrimaryButton } from '../../src/components/Button';
import { Pill } from '../../src/components/Pill';
import { Screen } from '../../src/components/Screen';
import { bmiCategory, bmiOf } from '../../src/lib/calc';
import { pickImageFromLibrary } from '../../src/lib/media';
import { resyncAllReminders } from '../../src/lib/notifications';
import { useAppStore } from '../../src/state/store';
import { Settings } from '../../src/state/types';
import { colors, fonts } from '../../src/theme/tokens';

const SETTINGS_ROWS: { id: keyof Settings; label: string }[] = [
  { id: 'notifications', label: 'Program reminders' },
  { id: 'haptics', label: 'Haptic feedback' },
  { id: 'grid', label: 'Scan grid overlay' },
  { id: 'private', label: 'Private mode' },
];

export default function ProfileScreen() {
  const profile = useAppStore((s) => s.profile);
  const profilePic = useAppStore((s) => s.profilePic);
  const setProfilePic = useAppStore((s) => s.setProfilePic);
  const scans = useAppStore((s) => s.scans);
  const started = useAppStore((s) => s.started);
  const settings = useAppStore((s) => s.settings);
  const toggleSetting = useAppStore((s) => s.toggleSetting);
  const resetApp = useAppStore((s) => s.resetApp);

  const [confirmReset, setConfirmReset] = useState(false);

  const bmi = bmiOf(profile.height, profile.weight);
  const daysDone = started.reduce((acc, s) => acc + s.done, 0);

  async function handleSetPhoto() {
    const uri = await pickImageFromLibrary();
    if (uri) setProfilePic(uri);
  }

  function handleToggleSetting(id: keyof Settings) {
    toggleSetting(id);
    if (id === 'notifications') {
      resyncAllReminders(started, !settings.notifications);
    }
  }

  async function handleResetApp() {
    await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
    resetApp();
    setConfirmReset(false);
    router.replace('/(onboarding)');
  }

  return (
    <Screen>
      <Text style={styles.moduleLabel}>MODULE 04</Text>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.avatarBlock}>
        <View style={styles.avatar}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={StyleSheet.absoluteFill} contentFit="cover" />
          ) : (
            <Text style={styles.avatarPlaceholder}>NO PHOTO</Text>
          )}
        </View>
        <Text style={styles.name}>{profile.name || 'You'}</Text>
        <Text style={styles.member}>MEMBER · {profile.since}</Text>
        <View style={styles.avatarActions}>
          <Pressable onPress={handleSetPhoto} style={styles.setPhotoBtn}>
            <Text style={styles.setPhotoLabel}>SET PHOTO</Text>
          </Pressable>
          <Pressable onPress={() => setProfilePic(null)} style={styles.deleteBtn}>
            <Text style={styles.deleteLabel}>DELETE</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.bodyCard}>
        <Image source={require('../../assets/images/body-model.png')} style={styles.bodyModel} contentFit="cover" />
        <View style={{ flex: 1 }}>
          <Text style={styles.fieldLabel}>YOUR ANATOMY MODEL</Text>
          <View style={styles.bmiRow}>
            <Text style={styles.bmiValue}>{bmi ? bmi.toFixed(1) : '—'}</Text>
            <Text style={styles.bmiUnit}>BMI</Text>
          </View>
          <Pill label={bmiCategory(bmi)} style={{ marginTop: 8 }} />
          <View style={{ marginTop: 12 }}>
            <StatRow label="AGE" value={`${profile.age} YRS`} />
            <StatRow label="HEIGHT" value={`${profile.height} CM`} />
            <StatRow label="WEIGHT" value={`${profile.weight} KG`} />
          </View>
          <Pressable onPress={() => router.push('/edit-stats')}>
            <Text style={styles.editStatsLink}>EDIT STATS</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.statsRow}>
        <StatTile value={String(scans.length)} label="SCANS" />
        <StatTile value={String(started.length)} label="ACTIVE" />
        <StatTile value={String(daysDone)} label="DAYS DONE" />
      </View>

      <Text style={styles.settingsHeader}>SETTINGS</Text>
      {SETTINGS_ROWS.map((row) => (
        <Pressable key={row.id} onPress={() => handleToggleSetting(row.id)} style={styles.settingRow}>
          <Text style={styles.settingLabel}>{row.label}</Text>
          <View style={[styles.toggleTrack, { backgroundColor: settings[row.id] ? colors.accent : 'rgba(20,17,14,0.18)' }]}>
            <View style={[styles.toggleKnob, { left: settings[row.id] ? 21 : 3 }]} />
          </View>
        </Pressable>
      ))}

      <Text style={styles.dangerHeader}>DANGER ZONE</Text>
      {!confirmReset ? (
        <Pressable style={styles.dangerRow} onPress={() => setConfirmReset(true)}>
          <View>
            <Text style={styles.dangerTitle}>Start Fresh</Text>
            <Text style={styles.dangerSub}>Erase everything and begin from zero</Text>
          </View>
          <Text style={styles.dangerIcon}>🗑</Text>
        </Pressable>
      ) : (
        <View style={styles.confirmCard}>
          <Text style={styles.confirmTitle}>Start completely over?</Text>
          <Text style={styles.confirmBody}>
            This permanently erases your profile, photo, scan history, and every active program. This cannot be undone.
          </Text>
          <View style={styles.confirmRow}>
            <OutlineButton label="KEEP MY DATA" onPress={() => setConfirmReset(false)} style={{ flex: 1, paddingVertical: 14 }} />
            <PrimaryButton label="ERASE EVERYTHING" onPress={handleResetApp} style={{ flex: 1, paddingVertical: 14 }} />
          </View>
        </View>
      )}

      <Text style={styles.footer}>asmetry.io v2.0 · DATA STAYS ON DEVICE</Text>
    </Screen>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statRowLabel}>{label}</Text>
      <Text style={styles.statRowLabel}>{value}</Text>
    </View>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statTile}>
      <Text style={styles.statTileValue}>{value}</Text>
      <Text style={styles.statTileLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  moduleLabel: { fontFamily: fonts.ui600, fontSize: 11, letterSpacing: 3, color: colors.soft },
  title: { fontFamily: fonts.display, fontSize: 34, color: colors.ink, marginTop: 4, marginBottom: 24 },
  avatarBlock: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 110, height: 110, borderRadius: 55, overflow: 'hidden', borderWidth: 1, borderColor: colors.border, backgroundColor: colors.placeholder, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  avatarPlaceholder: { fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1, color: colors.soft },
  name: { fontFamily: fonts.display, fontSize: 28, color: colors.ink },
  member: { fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 2, color: colors.soft, marginTop: 2 },
  avatarActions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  setPhotoBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: colors.ink },
  setPhotoLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1, color: colors.paper },
  deleteBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.borderStrong },
  deleteLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1, color: colors.ink },
  bodyCard: { borderWidth: 1, borderColor: colors.border, borderRadius: 22, padding: 18, backgroundColor: colors.card, marginBottom: 24, flexDirection: 'row', gap: 16, alignItems: 'center' },
  bodyModel: { width: 110, height: 190, borderRadius: 14 },
  fieldLabel: { fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1.5, color: colors.soft },
  bmiRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 6 },
  bmiValue: { fontFamily: fonts.display, fontSize: 44, color: colors.ink, lineHeight: 38 },
  bmiUnit: { fontFamily: fonts.ui500, fontSize: 9, color: colors.soft },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 },
  statRowLabel: { fontFamily: fonts.ui500, fontSize: 9.5, color: colors.soft },
  editStatsLink: { fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1, color: colors.ink, marginTop: 12, textDecorationLine: 'underline' },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 26 },
  statTile: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  statTileValue: { fontFamily: fonts.display, fontSize: 30, color: colors.ink },
  statTileLabel: { fontFamily: fonts.ui500, fontSize: 8, letterSpacing: 1, color: colors.soft },
  settingsHeader: { fontFamily: fonts.ui600, fontSize: 10, letterSpacing: 2, color: colors.ink, marginBottom: 4 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderTopWidth: 1, borderTopColor: colors.border },
  settingLabel: { fontFamily: fonts.display, fontSize: 19, color: colors.ink },
  toggleTrack: { width: 44, height: 26, borderRadius: 20 },
  toggleKnob: { position: 'absolute', top: 3, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.paper },
  dangerHeader: { fontFamily: fonts.ui600, fontSize: 10, letterSpacing: 2, color: colors.ink, marginTop: 22, marginBottom: 10 },
  dangerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 16, padding: 16, paddingHorizontal: 18 },
  dangerTitle: { fontFamily: fonts.display, fontSize: 20, color: colors.ink },
  dangerSub: { fontFamily: fonts.ui500, fontSize: 9, color: colors.soft, marginTop: 2 },
  dangerIcon: { fontSize: 18 },
  confirmCard: { borderWidth: 1, borderColor: colors.ink, borderRadius: 16, padding: 18 },
  confirmTitle: { fontFamily: fonts.display, fontSize: 21, color: colors.ink },
  confirmBody: { fontFamily: fonts.ui500, fontSize: 11, lineHeight: 17, color: colors.soft, marginTop: 6 },
  confirmRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  footer: { fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1, color: '#C3BDB2', textAlign: 'center', marginTop: 16 },
});
