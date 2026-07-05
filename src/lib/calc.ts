export function bmiOf(heightCm: number, weightKg: number): number {
  const m = heightCm / 100;
  return m > 0 ? weightKg / (m * m) : 0;
}

export function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'UNDERWEIGHT';
  if (bmi < 25) return 'HEALTHY RANGE';
  if (bmi < 30) return 'OVERWEIGHT';
  return 'HIGH';
}

export function bmiAdvice(bmi: number): string {
  if (bmi < 18.5) {
    return 'Focus on Bodymaxing and the Hormonal Optimization Diet to build a stronger frame.';
  }
  if (bmi < 25) {
    return 'You are in a healthy range — structure and skin protocols will show fast.';
  }
  return 'Bodymaxing plus the Hormonal Diet will sharpen your frame and reveal facial structure.';
}

export function band(v: number): string {
  if (v >= 90) return 'EXCELLENT';
  if (v >= 80) return 'STRONG';
  if (v >= 70) return 'GOOD';
  if (v >= 60) return 'FAIR';
  return 'DEVELOP';
}

export function gradeOf(v: number): string {
  if (v >= 90) return 'EXCEPTIONAL';
  if (v >= 80) return 'STRONG';
  if (v >= 70) return 'DEVELOPING';
  if (v >= 60) return 'BASELINE';
  return 'FOUNDATIONAL';
}

export function clamp(v: number, min = 50, max = 96): number {
  return Math.max(min, Math.min(max, v));
}

export function noteFor(v: number, notes: [string, string, string]): string {
  return v >= 80 ? notes[0] : v >= 65 ? notes[1] : notes[2];
}

export function dateStr(d: Date = new Date()): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase();
}

export function monthYear(d: Date = new Date()): string {
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
}

export function greeting(d: Date = new Date()): string {
  const h = d.getHours();
  if (h < 12) return 'GOOD MORNING';
  if (h < 18) return 'GOOD AFTERNOON';
  return 'GOOD EVENING';
}

export function summaryFor(overall: number): string {
  if (overall >= 82) return 'A strong, well-balanced structure. Refinement over reinvention.';
  if (overall >= 74) return 'Solid fundamentals with clear, trainable upside in the lower third.';
  return 'A promising baseline. The programs below target your highest-leverage areas.';
}

/** "▲ +5 VS PRIOR" / "▼ 3 VS PRIOR" — matches the design's exact sign/arrow formatting. */
export function deltaVsPrior(delta: number): string {
  return (delta >= 0 ? '▲ +' : '▼ ') + Math.abs(delta) + ' VS PRIOR';
}

/** "+4" / "-2" / "0" */
export function signedDelta(delta: number): string {
  return (delta >= 0 ? '+' : '') + delta;
}

export function deltaColorClass(delta: number): string {
  if (delta > 0) return 'text-success';
  if (delta < 0) return 'text-negative';
  return 'text-soft';
}
