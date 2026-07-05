import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { OutlineButton, PrimaryButton } from '../../components/Button';
import { Pill } from '../../components/Pill';
import { bmiAdvice, bmiCategory, bmiOf } from '../../lib/calc';
import { useAppStore } from '../../state/store';
import { Sex } from '../../state/types';
import { colors, fonts } from '../../theme/tokens';

const introData = [
  {
    label: 'STEP 01 · ANALYZE',
    title: 'Scan your face',
    body: 'A quick capture measures symmetry, proportion and seven structural traits.',
    img: require('../../../assets/images/onboarding/intro-scan.png'),
  },
  {
    label: 'STEP 02 · PROTOCOL',
    title: 'Follow the program',
    body: 'Get 4-week daily protocols built around your weakest metrics — mewing, jawmaxing, hunter eyes and more.',
    img: require('../../../assets/images/onboarding/intro-jaw.png'),
  },
  {
    label: 'STEP 03 · TRACK',
    title: 'Watch it change',
    body: 'Check off daily tasks, get reminders, and re-scan to see the structure improve.',
    img: require('../../../assets/images/onboarding/welcome-hero.png'),
  },
];

interface Props {
  mode: 'initial' | 'edit';
}

export function OnboardingFlow({ mode }: Props) {
  const insets = useSafeAreaInsets();
  const profile = useAppStore((s) => s.profile);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const updateProfile = useAppStore((s) => s.updateProfile);

  const [step, setStep] = useState(mode === 'edit' ? 4 : 0);
  const [name, setName] = useState(profile.name);
  const [sex, setSex] = useState<Sex>(profile.sex);
  const [age, setAge] = useState(mode === 'edit' ? String(profile.age) : '');
  const [height, setHeight] = useState(mode === 'edit' ? String(profile.height) : '');
  const [weight, setWeight] = useState(mode === 'edit' ? String(profile.weight) : '');

  const bmiLive = useMemo(() => {
    const h = parseInt(height, 10) || profile.height;
    const w = parseInt(weight, 10) || profile.weight;
    return bmiOf(h, w);
  }, [height, weight, profile.height, profile.weight]);

  const statsReady = !!(age && height && weight);

  function next() {
    setStep((s) => s + 1);
  }
  function skipIntro() {
    setStep(4);
  }
  function finish() {
    const finalProfile = {
      name: (name || 'You').trim(),
      sex,
      age: parseInt(age, 10) || 24,
      height: parseInt(height, 10) || 178,
      weight: parseInt(weight, 10) || 72,
      since: profile.since,
    };
    if (mode === 'edit') {
      updateProfile(finalProfile);
      router.back();
    } else {
      completeOnboarding(finalProfile);
      router.replace('/(tabs)');
    }
  }

  const topPad = insets.top + 20;

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {step === 0 && <Welcome topPad={topPad} onNext={next} />}
      {step >= 1 && step <= 3 && <Intro topPad={topPad} idx={step - 1} onNext={next} onSkip={skipIntro} />}
      {step === 4 && (
        <StatsForm
          topPad={topPad}
          name={name}
          setName={setName}
          sex={sex}
          setSex={setSex}
          age={age}
          setAge={setAge}
          height={height}
          setHeight={setHeight}
          weight={weight}
          setWeight={setWeight}
          ready={statsReady}
          onNext={next}
        />
      )}
      {step >= 5 && (
        <ResultStep
          topPad={topPad}
          bmi={bmiLive}
          age={parseInt(age, 10) || profile.age}
          height={parseInt(height, 10) || profile.height}
          weight={parseInt(weight, 10) || profile.weight}
          onFinish={finish}
        />
      )}
    </KeyboardAvoidingView>
  );
}

function Welcome({ topPad, onNext }: { topPad: number; onNext: () => void }) {
  return (
    <View style={[styles.screen, { paddingTop: topPad, paddingBottom: 46, justifyContent: 'space-between' }]}>
      <View style={styles.headerRow}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} contentFit="cover" />
        <View>
          <Text style={styles.wordmark}>
            asmetry<Text style={{ color: colors.soft, fontWeight: '400' }}>.io</Text>
          </Text>
          <Text style={styles.tagline}>FACIAL ANALYSIS · LOOKSMAXING OS</Text>
        </View>
      </View>

      <View style={styles.heroWrap}>
        <Image source={require('../../../assets/images/onboarding/welcome-hero.png')} style={styles.heroImage} contentFit="cover" />
      </View>

      <View>
        <Text style={styles.welcomeHeadline}>Measure your face.{'\n'}Follow the protocol.{'\n'}Watch the structure change.</Text>
        <PrimaryButton label="BEGIN →" onPress={onNext} />
        <Text style={styles.caption}>TAKES 90 SECONDS · DATA STAYS ON DEVICE</Text>
      </View>
    </View>
  );
}

function Intro({ topPad, idx, onNext, onSkip }: { topPad: number; idx: number; onNext: () => void; onSkip: () => void }) {
  const cur = introData[idx];
  return (
    <View style={[styles.screen, { paddingTop: topPad + 36, paddingBottom: 46, justifyContent: 'space-between' }]}>
      <View>
        <Text style={styles.stepLabel}>{cur.label}</Text>
        <Image source={cur.img} style={styles.introImage} contentFit="cover" />
        <Text style={styles.introTitle}>{cur.title}</Text>
        <Text style={styles.introBody}>{cur.body}</Text>
      </View>
      <View>
        <View style={styles.dotsRow}>
          {introData.map((_, i) => (
            <View key={i} style={[styles.dot, { width: i === idx ? 20 : 6, backgroundColor: i === idx ? colors.accent : 'rgba(20,17,14,0.2)' }]} />
          ))}
        </View>
        <PrimaryButton label={idx === 2 ? 'CONTINUE' : 'NEXT →'} onPress={onNext} />
        <Pressable onPress={onSkip}>
          <Text style={styles.skipLink}>SKIP INTRO</Text>
        </Pressable>
      </View>
    </View>
  );
}

function StatsForm(props: {
  topPad: number;
  name: string;
  setName: (v: string) => void;
  sex: Sex;
  setSex: (v: Sex) => void;
  age: string;
  setAge: (v: string) => void;
  height: string;
  setHeight: (v: string) => void;
  weight: string;
  setWeight: (v: string) => void;
  ready: boolean;
  onNext: () => void;
}) {
  const { topPad, name, setName, sex, setSex, age, setAge, height, setHeight, weight, setWeight, ready, onNext } = props;
  return (
    <ScrollView contentContainerStyle={[styles.screen, { paddingTop: topPad + 40, paddingBottom: 46 }]} keyboardShouldPersistTaps="handled">
      <Text style={styles.stepLabel}>STEP 04 · YOUR BASELINE</Text>
      <Text style={styles.formTitle}>Tell us about you</Text>

      <Text style={styles.fieldLabel}>NAME</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        placeholderTextColor={colors.soft}
        style={styles.underlineInput}
      />

      <Text style={[styles.fieldLabel, { marginTop: 26 }]}>SEX (FOR ANATOMY MODEL)</Text>
      <View style={styles.sexRow}>
        {(['M', 'F'] as Sex[]).map((v) => (
          <Pressable
            key={v}
            onPress={() => setSex(v)}
            style={[styles.sexOption, { backgroundColor: sex === v ? colors.ink : 'transparent' }]}
          >
            <Text style={[styles.sexLabel, { color: sex === v ? colors.paper : colors.ink }]}>{v === 'M' ? 'MALE' : 'FEMALE'}</Text>
          </Pressable>
        ))}
      </View>

      <View style={[styles.rowGap, { marginTop: 26 }]}>
        <View style={styles.flex1}>
          <Text style={styles.fieldLabel}>AGE</Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="24"
            placeholderTextColor={colors.soft}
            keyboardType="number-pad"
            style={styles.underlineInput}
          />
        </View>
        <View style={styles.flex1}>
          <Text style={styles.fieldLabel}>HEIGHT · CM</Text>
          <TextInput
            value={height}
            onChangeText={setHeight}
            placeholder="178"
            placeholderTextColor={colors.soft}
            keyboardType="number-pad"
            style={styles.underlineInput}
          />
        </View>
        <View style={styles.flex1}>
          <Text style={styles.fieldLabel}>WEIGHT · KG</Text>
          <TextInput
            value={weight}
            onChangeText={setWeight}
            placeholder="72"
            placeholderTextColor={colors.soft}
            keyboardType="number-pad"
            style={styles.underlineInput}
          />
        </View>
      </View>

      {ready ? (
        <PrimaryButton label="CALCULATE →" onPress={onNext} style={{ marginTop: 40 }} />
      ) : (
        <OutlineButton label="CALCULATE →" onPress={onNext} style={{ marginTop: 40 }} />
      )}
    </ScrollView>
  );
}

function ResultStep({
  topPad,
  bmi,
  age,
  height,
  weight,
  onFinish,
}: {
  topPad: number;
  bmi: number;
  age: number;
  height: number;
  weight: number;
  onFinish: () => void;
}) {
  return (
    <View style={[styles.screen, { paddingTop: topPad + 30, paddingBottom: 46, justifyContent: 'space-between' }]}>
      <View>
        <Text style={styles.stepLabel}>STEP 05 · YOUR MODEL</Text>
        <Text style={styles.formTitle}>Baseline captured</Text>
        <View style={styles.resultRow}>
          <Image source={require('../../../assets/images/body-model.png')} style={styles.bodyModel} contentFit="cover" />
          <View style={styles.flex1}>
            <Text style={styles.fieldLabel}>BODY MASS INDEX</Text>
            <Text style={styles.bmiNumber}>{bmi ? bmi.toFixed(1) : '—'}</Text>
            <Pill label={bmiCategory(bmi)} style={{ marginTop: 8 }} />
            <View style={{ marginTop: 16 }}>
              <StatRow label="AGE" value={`${age} YRS`} />
              <StatRow label="HEIGHT" value={`${height} CM`} />
              <StatRow label="WEIGHT" value={`${weight} KG`} last />
            </View>
          </View>
        </View>
        <Text style={styles.advice}>{bmiAdvice(bmi)}</Text>
      </View>
      <PrimaryButton label="ENTER ASMETRY →" onPress={onFinish} />
    </View>
  );
}

function StatRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.statRow, !last && styles.statRowBorder]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statLabel}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.paper },
  flex1: { flex: 1 },
  screen: { flexGrow: 1, paddingHorizontal: 34, backgroundColor: colors.paper },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: { width: 44, height: 44, borderRadius: 12 },
  wordmark: { fontFamily: fonts.ui700, fontSize: 28, color: colors.ink, letterSpacing: -0.5 },
  tagline: { fontFamily: fonts.ui500, fontSize: 8.5, letterSpacing: 2.5, color: colors.soft, marginTop: 3 },
  heroWrap: { flex: 1, justifyContent: 'center', marginVertical: 24 },
  heroImage: { width: '100%', aspectRatio: 1, borderRadius: 26 },
  welcomeHeadline: { fontFamily: fonts.display, fontSize: 32, lineHeight: 37, color: colors.ink, marginBottom: 22, maxWidth: 320 },
  caption: { textAlign: 'center', marginTop: 16, fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1, color: colors.soft },
  stepLabel: { fontFamily: fonts.ui600, fontSize: 11, letterSpacing: 3, color: colors.soft },
  introImage: { width: '100%', height: 300, borderRadius: 22, marginVertical: 22 },
  introTitle: { fontFamily: fonts.display, fontSize: 40, color: colors.ink, letterSpacing: -0.5 },
  introBody: { fontFamily: fonts.displayMedium, fontSize: 20, lineHeight: 28, color: '#3B352D', marginTop: 14 },
  dotsRow: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginBottom: 22 },
  dot: { height: 6, borderRadius: 6 },
  skipLink: { textAlign: 'center', marginTop: 14, fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1, color: colors.soft },
  formTitle: { fontFamily: fonts.display, fontSize: 40, color: colors.ink, letterSpacing: -0.5, marginTop: 6, marginBottom: 28 },
  fieldLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1.5, color: colors.soft, marginBottom: 8 },
  underlineInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(20,17,14,0.25)',
    paddingVertical: 10,
    fontSize: 18,
    color: colors.ink,
    fontFamily: fonts.ui400,
  },
  rowGap: { flexDirection: 'row', gap: 14 },
  sexRow: { flexDirection: 'row', gap: 8 },
  sexOption: { flex: 1, alignItems: 'center', paddingVertical: 13, borderRadius: 14, borderWidth: 1, borderColor: colors.borderStrong },
  sexLabel: { fontFamily: fonts.ui500, fontSize: 11, letterSpacing: 1 },
  resultRow: { flexDirection: 'row', gap: 18, alignItems: 'center', marginTop: 20 },
  bodyModel: { width: 150, height: 240, borderRadius: 16 },
  bmiNumber: { fontFamily: fonts.display, fontSize: 64, color: colors.ink, marginTop: 6, lineHeight: 58 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  statRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderSoft },
  statLabel: { fontFamily: fonts.ui500, fontSize: 10, color: colors.soft },
  advice: { fontFamily: fonts.displayMedium, fontSize: 19, lineHeight: 26, color: '#3B352D', marginTop: 24 },
});
