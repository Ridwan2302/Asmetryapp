/* asmetry.io — full program library. 11 programs, each a 4-week (28-day) daily protocol.
 * Ported verbatim from the design handoff's programs.js. */
import { ImageSourcePropType } from 'react-native';

export type ProgramSection = 'STRUCTURE' | 'BODY' | 'SKIN & GROOMING' | 'SYSTEMS';
export type ProgramLevel = 'CORE' | 'INTERMEDIATE' | 'ADVANCED';
export type AnatomyPlate = 'face' | 'jaw' | 'eyes' | 'body' | 'posture' | 'skin' | 'sleep';

export interface ProgramWeek {
  n: number;
  focus: string;
  tasks: string[];
}

export interface Program {
  id: string;
  name: string;
  section: ProgramSection;
  tagline: string;
  mins: number;
  level: ProgramLevel;
  anatomy: string;
  plate: AnatomyPlate;
  img?: ImageSourcePropType;
  overview: string;
  weeks: ProgramWeek[];
}

export const ASMETRY_PROGRAMS: Program[] = [
  {
    id: 'face-structure', name: 'Face Structure', section: 'STRUCTURE', tagline: 'Maxilla · midface · overall harmony',
    mins: 12, level: 'CORE', anatomy: 'Facial Musculature', plate: 'face', img: require('../../assets/images/programs/face-structure.png'),
    overview: 'A month of tongue posture, midface activation and lymphatic work to lift the entire facial framework and sharpen its underlying structure.',
    weeks: [
      { n: 1, focus: 'Establish tongue posture', tasks: ['Full-tongue mewing, 3× 10-min holds', 'Nasal breathing check every waking hour', 'Cheekbone lift: 3 sets of 15', 'AM + PM lymphatic face massage, 2 min'] },
      { n: 2, focus: 'Build midface activation', tasks: ['Continuous mewing all day', 'Cheekbone lift: 4 sets of 15', 'Buccal hollow holds: 3 × 10s', 'Face gua sha along cheek + jaw, 3 min'] },
      { n: 3, focus: 'Load & sculpt', tasks: ['Mewing + hard swallow reps, 3 sets', 'Cheek + buccal circuit: 4 rounds', 'Under-eye tapping drainage, 2 min', 'Cold-water face immersion, 30s'] },
      { n: 4, focus: 'Consolidate the framework', tasks: ['Effortless all-day mewing (habit check)', 'Full face circuit: 5 rounds', 'Progress photo, front + profile', 'Gua sha + cold immersion recovery'] }
    ]
  },
  {
    id: 'jawmaxing', name: 'Jawmaxing', section: 'STRUCTURE', tagline: 'Masseter hypertrophy · gonial angle',
    mins: 10, level: 'INTERMEDIATE', anatomy: 'Masseter & Mandible', plate: 'jaw', img: require('../../assets/images/programs/jawmaxing-profile.png'),
    overview: 'Progressive resistance chewing and clench training to hypertrophy the masseter, sharpen the gonial angle and widen the lower-face silhouette.',
    weeks: [
      { n: 1, focus: 'Prime the masseter', tasks: ['Warm-up: 20 slow jaw clenches', 'Resistance gum: 3 min per side', 'Chin tucks: 3 sets of 12', 'Jaw-fascia release massage, 2 min'] },
      { n: 2, focus: 'Add resistance', tasks: ['Firm gum: 5 min per side', 'Isometric clench holds: 3 × 20s', 'Chin tucks: 4 sets of 15', 'Neck + jaw stretch, 2 min'] },
      { n: 3, focus: 'Peak load', tasks: ['Hard gum: 6 min per side', 'Weighted clench holds: 4 × 20s', 'Lower-lip pull downs: 3 sets of 15', 'Deep masseter release, 3 min'] },
      { n: 4, focus: 'Sharpen & recover', tasks: ['Gum circuit: 5 min per side', 'Clench pyramid: 5 descending sets', 'Progress photo, profile + 45°', 'Full jaw + neck recovery massage'] }
    ]
  },
  {
    id: 'hunter-eyes', name: 'Hunter Eyes Program', section: 'STRUCTURE', tagline: 'Canthal tilt · orbital · upper-eyelid exposure',
    mins: 8, level: 'ADVANCED', anatomy: 'Orbital Region', plate: 'eyes', img: require('../../assets/images/programs/hunter-eyes.png'),
    overview: 'Orbital and periorbital training to reduce upper-eyelid exposure, support a positive canthal tilt and create a more hooded, forward-set hunter-eye look.',
    weeks: [
      { n: 1, focus: 'Wake the orbital ring', tasks: ['Lateral gaze holds: 3 × 8s per side', 'Under-eye de-puff cold compress, 60s', 'Outer-corner lift + squint: 3 × 12', 'Inner-to-outer drainage taps, 90s'] },
      { n: 2, focus: 'Train the tilt', tasks: ['Canthal lift resistance: 4 × 12 per side', 'Squint holds: 3 × 10s', 'Brow-set downward press: 3 × 15', 'Cold compress + drainage, 2 min'] },
      { n: 3, focus: 'Deepen the hood', tasks: ['Canthal + brow superset: 4 rounds', 'Sustained squint holds: 4 × 12s', 'Temple + orbital massage, 2 min', 'Screen-distance + sleep hygiene check'] },
      { n: 4, focus: 'Set the look', tasks: ['Full orbital circuit: 5 rounds', 'De-puff + drainage AM/PM', 'Progress photo, neutral gaze', 'Recovery: compress + massage'] }
    ]
  },
  {
    id: 'bodymaxing', name: 'Bodymaxing', section: 'BODY', tagline: 'V-taper · shoulders · lean composition',
    mins: 35, level: 'INTERMEDIATE', anatomy: 'Upper-Body Musculature', plate: 'body', img: require('../../assets/images/programs/bodymaxing-labeled.png'),
    overview: 'A four-week push toward a wider, leaner frame: shoulder and back volume for the V-taper, a tighter waist, and daily habits that reveal definition.',
    weeks: [
      { n: 1, focus: 'Build the base', tasks: ['Push session: chest, shoulders, triceps', 'Lateral raises: 4 sets of 15', '8k steps for the day', 'Protein target: 1.6g per kg bodyweight'] },
      { n: 2, focus: 'Widen the frame', tasks: ['Pull session: back, rear delts, biceps', 'Lateral raises: 5 sets of 15', '10k steps for the day', 'Hit protein + 300 cal deficit'] },
      { n: 3, focus: 'Add intensity', tasks: ['Push/pull superset circuit', 'Overhead press: 4 heavy sets', 'Core + waist vacuum: 3 × 20s', '10k steps + protein target'] },
      { n: 4, focus: 'Reveal definition', tasks: ['Full-body strength circuit', 'Shoulder finisher: 6 sets', 'Progress photo, front + back', 'Deficit + protein + 10k steps'] }
    ]
  },
  {
    id: 'posture', name: 'Posture Reset', section: 'BODY', tagline: 'Spinal alignment · forward-head correction',
    mins: 15, level: 'CORE', anatomy: 'Spinal Column', plate: 'posture', img: require('../../assets/images/programs/posture-reset.png'),
    overview: 'Undo forward-head and rounded-shoulder posture with daily mobility, thoracic extension and strengthening — the fastest change to how your frame reads.',
    weeks: [
      { n: 1, focus: 'Open & release', tasks: ['Chin tucks: 3 sets of 12', 'Chest doorway stretch: 3 × 30s', 'Thoracic extensions over chair: 10 reps', 'Hourly posture reset alarm'] },
      { n: 2, focus: 'Strengthen the back', tasks: ['Wall angels: 3 sets of 12', 'Band pull-aparts: 3 sets of 20', 'Chin tucks: 4 sets of 12', 'Desk ergonomics check'] },
      { n: 3, focus: 'Integrate', tasks: ['Face pulls: 4 sets of 15', 'Wall angels + Y-T-W raises', 'Deep neck flexor holds: 3 × 20s', 'Standing posture holds through the day'] },
      { n: 4, focus: 'Make it default', tasks: ['Full posture circuit', 'Loaded carries: 3 sets', 'Progress photo, side profile', 'All-day alignment habit check'] }
    ]
  },
  {
    id: 'skinmaxing', name: 'Skinmaxing', section: 'SKIN & GROOMING', tagline: 'Barrier · glow · collagen support',
    mins: 10, level: 'CORE', anatomy: 'Skin Cross-Section', plate: 'skin', img: require('../../assets/images/programs/skinmaxing.png'),
    overview: 'Build a resilient barrier and a real glow: a simple, consistent routine plus the sleep, sun and nutrition inputs that skin actually responds to.',
    weeks: [
      { n: 1, focus: 'Establish the routine', tasks: ['AM: cleanse, vitamin C, SPF 30+', 'PM: cleanse + moisturize', 'Water target: 2.5L', 'Pillowcase change (2×/week)'] },
      { n: 2, focus: 'Introduce actives', tasks: ['PM: low-% retinoid (alt nights)', 'AM routine + SPF reapply', 'Sleep 7.5h+', 'No touching / picking (habit check)'] },
      { n: 3, focus: 'Support collagen', tasks: ['Retinoid nightly if tolerated', 'AM antioxidant + SPF', 'Protein + vitamin-C rich meals', 'Facial massage, 3 min'] },
      { n: 4, focus: 'Lock in the glow', tasks: ['Full AM + PM routine', 'Weekly gentle exfoliation', 'Progress photo, bare skin', 'Sleep + hydration + SPF streak'] }
    ]
  },
  {
    id: 'skin-clarity', name: 'Skin Clarity Reset', section: 'SKIN & GROOMING', tagline: 'Breakout control · texture · tone',
    mins: 8, level: 'INTERMEDIATE', anatomy: 'Skin Cross-Section', plate: 'skin', img: require('../../assets/images/programs/skin-clarity.png'),
    overview: 'A focused reset for congestion and uneven tone — calm active breakouts, clear texture, and rebuild an even, clear complexion over 28 days.',
    weeks: [
      { n: 1, focus: 'Calm & simplify', tasks: ['Gentle cleanse AM/PM only', 'Spot treat with BHA/benzoyl', 'SPF every morning', 'Cut dairy + high-sugar test'] },
      { n: 2, focus: 'Clear congestion', tasks: ['BHA exfoliant, alternate nights', 'Non-comedogenic moisturizer', 'Clean phone screen + pillowcase', 'Hydrate 2.5L + sleep 7.5h'] },
      { n: 3, focus: 'Even the tone', tasks: ['Niacinamide AM', 'Continue BHA + spot care', 'SPF reapply midday', 'No picking (streak check)'] },
      { n: 4, focus: 'Stabilize', tasks: ['Maintenance routine locked', 'Weekly clay mask', 'Progress photo, bare skin', 'Diet + sleep + hydration review'] }
    ]
  },
  {
    id: 'grooming', name: 'Power Grooming System', section: 'SKIN & GROOMING', tagline: 'Brows · hair · beard · presentation',
    mins: 10, level: 'CORE', anatomy: 'Frontal Presentation', plate: 'face', img: require('../../assets/images/programs/grooming.png'),
    overview: 'Dial in the controllables that instantly raise presentation: brows, hairline, facial hair, teeth and grooming detail — refined and maintained weekly.',
    weeks: [
      { n: 1, focus: 'Audit & shape', tasks: ['Brow clean-up (map, then trim)', 'Book / plan a sharp haircut', 'Define beard or clean shave line', 'Start whitening routine'] },
      { n: 2, focus: 'Refine hair', tasks: ['Style hair with correct products', 'Maintain beard/shave line', 'Nail + hand grooming', 'Whitening + flossing streak'] },
      { n: 3, focus: 'Detail work', tasks: ['Brow maintenance', 'Fragrance + skin base routine', 'Trim + edge-up touch-ups', 'Wardrobe fit check (top 3 outfits)'] },
      { n: 4, focus: 'System on autopilot', tasks: ['Full grooming pass', 'Progress photo, styled', 'Restock products low on stock', 'Set weekly maintenance schedule'] }
    ]
  },
  {
    id: 'hormonal', name: 'Hormonal Optimization Diet', section: 'SYSTEMS', tagline: 'Testosterone · insulin · body composition',
    mins: 20, level: 'ADVANCED', anatomy: 'Metabolic Profile', plate: 'body', img: require('../../assets/images/programs/hormonal.png'),
    overview: 'Eat and train to support natural hormonal balance: protein and micronutrient targets, blood-sugar control, and the lifestyle inputs that move the needle.',
    weeks: [
      { n: 1, focus: 'Fix the foundation', tasks: ['Protein: 1.8g per kg bodyweight', 'Cut liquid sugar + seed-oil fried food', 'Sunlight 15 min before noon', 'Sleep 8h window'] },
      { n: 2, focus: 'Balance blood sugar', tasks: ['Whole-food carbs only', 'Zinc + magnesium rich meals', 'Strength train 3×/week', 'Fasting 12h overnight'] },
      { n: 3, focus: 'Support production', tasks: ['Healthy fats: eggs, olive oil, fish', 'Resistance training progression', 'Stress / cortisol wind-down at night', 'Hydration + electrolytes'] },
      { n: 4, focus: 'Dial it in', tasks: ['Full nutrient-dense day', 'Track measurements + energy', 'Progress photo + waist measure', 'Review sleep, training, diet streaks'] }
    ]
  },
  {
    id: 'sleep', name: 'Elite Sleep Protocol', section: 'SYSTEMS', tagline: 'Deep sleep · recovery · circadian rhythm',
    mins: 5, level: 'CORE', anatomy: 'Circadian System', plate: 'sleep',
    overview: 'Sleep is where the face de-puffs and the body recovers. Rebuild deep, consistent sleep with light timing, temperature and a locked wind-down ritual.',
    weeks: [
      { n: 1, focus: 'Anchor the rhythm', tasks: ['Fixed wake time, 7 days', 'Morning sunlight within 30 min', 'No caffeine after 2pm', 'Screens off 60 min before bed'] },
      { n: 2, focus: 'Build the ritual', tasks: ['Cool, dark room (18°C)', 'Wind-down routine, 30 min', 'No large meals 3h before bed', 'Consistent bedtime ±15 min'] },
      { n: 3, focus: 'Deepen recovery', tasks: ['Magnesium + no alcohol test', 'Blue-light filter after sunset', 'Breathing / relaxation, 5 min', 'Track sleep + morning puffiness'] },
      { n: 4, focus: 'Lock the system', tasks: ['Full protocol nightly', 'Consistent 8h achieved', 'Review de-puff in AM photos', 'Set permanent sleep schedule'] }
    ]
  },
  {
    id: 'hydration', name: 'Hydration Protocol', section: 'SYSTEMS', tagline: 'Skin plumpness · de-puff · energy',
    mins: 3, level: 'CORE', anatomy: 'Fluid Balance', plate: 'body',
    overview: 'Proper hydration and electrolyte balance visibly plump skin, reduce puffiness and sharpen features — the lowest-effort, fastest-visible input.',
    weeks: [
      { n: 1, focus: 'Hit the baseline', tasks: ['Water: 500ml on waking', 'Reach 2.5L across the day', 'Add electrolytes once daily', 'Cut excess salt + alcohol'] },
      { n: 2, focus: 'Balance electrolytes', tasks: ['3L water target', 'Sodium/potassium balance in meals', 'Herbal tea instead of late caffeine', 'Track AM facial puffiness'] },
      { n: 3, focus: 'Optimize timing', tasks: ['Front-load water before evening', 'Electrolytes AM + post-training', 'Water-rich foods each meal', 'Cold-water face rinse AM'] },
      { n: 4, focus: 'Make it effortless', tasks: ['Consistent 3L habit', 'De-puff routine locked', 'Progress photo, AM face', 'Review energy + skin clarity'] }
    ]
  }
];

export function getProgram(id: string): Program | undefined {
  return ASMETRY_PROGRAMS.find((p) => p.id === id);
}

export const PROGRAM_SECTIONS: ProgramSection[] = ['STRUCTURE', 'BODY', 'SKIN & GROOMING', 'SYSTEMS'];
