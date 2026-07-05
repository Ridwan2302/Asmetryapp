import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image as RNImage, Pressable, StyleSheet, Text, View } from 'react-native';
import { OutlineButton, PrimaryButton } from '../../src/components/Button';
import { Screen } from '../../src/components/Screen';
import { METRIC_CONFIG } from '../../src/data/metricConfig';
import { getProgram } from '../../src/data/programs';
import { analyzeFace, AnalysisResult, NoFaceDetectedError } from '../../src/lib/faceAnalysis';
import { band, dateStr, gradeOf, noteFor, summaryFor } from '../../src/lib/calc';
import { pickImageFromLibrary } from '../../src/lib/media';
import { useAppStore } from '../../src/state/store';
import { colors, fonts } from '../../src/theme/tokens';

const STAGES = ['DETECTING LANDMARKS', 'MAPPING SYMMETRY AXIS', 'MEASURING PROPORTIONS', 'SCORING FEATURES', 'COMPILING PROTOCOL'];

type Phase = 'idle' | 'camera' | 'scanning' | 'result' | 'error';

export default function ScanScreen() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraError, setCameraError] = useState(false);
  const [captureUri, setCaptureUri] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const cameraRef = useRef<CameraView>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  function resetToIdle() {
    setPhase('idle');
    setCaptureUri(null);
    setResult(null);
    setProgress(0);
    setStageIdx(0);
    setCameraError(false);
  }

  async function handleBeginLiveScan() {
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) {
        setCameraError(true);
        setPhase('camera');
        return;
      }
    }
    setCameraError(false);
    setPhase('camera');
  }

  async function handleCapture() {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.85 });
    if (!photo) return;
    runAnalysis(photo.uri, photo.width, photo.height);
  }

  async function handleUploadPhoto() {
    const uri = await pickImageFromLibrary();
    if (!uri) return;
    const info = await new Promise<{ width: number; height: number }>((resolve) => {
      RNImage.getSize(
        uri,
        (width, height) => resolve({ width, height }),
        () => resolve({ width: 1000, height: 1000 })
      );
    });
    runAnalysis(uri, info.width, info.height);
  }

  function runAnalysis(uri: string, width: number, height: number) {
    setCaptureUri(uri);
    setPhase('scanning');
    setProgress(0);
    setStageIdx(0);

    let p = 0;
    progressTimer.current = setInterval(() => {
      p = Math.min(92, p + 4 + Math.floor(Math.random() * 5));
      setProgress(p);
      setStageIdx(Math.min(STAGES.length - 1, Math.floor(p / 20)));
    }, 160);

    analyzeFace(uri, width, height)
      .then((res) => {
        if (progressTimer.current) clearInterval(progressTimer.current);
        setProgress(100);
        setResult(res);
        setPhase('result');
      })
      .catch((err) => {
        if (progressTimer.current) clearInterval(progressTimer.current);
        setErrorMsg(
          err instanceof NoFaceDetectedError
            ? err.message
            : 'Something went wrong analyzing that photo. Please try again with clearer, even lighting.'
        );
        setPhase('error');
      });
  }

  if (phase === 'result' && result) {
    return <ResultView captureUri={captureUri} result={result} onDone={resetToIdle} />;
  }

  return (
    <Screen scroll={phase !== 'camera'}>
      <Text style={styles.moduleLabel}>MODULE 01</Text>
      <Text style={styles.title}>Facial Scan</Text>

      <View style={styles.viewport}>
        {phase === 'camera' && !cameraError && (
          <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="front" onCameraReady={() => {}} />
        )}

        {(phase === 'idle' || (phase === 'camera' && cameraError)) && (
          <View style={styles.viewportOverlay}>
            {!cameraError ? (
              <>
                <View style={styles.faceOutline} />
                <Text style={styles.viewportHint}>POSITION FACE{'\n'}WITHIN THE OUTLINE</Text>
              </>
            ) : (
              <>
                <Text style={styles.cameraErrorLabel}>CAMERA UNAVAILABLE</Text>
                <Text style={styles.cameraErrorTitle}>Upload a photo instead</Text>
              </>
            )}
          </View>
        )}

        {phase === 'scanning' && (
          <View style={StyleSheet.absoluteFill}>
            {captureUri && <Image source={{ uri: captureUri }} style={[StyleSheet.absoluteFill, styles.mirrored]} contentFit="cover" />}
            <View style={styles.scanLine} />
            <View style={styles.scanStatusWrap}>
              <View style={styles.scanStatusRow}>
                <Text style={styles.scanStatusText}>ANALYZING</Text>
                <Text style={styles.scanStatusText}>{progress}%</Text>
              </View>
              <Text style={styles.scanStageText}>{STAGES[stageIdx]}_</Text>
            </View>
          </View>
        )}

        {phase === 'error' && (
          <View style={styles.viewportOverlay}>
            <Text style={styles.cameraErrorLabel}>ANALYSIS FAILED</Text>
            <Text style={[styles.cameraErrorTitle, { textAlign: 'center', paddingHorizontal: 20 }]}>{errorMsg}</Text>
          </View>
        )}

        <Corner style={{ top: 18, left: 18, borderTopWidth: 1.5, borderLeftWidth: 1.5 }} />
        <Corner style={{ top: 18, right: 18, borderTopWidth: 1.5, borderRightWidth: 1.5 }} />
        <Corner style={{ bottom: 18, left: 18, borderBottomWidth: 1.5, borderLeftWidth: 1.5 }} />
        <Corner style={{ bottom: 18, right: 18, borderBottomWidth: 1.5, borderRightWidth: 1.5 }} />
      </View>

      {(phase === 'idle' || phase === 'error') && (
        <>
          <View style={{ marginTop: 20, gap: 10 }}>
            <PrimaryButton label="BEGIN LIVE SCAN" onPress={handleBeginLiveScan} />
            <OutlineButton label="UPLOAD PHOTO" onPress={handleUploadPhoto} />
          </View>
          <View style={styles.requirements}>
            <Requirement label="NEUTRAL EXPRESSION" value="REQUIRED" />
            <Requirement label="EVEN FRONTAL LIGHT" value="REQUIRED" />
            <Requirement label="HAIR OFF FOREHEAD" value="ADVISED" last />
          </View>
        </>
      )}

      {phase === 'camera' && !cameraError && (
        <View style={styles.cameraControls}>
          <Pressable onPress={resetToIdle}>
            <Text style={styles.cancelLabel}>CANCEL</Text>
          </Pressable>
          <Pressable onPress={handleCapture} style={styles.shutterOuter}>
            <View style={styles.shutterInner} />
          </Pressable>
          <View style={{ width: 52 }} />
        </View>
      )}
      {phase === 'camera' && cameraError && (
        <View style={{ marginTop: 20 }}>
          <OutlineButton label="UPLOAD PHOTO" onPress={handleUploadPhoto} />
        </View>
      )}
    </Screen>
  );
}

function Corner({ style }: { style: object }) {
  return <View style={[styles.corner, style]} />;
}

function Requirement({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.reqRow, !last && styles.reqRowBorder]}>
      <Text style={styles.reqText}>{label}</Text>
      <Text style={styles.reqText}>{value}</Text>
    </View>
  );
}

function ResultView({ captureUri, result, onDone }: { captureUri: string | null; result: AnalysisResult; onDone: () => void }) {
  const addScan = useAppStore((s) => s.addScan);
  const started = useAppStore((s) => s.started);
  const toggleProgram = useAppStore((s) => s.toggleProgram);

  const sorted = [...METRIC_CONFIG].sort((a, b) => result.metrics[a.key] - result.metrics[b.key]);
  const seenPrograms = new Set<string>();
  const picks = [];
  for (const m of sorted) {
    if (!seenPrograms.has(m.programId)) {
      seenPrograms.add(m.programId);
      picks.push(m);
    }
    if (picks.length >= 3) break;
  }

  function handleSave() {
    addScan({
      id: `${Date.now()}`,
      date: dateStr(),
      title: 'New Scan',
      overall: result.overall,
      thumb: captureUri,
      m: result.metrics,
    });
    onDone();
    router.push('/(tabs)/progress');
  }

  return (
    <Screen>
      <Text style={styles.moduleLabel}>ANALYSIS COMPLETE · {dateStr()}</Text>
      <View style={styles.resultHeaderRow}>
        <Text style={styles.title}>Your Results</Text>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.resultScore}>{result.overall}</Text>
          <Text style={styles.resultGrade}>{gradeOf(result.overall)}</Text>
        </View>
      </View>

      <View style={styles.resultSummaryRow}>
        {captureUri && <Image source={{ uri: captureUri }} style={[styles.resultThumb, styles.mirrored]} contentFit="cover" />}
        <Text style={styles.summaryText}>{summaryFor(result.overall)}</Text>
      </View>

      {METRIC_CONFIG.map((m) => {
        const value = result.metrics[m.key];
        return (
          <View key={m.key} style={styles.metricRow}>
            <View style={styles.metricTopRow}>
              <Text style={styles.metricLabel}>{m.label}</Text>
              <Text>
                <Text style={styles.metricValue}>{value}</Text>
                <Text style={styles.metricBand}> {band(value)}</Text>
              </Text>
            </View>
            <View style={styles.metricBarTrack}>
              <View style={[styles.metricBarFill, { width: `${value}%` }]} />
            </View>
            <Text style={styles.metricNote}>{noteFor(value, m.notes)}</Text>
          </View>
        );
      })}

      <Text style={styles.recommendHeader}>RECOMMENDED PROGRAMS</Text>
      {picks.map((m) => {
        const program = getProgram(m.programId);
        if (!program) return null;
        const isActive = started.some((s) => s.id === m.programId);
        return (
          <View key={m.programId} style={styles.recommendCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.recommendName}>{program.name}</Text>
              <Text style={styles.recommendReason}>
                {m.label} · {result.metrics[m.key]}
              </Text>
            </View>
            <Pressable
              onPress={() => toggleProgram(m.programId)}
              style={[styles.recommendBtn, { backgroundColor: isActive ? colors.accent : 'transparent' }]}
            >
              <Text style={[styles.recommendBtnLabel, { color: isActive ? colors.paper : colors.accent }]}>
                {isActive ? 'ADDED' : 'ADD'}
              </Text>
            </Pressable>
          </View>
        );
      })}

      <PrimaryButton label="SAVE TO PROGRESS →" onPress={handleSave} style={{ marginTop: 16 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  moduleLabel: { fontFamily: fonts.ui600, fontSize: 11, letterSpacing: 3, color: colors.soft },
  title: { fontFamily: fonts.display, fontSize: 34, color: colors.ink, marginTop: 4, marginBottom: 22 },
  viewport: { width: '100%', height: 400, borderRadius: 24, overflow: 'hidden', backgroundColor: colors.ink },
  viewportOverlay: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center', gap: 14 },
  faceOutline: { width: 120, height: 150, borderWidth: 1, borderColor: 'rgba(244,242,237,0.3)', borderRadius: 70 },
  viewportHint: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 2, color: 'rgba(244,242,237,0.6)', textAlign: 'center' },
  cameraErrorLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1, color: 'rgba(244,242,237,0.7)' },
  cameraErrorTitle: { fontFamily: fonts.display, fontSize: 20, color: colors.paper },
  mirrored: { transform: [{ scaleX: -1 }] },
  scanLine: {
    position: 'absolute',
    left: 18,
    right: 18,
    top: 20,
    height: 2,
    backgroundColor: colors.paper,
  },
  scanStatusWrap: { position: 'absolute', left: 20, right: 20, bottom: 20 },
  scanStatusRow: { flexDirection: 'row', justifyContent: 'space-between' },
  scanStatusText: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1, color: colors.paper },
  scanStageText: { fontFamily: fonts.ui500, fontSize: 10, color: 'rgba(244,242,237,0.7)', marginTop: 6 },
  corner: { position: 'absolute', width: 26, height: 26, borderColor: colors.paper },
  requirements: { marginTop: 20 },
  reqRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  reqRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderSoft },
  reqText: { fontFamily: fonts.ui500, fontSize: 10, color: colors.soft, letterSpacing: 0.5 },
  cameraControls: { marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24 },
  cancelLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1, color: colors.soft },
  shutterOuter: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  shutterInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.ink },
  resultHeaderRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22 },
  resultScore: { fontFamily: fonts.display, fontSize: 54, color: colors.ink, lineHeight: 46 },
  resultGrade: { fontFamily: fonts.ui500, fontSize: 9, letterSpacing: 1, color: colors.soft, textAlign: 'right' },
  resultSummaryRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  resultThumb: { width: 96, height: 120, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  summaryText: { flex: 1, fontFamily: fonts.displayMedium, fontSize: 19, lineHeight: 25, color: '#3B352D' },
  metricRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 14 },
  metricTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  metricLabel: { fontFamily: fonts.ui600, fontSize: 11, letterSpacing: 1.5, color: colors.ink },
  metricValue: { fontFamily: fonts.display, fontSize: 26, color: colors.ink },
  metricBand: { fontFamily: fonts.ui500, fontSize: 10, color: colors.soft },
  metricBarTrack: { height: 2, backgroundColor: colors.borderSoft, marginTop: 8, marginBottom: 6 },
  metricBarFill: { height: '100%', backgroundColor: colors.accent },
  metricNote: { fontFamily: fonts.ui500, fontSize: 9.5, color: colors.soft, lineHeight: 14 },
  recommendHeader: { fontFamily: fonts.ui600, fontSize: 11, letterSpacing: 2, marginTop: 26, marginBottom: 12, color: colors.ink },
  recommendCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  recommendName: { fontFamily: fonts.display, fontSize: 20, color: colors.ink },
  recommendReason: { fontFamily: fonts.ui500, fontSize: 9, color: colors.soft, letterSpacing: 1, marginTop: 2 },
  recommendBtn: { paddingVertical: 7, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: colors.borderStrong },
  recommendBtnLabel: { fontFamily: fonts.ui500, fontSize: 10, letterSpacing: 1 },
});
