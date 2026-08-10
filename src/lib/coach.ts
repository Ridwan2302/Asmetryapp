/** Templated (non-AI) coaching state — picks which message to show based on the user's actual
 * scan/plan/program data. No live model calls; every branch is a deterministic rule against real
 * numbers, which the Home screen then renders with translated copy. */
export type CoachState =
  | { kind: 'no_scan' }
  | { kind: 'scan_no_plan'; metricLabel: string }
  | { kind: 'has_started_no_plan' }
  | { kind: 'plan_progress'; day: number; status: 'not_started' | 'partial' | 'done'; improvement: { label: string; delta: number } | null }
  | { kind: 'plan_complete' };

export interface CoachInput {
  hasScans: boolean;
  hasPlan: boolean;
  hasOtherStartedPrograms: boolean;
  planDay: number | null; // 1-28
  planAnyDone: boolean;
  planAllDone: boolean;
  planComplete: boolean;
  weakestMetricLabel: string | null;
  improvement: { label: string; delta: number } | null;
}

export function getCoachState(input: CoachInput): CoachState {
  if (!input.hasScans) return { kind: 'no_scan' };

  if (input.hasPlan) {
    if (input.planComplete) return { kind: 'plan_complete' };
    const status = input.planAllDone ? 'done' : input.planAnyDone ? 'partial' : 'not_started';
    return { kind: 'plan_progress', day: input.planDay ?? 1, status, improvement: input.improvement };
  }

  if (input.hasOtherStartedPrograms) return { kind: 'has_started_no_plan' };

  if (input.weakestMetricLabel) return { kind: 'scan_no_plan', metricLabel: input.weakestMetricLabel };

  return { kind: 'no_scan' };
}
