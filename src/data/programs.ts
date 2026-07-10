import type { Language } from '../state/types';

/* asmetry.io — full program library. 11 programs, each a 4-week (28-day) daily protocol.
 * English content ported verbatim from the design handoff's programs.js; French content
 * is a full translation, not a placeholder — both are complete, independent copy. */

export type ProgramSection = 'STRUCTURE' | 'BODY' | 'SKIN & GROOMING' | 'SYSTEMS';
export type ProgramLevel = 'CORE' | 'INTERMEDIATE' | 'ADVANCED';
export type AnatomyPlate = 'face' | 'jaw' | 'eyes' | 'body' | 'posture' | 'skin' | 'sleep';

export interface ProgramWeek {
  n: number;
  focus: string;
  tasks: string[];
}

export interface ProgramCopy {
  name: string;
  tagline: string;
  anatomy: string;
  overview: string;
  weeks: ProgramWeek[];
}

export interface Program extends ProgramCopy {
  id: string;
  section: ProgramSection;
  mins: number;
  level: ProgramLevel;
  plate: AnatomyPlate;
  img?: string;
  fr: ProgramCopy;
}

export function localizeProgram(program: Program, lang: Language): ProgramCopy {
  if (lang === 'fr') return program.fr;
  return { name: program.name, tagline: program.tagline, anatomy: program.anatomy, overview: program.overview, weeks: program.weeks };
}

export const ASMETRY_PROGRAMS: Program[] = [
  {
    id: 'face-structure', section: 'STRUCTURE',
    mins: 12, level: 'CORE', plate: 'face', img: '/images/programs/face-structure.png',
    name: 'Face Structure', tagline: 'Maxilla · midface · overall harmony', anatomy: 'Facial Musculature',
    overview: 'A month of tongue posture, midface activation and lymphatic work to lift the entire facial framework and sharpen its underlying structure.',
    weeks: [
      { n: 1, focus: 'Establish tongue posture', tasks: ['Full-tongue mewing, 3× 10-min holds', 'Nasal breathing check every waking hour', 'Cheekbone lift: 3 sets of 15', 'AM + PM lymphatic face massage, 2 min'] },
      { n: 2, focus: 'Build midface activation', tasks: ['Continuous mewing all day', 'Cheekbone lift: 4 sets of 15', 'Buccal hollow holds: 3 × 10s', 'Face gua sha along cheek + jaw, 3 min'] },
      { n: 3, focus: 'Load & sculpt', tasks: ['Mewing + hard swallow reps, 3 sets', 'Cheek + buccal circuit: 4 rounds', 'Under-eye tapping drainage, 2 min', 'Cold-water face immersion, 30s'] },
      { n: 4, focus: 'Consolidate the framework', tasks: ['Effortless all-day mewing (habit check)', 'Full face circuit: 5 rounds', 'Progress photo, front + profile', 'Gua sha + cold immersion recovery'] }
    ],
    fr: {
      name: 'Structure Faciale', tagline: 'Maxillaire · milieu du visage · harmonie globale', anatomy: 'Musculature faciale',
      overview: 'Un mois de posture linguale, d’activation du milieu du visage et de travail lymphatique pour relever l’ensemble de la structure faciale et affiner son ossature sous-jacente.',
      weeks: [
        { n: 1, focus: 'Installer la posture linguale', tasks: ['Mewing complet, 3 × maintiens de 10 min', 'Vérification de la respiration nasale à chaque heure éveillée', 'Lift des pommettes : 3 séries de 15', 'Massage lymphatique du visage matin + soir, 2 min'] },
        { n: 2, focus: 'Développer l’activation du milieu du visage', tasks: ['Mewing continu toute la journée', 'Lift des pommettes : 4 séries de 15', 'Maintiens des joues creuses : 3 × 10s', 'Gua sha du visage le long des joues et de la mâchoire, 3 min'] },
        { n: 3, focus: 'Charger et sculpter', tasks: ['Mewing + déglutitions forcées, 3 séries', 'Circuit joues + creux buccal : 4 tours', 'Drainage par tapotements sous les yeux, 2 min', 'Immersion du visage dans l’eau froide, 30s'] },
        { n: 4, focus: 'Consolider la structure', tasks: ['Mewing sans effort toute la journée (vérification de l’habitude)', 'Circuit visage complet : 5 tours', 'Photo de progression, face + profil', 'Récupération gua sha + immersion froide'] }
      ]
    }
  },
  {
    id: 'jawmaxing', section: 'STRUCTURE',
    mins: 10, level: 'INTERMEDIATE', plate: 'jaw', img: '/images/programs/jawmaxing-profile.png',
    name: 'Jawmaxing', tagline: 'Masseter hypertrophy · gonial angle', anatomy: 'Masseter & Mandible',
    overview: 'Progressive resistance chewing and clench training to hypertrophy the masseter, sharpen the gonial angle and widen the lower-face silhouette.',
    weeks: [
      { n: 1, focus: 'Prime the masseter', tasks: ['Warm-up: 20 slow jaw clenches', 'Resistance gum: 3 min per side', 'Chin tucks: 3 sets of 12', 'Jaw-fascia release massage, 2 min'] },
      { n: 2, focus: 'Add resistance', tasks: ['Firm gum: 5 min per side', 'Isometric clench holds: 3 × 20s', 'Chin tucks: 4 sets of 15', 'Neck + jaw stretch, 2 min'] },
      { n: 3, focus: 'Peak load', tasks: ['Hard gum: 6 min per side', 'Weighted clench holds: 4 × 20s', 'Lower-lip pull downs: 3 sets of 15', 'Deep masseter release, 3 min'] },
      { n: 4, focus: 'Sharpen & recover', tasks: ['Gum circuit: 5 min per side', 'Clench pyramid: 5 descending sets', 'Progress photo, profile + 45°', 'Full jaw + neck recovery massage'] }
    ],
    fr: {
      name: 'Jawmaxing', tagline: 'Hypertrophie du masséter · angle goniaque', anatomy: 'Masséter et mandibule',
      overview: 'Un entraînement progressif de mastication en résistance et de serrage pour hypertrophier le masséter, affiner l’angle goniaque et élargir le bas du visage.',
      weeks: [
        { n: 1, focus: 'Préparer le masséter', tasks: ['Échauffement : 20 serrages lents de mâchoire', 'Chewing-gum résistant : 3 min par côté', 'Rentrées de menton : 3 séries de 12', 'Massage de relâchement du fascia mandibulaire, 2 min'] },
        { n: 2, focus: 'Ajouter de la résistance', tasks: ['Chewing-gum ferme : 5 min par côté', 'Maintiens isométriques de serrage : 3 × 20s', 'Rentrées de menton : 4 séries de 15', 'Étirement cou + mâchoire, 2 min'] },
        { n: 3, focus: 'Charge maximale', tasks: ['Chewing-gum dur : 6 min par côté', 'Maintiens de serrage lestés : 4 × 20s', 'Tirés de lèvre inférieure : 3 séries de 15', 'Relâchement profond du masséter, 3 min'] },
        { n: 4, focus: 'Affiner et récupérer', tasks: ['Circuit chewing-gum : 5 min par côté', 'Pyramide de serrage : 5 séries dégressives', 'Photo de progression, profil + 45°', 'Massage complet de récupération mâchoire + cou'] }
      ]
    }
  },
  {
    id: 'hunter-eyes', section: 'STRUCTURE',
    mins: 8, level: 'ADVANCED', plate: 'eyes', img: '/images/programs/hunter-eyes.png',
    name: 'Hunter Eyes Program', tagline: 'Canthal tilt · orbital · upper-eyelid exposure', anatomy: 'Orbital Region',
    overview: 'Orbital and periorbital training to reduce upper-eyelid exposure, support a positive canthal tilt and create a more hooded, forward-set hunter-eye look.',
    weeks: [
      { n: 1, focus: 'Wake the orbital ring', tasks: ['Lateral gaze holds: 3 × 8s per side', 'Under-eye de-puff cold compress, 60s', 'Outer-corner lift + squint: 3 × 12', 'Inner-to-outer drainage taps, 90s'] },
      { n: 2, focus: 'Train the tilt', tasks: ['Canthal lift resistance: 4 × 12 per side', 'Squint holds: 3 × 10s', 'Brow-set downward press: 3 × 15', 'Cold compress + drainage, 2 min'] },
      { n: 3, focus: 'Deepen the hood', tasks: ['Canthal + brow superset: 4 rounds', 'Sustained squint holds: 4 × 12s', 'Temple + orbital massage, 2 min', 'Screen-distance + sleep hygiene check'] },
      { n: 4, focus: 'Set the look', tasks: ['Full orbital circuit: 5 rounds', 'De-puff + drainage AM/PM', 'Progress photo, neutral gaze', 'Recovery: compress + massage'] }
    ],
    fr: {
      name: 'Programme Hunter Eyes', tagline: 'Inclinaison canthale · orbite · exposition de la paupière supérieure', anatomy: 'Région orbitaire',
      overview: 'Un entraînement orbitaire et péri-orbitaire pour réduire l’exposition de la paupière supérieure, soutenir une inclinaison canthale positive et créer un regard hunter eyes plus creusé et avancé.',
      weeks: [
        { n: 1, focus: 'Réveiller l’anneau orbitaire', tasks: ['Maintiens du regard latéral : 3 × 8s par côté', 'Compresse froide anti-poches sous les yeux, 60s', 'Lift du coin externe + plissement : 3 × 12', 'Tapotements de drainage de l’intérieur vers l’extérieur, 90s'] },
        { n: 2, focus: 'Entraîner l’inclinaison', tasks: ['Résistance au lift canthal : 4 × 12 par côté', 'Maintiens de plissement : 3 × 10s', 'Pression descendante au niveau du sourcil : 3 × 15', 'Compresse froide + drainage, 2 min'] },
        { n: 3, focus: 'Approfondir le regard', tasks: ['Superset canthal + sourcil : 4 tours', 'Maintiens de plissement soutenus : 4 × 12s', 'Massage tempes + orbite, 2 min', 'Vérification distance à l’écran + hygiène de sommeil'] },
        { n: 4, focus: 'Fixer le résultat', tasks: ['Circuit orbitaire complet : 5 tours', 'Anti-poches + drainage matin/soir', 'Photo de progression, regard neutre', 'Récupération : compresse + massage'] }
      ]
    }
  },
  {
    id: 'bodymaxing', section: 'BODY',
    mins: 35, level: 'INTERMEDIATE', plate: 'body', img: '/images/programs/bodymaxing-labeled.png',
    name: 'Bodymaxing', tagline: 'V-taper · shoulders · lean composition', anatomy: 'Bodymaxing',
    overview: 'A four-week push toward a wider, leaner frame: shoulder and back volume for the V-taper, a tighter waist, and daily habits that reveal definition.',
    weeks: [
      { n: 1, focus: 'Build the base', tasks: ['Push session: chest, shoulders, triceps', 'Lateral raises: 4 sets of 15', '8k steps for the day', 'Protein target: 1.6g per kg bodyweight'] },
      { n: 2, focus: 'Widen the frame', tasks: ['Pull session: back, rear delts, biceps', 'Lateral raises: 5 sets of 15', '10k steps for the day', 'Hit protein + 300 cal deficit'] },
      { n: 3, focus: 'Add intensity', tasks: ['Push/pull superset circuit', 'Overhead press: 4 heavy sets', 'Core + waist vacuum: 3 × 20s', '10k steps + protein target'] },
      { n: 4, focus: 'Reveal definition', tasks: ['Full-body strength circuit', 'Shoulder finisher: 6 sets', 'Progress photo, front + back', 'Deficit + protein + 10k steps'] }
    ],
    fr: {
      name: 'Bodymaxing', tagline: 'Silhouette en V · épaules · composition sèche', anatomy: 'Bodymaxing',
      overview: 'Quatre semaines pour une carrure plus large et plus sèche : volume des épaules et du dos pour la silhouette en V, une taille plus fine et des habitudes quotidiennes qui révèlent la définition musculaire.',
      weeks: [
        { n: 1, focus: 'Construire la base', tasks: ['Séance poussée : pectoraux, épaules, triceps', 'Élévations latérales : 4 séries de 15', '8 000 pas dans la journée', 'Objectif protéines : 1,6 g par kg de poids de corps'] },
        { n: 2, focus: 'Élargir la carrure', tasks: ['Séance tirage : dos, deltoïdes postérieurs, biceps', 'Élévations latérales : 5 séries de 15', '10 000 pas dans la journée', 'Atteindre l’objectif protéines + déficit de 300 kcal'] },
        { n: 3, focus: 'Ajouter de l’intensité', tasks: ['Circuit superset poussée/tirage', 'Développé militaire : 4 séries lourdes', 'Gainage + vacuum abdominal : 3 × 20s', '10 000 pas + objectif protéines'] },
        { n: 4, focus: 'Révéler la définition', tasks: ['Circuit de force full-body', 'Finisher épaules : 6 séries', 'Photo de progression, face + dos', 'Déficit + protéines + 10 000 pas'] }
      ]
    }
  },
  {
    id: 'posture', section: 'BODY',
    mins: 15, level: 'CORE', plate: 'posture', img: '/images/programs/posture-reset.png',
    name: 'Posture Reset', tagline: 'Spinal alignment · forward-head correction', anatomy: 'Spinal Column',
    overview: 'Undo forward-head and rounded-shoulder posture with daily mobility, thoracic extension and strengthening — the fastest change to how your frame reads.',
    weeks: [
      { n: 1, focus: 'Open & release', tasks: ['Chin tucks: 3 sets of 12', 'Chest doorway stretch: 3 × 30s', 'Thoracic extensions over chair: 10 reps', 'Hourly posture reset alarm'] },
      { n: 2, focus: 'Strengthen the back', tasks: ['Wall angels: 3 sets of 12', 'Band pull-aparts: 3 sets of 20', 'Chin tucks: 4 sets of 12', 'Desk ergonomics check'] },
      { n: 3, focus: 'Integrate', tasks: ['Face pulls: 4 sets of 15', 'Wall angels + Y-T-W raises', 'Deep neck flexor holds: 3 × 20s', 'Standing posture holds through the day'] },
      { n: 4, focus: 'Make it default', tasks: ['Full posture circuit', 'Loaded carries: 3 sets', 'Progress photo, side profile', 'All-day alignment habit check'] }
    ],
    fr: {
      name: 'Reset Posture', tagline: 'Alignement vertébral · correction de la tête projetée', anatomy: 'Colonne vertébrale',
      overview: 'Corrigez la tête projetée vers l’avant et les épaules arrondies avec de la mobilité quotidienne, de l’extension thoracique et du renforcement — le changement le plus rapide sur la lecture de votre carrure.',
      weeks: [
        { n: 1, focus: 'Ouvrir et relâcher', tasks: ['Rentrées de menton : 3 séries de 12', 'Étirement pectoraux dans l’embrasure de porte : 3 × 30s', 'Extensions thoraciques sur chaise : 10 répétitions', 'Alarme horaire de réajustement postural'] },
        { n: 2, focus: 'Renforcer le dos', tasks: ['Wall angels : 3 séries de 12', 'Écartés à la bande élastique : 3 séries de 20', 'Rentrées de menton : 4 séries de 12', 'Vérification de l’ergonomie du bureau'] },
        { n: 3, focus: 'Intégrer', tasks: ['Face pulls : 4 séries de 15', 'Wall angels + élévations Y-T-W', 'Maintiens des fléchisseurs profonds du cou : 3 × 20s', 'Maintiens de posture debout tout au long de la journée'] },
        { n: 4, focus: 'En faire un réflexe', tasks: ['Circuit posture complet', 'Portés chargés : 3 séries', 'Photo de progression, profil latéral', 'Vérification de l’habitude d’alignement toute la journée'] }
      ]
    }
  },
  {
    id: 'skinmaxing', section: 'SKIN & GROOMING',
    mins: 10, level: 'CORE', plate: 'skin', img: '/images/programs/skinmaxing.png',
    name: 'Skinmaxing', tagline: 'Barrier · glow · collagen support', anatomy: 'Skin Cross-Section',
    overview: 'Build a resilient barrier and a real glow: a simple, consistent routine plus the sleep, sun and nutrition inputs that skin actually responds to.',
    weeks: [
      { n: 1, focus: 'Establish the routine', tasks: ['AM: cleanse, vitamin C, SPF 30+', 'PM: cleanse + moisturize', 'Water target: 2.5L', 'Pillowcase change (2×/week)'] },
      { n: 2, focus: 'Introduce actives', tasks: ['PM: low-% retinoid (alt nights)', 'AM routine + SPF reapply', 'Sleep 7.5h+', 'No touching / picking (habit check)'] },
      { n: 3, focus: 'Support collagen', tasks: ['Retinoid nightly if tolerated', 'AM antioxidant + SPF', 'Protein + vitamin-C rich meals', 'Facial massage, 3 min'] },
      { n: 4, focus: 'Lock in the glow', tasks: ['Full AM + PM routine', 'Weekly gentle exfoliation', 'Progress photo, bare skin', 'Sleep + hydration + SPF streak'] }
    ],
    fr: {
      name: 'Skinmaxing', tagline: 'Barrière cutanée · éclat · soutien du collagène', anatomy: 'Coupe transversale de la peau',
      overview: 'Construisez une barrière cutanée résiliente et un véritable éclat : une routine simple et régulière, associée au sommeil, au soleil et à la nutrition auxquels la peau répond vraiment.',
      weeks: [
        { n: 1, focus: 'Installer la routine', tasks: ['Matin : nettoyage, vitamine C, SPF 30+', 'Soir : nettoyage + hydratation', 'Objectif eau : 2,5 L', 'Changement de taie d’oreiller (2×/semaine)'] },
        { n: 2, focus: 'Introduire les actifs', tasks: ['Soir : rétinoïde à faible dose (une nuit sur deux)', 'Routine du matin + réapplication de SPF', 'Dormir 7h30 ou plus', 'Ne pas toucher / triturer la peau (vérification de l’habitude)'] },
        { n: 3, focus: 'Soutenir le collagène', tasks: ['Rétinoïde chaque soir si bien toléré', 'Antioxydant du matin + SPF', 'Repas riches en protéines et vitamine C', 'Massage du visage, 3 min'] },
        { n: 4, focus: 'Ancrer l’éclat', tasks: ['Routine matin + soir complète', 'Exfoliation douce hebdomadaire', 'Photo de progression, peau nue', 'Série sommeil + hydratation + SPF'] }
      ]
    }
  },
  {
    id: 'skin-clarity', section: 'SKIN & GROOMING',
    mins: 8, level: 'INTERMEDIATE', plate: 'skin', img: '/images/programs/skin-clarity.png',
    name: 'Skin Clarity Reset', tagline: 'Breakout control · texture · tone', anatomy: 'Skin Cross-Section',
    overview: 'A focused reset for congestion and uneven tone — calm active breakouts, clear texture, and rebuild an even, clear complexion over 28 days.',
    weeks: [
      { n: 1, focus: 'Calm & simplify', tasks: ['Gentle cleanse AM/PM only', 'Spot treat with BHA/benzoyl', 'SPF every morning', 'Cut dairy + high-sugar test'] },
      { n: 2, focus: 'Clear congestion', tasks: ['BHA exfoliant, alternate nights', 'Non-comedogenic moisturizer', 'Clean phone screen + pillowcase', 'Hydrate 2.5L + sleep 7.5h'] },
      { n: 3, focus: 'Even the tone', tasks: ['Niacinamide AM', 'Continue BHA + spot care', 'SPF reapply midday', 'No picking (streak check)'] },
      { n: 4, focus: 'Stabilize', tasks: ['Maintenance routine locked', 'Weekly clay mask', 'Progress photo, bare skin', 'Diet + sleep + hydration review'] }
    ],
    fr: {
      name: 'Reset Clarté de Peau', tagline: 'Contrôle des imperfections · texture · teint', anatomy: 'Coupe transversale de la peau',
      overview: 'Un reset ciblé pour la congestion et le teint irrégulier — calmez les imperfections actives, clarifiez la texture et reconstruisez un teint uniforme et net en 28 jours.',
      weeks: [
        { n: 1, focus: 'Calmer et simplifier', tasks: ['Nettoyage doux matin/soir uniquement', 'Traitement localisé au BHA/peroxyde de benzoyle', 'SPF chaque matin', 'Test sans produits laitiers + sucre élevé'] },
        { n: 2, focus: 'Désengorger la peau', tasks: ['Exfoliant BHA, un soir sur deux', 'Hydratant non comédogène', 'Nettoyer écran de téléphone + taie d’oreiller', 'S’hydrater 2,5 L + dormir 7h30'] },
        { n: 3, focus: 'Uniformiser le teint', tasks: ['Niacinamide le matin', 'Continuer BHA + soin localisé', 'Réapplication de SPF à midi', 'Ne pas triturer la peau (vérification de la série)'] },
        { n: 4, focus: 'Stabiliser', tasks: ['Routine d’entretien fixée', 'Masque à l’argile hebdomadaire', 'Photo de progression, peau nue', 'Bilan alimentation + sommeil + hydratation'] }
      ]
    }
  },
  {
    id: 'grooming', section: 'SKIN & GROOMING',
    mins: 10, level: 'CORE', plate: 'face', img: '/images/programs/grooming.png',
    name: 'Power Grooming System', tagline: 'Brows · hair · beard · presentation', anatomy: 'Frontal Presentation',
    overview: 'Dial in the controllables that instantly raise presentation: brows, hairline, facial hair, teeth and grooming detail — refined and maintained weekly.',
    weeks: [
      { n: 1, focus: 'Audit & shape', tasks: ['Brow clean-up (map, then trim)', 'Book / plan a sharp haircut', 'Define beard or clean shave line', 'Start whitening routine'] },
      { n: 2, focus: 'Refine hair', tasks: ['Style hair with correct products', 'Maintain beard/shave line', 'Nail + hand grooming', 'Whitening + flossing streak'] },
      { n: 3, focus: 'Detail work', tasks: ['Brow maintenance', 'Fragrance + skin base routine', 'Trim + edge-up touch-ups', 'Wardrobe fit check (top 3 outfits)'] },
      { n: 4, focus: 'System on autopilot', tasks: ['Full grooming pass', 'Progress photo, styled', 'Restock products low on stock', 'Set weekly maintenance schedule'] }
    ],
    fr: {
      name: 'Système Power Grooming', tagline: 'Sourcils · cheveux · barbe · présentation', anatomy: 'Présentation frontale',
      overview: 'Maîtrisez les éléments contrôlables qui élèvent instantanément votre présentation : sourcils, ligne de cheveux, pilosité faciale, dents et détails de grooming — affinés et entretenus chaque semaine.',
      weeks: [
        { n: 1, focus: 'Auditer et façonner', tasks: ['Nettoyage des sourcils (tracer, puis tailler)', 'Réserver / planifier une coupe nette', 'Définir la barbe ou une ligne de rasage nette', 'Démarrer une routine de blanchiment dentaire'] },
        { n: 2, focus: 'Affiner la coiffure', tasks: ['Coiffer avec les bons produits', 'Entretenir la barbe / ligne de rasage', 'Soin des ongles et des mains', 'Série blanchiment + fil dentaire'] },
        { n: 3, focus: 'Travail de détail', tasks: ['Entretien des sourcils', 'Routine parfum + base de peau', 'Retouches de taille et de contours', 'Vérification de la garde-robe (top 3 tenues)'] },
        { n: 4, focus: 'Système en pilote automatique', tasks: ['Passage grooming complet', 'Photo de progression, apprêté', 'Réapprovisionner les produits en rupture', 'Fixer un calendrier d’entretien hebdomadaire'] }
      ]
    }
  },
  {
    id: 'hormonal', section: 'SYSTEMS',
    mins: 20, level: 'ADVANCED', plate: 'body', img: '/images/programs/hormonal.png',
    name: 'Hormonal Optimization Diet', tagline: 'Testosterone · insulin · body composition', anatomy: 'Metabolic Profile',
    overview: 'Eat and train to support natural hormonal balance: protein and micronutrient targets, blood-sugar control, and the lifestyle inputs that move the needle.',
    weeks: [
      { n: 1, focus: 'Fix the foundation', tasks: ['Protein: 1.8g per kg bodyweight', 'Cut liquid sugar + seed-oil fried food', 'Sunlight 15 min before noon', 'Sleep 8h window'] },
      { n: 2, focus: 'Balance blood sugar', tasks: ['Whole-food carbs only', 'Zinc + magnesium rich meals', 'Strength train 3×/week', 'Fasting 12h overnight'] },
      { n: 3, focus: 'Support production', tasks: ['Healthy fats: eggs, olive oil, fish', 'Resistance training progression', 'Stress / cortisol wind-down at night', 'Hydration + electrolytes'] },
      { n: 4, focus: 'Dial it in', tasks: ['Full nutrient-dense day', 'Track measurements + energy', 'Progress photo + waist measure', 'Review sleep, training, diet streaks'] }
    ],
    fr: {
      name: 'Régime d’Optimisation Hormonale', tagline: 'Testostérone · insuline · composition corporelle', anatomy: 'Profil métabolique',
      overview: 'Mangez et entraînez-vous pour soutenir un équilibre hormonal naturel : objectifs de protéines et de micronutriments, contrôle de la glycémie, et les leviers de mode de vie qui font vraiment la différence.',
      weeks: [
        { n: 1, focus: 'Réparer les fondations', tasks: ['Protéines : 1,8 g par kg de poids de corps', 'Supprimer le sucre liquide + les fritures à l’huile de graines', 'Soleil 15 min avant midi', 'Fenêtre de sommeil de 8h'] },
        { n: 2, focus: 'Équilibrer la glycémie', tasks: ['Glucides uniquement issus d’aliments complets', 'Repas riches en zinc + magnésium', 'Musculation 3×/semaine', 'Jeûne nocturne de 12h'] },
        { n: 3, focus: 'Soutenir la production', tasks: ['Bonnes graisses : œufs, huile d’olive, poisson', 'Progression en musculation', 'Décompression du stress / cortisol le soir', 'Hydratation + électrolytes'] },
        { n: 4, focus: 'Affiner', tasks: ['Journée complète riche en nutriments', 'Suivre mensurations + énergie', 'Photo de progression + mesure de tour de taille', 'Bilan des séries sommeil, entraînement, alimentation'] }
      ]
    }
  },
  {
    id: 'sleep', section: 'SYSTEMS',
    mins: 5, level: 'CORE', plate: 'sleep',
    name: 'Elite Sleep Protocol', tagline: 'Deep sleep · recovery · circadian rhythm', anatomy: 'Circadian System',
    overview: 'Sleep is where the face de-puffs and the body recovers. Rebuild deep, consistent sleep with light timing, temperature and a locked wind-down ritual.',
    weeks: [
      { n: 1, focus: 'Anchor the rhythm', tasks: ['Fixed wake time, 7 days', 'Morning sunlight within 30 min', 'No caffeine after 2pm', 'Screens off 60 min before bed'] },
      { n: 2, focus: 'Build the ritual', tasks: ['Cool, dark room (18°C)', 'Wind-down routine, 30 min', 'No large meals 3h before bed', 'Consistent bedtime ±15 min'] },
      { n: 3, focus: 'Deepen recovery', tasks: ['Magnesium + no alcohol test', 'Blue-light filter after sunset', 'Breathing / relaxation, 5 min', 'Track sleep + morning puffiness'] },
      { n: 4, focus: 'Lock the system', tasks: ['Full protocol nightly', 'Consistent 8h achieved', 'Review de-puff in AM photos', 'Set permanent sleep schedule'] }
    ],
    fr: {
      name: 'Protocole de Sommeil Élite', tagline: 'Sommeil profond · récupération · rythme circadien', anatomy: 'Système circadien',
      overview: 'C’est pendant le sommeil que le visage se dégonfle et que le corps récupère. Reconstruisez un sommeil profond et régulier grâce au minutage de la lumière, à la température et à un rituel de décompression fixe.',
      weeks: [
        { n: 1, focus: 'Ancrer le rythme', tasks: ['Heure de réveil fixe, 7 jours', 'Lumière du soleil le matin dans les 30 min', 'Pas de caféine après 14h', 'Écrans éteints 60 min avant le coucher'] },
        { n: 2, focus: 'Construire le rituel', tasks: ['Chambre fraîche et sombre (18°C)', 'Routine de décompression, 30 min', 'Pas de gros repas 3h avant le coucher', 'Heure de coucher constante ±15 min'] },
        { n: 3, focus: 'Approfondir la récupération', tasks: ['Test magnésium + sans alcool', 'Filtre lumière bleue après le coucher du soleil', 'Respiration / relaxation, 5 min', 'Suivre sommeil + poches du matin'] },
        { n: 4, focus: 'Verrouiller le système', tasks: ['Protocole complet chaque soir', '8h constantes atteintes', 'Bilan des poches sur les photos du matin', 'Fixer un horaire de sommeil permanent'] }
      ]
    }
  },
  {
    id: 'hydration', section: 'SYSTEMS',
    mins: 3, level: 'CORE', plate: 'body',
    name: 'Hydration Protocol', tagline: 'Skin plumpness · de-puff · energy', anatomy: 'Fluid Balance',
    overview: 'Proper hydration and electrolyte balance visibly plump skin, reduce puffiness and sharpen features — the lowest-effort, fastest-visible input.',
    weeks: [
      { n: 1, focus: 'Hit the baseline', tasks: ['Water: 500ml on waking', 'Reach 2.5L across the day', 'Add electrolytes once daily', 'Cut excess salt + alcohol'] },
      { n: 2, focus: 'Balance electrolytes', tasks: ['3L water target', 'Sodium/potassium balance in meals', 'Herbal tea instead of late caffeine', 'Track AM facial puffiness'] },
      { n: 3, focus: 'Optimize timing', tasks: ['Front-load water before evening', 'Electrolytes AM + post-training', 'Water-rich foods each meal', 'Cold-water face rinse AM'] },
      { n: 4, focus: 'Make it effortless', tasks: ['Consistent 3L habit', 'De-puff routine locked', 'Progress photo, AM face', 'Review energy + skin clarity'] }
    ],
    fr: {
      name: 'Protocole d’Hydratation', tagline: 'Peau repulpée · anti-poches · énergie', anatomy: 'Équilibre hydrique',
      overview: 'Une bonne hydratation et un bon équilibre en électrolytes repulpent visiblement la peau, réduisent les poches et affinent les traits — le levier le moins coûteux en effort et le plus rapide à voir.',
      weeks: [
        { n: 1, focus: 'Atteindre la base', tasks: ['Eau : 500 ml au réveil', 'Atteindre 2,5 L dans la journée', 'Ajouter des électrolytes une fois par jour', 'Réduire l’excès de sel + alcool'] },
        { n: 2, focus: 'Équilibrer les électrolytes', tasks: ['Objectif 3 L d’eau', 'Équilibre sodium/potassium dans les repas', 'Tisane au lieu de caféine tardive', 'Suivre les poches du visage le matin'] },
        { n: 3, focus: 'Optimiser le timing', tasks: ['Répartir l’eau avant le soir', 'Électrolytes le matin + après l’entraînement', 'Aliments riches en eau à chaque repas', 'Rinçage du visage à l’eau froide le matin'] },
        { n: 4, focus: 'Rendre ça sans effort', tasks: ['Habitude de 3 L constante', 'Routine anti-poches fixée', 'Photo de progression, visage du matin', 'Bilan énergie + clarté de peau'] }
      ]
    }
  }
];

export function getProgram(id: string): Program | undefined {
  return ASMETRY_PROGRAMS.find((p) => p.id === id);
}

export const PROGRAM_SECTIONS: ProgramSection[] = ['STRUCTURE', 'BODY', 'SKIN & GROOMING', 'SYSTEMS'];

const SECTION_KEYS: Record<ProgramSection, 'section_structure' | 'section_body' | 'section_skin' | 'section_systems'> = {
  STRUCTURE: 'section_structure',
  BODY: 'section_body',
  'SKIN & GROOMING': 'section_skin',
  SYSTEMS: 'section_systems',
};

const LEVEL_KEYS: Record<ProgramLevel, 'level_core' | 'level_intermediate' | 'level_advanced'> = {
  CORE: 'level_core',
  INTERMEDIATE: 'level_intermediate',
  ADVANCED: 'level_advanced',
};

export function sectionKey(section: ProgramSection) {
  return SECTION_KEYS[section];
}

export function levelKey(level: ProgramLevel) {
  return LEVEL_KEYS[level];
}
