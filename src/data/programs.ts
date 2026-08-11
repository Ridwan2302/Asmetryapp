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
  /** Why this week is structured this way — the mechanism/reasoning behind the tasks, not just what to do. */
  why: string;
  tasks: string[];
}

export interface ProgramCopy {
  name: string;
  tagline: string;
  anatomy: string;
  overview: string;
  /** 3 short, outcome-focused bullets — what the user actually gets, shown on the prescription-style plan detail. */
  benefits: string[];
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
  return { name: program.name, tagline: program.tagline, anatomy: program.anatomy, overview: program.overview, benefits: program.benefits, weeks: program.weeks };
}

export const ASMETRY_PROGRAMS: Program[] = [
  {
    id: 'face-structure', section: 'STRUCTURE',
    mins: 12, level: 'CORE', plate: 'face', img: '/images/programs/face-structure.png',
    name: 'Face Structure', tagline: 'Maxilla · midface · overall harmony', anatomy: 'Facial Musculature',
    overview: 'A month of tongue posture, midface activation and lymphatic work to lift the entire facial framework and sharpen its underlying structure.',
    benefits: ['A more defined, contoured midface', 'Sharper cheekbone definition', 'Better tongue posture as a lasting habit'],
    weeks: [
      { n: 1, focus: 'Establish tongue posture', why: "Correct tongue posture — resting the whole tongue against the roof of the mouth — is the foundation everything else builds on: it's what applies gentle, constant pressure to the maxilla over time. Week one is about making mewing and nasal breathing automatic before adding any load.", tasks: ['Full-tongue mewing, 3× 10-min holds', 'Nasal breathing check every waking hour', 'Cheekbone lift: 3 sets of 15', 'AM + PM lymphatic face massage, 2 min'] },
      { n: 2, focus: 'Build midface activation', why: 'Once tongue posture holds without thinking, the midface muscles — cheeks, buccinator — get trained directly. Activating them repeatedly is what starts to define the area under the cheekbones instead of leaving it soft.', tasks: ['Continuous mewing all day', 'Cheekbone lift: 4 sets of 15', 'Buccal hollow holds: 3 × 10s', 'Face gua sha along cheek + jaw, 3 min'] },
      { n: 3, focus: 'Load & sculpt', why: 'This week adds resistance — hard swallows, longer holds — because muscle and the soft tissue around it only remodel under progressive load, the same principle as training anywhere else on the body. Cold immersion controls the inflammation that comes with the extra work.', tasks: ['Mewing + hard swallow reps, 3 sets', 'Cheek + buccal circuit: 4 rounds', 'Under-eye tapping drainage, 2 min', 'Cold-water face immersion, 30s'] },
      { n: 4, focus: 'Consolidate the framework', why: "The goal in the final week is to make everything effortless — mewing without thinking about it, massage and cold as habit. What you've built only sticks if it survives past the 28 days, so this week proves it holds on autopilot.", tasks: ['Effortless all-day mewing (habit check)', 'Full face circuit: 5 rounds', 'Progress photo, front + profile', 'Gua sha + cold immersion recovery'] }
    ],
    fr: {
      name: 'Structure Faciale', tagline: 'Maxillaire · milieu du visage · harmonie globale', anatomy: 'Musculature faciale',
      overview: 'Un mois de posture linguale, d’activation du milieu du visage et de travail lymphatique pour relever l’ensemble de la structure faciale et affiner son ossature sous-jacente.',
      benefits: ['Un milieu du visage plus défini et sculpté', 'Des pommettes plus marquées', 'Une meilleure posture linguale, comme habitude durable'],
      weeks: [
        { n: 1, focus: 'Installer la posture linguale', why: 'Une posture linguale correcte — langue entièrement posée contre le palais — est la base sur laquelle reposent tous les autres exercices : c’est elle qui applique une pression douce et constante sur le maxillaire dans la durée. Cette première semaine consiste à automatiser le mewing et la respiration nasale avant d’ajouter de la charge.', tasks: ['Mewing complet, 3 × maintiens de 10 min', 'Vérification de la respiration nasale à chaque heure éveillée', 'Lift des pommettes : 3 séries de 15', 'Massage lymphatique du visage matin + soir, 2 min'] },
        { n: 2, focus: 'Développer l’activation du milieu du visage', why: 'Une fois la posture linguale acquise sans effort, les muscles du milieu du visage — joues, buccinateur — sont sollicités directement. Les activer de façon répétée commence à définir la zone sous les pommettes au lieu de la laisser relâchée.', tasks: ['Mewing continu toute la journée', 'Lift des pommettes : 4 séries de 15', 'Maintiens des joues creuses : 3 × 10s', 'Gua sha du visage le long des joues et de la mâchoire, 3 min'] },
        { n: 3, focus: 'Charger et sculpter', why: 'Cette semaine ajoute de la résistance — déglutitions forcées, maintiens plus longs — car le muscle et les tissus mous alentour ne se remodèlent que sous une charge progressive, le même principe qu’un entraînement ailleurs sur le corps. L’immersion froide contrôle l’inflammation liée à ce travail supplémentaire.', tasks: ['Mewing + déglutitions forcées, 3 séries', 'Circuit joues + creux buccal : 4 tours', 'Drainage par tapotements sous les yeux, 2 min', 'Immersion du visage dans l’eau froide, 30s'] },
        { n: 4, focus: 'Consolider la structure', why: 'L’objectif de la dernière semaine est de rendre tout cela naturel — le mewing sans y penser, le massage et le froid comme habitude. Ce que vous avez construit ne tient que s’il survit au-delà des 28 jours, donc cette semaine consiste à prouver que ça tient en pilote automatique.', tasks: ['Mewing sans effort toute la journée (vérification de l’habitude)', 'Circuit visage complet : 5 tours', 'Photo de progression, face + profil', 'Récupération gua sha + immersion froide'] }
      ]
    }
  },
  {
    id: 'jawmaxing', section: 'STRUCTURE',
    mins: 10, level: 'INTERMEDIATE', plate: 'jaw', img: '/images/programs/jawmaxing-profile.png',
    name: 'Jawmaxing', tagline: 'Masseter hypertrophy · gonial angle', anatomy: 'Masseter & Mandible',
    overview: 'Progressive resistance chewing and clench training to hypertrophy the masseter, sharpen the gonial angle and widen the lower-face silhouette.',
    benefits: ['A stronger, more defined jawline', 'A sharper gonial angle', 'A wider lower-face silhouette'],
    weeks: [
      { n: 1, focus: 'Prime the masseter', why: "The masseter only grows in response to real resistance, so week one is calibration — light gum, low clench volume — to find a working intensity without overloading a muscle that isn't used to training.", tasks: ['Warm-up: 20 slow jaw clenches', 'Resistance gum: 3 min per side', 'Chin tucks: 3 sets of 12', 'Jaw-fascia release massage, 2 min'] },
      { n: 2, focus: 'Add resistance', why: 'Progressive overload is the whole mechanism here — a firmer gum and longer isometric holds force the masseter to adapt further, the same way adding weight forces any other muscle to grow.', tasks: ['Firm gum: 5 min per side', 'Isometric clench holds: 3 × 20s', 'Chin tucks: 4 sets of 15', 'Neck + jaw stretch, 2 min'] },
      { n: 3, focus: 'Peak load', why: 'This is the highest-intensity week on purpose — hard gum, weighted holds — because hypertrophy needs a real peak stimulus, not just steady maintenance. The deep release afterward keeps the jaw joint from getting overworked alongside the muscle.', tasks: ['Hard gum: 6 min per side', 'Weighted clench holds: 4 × 20s', 'Lower-lip pull downs: 3 sets of 15', 'Deep masseter release, 3 min'] },
      { n: 4, focus: 'Sharpen & recover', why: 'After three weeks of building load, the masseter needs a taper to actually show its results — the descending pyramid keeps stimulus without adding more fatigue, and recovery work lets the new muscle settle into a visibly sharper jawline.', tasks: ['Gum circuit: 5 min per side', 'Clench pyramid: 5 descending sets', 'Progress photo, profile + 45°', 'Full jaw + neck recovery massage'] }
    ],
    fr: {
      name: 'Jawmaxing', tagline: 'Hypertrophie du masséter · angle goniaque', anatomy: 'Masséter et mandibule',
      overview: 'Un entraînement progressif de mastication en résistance et de serrage pour hypertrophier le masséter, affiner l’angle goniaque et élargir le bas du visage.',
      benefits: ['Une mâchoire plus forte et plus définie', 'Un angle goniaque plus marqué', 'Un bas du visage plus large'],
      weeks: [
        { n: 1, focus: 'Préparer le masséter', why: 'Le masséter ne grossit qu’en réponse à une véritable résistance, donc la première semaine sert d’étalonnage — gomme légère, faible volume de serrage — pour trouver une intensité de travail sans surcharger un muscle qui n’a pas l’habitude d’être entraîné.', tasks: ['Échauffement : 20 serrages lents de mâchoire', 'Gomme à mâcher résistante : 3 min par côté', 'Rentrées de menton : 3 séries de 12', 'Massage de relâchement du fascia mandibulaire, 2 min'] },
        { n: 2, focus: 'Ajouter de la résistance', why: 'La surcharge progressive est tout le mécanisme ici — une gomme plus ferme et des maintiens isométriques plus longs forcent le masséter à s’adapter davantage, de la même façon qu’ajouter du poids force n’importe quel autre muscle à grossir.', tasks: ['Gomme ferme : 5 min par côté', 'Maintiens isométriques de serrage : 3 × 20s', 'Rentrées de menton : 4 séries de 15', 'Étirement cou + mâchoire, 2 min'] },
        { n: 3, focus: 'Charge maximale', why: 'C’est volontairement la semaine la plus intense — gomme dure, maintiens lestés — car l’hypertrophie a besoin d’un vrai pic de stimulation, pas seulement d’un entretien stable. Le relâchement profond qui suit évite que l’articulation de la mâchoire ne soit surmenée en même temps que le muscle.', tasks: ['Gomme dure : 6 min par côté', 'Maintiens de serrage lestés : 4 × 20s', 'Tirés de lèvre inférieure : 3 séries de 15', 'Relâchement profond du masséter, 3 min'] },
        { n: 4, focus: 'Affiner et récupérer', why: 'Après trois semaines de charge croissante, le masséter a besoin d’un allègement pour vraiment révéler ses résultats — la pyramide dégressive maintient la stimulation sans ajouter de fatigue, et le travail de récupération laisse le nouveau muscle se stabiliser pour une mâchoire visiblement plus nette.', tasks: ['Circuit de mastication : 5 min par côté', 'Pyramide de serrage : 5 séries dégressives', 'Photo de progression, profil + 45°', 'Massage complet de récupération mâchoire + cou'] }
      ]
    }
  },
  {
    id: 'hunter-eyes', section: 'STRUCTURE',
    mins: 8, level: 'ADVANCED', plate: 'eyes', img: '/images/programs/hunter-eyes.png',
    name: 'Hunter Eyes Program', tagline: 'Canthal tilt · orbital · upper-eyelid exposure', anatomy: 'Orbital Region',
    overview: 'Orbital and periorbital training to reduce upper-eyelid exposure, support a positive canthal tilt and create a more hooded, forward-set hunter-eye look.',
    benefits: ['A more positive canthal tilt', 'Reduced upper-eyelid exposure', 'A more hooded, forward-set gaze'],
    weeks: [
      { n: 1, focus: 'Wake the orbital ring', why: "The muscles around the eye barely get trained in daily life, so week one is about waking them up with light holds and reducing the puffiness that hides definition, before asking them to do real work.", tasks: ['Lateral gaze holds: 3 × 8s per side', 'Under-eye de-puff cold compress, 60s', 'Outer-corner lift + squint: 3 × 12', 'Inner-to-outer drainage taps, 90s'] },
      { n: 2, focus: 'Train the tilt', why: 'A positive canthal tilt comes from the outer-corner muscles holding a slightly lifted position under load — training that lift directly, alongside the brow, is what actually shifts the tilt rather than just looking tired less often.', tasks: ['Canthal lift resistance: 4 × 12 per side', 'Squint holds: 3 × 10s', 'Brow-set downward press: 3 × 15', 'Cold compress + drainage, 2 min'] },
      { n: 3, focus: 'Deepen the hood', why: 'Combining the canthal and brow work into supersets, with longer holds, pushes past the initial adaptation from week two — this is where the look starts to hold on its own between sessions.', tasks: ['Canthal + brow superset: 4 rounds', 'Sustained squint holds: 4 × 12s', 'Temple + orbital massage, 2 min', 'Screen-distance + sleep hygiene check'] },
      { n: 4, focus: 'Set the look', why: 'The final week is about proving the tilt holds under a neutral, resting gaze — not just mid-exercise — plus locking in the sleep and screen habits that keep under-eye puffiness from undoing the work.', tasks: ['Full orbital circuit: 5 rounds', 'De-puff + drainage AM/PM', 'Progress photo, neutral gaze', 'Recovery: compress + massage'] }
    ],
    fr: {
      name: 'Programme Hunter Eyes', tagline: 'Inclinaison canthale · orbite · exposition de la paupière supérieure', anatomy: 'Région orbitaire',
      overview: 'Un entraînement orbitaire et péri-orbitaire pour réduire l’exposition de la paupière supérieure, soutenir une inclinaison canthale positive et créer un regard hunter eyes plus creusé et avancé.',
      benefits: ['Une inclinaison canthale plus positive', 'Une exposition réduite de la paupière supérieure', 'Un regard plus creusé et avancé'],
      weeks: [
        { n: 1, focus: 'Réveiller l’anneau orbitaire', why: 'Les muscles autour de l’œil sont à peine sollicités au quotidien, donc la première semaine consiste à les réveiller avec des maintiens légers et à réduire les poches qui masquent la définition, avant de leur demander un vrai travail.', tasks: ['Maintiens du regard latéral : 3 × 8s par côté', 'Compresse froide anti-poches sous les yeux, 60s', 'Lift du coin externe + plissement : 3 × 12', 'Tapotements de drainage de l’intérieur vers l’extérieur, 90s'] },
        { n: 2, focus: 'Entraîner l’inclinaison', why: 'Une inclinaison canthale positive vient des muscles du coin externe qui maintiennent une position légèrement relevée sous tension — entraîner directement ce lift, avec le sourcil, est ce qui modifie réellement l’inclinaison, plutôt que de simplement paraître moins fatigué.', tasks: ['Résistance au lift canthal : 4 × 12 par côté', 'Maintiens de plissement : 3 × 10s', 'Pression descendante au niveau du sourcil : 3 × 15', 'Compresse froide + drainage, 2 min'] },
        { n: 3, focus: 'Approfondir le regard', why: 'Combiner le travail canthal et sourcilier en supersets, avec des maintiens plus longs, dépasse l’adaptation initiale de la semaine deux — c’est ici que le regard commence à tenir de lui-même entre les séances.', tasks: ['Superset canthal + sourcil : 4 tours', 'Maintiens de plissement soutenus : 4 × 12s', 'Massage tempes + orbite, 2 min', 'Vérification distance à l’écran + hygiène de sommeil'] },
        { n: 4, focus: 'Fixer le résultat', why: 'La dernière semaine consiste à prouver que l’inclinaison tient avec un regard neutre au repos — pas seulement pendant l’exercice — et à ancrer les habitudes de sommeil et d’écran qui empêchent les poches sous les yeux d’annuler le travail accompli.', tasks: ['Circuit orbitaire complet : 5 tours', 'Anti-poches + drainage matin/soir', 'Photo de progression, regard neutre', 'Récupération : compresse + massage'] }
      ]
    }
  },
  {
    id: 'face-fat-loss', section: 'STRUCTURE',
    mins: 12, level: 'INTERMEDIATE', plate: 'face',
    name: 'Facial Fat Reduction', tagline: 'Caloric deficit · lymphatic drainage · jaw definition', anatomy: 'Facial Fat Layer',
    overview: 'A month combining a modest caloric deficit, daily lymphatic drainage and targeted jaw and cheek training. Facial fat can’t be spot-reduced, so this program attacks it from every angle that actually works: less fat overall, less puffiness, and more visible muscle definition underneath.',
    benefits: ['A visibly slimmer, more defined face', 'Less morning puffiness and water retention', 'A sharper jawline and cheekbone definition'],
    weeks: [
      { n: 1, focus: 'Start the deficit', why: 'Facial fat responds to overall body fat, not local exercise — there is no spot reduction. A moderate, sustainable deficit is the actual lever, and cutting liquid calories first creates it with the least impact on how full you feel or how hard training feels.', tasks: ['Moderate calorie deficit, cut sugary drinks + alcohol', 'Water target: 2.5L', 'Sleep 7.5h+', 'Steps for the day: 8k'] },
      { n: 2, focus: 'Clear the puffiness', why: 'Water retention is often mistaken for fat and can hide real progress — cutting sodium, draining lymphatic fluid daily and sleeping with the head slightly elevated remove that false bulk fast, so the jawline reads sharper within days.', tasks: ['Cut excess salt', 'Gua sha + lymphatic drainage, 3 min', 'Cold-water face compress, AM', 'Elevate head while sleeping'] },
      { n: 3, focus: 'Define what’s underneath', why: 'As the fat layer thins, the muscle underneath — masseter, cheeks — becomes what actually shapes the visible jawline and cheekbones. Training it now means the structure is ready to show the moment the fat recedes.', tasks: ['Cheekbone lift + buccal holds: 3 sets', 'Chewing gum resistance, 5 min per side', 'Chin tucks: 3 sets of 12', 'Facial massage, 3 min'] },
      { n: 4, focus: 'Reveal & lock it in', why: 'Real change here comes from four weeks of nutrition and facial training compounding together, not any single session — this week proves the habits hold on their own and captures the real, comparable result.', tasks: ['Full fat-loss circuit', 'Review sleep, training, diet', 'Progress photo, front + profile', 'Hydrate 2.5L + sleep 7.5h streak'] }
    ],
    fr: {
      name: 'Réduction de la graisse du visage', tagline: 'Déficit calorique · drainage lymphatique · définition de la mâchoire', anatomy: 'Couche graisseuse du visage',
      overview: 'Un mois combinant un déficit calorique modéré, un drainage lymphatique quotidien et un entraînement ciblé de la mâchoire et des joues. La graisse du visage ne pouvant pas être réduite localement, ce programme l’attaque sous tous les angles qui fonctionnent réellement : moins de graisse globale, moins de gonflement, et plus de définition musculaire visible en dessous.',
      benefits: ['Un visage visiblement plus fin et plus défini', 'Moins de gonflement et de rétention d’eau le matin', 'Une mâchoire et des pommettes plus définies'],
      weeks: [
        { n: 1, focus: 'Démarrer le déficit', why: 'La graisse du visage répond à la graisse corporelle globale, pas à un exercice local — il n’existe pas de réduction ciblée. Un déficit modéré et durable est le vrai levier, et supprimer d’abord les calories liquides le crée avec le moins d’impact sur la sensation de satiété ou la difficulté à l’entraînement.', tasks: ['Déficit calorique modéré, supprimer boissons sucrées et alcool', 'Objectif eau : 2,5 L', 'Dormir 7h30 ou plus', 'Pas dans la journée : 8 000'] },
        { n: 2, focus: 'Éliminer le gonflement', why: 'La rétention d’eau est souvent confondue avec de la graisse et peut masquer de vrais progrès — réduire le sel, drainer la lymphe chaque jour et dormir la tête légèrement surélevée éliminent rapidement ce volume artificiel, pour une mâchoire plus nette en quelques jours.', tasks: ['Réduire l’excès de sel', 'Gua sha et drainage lymphatique, 3 min', 'Compresse froide sur le visage le matin', 'Dormir avec la tête surélevée'] },
        { n: 3, focus: 'Définir ce qu’il y a en dessous', why: 'À mesure que la couche de graisse s’amincit, le muscle en dessous — masséter, joues — devient ce qui façonne réellement la mâchoire et les pommettes visibles. L’entraîner maintenant permet à la structure d’être prête à se révéler dès que la graisse recule.', tasks: ['Lift des pommettes et joues creuses : 3 séries', 'Gomme à mâcher résistante, 5 min par côté', 'Rentrées de menton : 3 séries de 12', 'Massage du visage, 3 min'] },
        { n: 4, focus: 'Révéler et ancrer', why: 'Le vrai changement vient ici de quatre semaines de nutrition et d’entraînement facial qui se cumulent, pas d’une seule séance — cette semaine prouve que les habitudes tiennent seules et capture le résultat réel et comparable.', tasks: ['Circuit complet perte de graisse', 'Bilan sommeil, entraînement, alimentation', 'Photo de progression, face + profil', 'Série hydratation 2,5 L + sommeil 7h30'] }
      ]
    }
  },
  {
    id: 'bodymaxing', section: 'BODY',
    mins: 35, level: 'INTERMEDIATE', plate: 'body', img: '/images/programs/bodymaxing-labeled.png',
    name: 'Bodymaxing', tagline: 'V-taper · shoulders · lean composition', anatomy: 'Bodymaxing',
    overview: 'A four-week push toward a wider, leaner frame: shoulder and back volume for the V-taper, a tighter waist, and daily habits that reveal definition.',
    benefits: ['A wider, more V-shaped upper body', 'Broader shoulders and back', 'A leaner, more defined waist'],
    weeks: [
      { n: 1, focus: 'Build the base', why: 'The V-taper starts with volume — shoulders and back need real training stimulus before anything else matters, and the step + protein targets make sure the body actually has what it needs to add that muscle.', tasks: ['Push session: chest, shoulders, triceps', 'Lateral raises: 4 sets of 15', '8k steps for the day', 'Protein target: 1.6g per kg bodyweight'] },
      { n: 2, focus: 'Widen the frame', why: "Pull-day work targets the back and rear delts specifically because that's what widens the frame from behind, not just the front — combined with a calorie deficit, this is where the taper actually starts to show.", tasks: ['Pull session: back, rear delts, biceps', 'Lateral raises: 5 sets of 15', '10k steps for the day', 'Hit protein + 300 cal deficit'] },
      { n: 3, focus: 'Add intensity', why: 'Supersets and heavier overhead pressing push past the adaptation from the first two weeks — the body stops improving once a stimulus becomes routine, so the intensity has to climb for the shoulders to keep responding.', tasks: ['Push/pull superset circuit', 'Overhead press: 4 heavy sets', 'Core + waist vacuum: 3 × 20s', '10k steps + protein target'] },
      { n: 4, focus: 'Reveal definition', why: "This week is where the deficit finally shows on the surface — the full-body circuit maintains what's been built while the sustained calorie/protein/step discipline is what actually reveals it.", tasks: ['Full-body strength circuit', 'Shoulder finisher: 6 sets', 'Progress photo, front + back', 'Deficit + protein + 10k steps'] }
    ],
    fr: {
      name: 'Bodymaxing', tagline: 'Silhouette en V · épaules · composition sèche', anatomy: 'Bodymaxing',
      overview: 'Quatre semaines pour une carrure plus large et plus sèche : volume des épaules et du dos pour la silhouette en V, une taille plus fine et des habitudes quotidiennes qui révèlent la définition musculaire.',
      benefits: ['Un haut du corps plus large en V', 'Des épaules et un dos plus larges', 'Une taille plus fine et définie'],
      weeks: [
        { n: 1, focus: 'Construire la base', why: 'La silhouette en V commence par le volume — les épaules et le dos ont besoin d’un vrai stimulus d’entraînement avant que le reste ne compte, et les objectifs de pas et de protéines garantissent que le corps a ce qu’il faut pour construire ce muscle.', tasks: ['Séance poussée : pectoraux, épaules, triceps', 'Élévations latérales : 4 séries de 15', '8 000 pas dans la journée', 'Objectif protéines : 1,6 g par kg de poids de corps'] },
        { n: 2, focus: 'Élargir la carrure', why: 'Le travail du jour de tirage cible spécifiquement le dos et les deltoïdes postérieurs, car c’est ce qui élargit la carrure de dos, pas seulement de face — combiné à un déficit calorique, c’est ici que la silhouette en V commence réellement à se dessiner.', tasks: ['Séance tirage : dos, deltoïdes postérieurs, biceps', 'Élévations latérales : 5 séries de 15', '10 000 pas dans la journée', 'Atteindre l’objectif protéines + déficit de 300 kcal'] },
        { n: 3, focus: 'Ajouter de l’intensité', why: 'Les supersets et le développé militaire plus lourd dépassent l’adaptation des deux premières semaines — le corps arrête de progresser une fois qu’un stimulus devient routinier, donc l’intensité doit augmenter pour que les épaules continuent de répondre.', tasks: ['Circuit superset poussée/tirage', 'Développé militaire : 4 séries lourdes', 'Gainage + vacuum abdominal : 3 × 20s', '10 000 pas + objectif protéines'] },
        { n: 4, focus: 'Révéler la définition', why: 'Cette semaine est celle où le déficit se voit enfin en surface — le circuit full-body maintient ce qui a été construit, tandis que la discipline soutenue en calories/protéines/pas est ce qui le révèle réellement.', tasks: ['Circuit de force full-body', 'Finisher épaules : 6 séries', 'Photo de progression, face + dos', 'Déficit + protéines + 10 000 pas'] }
      ]
    }
  },
  {
    id: 'posture', section: 'BODY',
    mins: 15, level: 'CORE', plate: 'posture', img: '/images/programs/posture-reset.png',
    name: 'Posture Reset', tagline: 'Spinal alignment · forward-head correction', anatomy: 'Spinal Column',
    overview: 'Undo forward-head and rounded-shoulder posture with daily mobility, thoracic extension and strengthening — the fastest change to how your frame reads.',
    benefits: ['A straighter, taller standing posture', 'Less forward-head strain on the neck', 'A stronger, more open chest and shoulders'],
    weeks: [
      { n: 1, focus: 'Open & release', why: 'Forward-head posture comes from chronically tight chest and neck muscles pulling the frame forward — before any strengthening can hold a better position, those tissues need to actually release.', tasks: ['Chin tucks: 3 sets of 12', 'Chest doorway stretch: 3 × 30s', 'Thoracic extensions over chair: 10 reps', 'Hourly posture reset alarm'] },
      { n: 2, focus: 'Strengthen the back', why: "Once the front is opened up, the upper-back muscles that have been overstretched and weak need direct strengthening — they're what actually holds the shoulders back once you stop consciously thinking about it.", tasks: ['Wall angels: 3 sets of 12', 'Band pull-aparts: 3 sets of 20', 'Chin tucks: 4 sets of 12', 'Desk ergonomics check'] },
      { n: 3, focus: 'Integrate', why: 'Face pulls and deep neck flexor work train the smaller stabilizing muscles that keep the position under real load — standing posture holds through the day are what turn this from an exercise into how you actually stand.', tasks: ['Face pulls: 4 sets of 15', 'Wall angels + Y-T-W raises', 'Deep neck flexor holds: 3 × 20s', 'Standing posture holds through the day'] },
      { n: 4, focus: 'Make it default', why: 'The last week has no new movement — it proves the alignment holds without cueing, under load (loaded carries) and across a full day, which is the actual definition of a fixed posture.', tasks: ['Full posture circuit', 'Loaded carries: 3 sets', 'Progress photo, side profile', 'All-day alignment habit check'] }
    ],
    fr: {
      name: 'Reset Posture', tagline: 'Alignement vertébral · correction de la tête projetée', anatomy: 'Colonne vertébrale',
      overview: 'Corrigez la tête projetée vers l’avant et les épaules arrondies avec de la mobilité quotidienne, de l’extension thoracique et du renforcement — le changement le plus rapide sur la lecture de votre carrure.',
      benefits: ['Une posture debout plus droite et plus grande', 'Moins de tension cervicale liée à la tête en avant', 'Une poitrine et des épaules plus fortes et ouvertes'],
      weeks: [
        { n: 1, focus: 'Ouvrir et relâcher', why: 'La posture tête en avant vient de muscles pectoraux et cervicaux chroniquement raccourcis qui tirent la carrure vers l’avant — avant qu’un renforcement ne puisse maintenir une meilleure position, ces tissus doivent d’abord se relâcher.', tasks: ['Rentrées de menton : 3 séries de 12', 'Étirement pectoraux dans l’embrasure de porte : 3 × 30s', 'Extensions thoraciques sur chaise : 10 répétitions', 'Alarme horaire de réajustement postural'] },
        { n: 2, focus: 'Renforcer le dos', why: 'Une fois l’avant du corps ouvert, les muscles du haut du dos, trop étirés et affaiblis, ont besoin d’un renforcement direct — ce sont eux qui maintiennent réellement les épaules en arrière une fois que vous arrêtez d’y penser consciemment.', tasks: ['Anges au mur : 3 séries de 12', 'Écartés à la bande élastique : 3 séries de 20', 'Rentrées de menton : 4 séries de 12', 'Vérification de l’ergonomie du bureau'] },
        { n: 3, focus: 'Intégrer', why: 'Les tirages au visage et le travail des fléchisseurs profonds du cou entraînent les petits muscles stabilisateurs qui maintiennent la position sous charge réelle — les maintiens de posture debout tout au long de la journée transforment cela d’un exercice en votre façon réelle de vous tenir.', tasks: ['Tirages au visage : 4 séries de 15', 'Anges au mur + élévations Y-T-W', 'Maintiens des fléchisseurs profonds du cou : 3 × 20s', 'Maintiens de posture debout tout au long de la journée'] },
        { n: 4, focus: 'En faire un réflexe', why: 'La dernière semaine n’introduit aucun nouveau mouvement — elle prouve que l’alignement tient sans y penser, sous charge (portés chargés) et sur une journée complète, ce qui est la définition réelle d’une posture corrigée durablement.', tasks: ['Circuit posture complet', 'Portés chargés : 3 séries', 'Photo de progression, profil latéral', 'Vérification de l’habitude d’alignement toute la journée'] }
      ]
    }
  },
  {
    id: 'skinmaxing', section: 'SKIN & GROOMING',
    mins: 10, level: 'CORE', plate: 'skin', img: '/images/programs/skinmaxing.png',
    name: 'Skinmaxing', tagline: 'Barrier · glow · collagen support', anatomy: 'Skin Cross-Section',
    overview: 'Build a resilient barrier and a real glow: a simple, consistent routine plus the sleep, sun and nutrition inputs that skin actually responds to.',
    benefits: ['A visibly clearer, more even glow', 'A stronger, more resilient skin barrier', 'Smoother texture over time'],
    weeks: [
      { n: 1, focus: 'Establish the routine', why: 'Barrier and glow both depend on consistency more than any single product — week one is deliberately simple (cleanse, vitamin C, SPF) so the routine actually sticks before anything stronger gets added.', tasks: ['AM: cleanse, vitamin C, SPF 30+', 'PM: cleanse + moisturize', 'Water target: 2.5L', 'Pillowcase change (2×/week)'] },
      { n: 2, focus: 'Introduce actives', why: "Retinoids work by increasing cell turnover, which is exactly why they're introduced slowly (alternate nights) — going too fast irritates the barrier you just spent a week building instead of strengthening it.", tasks: ['PM: low-% retinoid (alt nights)', 'AM routine + SPF reapply', 'Sleep 7.5h+', 'No touching / picking (habit check)'] },
      { n: 3, focus: 'Support collagen', why: 'Once the skin tolerates the retinoid nightly, collagen support from diet and antioxidants compounds on top of it — this is the week where real structural change in the skin starts, not just surface hydration.', tasks: ['Retinoid nightly if tolerated', 'AM antioxidant + SPF', 'Protein + vitamin-C rich meals', 'Facial massage, 3 min'] },
      { n: 4, focus: 'Lock in the glow', why: "The final week tests whether the routine holds without daily thought — gentle exfoliation removes the buildup from three weeks of actives, and the streak check is what proves it's now a habit, not an experiment.", tasks: ['Full AM + PM routine', 'Weekly gentle exfoliation', 'Progress photo, bare skin', 'Sleep + hydration + SPF streak'] }
    ],
    fr: {
      name: 'Skinmaxing', tagline: 'Barrière cutanée · éclat · soutien du collagène', anatomy: 'Coupe transversale de la peau',
      overview: 'Construisez une barrière cutanée résiliente et un véritable éclat : une routine simple et régulière, associée au sommeil, au soleil et à la nutrition auxquels la peau répond vraiment.',
      benefits: ['Un éclat visiblement plus clair et uniforme', 'Une barrière cutanée plus forte et résiliente', 'Une texture plus lisse avec le temps'],
      weeks: [
        { n: 1, focus: 'Installer la routine', why: 'La barrière cutanée et l’éclat dépendent tous deux davantage de la régularité que d’un produit précis — la première semaine est volontairement simple (nettoyage, vitamine C, SPF) pour que la routine s’installe vraiment avant d’ajouter quoi que ce soit de plus fort.', tasks: ['Matin : nettoyage, vitamine C, SPF 30+', 'Soir : nettoyage + hydratation', 'Objectif eau : 2,5 L', 'Changement de taie d’oreiller (2×/semaine)'] },
        { n: 2, focus: 'Introduire les actifs', why: 'Les rétinoïdes agissent en augmentant le renouvellement cellulaire, c’est justement pourquoi ils sont introduits progressivement (une nuit sur deux) — aller trop vite irrite la barrière que vous venez de passer une semaine à construire, au lieu de la renforcer.', tasks: ['Soir : rétinoïde à faible dose (une nuit sur deux)', 'Routine du matin + réapplication de SPF', 'Dormir 7h30 ou plus', 'Ne pas toucher / triturer la peau (vérification de l’habitude)'] },
        { n: 3, focus: 'Soutenir le collagène', why: 'Une fois que la peau tolère le rétinoïde chaque soir, le soutien du collagène par l’alimentation et les antioxydants s’ajoute par-dessus — c’est la semaine où un vrai changement structurel de la peau commence, pas seulement une hydratation de surface.', tasks: ['Rétinoïde chaque soir si bien toléré', 'Antioxydant du matin + SPF', 'Repas riches en protéines et vitamine C', 'Massage du visage, 3 min'] },
        { n: 4, focus: 'Ancrer l’éclat', why: 'La dernière semaine teste si la routine tient sans y penser chaque jour — l’exfoliation douce élimine l’accumulation de trois semaines d’actifs, et la vérification de la série prouve que c’est désormais une habitude, pas juste un essai.', tasks: ['Routine matin + soir complète', 'Exfoliation douce hebdomadaire', 'Photo de progression, peau nue', 'Série sommeil + hydratation + SPF'] }
      ]
    }
  },
  {
    id: 'skin-clarity', section: 'SKIN & GROOMING',
    mins: 8, level: 'INTERMEDIATE', plate: 'skin', img: '/images/programs/skin-clarity.png',
    name: 'Skin Clarity Reset', tagline: 'Breakout control · texture · tone', anatomy: 'Skin Cross-Section',
    overview: 'A focused reset for congestion and uneven tone — calm active breakouts, clear texture, and rebuild an even, clear complexion over 28 days.',
    benefits: ['Fewer active breakouts', 'A calmer, less congested complexion', 'A more even, consistent skin tone'],
    weeks: [
      { n: 1, focus: 'Calm & simplify', why: "Active breakouts respond worse to more products, not fewer — stripping the routine down and cutting common trigger foods for a week isolates what's actually driving the congestion before treating it more aggressively.", tasks: ['Gentle cleanse AM/PM only', 'Spot treat with BHA/benzoyl', 'SPF every morning', 'Cut dairy + high-sugar test'] },
      { n: 2, focus: 'Clear congestion', why: 'BHA works specifically inside the pore to clear the congestion causing breakouts — alternating nights avoids over-exfoliating skin that’s already inflamed, while the phone/pillowcase hygiene removes a constant re-contamination source.', tasks: ['BHA exfoliant, alternate nights', 'Non-comedogenic moisturizer', 'Clean phone screen + pillowcase', 'Hydrate 2.5L + sleep 7.5h'] },
      { n: 3, focus: 'Even the tone', why: 'Once active breakouts calm down, niacinamide starts addressing the post-inflammatory marks they leave behind — that’s a separate, slower process from clearing the breakout itself, which is why it only starts in week three.', tasks: ['Niacinamide AM', 'Continue BHA + spot care', 'SPF reapply midday', 'No picking (streak check)'] },
      { n: 4, focus: 'Stabilize', why: 'The clay mask and locked-in maintenance routine exist to keep congestion from building back up now that skin is clear — clarity is a state you maintain, not a one-time fix, which is what this last week is testing.', tasks: ['Maintenance routine locked', 'Weekly clay mask', 'Progress photo, bare skin', 'Diet + sleep + hydration review'] }
    ],
    fr: {
      name: 'Reset Clarté de Peau', tagline: 'Contrôle des imperfections · texture · teint', anatomy: 'Coupe transversale de la peau',
      overview: 'Un reset ciblé pour la congestion et le teint irrégulier — calmez les imperfections actives, clarifiez la texture et reconstruisez un teint uniforme et net en 28 jours.',
      benefits: ['Moins d’imperfections actives', 'Un teint plus calme et moins congestionné', 'Une carnation plus uniforme et régulière'],
      weeks: [
        { n: 1, focus: 'Calmer et simplifier', why: 'Les imperfections actives réagissent moins bien à plus de produits, pas à moins — simplifier la routine et supprimer les aliments déclencheurs courants pendant une semaine permet d’isoler ce qui cause réellement la congestion avant de la traiter plus activement.', tasks: ['Nettoyage doux matin/soir uniquement', 'Traitement localisé au BHA/peroxyde de benzoyle', 'SPF chaque matin', 'Test sans produits laitiers + sucre élevé'] },
        { n: 2, focus: 'Désengorger la peau', why: 'Le BHA agit spécifiquement à l’intérieur du pore pour dégager la congestion à l’origine des imperfections — alterner les soirs évite de sur-exfolier une peau déjà inflammée, tandis que l’hygiène du téléphone et de la taie d’oreiller supprime une source constante de recontamination.', tasks: ['Exfoliant BHA, un soir sur deux', 'Hydratant non comédogène', 'Nettoyer écran de téléphone + taie d’oreiller', 'S’hydrater 2,5 L + dormir 7h30'] },
        { n: 3, focus: 'Uniformiser le teint', why: 'Une fois les imperfections actives calmées, la niacinamide commence à traiter les marques post-inflammatoires qu’elles laissent — c’est un processus distinct et plus lent que celui d’éliminer l’imperfection elle-même, d’où le fait qu’il ne débute qu’à la semaine trois.', tasks: ['Niacinamide le matin', 'Continuer BHA + soin localisé', 'Réapplication de SPF à midi', 'Ne pas triturer la peau (vérification de la série)'] },
        { n: 4, focus: 'Stabiliser', why: 'Le masque à l’argile et la routine d’entretien fixée existent pour empêcher la congestion de revenir maintenant que la peau est claire — la clarté est un état que l’on entretient, pas une correction ponctuelle, ce que cette dernière semaine vérifie.', tasks: ['Routine d’entretien fixée', 'Masque à l’argile hebdomadaire', 'Photo de progression, peau nue', 'Bilan alimentation + sommeil + hydratation'] }
      ]
    }
  },
  {
    id: 'grooming', section: 'SKIN & GROOMING',
    mins: 10, level: 'CORE', plate: 'face', img: '/images/programs/grooming.png',
    name: 'Power Grooming System', tagline: 'Brows · hair · beard · presentation', anatomy: 'Frontal Presentation',
    overview: 'Dial in the controllables that instantly raise presentation: brows, hairline, facial hair, teeth and grooming detail — refined and maintained weekly.',
    benefits: ['Sharper, well-shaped brows and hairline', 'A cleaner, more defined facial hair line', 'An overall more polished presentation'],
    weeks: [
      { n: 1, focus: 'Audit & shape', why: "Presentation improves fastest from the controllables you can fix in a single session — a proper brow shape and haircut change how the whole face reads immediately, which is why they come first.", tasks: ['Brow clean-up (map, then trim)', 'Book / plan a sharp haircut', 'Define beard or clean shave line', 'Start whitening routine'] },
      { n: 2, focus: 'Refine hair', why: 'Once the shape is set, daily execution — styling, maintaining the line, basic hand/nail upkeep — is what keeps that first-week improvement from fading back to baseline within days.', tasks: ['Style hair with correct products', 'Maintain beard/shave line', 'Nail + hand grooming', 'Whitening + flossing streak'] },
      { n: 3, focus: 'Detail work', why: "This week moves to the details that separate 'put together' from 'polished' — fragrance, skin base, precise edge-ups — plus a wardrobe check, since grooming and clothing fit read as one system, not separately.", tasks: ['Brow maintenance', 'Fragrance + skin base routine', 'Trim + edge-up touch-ups', 'Wardrobe fit check (top 3 outfits)'] },
      { n: 4, focus: 'System on autopilot', why: 'The goal is a repeatable weekly schedule, not a one-time effort — restocking low products and fixing a maintenance cadence now is what keeps the whole system running after the 28 days end.', tasks: ['Full grooming pass', 'Progress photo, styled', 'Restock products low on stock', 'Set weekly maintenance schedule'] }
    ],
    fr: {
      name: 'Système Power Grooming', tagline: 'Sourcils · cheveux · barbe · présentation', anatomy: 'Présentation frontale',
      overview: 'Maîtrisez les éléments contrôlables qui élèvent instantanément votre présentation : sourcils, ligne de cheveux, pilosité faciale, dents et détails de grooming — affinés et entretenus chaque semaine.',
      benefits: ['Des sourcils et une ligne de cheveux plus nets', 'Une ligne de pilosité faciale plus définie', 'Une présentation générale plus soignée'],
      weeks: [
        { n: 1, focus: 'Auditer et façonner', why: 'La présentation s’améliore le plus vite grâce aux éléments contrôlables que l’on peut corriger en une seule séance — une forme de sourcils et une coupe de cheveux adaptées changent immédiatement la lecture du visage entier, d’où le fait qu’elles arrivent en premier.', tasks: ['Nettoyage des sourcils (tracer, puis tailler)', 'Réserver / planifier une coupe nette', 'Définir la barbe ou une ligne de rasage nette', 'Démarrer une routine de blanchiment dentaire'] },
        { n: 2, focus: 'Affiner la coiffure', why: 'Une fois la forme fixée, l’exécution quotidienne — coiffage, entretien de la ligne, soin de base des mains/ongles — est ce qui empêche l’amélioration de la première semaine de retomber au niveau de départ en quelques jours.', tasks: ['Coiffer avec les bons produits', 'Entretenir la barbe / ligne de rasage', 'Soin des ongles et des mains', 'Série blanchiment + fil dentaire'] },
        { n: 3, focus: 'Travail de détail', why: 'Cette semaine passe aux détails qui distinguent « soigné » de « impeccable » — parfum, base de peau, contours précis — plus une vérification de la garde-robe, car le grooming et la coupe des vêtements se lisent comme un seul système, pas séparément.', tasks: ['Entretien des sourcils', 'Routine parfum + base de peau', 'Retouches de taille et de contours', 'Vérification de la garde-robe (top 3 tenues)'] },
        { n: 4, focus: 'Système en pilote automatique', why: 'L’objectif est un calendrier hebdomadaire reproductible, pas un effort ponctuel — réapprovisionner les produits en rupture et fixer une cadence d’entretien maintenant est ce qui fait tourner tout le système après la fin des 28 jours.', tasks: ['Passage grooming complet', 'Photo de progression, apprêté', 'Réapprovisionner les produits en rupture', 'Fixer un calendrier d’entretien hebdomadaire'] }
      ]
    }
  },
  {
    id: 'hormonal', section: 'SYSTEMS',
    mins: 20, level: 'ADVANCED', plate: 'body', img: '/images/programs/hormonal.png',
    name: 'Hormonal Optimization Diet', tagline: 'Testosterone · insulin · body composition', anatomy: 'Metabolic Profile',
    overview: 'Eat and train to support natural hormonal balance: protein and micronutrient targets, blood-sugar control, and the lifestyle inputs that move the needle.',
    benefits: ['More stable energy throughout the day', 'Support for natural testosterone balance', 'A leaner, more defined body composition'],
    weeks: [
      { n: 1, focus: 'Fix the foundation', why: 'Hormone production needs raw materials and stable blood sugar before anything else — cutting liquid sugar and seed-oil fried food, plus morning sunlight and real sleep, removes the biggest disruptors first.', tasks: ['Protein: 1.8g per kg bodyweight', 'Cut liquid sugar + seed-oil fried food', 'Sunlight 15 min before noon', 'Sleep 8h window'] },
      { n: 2, focus: 'Balance blood sugar', why: 'Insulin spikes directly suppress testosterone production, so whole-food carbs, zinc/magnesium-rich meals and an overnight fast are all aimed at the same target — keeping blood sugar stable enough for hormones to regulate normally.', tasks: ['Whole-food carbs only', 'Zinc + magnesium rich meals', 'Strength train 3×/week', 'Fasting 12h overnight'] },
      { n: 3, focus: 'Support production', why: 'Cholesterol from healthy fats is a literal building block for testosterone — this week adds the fats and resistance training that actively support production, on top of the fixes made in weeks one and two.', tasks: ['Healthy fats: eggs, olive oil, fish', 'Resistance training progression', 'Stress / cortisol wind-down at night', 'Hydration + electrolytes'] },
      { n: 4, focus: 'Dial it in', why: 'Hormonal shifts show up in energy, waist measurement and sleep quality before they show up anywhere else — tracking those markers this week is how you actually know the previous three weeks worked.', tasks: ['Full nutrient-dense day', 'Track measurements + energy', 'Progress photo + waist measure', 'Review sleep, training, diet streaks'] }
    ],
    fr: {
      name: 'Régime d’Optimisation Hormonale', tagline: 'Testostérone · insuline · composition corporelle', anatomy: 'Profil métabolique',
      overview: 'Mangez et entraînez-vous pour soutenir un équilibre hormonal naturel : objectifs de protéines et de micronutriments, contrôle de la glycémie, et les leviers de mode de vie qui font vraiment la différence.',
      benefits: ['Une énergie plus stable tout au long de la journée', 'Un soutien à l’équilibre naturel de la testostérone', 'Une composition corporelle plus sèche et définie'],
      weeks: [
        { n: 1, focus: 'Réparer les fondations', why: 'La production hormonale a besoin de matières premières et d’une glycémie stable avant tout le reste — supprimer le sucre liquide et les fritures à l’huile de graines, ainsi que s’assurer d’un soleil matinal et d’un vrai sommeil, élimine d’abord les plus grands perturbateurs.', tasks: ['Protéines : 1,8 g par kg de poids de corps', 'Supprimer le sucre liquide + les fritures à l’huile de graines', 'Soleil 15 min avant midi', 'Fenêtre de sommeil de 8h'] },
        { n: 2, focus: 'Équilibrer la glycémie', why: 'Les pics d’insuline suppriment directement la production de testostérone, donc les glucides issus d’aliments complets, les repas riches en zinc/magnésium et le jeûne nocturne visent tous la même cible — garder une glycémie assez stable pour que les hormones se régulent normalement.', tasks: ['Glucides uniquement issus d’aliments complets', 'Repas riches en zinc + magnésium', 'Musculation 3×/semaine', 'Jeûne nocturne de 12h'] },
        { n: 3, focus: 'Soutenir la production', why: 'Le cholestérol issu des bonnes graisses est littéralement un élément constitutif de la testostérone — cette semaine ajoute les graisses et la musculation qui soutiennent activement la production, en plus des corrections apportées aux semaines une et deux.', tasks: ['Bonnes graisses : œufs, huile d’olive, poisson', 'Progression en musculation', 'Décompression du stress / cortisol le soir', 'Hydratation + électrolytes'] },
        { n: 4, focus: 'Affiner', why: 'Les changements hormonaux se manifestent dans l’énergie, le tour de taille et la qualité du sommeil avant de se voir ailleurs — suivre ces indicateurs cette semaine est la façon de vérifier que les trois semaines précédentes ont réellement fonctionné.', tasks: ['Journée complète riche en nutriments', 'Suivre mensurations + énergie', 'Photo de progression + mesure de tour de taille', 'Bilan des séries sommeil, entraînement, alimentation'] }
      ]
    }
  },
  {
    id: 'sleep', section: 'SYSTEMS',
    mins: 5, level: 'CORE', plate: 'sleep',
    name: 'Elite Sleep Protocol', tagline: 'Deep sleep · recovery · circadian rhythm', anatomy: 'Circadian System',
    overview: 'Sleep is where the face de-puffs and the body recovers. Rebuild deep, consistent sleep with light timing, temperature and a locked wind-down ritual.',
    benefits: ['Deeper, more restorative sleep', 'Less morning puffiness', 'More consistent energy and recovery'],
    weeks: [
      { n: 1, focus: 'Anchor the rhythm', why: 'The circadian clock is set primarily by wake time and morning light, not bedtime — fixing when you wake up and getting sunlight early is what actually recalibrates the rhythm before anything else can work.', tasks: ['Fixed wake time, 7 days', 'Morning sunlight within 30 min', 'No caffeine after 2pm', 'Screens off 60 min before bed'] },
      { n: 2, focus: 'Build the ritual', why: 'A cool, dark room and a consistent wind-down cue the body that sleep is coming — this only works as a signal if it’s repeated at the same time every night, which is why consistency matters more than any single input.', tasks: ['Cool, dark room (18°C)', 'Wind-down routine, 30 min', 'No large meals 3h before bed', 'Consistent bedtime ±15 min'] },
      { n: 3, focus: 'Deepen recovery', why: 'Alcohol and late blue light both fragment deep sleep even when total hours look normal — removing them plus adding magnesium and a short breathing practice is what improves sleep quality, not just duration.', tasks: ['Magnesium + no alcohol test', 'Blue-light filter after sunset', 'Breathing / relaxation, 5 min', 'Track sleep + morning puffiness'] },
      { n: 4, focus: 'Lock the system', why: 'Morning puffiness is a direct, visible readout of sleep quality — checking it against consistent 8-hour nights this week is how you confirm the protocol is actually working, not just being followed.', tasks: ['Full protocol nightly', 'Consistent 8h achieved', 'Review de-puff in AM photos', 'Set permanent sleep schedule'] }
    ],
    fr: {
      name: 'Protocole de Sommeil Élite', tagline: 'Sommeil profond · récupération · rythme circadien', anatomy: 'Système circadien',
      overview: 'C’est pendant le sommeil que le visage se dégonfle et que le corps récupère. Reconstruisez un sommeil profond et régulier grâce au minutage de la lumière, à la température et à un rituel de décompression fixe.',
      benefits: ['Un sommeil plus profond et réparateur', 'Moins de poches le matin', 'Une énergie et une récupération plus constantes'],
      weeks: [
        { n: 1, focus: 'Ancrer le rythme', why: 'L’horloge circadienne est réglée principalement par l’heure de réveil et la lumière du matin, pas par l’heure du coucher — fixer l’heure de réveil et s’exposer tôt au soleil est ce qui recalibre réellement le rythme avant que le reste ne puisse fonctionner.', tasks: ['Heure de réveil fixe, 7 jours', 'Lumière du soleil le matin dans les 30 min', 'Pas de caféine après 14h', 'Écrans éteints 60 min avant le coucher'] },
        { n: 2, focus: 'Construire le rituel', why: 'Une chambre fraîche et sombre ainsi qu’une décompression régulière signalent au corps que le sommeil arrive — cela ne fonctionne comme signal que si c’est répété à la même heure chaque soir, d’où l’importance de la régularité plus que celle d’un seul élément.', tasks: ['Chambre fraîche et sombre (18°C)', 'Routine de décompression, 30 min', 'Pas de gros repas 3h avant le coucher', 'Heure de coucher constante ±15 min'] },
        { n: 3, focus: 'Approfondir la récupération', why: 'L’alcool et la lumière bleue tardive fragmentent tous deux le sommeil profond même quand le nombre d’heures total paraît normal — les supprimer et ajouter du magnésium et une courte pratique de respiration améliore la qualité du sommeil, pas seulement sa durée.', tasks: ['Test magnésium + sans alcool', 'Filtre lumière bleue après le coucher du soleil', 'Respiration / relaxation, 5 min', 'Suivre sommeil + poches du matin'] },
        { n: 4, focus: 'Verrouiller le système', why: 'Les poches du matin sont un indicateur direct et visible de la qualité du sommeil — les vérifier face à des nuits de 8h constantes cette semaine permet de confirmer que le protocole fonctionne réellement, pas seulement qu’il est suivi.', tasks: ['Protocole complet chaque soir', '8h constantes atteintes', 'Bilan des poches sur les photos du matin', 'Fixer un horaire de sommeil permanent'] }
      ]
    }
  },
  {
    id: 'hydration', section: 'SYSTEMS',
    mins: 3, level: 'CORE', plate: 'body',
    name: 'Hydration Protocol', tagline: 'Skin plumpness · de-puff · energy', anatomy: 'Fluid Balance',
    overview: 'Proper hydration and electrolyte balance visibly plump skin, reduce puffiness and sharpen features — the lowest-effort, fastest-visible input.',
    benefits: ['Visibly plumper, less puffy skin', 'Sharper-looking facial features', 'More consistent daily energy'],
    weeks: [
      { n: 1, focus: 'Hit the baseline', why: "Most people are chronically under-hydrated without noticing, which shows up first as puffiness and dull skin — hitting a real 2.5L baseline plus electrolytes is what actually plumps tissue, not just drinking 'more water' vaguely.", tasks: ['Water: 500ml on waking', 'Reach 2.5L across the day', 'Add electrolytes once daily', 'Cut excess salt + alcohol'] },
      { n: 2, focus: 'Balance electrolytes', why: 'Water alone without sodium/potassium balance just passes through — this week adds the electrolyte side of hydration, which is what actually lets cells hold onto the water instead of flushing it straight out.', tasks: ['3L water target', 'Sodium/potassium balance in meals', 'Herbal tea instead of late caffeine', 'Track AM facial puffiness'] },
      { n: 3, focus: 'Optimize timing', why: 'Front-loading water earlier in the day, instead of all at night, reduces overnight puffiness directly — timing matters here almost as much as total volume, which is the whole point of this week.', tasks: ['Front-load water before evening', 'Electrolytes AM + post-training', 'Water-rich foods each meal', 'Cold-water face rinse AM'] },
      { n: 4, focus: 'Make it effortless', why: 'The last week checks that 3L and the de-puff routine hold without conscious effort — hydration only compounds in its visible effects (skin, energy) if it’s sustained past the program, not just during it.', tasks: ['Consistent 3L habit', 'De-puff routine locked', 'Progress photo, AM face', 'Review energy + skin clarity'] }
    ],
    fr: {
      name: 'Protocole d’Hydratation', tagline: 'Peau repulpée · anti-poches · énergie', anatomy: 'Équilibre hydrique',
      overview: 'Une bonne hydratation et un bon équilibre en électrolytes repulpent visiblement la peau, réduisent les poches et affinent les traits — le levier le moins coûteux en effort et le plus rapide à voir.',
      benefits: ['Une peau visiblement plus repulpée et moins gonflée', 'Des traits du visage à l’apparence plus nette', 'Une énergie quotidienne plus constante'],
      weeks: [
        { n: 1, focus: 'Atteindre la base', why: 'La plupart des gens sont chroniquement sous-hydratés sans s’en rendre compte, ce qui se voit d’abord par des poches et un teint terne — atteindre une vraie base de 2,5 L plus des électrolytes est ce qui repulpe réellement les tissus, pas juste boire « un peu plus d’eau » vaguement.', tasks: ['Eau : 500 ml au réveil', 'Atteindre 2,5 L dans la journée', 'Ajouter des électrolytes une fois par jour', 'Réduire l’excès de sel + alcool'] },
        { n: 2, focus: 'Équilibrer les électrolytes', why: 'L’eau seule sans équilibre sodium/potassium ne fait que traverser le corps — cette semaine ajoute le volet électrolytes de l’hydratation, ce qui permet réellement aux cellules de retenir l’eau au lieu de l’évacuer directement.', tasks: ['Objectif 3 L d’eau', 'Équilibre sodium/potassium dans les repas', 'Tisane au lieu de caféine tardive', 'Suivre les poches du visage le matin'] },
        { n: 3, focus: 'Optimiser le timing', why: 'Répartir l’eau plus tôt dans la journée, plutôt que tout le soir, réduit directement les poches nocturnes — le timing compte ici presque autant que le volume total, ce qui est tout l’enjeu de cette semaine.', tasks: ['Répartir l’eau avant le soir', 'Électrolytes le matin + après l’entraînement', 'Aliments riches en eau à chaque repas', 'Rinçage du visage à l’eau froide le matin'] },
        { n: 4, focus: 'Rendre ça sans effort', why: 'La dernière semaine vérifie que les 3 L et la routine anti-poches tiennent sans effort conscient — l’hydratation n’a d’effets visibles cumulés (peau, énergie) que si elle est maintenue au-delà du programme, pas seulement pendant.', tasks: ['Habitude de 3 L constante', 'Routine anti-poches fixée', 'Photo de progression, visage du matin', 'Bilan énergie + clarté de peau'] }
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
