import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from './Button';
import { colors, fonts } from '../theme/tokens';

function parseTime(hhmm: string): Date {
  const [h, m] = hhmm.split(':').map((n) => parseInt(n, 10));
  const d = new Date();
  d.setHours(Number.isNaN(h) ? 8 : h, Number.isNaN(m) ? 0 : m, 0, 0);
  return d;
}

function formatTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function TimePickerField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [iosVisible, setIosVisible] = useState(false);
  const [draft, setDraft] = useState(() => parseTime(value));

  function open() {
    const current = parseTime(value);
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: current,
        mode: 'time',
        is24Hour: true,
        onChange: (_event, date) => {
          if (date) onChange(formatTime(date));
        },
      });
    } else {
      setDraft(current);
      setIosVisible(true);
    }
  }

  return (
    <>
      <Pressable onPress={open} style={styles.field}>
        <Text style={styles.text}>{value}</Text>
      </Pressable>
      {Platform.OS === 'ios' && (
        <Modal visible={iosVisible} transparent animationType="slide" onRequestClose={() => setIosVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.sheet}>
              <RNDateTimePicker
                value={draft}
                mode="time"
                display="spinner"
                is24Hour
                onChange={(_event, date) => date && setDraft(date)}
              />
              <PrimaryButton
                label="DONE"
                onPress={() => {
                  onChange(formatTime(draft));
                  setIosVisible(false);
                }}
                style={{ marginTop: 8 }}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  text: { fontFamily: fonts.ui500, fontSize: 12, color: colors.ink },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.paper, padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
});
