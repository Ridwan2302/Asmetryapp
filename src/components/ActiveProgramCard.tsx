import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getProgram } from '../data/programs';
import { tapHaptic } from '../lib/haptics';
import { cancelProgramReminder, scheduleProgramReminder } from '../lib/notifications';
import { useAppStore } from '../state/store';
import type { StartedProgram } from '../state/types';
import { colors, fonts } from '../theme/tokens';
import { ProgressBar } from './ProgressBar';
import { TimePickerField } from './TimePickerField';

export function ActiveProgramCard({ started }: { started: StartedProgram }) {
  const program = getProgram(started.id);
  const toggleExpanded = useAppStore((s) => s.toggleExpanded);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const logDay = useAppStore((s) => s.logDay);
  const setReminder = useAppStore((s) => s.setReminder);
  const toggleProgram = useAppStore((s) => s.toggleProgram);
  const notificationsEnabled = useAppStore((s) => s.settings.notifications);

  if (!program) return null;

  const dayNum = Math.min(28, started.done + 1);
  const week = Math.min(4, Math.ceil(dayNum / 7));
  const wk = program.weeks[week - 1] ?? program.weeks[0];
  const tasks = wk.tasks;
  const doneCount = tasks.reduce((acc, _, i) => acc + (started.checks[i] ? 1 : 0), 0);
  const allDone = tasks.length > 0 && doneCount === tasks.length;
  const overallPct = (started.done / 28) * 100;
  const todayPct = tasks.length ? (doneCount / tasks.length) * 100 : 0;

  function handleReminderChange(time: string) {
    setReminder(started.id, time);
    scheduleProgramReminder({ ...started, reminder: time }, notificationsEnabled);
  }

  function handleLogDay() {
    if (!allDone) return;
    tapHaptic();
    logDay(started.id);
    scheduleProgramReminder({ ...started, done: Math.min(28, started.done + 1), checks: {} }, notificationsEnabled);
  }

  function handleStop() {
    tapHaptic();
    toggleProgram(started.id);
    cancelProgramReminder(started.id);
  }

  function handleToggleTask(i: number) {
    tapHaptic();
    toggleTask(started.id, i);
  }

  return (
    <View style={styles.card}>
      <Pressable style={styles.headerRow} onPress={() => toggleExpanded(started.id)}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{program.name}</Text>
          <Text style={styles.meta}>
            WEEK {week} · {wk.focus}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end', paddingLeft: 10 }}>
          <Text style={styles.dayCount}>
            {started.done}
            <Text style={styles.dayTotal}>/28</Text>
          </Text>
          <Text style={styles.chevron}>{started.expanded ? '▾' : '▸'}</Text>
        </View>
      </Pressable>

      <View style={styles.barRow}>
        <Text style={styles.barLabel}>OVERALL</Text>
        <ProgressBar pct={overallPct} style={{ flex: 1 }} />
      </View>
      <View style={styles.barRow}>
        <Text style={styles.barLabel}>TODAY</Text>
        <ProgressBar pct={todayPct} fillColor={allDone ? colors.success : colors.accent} style={{ flex: 1 }} />
        <Text style={[styles.todayCount, { color: allDone ? colors.success : colors.ink }]}>
          {doneCount}/{tasks.length}
        </Text>
      </View>

      {started.expanded && (
        <View style={styles.expanded}>
          <Text style={styles.todayHeader}>TODAY · DAY {dayNum}</Text>
          {tasks.map((text, i) => {
            const checked = !!started.checks[i];
            return (
              <Pressable key={i} style={styles.taskRow} onPress={() => handleToggleTask(i)}>
                <View style={[styles.checkbox, { backgroundColor: checked ? colors.accent : 'transparent', borderColor: checked ? colors.accent : 'rgba(20,17,14,0.3)' }]}>
                  {checked && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.taskText, checked && styles.taskTextDone]}>{text}</Text>
              </Pressable>
            );
          })}

          <View style={styles.footerRow}>
            <View style={styles.reminderRow}>
              <Text style={styles.reminderLabel}>REMIND</Text>
              <TimePickerField value={started.reminder} onChange={handleReminderChange} />
            </View>
            <Pressable
              onPress={handleLogDay}
              disabled={!allDone}
              style={[styles.logButton, { backgroundColor: allDone ? colors.accent : 'transparent' }]}
            >
              <Text style={[styles.logLabel, { color: allDone ? colors.paper : colors.soft }]}>
                {started.done >= 28 ? 'COMPLETE' : allDone ? 'LOG DAY ✓' : 'FINISH TASKS'}
              </Text>
            </Pressable>
          </View>
          <Pressable onPress={handleStop} style={styles.stopButton}>
            <Text style={styles.stopLabel}>■ STOP PROGRAM</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: colors.border, borderRadius: 20, padding: 18, marginBottom: 12, backgroundColor: colors.card },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { fontFamily: fonts.display, fontSize: 22, color: colors.ink, lineHeight: 24 },
  meta: { fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1, color: colors.soft, marginTop: 3 },
  dayCount: { fontFamily: fonts.display, fontSize: 24, color: colors.ink },
  dayTotal: { fontFamily: fonts.ui500, fontSize: 10, color: colors.soft },
  chevron: { fontFamily: fonts.ui500, fontSize: 14, color: colors.soft, marginTop: 2 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  barLabel: { fontFamily: fonts.ui600, fontSize: 8, letterSpacing: 1, color: colors.soft, width: 52 },
  todayCount: { fontFamily: fonts.ui700, fontSize: 9, width: 34, textAlign: 'right' },
  expanded: { marginTop: 16 },
  todayHeader: { fontFamily: fonts.ui600, fontSize: 9, letterSpacing: 1.5, color: colors.soft, marginBottom: 8 },
  taskRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 9 },
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  checkmark: { color: colors.paper, fontSize: 12 },
  taskText: { flex: 1, fontFamily: fonts.displayMedium, fontSize: 17, lineHeight: 22, color: colors.ink },
  taskTextDone: { color: colors.soft, textDecorationLine: 'line-through' },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
  },
  reminderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  reminderLabel: { fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1, color: colors.soft },
  logButton: { paddingVertical: 9, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: colors.borderStrong },
  logLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1 },
  stopButton: { marginTop: 12, alignItems: 'center', paddingVertical: 6 },
  stopLabel: { fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1.5, color: colors.soft },
});
