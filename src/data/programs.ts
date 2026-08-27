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
    name: 'Face Structure', tagline: 'Tongue posture · face exercises · natural lift', anatomy: 'Face Muscles',
    overview: 'A month of simple tongue posture, gentle face exercises and hands-on massage to lift and define your whole face — no tools, no products, just consistent daily habits.',
    benefits: ['A more defined, sculpted mid-face', 'Sharper cheekbone definition', 'Better tongue posture as a lasting habit'],
    weeks: [
      { n: 1, focus: 'Establish tongue posture', why: "Resting your whole tongue against the roof of your mouth is the foundation everything else builds on — it applies gentle, constant pressure that shapes your upper jaw over time. Week one is about making that posture and nose breathing automatic before adding any real work.", tasks: ['Full-tongue mewing, 3× 10-min holds', 'Nose-breathing check every waking hour', 'Cheekbone lift: 3 sets of 15', 'Morning + evening face massage, 2 min'] },
      { n: 2, focus: 'Activate the cheeks', why: 'Once tongue posture holds without thinking, the cheek muscles get trained directly. Activating them repeatedly is what starts to define the area under the cheekbones instead of leaving it soft.', tasks: ['Continuous mewing all day', 'Cheekbone lift: 4 sets of 15', 'Cheek hollow holds: 3 × 10s', 'Face massage along cheek + jaw, 3 min'] },
      { n: 3, focus: 'Load & sculpt', why: 'This week adds resistance — hard swallows, longer holds — because muscle only reshapes under real, gradually increasing effort, the same principle as training anywhere else on the body. A cold rinse afterward calms any puffiness from the extra work.', tasks: ['Mewing + hard swallow reps, 3 sets', 'Cheek circuit: 4 rounds', 'Under-eye tapping massage, 2 min', 'Cold-water face rinse, 30s'] },
      { n: 4, focus: 'Consolidate the framework', why: "The goal in the final week is to make everything effortless — mewing without thinking about it, massage and cold rinses as habit. What you've built only sticks if it survives past the 28 days, so this week proves it holds on its own.", tasks: ['Effortless all-day mewing (habit check)', 'Full face circuit: 5 rounds', 'Progress photo, front + profile', 'Massage + cold-rinse recovery'] }
    ],
    fr: {
      name: 'Structure Faciale', tagline: 'Posture linguale · exercices · lift naturel', anatomy: 'Muscles du visage',
      overview: 'Un mois de posture linguale simple, d’exercices doux du visage et de massage à la main pour relever et définir tout le visage — pas d’outil, pas de produit, juste des habitudes quotidiennes régulières.',
      benefits: ['Un milieu du visage plus défini et sculpté', 'Des pommettes plus marquées', 'Une meilleure posture linguale, comme habitude durable'],
      weeks: [
        { n: 1, focus: 'Installer la posture linguale', why: 'Poser toute la langue contre le palais est la base sur laquelle reposent tous les autres exercices : cela applique une pression douce et constante qui façonne la mâchoire supérieure dans la durée. Cette première semaine consiste à automatiser cette posture et la respiration par le nez avant d’ajouter du vrai travail.', tasks: ['Mewing complet, 3 × maintiens de 10 min', 'Vérification de la respiration par le nez à chaque heure éveillée', 'Lift des pommettes : 3 séries de 15', 'Massage du visage matin + soir, 2 min'] },
        { n: 2, focus: 'Activer les joues', why: 'Une fois la posture linguale acquise sans effort, les muscles des joues sont sollicités directement. Les activer de façon répétée commence à définir la zone sous les pommettes au lieu de la laisser relâchée.', tasks: ['Mewing continu toute la journée', 'Lift des pommettes : 4 séries de 15', 'Maintiens des joues creuses : 3 × 10s', 'Massage du visage le long des joues et de la mâchoire, 3 min'] },
        { n: 3, focus: 'Charger et sculpter', why: 'Cette semaine ajoute de la résistance — déglutitions forcées, maintiens plus longs — car le muscle ne se remodèle que sous un effort réel et progressif, le même principe qu’un entraînement ailleurs sur le corps. Un rinçage à l’eau froide ensuite calme le léger gonflement lié à ce travail supplémentaire.', tasks: ['Mewing + déglutitions forcées, 3 séries', 'Circuit joues : 4 tours', 'Massage par tapotements sous les yeux, 2 min', 'Rinçage du visage à l’eau froide, 30s'] },
        { n: 4, focus: 'Consolider la structure', why: 'L’objectif de la dernière semaine est de rendre tout cela naturel — le mewing sans y penser, le massage et l’eau froide comme habitude. Ce que vous avez construit ne tient que s’il survit au-delà des 28 jours, donc cette semaine consiste à prouver que ça tient tout seul.', tasks: ['Mewing sans effort toute la journée (vérification de l’habitude)', 'Circuit visage complet : 5 tours', 'Photo de progression, face + profil', 'Récupération massage + rinçage froid'] }
      ]
    }
  },
  {
    id: 'jawmaxing', section: 'STRUCTURE',
    mins: 10, level: 'INTERMEDIATE', plate: 'jaw', img: '/images/programs/jawmaxing-profile.png',
    name: 'Jawmaxing', tagline: 'Jaw-muscle training · natural chewing work', anatomy: 'Jaw Muscle',
    overview: 'Simple, progressive chewing and clench training — no tools beyond chewing gum — to build the jaw muscle, sharpen the jaw angle and widen the lower face.',
    benefits: ['A stronger, more defined jawline', 'A sharper jaw angle', 'A wider lower-face silhouette'],
    weeks: [
      { n: 1, focus: 'Prime the jaw muscle', why: "The jaw muscle only grows in response to real effort, so week one is calibration — light gum, a small number of clenches — to find a working intensity without overloading a muscle that isn't used to training.", tasks: ['Warm-up: 20 slow jaw clenches', 'Resistance gum: 3 min per side', 'Chin tucks: 3 sets of 12', 'Jaw massage, 2 min'] },
      { n: 2, focus: 'Add resistance', why: 'Gradually increasing the challenge is the whole idea here — a firmer gum and longer static holds force the jaw muscle to adapt further, the same way adding weight forces any other muscle to grow.', tasks: ['Firm gum: 5 min per side', 'Static clench holds: 3 × 20s', 'Chin tucks: 4 sets of 15', 'Neck + jaw stretch, 2 min'] },
      { n: 3, focus: 'Peak effort', why: 'This is the highest-effort week on purpose — hard gum, weighted holds — because real muscle growth needs a genuine peak effort, not just steady maintenance. The deep massage afterward keeps the jaw joint from getting overworked alongside the muscle.', tasks: ['Hard gum: 6 min per side', 'Weighted clench holds: 4 × 20s', 'Lower-lip pull downs: 3 sets of 15', 'Deep jaw massage, 3 min'] },
      { n: 4, focus: 'Sharpen & recover', why: 'After three weeks of building effort, the jaw muscle needs to ease off to actually show its results — the descending set keeps stimulus without adding more fatigue, and recovery work lets the new muscle settle into a visibly sharper jawline.', tasks: ['Gum circuit: 5 min per side', 'Clench pyramid: 5 descending sets', 'Progress photo, profile + 45°', 'Full jaw + neck recovery massage'] }
    ],
    fr: {
      name: 'Jawmaxing', tagline: 'Entraînement de la mâchoire · mastication naturelle', anatomy: 'Muscle de la mâchoire',
      overview: 'Un entraînement progressif et simple de mastication et de serrage — rien d’autre qu’une gomme à mâcher — pour renforcer le muscle de la mâchoire, affiner son angle et élargir le bas du visage.',
      benefits: ['Une mâchoire plus forte et plus définie', 'Un angle de mâchoire plus marqué', 'Un bas du visage plus large'],
      weeks: [
        { n: 1, focus: 'Préparer le muscle de la mâchoire', why: 'Le muscle de la mâchoire ne grossit qu’en réponse à un véritable effort, donc la première semaine sert d’étalonnage — gomme légère, peu de serrages — pour trouver une intensité de travail sans surcharger un muscle qui n’a pas l’habitude d’être entraîné.', tasks: ['Échauffement : 20 serrages lents de mâchoire', 'Gomme à mâcher résistante : 3 min par côté', 'Rentrées de menton : 3 séries de 12', 'Massage de la mâchoire, 2 min'] },
        { n: 2, focus: 'Ajouter de la résistance', why: 'Augmenter progressivement le défi est tout le principe ici — une gomme plus ferme et des maintiens statiques plus longs forcent le muscle de la mâchoire à s’adapter davantage, de la même façon qu’ajouter du poids force n’importe quel autre muscle à grossir.', tasks: ['Gomme ferme : 5 min par côté', 'Maintiens statiques de serrage : 3 × 20s', 'Rentrées de menton : 4 séries de 15', 'Étirement cou + mâchoire, 2 min'] },
        { n: 3, focus: 'Effort maximal', why: 'C’est volontairement la semaine la plus exigeante — gomme dure, maintiens lestés — car une vraie croissance musculaire a besoin d’un vrai pic d’effort, pas seulement d’un entretien stable. Le massage profond qui suit évite que l’articulation de la mâchoire ne soit surmenée en même temps que le muscle.', tasks: ['Gomme dure : 6 min par côté', 'Maintiens de serrage lestés : 4 × 20s', 'Tirés de lèvre inférieure : 3 séries de 15', 'Massage profond de la mâchoire, 3 min'] },
        { n: 4, focus: 'Affiner et récupérer', why: 'Après trois semaines d’effort croissant, le muscle de la mâchoire a besoin de souffler pour vraiment révéler ses résultats — la série dégressive maintient la stimulation sans ajouter de fatigue, et le travail de récupération laisse le nouveau muscle se stabiliser pour une mâchoire visiblement plus nette.', tasks: ['Circuit de mastication : 5 min par côté', 'Pyramide de serrage : 5 séries dégressives', 'Photo de progression, profil + 45°', 'Massage complet de récupération mâchoire + cou'] }
      ]
    }
  },
  {
    id: 'hunter-eyes', section: 'STRUCTURE',
    mins: 8, level: 'ADVANCED', plate: 'eyes', img: '/images/programs/hunter-eyes.png',
    name: 'Hunter Eyes Program', tagline: 'Eye-tilt training · natural, no tools', anatomy: 'Eye Area',
    overview: 'Simple training around the eyes to lift the outer corner, reduce how much of your upper eyelid shows, and create a more hooded, forward-set hunter-eye look — just your own muscles, no tools.',
    benefits: ['A more lifted outer eye corner', 'Less visible upper eyelid', 'A more hooded, forward-set gaze'],
    weeks: [
      { n: 1, focus: 'Wake up the eye muscles', why: "The muscles around the eye barely get used in daily life, so week one is about waking them up with light holds and calming the puffiness that hides definition, before asking them to do real work.", tasks: ['Side-gaze holds: 3 × 8s per side', 'Under-eye de-puff cold compress, 60s', 'Outer-corner lift + squint: 3 × 12', 'Inner-to-outer eye massage, 90s'] },
      { n: 2, focus: 'Train the lift', why: 'A more lifted outer eye corner comes from those muscles holding a slightly raised position under effort — training that lift directly, alongside the brow, is what actually shifts the shape of your eyes rather than just looking less tired.', tasks: ['Outer-corner lift resistance: 4 × 12 per side', 'Squint holds: 3 × 10s', 'Brow-set downward press: 3 × 15', 'Cold compress + massage, 2 min'] },
      { n: 3, focus: 'Deepen the hood', why: 'Combining the outer-corner and brow work, with longer holds, pushes past the initial adaptation from week two — this is where the look starts to hold on its own between sessions.', tasks: ['Outer-corner + brow combo: 4 rounds', 'Sustained squint holds: 4 × 12s', 'Temple + eye-area massage, 2 min', 'Screen-distance + sleep habit check'] },
      { n: 4, focus: 'Set the look', why: 'The final week is about proving the lift holds under a neutral, resting gaze — not just mid-exercise — plus locking in the sleep and screen habits that keep under-eye puffiness from undoing the work.', tasks: ['Full eye-area circuit: 5 rounds', 'De-puff + massage, morning and evening', 'Progress photo, neutral gaze', 'Recovery: compress + massage'] }
    ],
    fr: {
      name: 'Programme Hunter Eyes', tagline: 'Regard relevé · entraînement naturel, sans outil', anatomy: 'Contour des yeux',
      overview: 'Un entraînement simple autour des yeux pour relever le coin externe, réduire ce qui se voit de la paupière supérieure, et créer un regard hunter eyes plus creusé et avancé — juste vos propres muscles, sans aucun outil.',
      benefits: ['Un coin externe de l’œil plus relevé', 'Une paupière supérieure moins visible', 'Un regard plus creusé et avancé'],
      weeks: [
        { n: 1, focus: 'Réveiller les muscles des yeux', why: 'Les muscles autour de l’œil sont à peine sollicités au quotidien, donc la première semaine consiste à les réveiller avec des maintiens légers et à calmer les poches qui masquent la définition, avant de leur demander un vrai travail.', tasks: ['Maintiens du regard latéral : 3 × 8s par côté', 'Compresse froide anti-poches sous les yeux, 60s', 'Lift du coin externe + plissement : 3 × 12', 'Massage de l’intérieur vers l’extérieur de l’œil, 90s'] },
        { n: 2, focus: 'Entraîner le lift', why: 'Un coin externe plus relevé vient de ces muscles qui maintiennent une position légèrement relevée sous effort — entraîner directement ce lift, avec le sourcil, est ce qui modifie réellement la forme du regard, plutôt que de simplement paraître moins fatigué.', tasks: ['Résistance au lift du coin externe : 4 × 12 par côté', 'Maintiens de plissement : 3 × 10s', 'Pression descendante au niveau du sourcil : 3 × 15', 'Compresse froide + massage, 2 min'] },
        { n: 3, focus: 'Approfondir le regard', why: 'Combiner le travail du coin externe et du sourcil, avec des maintiens plus longs, dépasse l’adaptation initiale de la semaine deux — c’est ici que le regard commence à tenir de lui-même entre les séances.', tasks: ['Combo coin externe + sourcil : 4 tours', 'Maintiens de plissement soutenus : 4 × 12s', 'Massage tempes + contour des yeux, 2 min', 'Vérification distance à l’écran + habitude de sommeil'] },
        { n: 4, focus: 'Fixer le résultat', why: 'La dernière semaine consiste à prouver que le lift tient avec un regard neutre au repos — pas seulement pendant l’exercice — et à ancrer les habitudes de sommeil et d’écran qui empêchent les poches sous les yeux d’annuler le travail accompli.', tasks: ['Circuit complet du contour des yeux : 5 tours', 'Anti-poches + massage, matin et soir', 'Photo de progression, regard neutre', 'Récupération : compresse + massage'] }
      ]
    }
  },
  {
    id: 'face-fat-loss', section: 'STRUCTURE',
    mins: 12, level: 'INTERMEDIATE', plate: 'face',
    name: 'Facial Fat Reduction', tagline: 'Eating a bit lighter · massage · jaw definition', anatomy: 'Face',
    overview: 'A month combining eating a little lighter, daily face massage and targeted jaw and cheek training. You can’t lose fat from just one spot, so this program works from every natural angle that actually helps: less fat overall, less puffiness, and more visible definition underneath.',
    benefits: ['A visibly slimmer, more defined face', 'Less morning puffiness and water retention', 'A sharper jawline and cheekbone definition'],
    weeks: [
      { n: 1, focus: 'Eat a little lighter', why: 'Facial fat follows overall body fat, not local exercise — there’s no way to target just the face. Eating modestly less than you burn is the real lever, and cutting sugary drinks first does that with the least impact on how full you feel or how hard training feels.', tasks: ['Eat a little lighter, cut sugary drinks + alcohol', 'Water target: 2.5L', 'Sleep 7.5h+', 'Steps for the day: 8k'] },
      { n: 2, focus: 'Clear the puffiness', why: 'Water retention is often mistaken for fat and can hide real progress — cutting salt, a daily face massage and sleeping with the head slightly raised clear that false puffiness fast, so the jawline reads sharper within days.', tasks: ['Cut excess salt', 'Face massage, 3 min', 'Cold-water face rinse, morning', 'Sleep with your head slightly raised'] },
      { n: 3, focus: 'Define what’s underneath', why: 'As the fat layer thins, the muscle underneath — jaw and cheeks — becomes what actually shapes the visible jawline and cheekbones. Training it now means the structure is ready to show the moment the fat recedes.', tasks: ['Cheekbone lift + cheek holds: 3 sets', 'Chewing gum resistance, 5 min per side', 'Chin tucks: 3 sets of 12', 'Face massage, 3 min'] },
      { n: 4, focus: 'Reveal & lock it in', why: 'Real change here comes from four weeks of food and face training compounding together, not any single session — this week proves the habits hold on their own and captures the real, comparable result.', tasks: ['Full circuit', 'Review sleep, training, eating', 'Progress photo, front + profile', 'Hydrate 2.5L + sleep 7.5h streak'] }
    ],
    fr: {
      name: 'Réduction de la graisse du visage', tagline: 'Manger un peu plus léger · massage · mâchoire définie', anatomy: 'Visage',
      overview: 'Un mois combinant une alimentation un peu plus légère, un massage quotidien du visage et un entraînement ciblé de la mâchoire et des joues. On ne peut pas perdre de graisse à un seul endroit, donc ce programme agit sur tous les leviers naturels qui aident vraiment : moins de graisse globale, moins de gonflement, et plus de définition musculaire visible en dessous.',
      benefits: ['Un visage visiblement plus fin et plus défini', 'Moins de gonflement et de rétention d’eau le matin', 'Une mâchoire et des pommettes plus définies'],
      weeks: [
        { n: 1, focus: 'Manger un peu plus léger', why: 'La graisse du visage suit la graisse corporelle globale, pas un exercice local — impossible de cibler juste le visage. Manger modérément moins que ce qu’on dépense est le vrai levier, et supprimer d’abord les boissons sucrées le fait avec le moins d’impact sur la sensation de satiété ou la difficulté à l’entraînement.', tasks: ['Manger un peu plus léger, supprimer boissons sucrées et alcool', 'Objectif eau : 2,5 L', 'Dormir 7h30 ou plus', 'Pas dans la journée : 8 000'] },
        { n: 2, focus: 'Éliminer le gonflement', why: 'La rétention d’eau est souvent confondue avec de la graisse et peut masquer de vrais progrès — réduire le sel, un massage quotidien du visage et dormir la tête légèrement surélevée éliminent rapidement ce faux gonflement, pour une mâchoire plus nette en quelques jours.', tasks: ['Réduire l’excès de sel', 'Massage du visage, 3 min', 'Rinçage du visage à l’eau froide, le matin', 'Dormir avec la tête surélevée'] },
        { n: 3, focus: 'Définir ce qu’il y a en dessous', why: 'À mesure que la couche de graisse s’amincit, le muscle en dessous — mâchoire, joues — devient ce qui façonne réellement la mâchoire et les pommettes visibles. L’entraîner maintenant permet à la structure d’être prête à se révéler dès que la graisse recule.', tasks: ['Lift des pommettes et joues creuses : 3 séries', 'Gomme à mâcher résistante, 5 min par côté', 'Rentrées de menton : 3 séries de 12', 'Massage du visage, 3 min'] },
        { n: 4, focus: 'Révéler et ancrer', why: 'Le vrai changement vient ici de quatre semaines d’alimentation et d’entraînement facial qui se cumulent, pas d’une seule séance — cette semaine prouve que les habitudes tiennent seules et capture le résultat réel et comparable.', tasks: ['Circuit complet', 'Bilan sommeil, entraînement, alimentation', 'Photo de progression, face + profil', 'Série hydratation 2,5 L + sommeil 7h30'] }
      ]
    }
  },
  {
    id: 'bodymaxing', section: 'BODY',
    mins: 35, level: 'INTERMEDIATE', plate: 'body', img: '/images/programs/bodymaxing-labeled.png',
    name: 'Bodymaxing', tagline: 'Wider shoulders · leaner waist · natural training', anatomy: 'Body',
    overview: 'A four-week push toward a wider, leaner frame: real shoulder and back work for that broad-shouldered V-shape, a tighter waist, and daily habits that reveal the definition underneath.',
    benefits: ['A wider, more V-shaped upper body', 'Broader shoulders and back', 'A leaner, more defined waist'],
    weeks: [
      { n: 1, focus: 'Build the base', why: 'A broader V-shape starts with real training volume — shoulders and back need genuine effort before anything else matters, and the daily steps and eating enough protein make sure your body actually has what it needs to build that muscle.', tasks: ['Push session: chest, shoulders, triceps', 'Lateral raises: 4 sets of 15', '8k steps for the day', 'Eat enough protein through the day'] },
      { n: 2, focus: 'Widen the frame', why: "Back-day work targets the back and rear shoulders specifically because that's what widens the frame from behind, not just the front — combined with eating a touch lighter, this is where the shape actually starts to show.", tasks: ['Pull session: back, rear delts, biceps', 'Lateral raises: 5 sets of 15', '10k steps for the day', 'Protein target + eat a little lighter'] },
      { n: 3, focus: 'Add intensity', why: 'Combining exercises back-to-back and pressing heavier overhead pushes past what your body already adapted to in the first two weeks — progress stalls once a workout becomes routine, so the effort has to climb for the shoulders to keep responding.', tasks: ['Push + pull combo circuit', 'Overhead press: 4 heavy sets', 'Core hold: 3 × 20s', '10k steps + protein target'] },
      { n: 4, focus: 'Reveal definition', why: "This week is where the work finally shows on the surface — the full-body circuit maintains what's been built while the steady eating and step habits are what actually reveal it.", tasks: ['Full-body strength circuit', 'Shoulder finisher: 6 sets', 'Progress photo, front + back', 'Eat a little lighter + protein + 10k steps'] }
    ],
    fr: {
      name: 'Bodymaxing', tagline: 'Épaules plus larges · taille fine · entraînement naturel', anatomy: 'Corps',
      overview: 'Quatre semaines pour une carrure plus large et plus sèche : un vrai travail des épaules et du dos pour cette silhouette en V aux épaules larges, une taille plus fine et des habitudes quotidiennes qui révèlent la définition en dessous.',
      benefits: ['Un haut du corps plus large en V', 'Des épaules et un dos plus larges', 'Une taille plus fine et définie'],
      weeks: [
        { n: 1, focus: 'Construire la base', why: 'Une silhouette en V plus large commence par un vrai volume d’entraînement — les épaules et le dos ont besoin d’un effort réel avant que le reste ne compte, et les pas quotidiens et assez de protéines garantissent que le corps a ce qu’il faut pour construire ce muscle.', tasks: ['Séance poussée : pectoraux, épaules, triceps', 'Élévations latérales : 4 séries de 15', '8 000 pas dans la journée', 'Manger assez de protéines dans la journée'] },
        { n: 2, focus: 'Élargir la carrure', why: 'Le travail du jour de dos cible spécifiquement le dos et l’arrière des épaules, car c’est ce qui élargit la carrure de dos, pas seulement de face — combiné à une alimentation un peu plus légère, c’est ici que la silhouette commence réellement à se dessiner.', tasks: ['Séance tirage : dos, arrière des épaules, biceps', 'Élévations latérales : 5 séries de 15', '10 000 pas dans la journée', 'Objectif protéines + manger un peu plus léger'] },
        { n: 3, focus: 'Ajouter de l’intensité', why: 'Enchaîner les exercices sans pause et pousser plus lourd au-dessus de la tête dépasse ce à quoi le corps s’est déjà adapté les deux premières semaines — la progression stagne une fois qu’une séance devient routinière, donc l’effort doit augmenter pour que les épaules continuent de répondre.', tasks: ['Circuit poussée + tirage enchaîné', 'Développé militaire : 4 séries lourdes', 'Gainage abdominal : 3 × 20s', '10 000 pas + objectif protéines'] },
        { n: 4, focus: 'Révéler la définition', why: 'Cette semaine est celle où le travail se voit enfin en surface — le circuit full-body maintient ce qui a été construit, tandis que la régularité dans l’alimentation et les pas est ce qui le révèle réellement.', tasks: ['Circuit de force full-body', 'Finisher épaules : 6 séries', 'Photo de progression, face + dos', 'Manger un peu plus léger + protéines + 10 000 pas'] }
      ]
    }
  },
  {
    id: 'posture', section: 'BODY',
    mins: 15, level: 'CORE', plate: 'posture', img: '/images/programs/posture-reset.png',
    name: 'Posture Reset', tagline: 'Straighter back · natural stretches', anatomy: 'Spine',
    overview: 'Undo a forward head and rounded shoulders with daily stretching, upper-back movement and strengthening — the fastest natural change to how your whole frame reads.',
    benefits: ['A straighter, taller standing posture', 'Less forward-head strain on the neck', 'A stronger, more open chest and shoulders'],
    weeks: [
      { n: 1, focus: 'Open & release', why: 'A forward head comes from chronically tight chest and neck muscles pulling the frame forward — before any strengthening can hold a better position, those muscles need to actually loosen up.', tasks: ['Chin tucks: 3 sets of 12', 'Chest doorway stretch: 3 × 30s', 'Upper-back stretch over a chair: 10 reps', 'Hourly posture reset alarm'] },
      { n: 2, focus: 'Strengthen the back', why: "Once the front is loosened up, the upper-back muscles that have been overstretched and weak need direct strengthening — they're what actually holds the shoulders back once you stop consciously thinking about it.", tasks: ['Wall angels: 3 sets of 12', 'Band pull-aparts: 3 sets of 20', 'Chin tucks: 4 sets of 12', 'Desk setup check'] },
      { n: 3, focus: 'Bring it together', why: 'Face pulls and gentle neck-strengthening work train the smaller stabilizing muscles that keep the position under real load — holding good standing posture through the day is what turns this from an exercise into how you actually stand.', tasks: ['Face pulls: 4 sets of 15', 'Wall angels + Y-T-W raises', 'Gentle neck-strengthening holds: 3 × 20s', 'Standing posture holds through the day'] },
      { n: 4, focus: 'Make it default', why: 'The last week has no new movement — it proves the alignment holds without cueing, under a bit of load (carrying something heavy) and across a full day, which is the real definition of a fixed posture.', tasks: ['Full posture circuit', 'Loaded carries: 3 sets', 'Progress photo, side profile', 'All-day alignment habit check'] }
    ],
    fr: {
      name: 'Reset Posture', tagline: 'Dos plus droit · étirements naturels', anatomy: 'Colonne vertébrale',
      overview: 'Corrigez la tête projetée vers l’avant et les épaules arrondies avec des étirements quotidiens, du mouvement du haut du dos et du renforcement — le changement naturel le plus rapide sur la lecture de toute votre carrure.',
      benefits: ['Une posture debout plus droite et plus grande', 'Moins de tension cervicale liée à la tête en avant', 'Une poitrine et des épaules plus fortes et ouvertes'],
      weeks: [
        { n: 1, focus: 'Ouvrir et relâcher', why: 'La tête projetée vers l’avant vient de muscles pectoraux et cervicaux chroniquement raccourcis qui tirent la carrure vers l’avant — avant qu’un renforcement ne puisse maintenir une meilleure position, ces muscles doivent d’abord se détendre.', tasks: ['Rentrées de menton : 3 séries de 12', 'Étirement pectoraux dans l’embrasure de porte : 3 × 30s', 'Étirement du haut du dos sur chaise : 10 répétitions', 'Alarme horaire de réajustement postural'] },
        { n: 2, focus: 'Renforcer le dos', why: 'Une fois l’avant du corps détendu, les muscles du haut du dos, trop étirés et affaiblis, ont besoin d’un renforcement direct — ce sont eux qui maintiennent réellement les épaules en arrière une fois que vous arrêtez d’y penser consciemment.', tasks: ['Anges au mur : 3 séries de 12', 'Écartés à la bande élastique : 3 séries de 20', 'Rentrées de menton : 4 séries de 12', 'Vérification de l’installation du bureau'] },
        { n: 3, focus: 'Assembler le tout', why: 'Les tirages au visage et un léger renforcement du cou entraînent les petits muscles stabilisateurs qui maintiennent la position sous charge réelle — tenir une bonne posture debout tout au long de la journée transforme cela d’un exercice en votre façon réelle de vous tenir.', tasks: ['Tirages au visage : 4 séries de 15', 'Anges au mur + élévations Y-T-W', 'Léger renforcement du cou : 3 × 20s', 'Maintiens de posture debout tout au long de la journée'] },
        { n: 4, focus: 'En faire un réflexe', why: 'La dernière semaine n’introduit aucun nouveau mouvement — elle prouve que l’alignement tient sans y penser, avec un peu de charge (porter quelque chose de lourd) et sur une journée complète, ce qui est la définition réelle d’une posture corrigée durablement.', tasks: ['Circuit posture complet', 'Portés chargés : 3 séries', 'Photo de progression, profil latéral', 'Vérification de l’habitude d’alignement toute la journée'] }
      ]
    }
  },
  {
    id: 'skinmaxing', section: 'SKIN & GROOMING',
    mins: 10, level: 'CORE', plate: 'skin', img: '/images/programs/skinmaxing.png',
    name: 'Skinmaxing', tagline: 'Barrier · glow · homemade care', anatomy: 'Skin',
    overview: 'Build a resilient, glowing barrier the natural way — simple homemade rituals plus the sleep, sun and hydration inputs skin actually responds to. No actives, no chemicals, just consistency.',
    benefits: ['A visibly clearer, more even glow', 'A stronger, more resilient skin barrier', 'A calmer, more natural routine'],
    weeks: [
      { n: 1, focus: 'Lay the foundation', why: 'A resilient barrier and a real glow depend on consistency, not a single product — week one keeps things simple and natural (a cool rinse, a nourishing mask, real hydration) so the ritual actually sticks before anything else gets added.', tasks: ['Cool water rinse + pure aloe vera gel, on waking', 'Raw honey mask, 10 min before bed', 'Water target: 2.5L across the day', 'Pillowcase change (2×/week)'] },
      { n: 2, focus: 'Nourish the barrier', why: 'A natural oil in the evening and a light rose-water mist in the morning feed the skin barrier gently — going gradually and staying gentle is what actually strengthens it, instead of stripping it the way harsh products can.', tasks: ['Jojoba oil, a few drops as an evening treatment', 'Rose water mist, morning', 'Sleep 7.5h+', 'No touching / picking (habit check)'] },
      { n: 3, focus: 'Support collagen', why: 'Once the skin barrier holds up, real food — vitamin C, protein, antioxidants — is what actually supports collagen from the inside; a gentle facial massage in the evening adds circulation on top of that.', tasks: ['Oat + yogurt mask, once a week', 'Protein + vitamin-C rich meals', 'Facial massage with a natural oil, 3 min', 'Reapply natural sun protection'] },
      { n: 4, focus: 'Lock in the glow', why: "The final week tests whether the ritual holds without daily thought — a gentle homemade scrub clears the light buildup from three weeks of masks and oils, and the streak check is what proves it's now a habit, not an experiment.", tasks: ['Full morning + evening ritual', 'Gentle honey-sugar scrub, once a week', 'Progress photo, bare skin', 'Sleep + hydration + sun-care streak'] }
    ],
    fr: {
      name: 'Skinmaxing', tagline: 'Barrière cutanée · éclat · soin maison', anatomy: 'Peau',
      overview: 'Construisez une barrière cutanée résiliente et un véritable éclat, à la manière naturelle — des rituels faits maison simples, associés au sommeil, au soleil et à l’hydratation auxquels la peau répond vraiment. Pas d’actifs, pas de produits chimiques, juste de la régularité.',
      benefits: ['Un éclat visiblement plus clair et uniforme', 'Une barrière cutanée plus forte et résiliente', 'Une routine plus calme et plus naturelle'],
      weeks: [
        { n: 1, focus: 'Poser les bases', why: 'Une barrière résiliente et un vrai éclat dépendent de la régularité, pas d’un seul produit — la première semaine reste simple et naturelle (un rinçage frais, un masque nourrissant, une vraie hydratation) pour que le rituel s’installe vraiment avant d’ajouter quoi que ce soit d’autre.', tasks: ['Rinçage à l’eau fraîche + gel d’aloe vera pur, au réveil', 'Masque au miel cru, 10 min avant le coucher', 'Objectif eau : 2,5 L dans la journée', 'Changement de taie d’oreiller (2×/semaine)'] },
        { n: 2, focus: 'Nourrir la barrière', why: 'Une huile naturelle le soir et une brume d’eau de rose légère le matin nourrissent doucement la barrière cutanée — y aller progressivement et rester doux est ce qui la renforce vraiment, au lieu de l’agresser comme peuvent le faire des produits trop forts.', tasks: ['Huile de jojoba, quelques gouttes en soin du soir', 'Brume d’eau de rose, le matin', 'Dormir 7h30 ou plus', 'Ne pas toucher / triturer la peau (vérification de l’habitude)'] },
        { n: 3, focus: 'Soutenir le collagène', why: 'Une fois la barrière cutanée stabilisée, c’est la vraie alimentation — vitamine C, protéines, antioxydants — qui soutient réellement le collagène de l’intérieur ; un massage du visage en soirée ajoute la circulation par-dessus.', tasks: ['Masque à l’avoine et au yaourt, une fois par semaine', 'Repas riches en protéines et vitamine C', 'Massage du visage à l’huile naturelle, 3 min', 'Réappliquer la protection solaire naturelle'] },
        { n: 4, focus: 'Ancrer l’éclat', why: 'La dernière semaine teste si le rituel tient sans y penser chaque jour — un gommage doux fait maison élimine la légère accumulation de trois semaines de masques et d’huiles, et la vérification de la série prouve que c’est désormais une habitude, pas juste un essai.', tasks: ['Rituel matin + soir complet', 'Gommage doux au miel et au sucre, une fois par semaine', 'Photo de progression, peau nue', 'Série sommeil + hydratation + soin solaire'] }
      ]
    }
  },
  {
    id: 'skin-clarity', section: 'SKIN & GROOMING',
    mins: 8, level: 'INTERMEDIATE', plate: 'skin', img: '/images/programs/skin-clarity.png',
    name: 'Skin Clarity Reset', tagline: 'Calm skin · natural care · even tone', anatomy: 'Skin',
    overview: 'A focused, natural reset for congestion and uneven tone — calm active breakouts with gentle home remedies, clear texture, and rebuild an even, clear complexion over 28 days. No harsh actives, just what actually calms skin.',
    benefits: ['Fewer active breakouts', 'A calmer, less congested complexion', 'A more even, natural-looking tone'],
    weeks: [
      { n: 1, focus: 'Calm & simplify', why: "Active breakouts respond worse to more products, not fewer — stripping the routine down to a gentle rinse and cutting common trigger foods for a week isolates what's actually driving the congestion before treating it more actively.", tasks: ['Gentle water rinse, morning and evening', 'Green tea compress on active spots, evening', 'Natural sun protection every morning', 'Cut dairy + high-sugar test'] },
      { n: 2, focus: 'Clear congestion', why: "Steam opens the pores so a natural clay can actually draw out what's clogging them — doing it a couple of evenings a week avoids over-treating skin that's already inflamed, while the phone/pillowcase hygiene removes a constant re-contamination source.", tasks: ['Chamomile steam, 5 min, twice a week — evening', 'Light, natural moisturizer', 'Clean phone screen + pillowcase', 'Hydrate 2.5L + sleep 7.5h'] },
      { n: 3, focus: 'Even the tone', why: "Once active breakouts calm down, a weekly green clay mask starts addressing the marks they leave behind — that's a separate, slower process from clearing the breakout itself, which is why it only becomes the focus in week three.", tasks: ['Green clay mask, once a week — evening', 'Continue compresses + spot care', 'Reapply sun protection midday', 'No picking (streak check)'] },
      { n: 4, focus: 'Stabilize', why: 'The weekly clay mask and a locked-in natural routine exist to keep congestion from building back up now that skin is clear — clarity is a state you maintain, not a one-time fix, which is what this last week is testing.', tasks: ['Maintenance ritual locked', 'Weekly clay mask', 'Progress photo, bare skin', 'Diet + sleep + hydration review'] }
    ],
    fr: {
      name: 'Reset Clarté de Peau', tagline: 'Peau apaisée · soin naturel · teint uni', anatomy: 'Peau',
      overview: 'Un reset ciblé et naturel pour la congestion et le teint irrégulier — calmez les imperfections actives avec des remèdes maison doux, clarifiez la texture et reconstruisez un teint uniforme et net en 28 jours. Pas d’actifs agressifs, juste ce qui calme vraiment la peau.',
      benefits: ['Moins d’imperfections actives', 'Un teint plus calme et moins congestionné', 'Un teint plus uniforme et naturel'],
      weeks: [
        { n: 1, focus: 'Calmer et simplifier', why: 'Les imperfections actives réagissent moins bien à plus de produits, pas à moins — réduire la routine à un rinçage doux et supprimer les aliments déclencheurs courants pendant une semaine permet d’isoler ce qui cause réellement la congestion avant de la traiter plus activement.', tasks: ['Rinçage à l’eau douce, matin et soir', 'Compresse au thé vert sur les boutons, le soir', 'Protection solaire naturelle chaque matin', 'Test sans produits laitiers + sucre élevé'] },
        { n: 2, focus: 'Désengorger la peau', why: 'La vapeur ouvre les pores pour qu’une argile naturelle puisse vraiment en extraire ce qui les bouche — le faire deux soirs par semaine évite de sur-traiter une peau déjà inflammée, tandis que l’hygiène du téléphone et de la taie d’oreiller supprime une source constante de recontamination.', tasks: ['Vapeur de camomille, 5 min, deux fois par semaine — le soir', 'Hydratant léger et naturel', 'Nettoyer écran de téléphone + taie d’oreiller', 'S’hydrater 2,5 L + dormir 7h30'] },
        { n: 3, focus: 'Uniformiser le teint', why: 'Une fois les imperfections actives calmées, un masque hebdomadaire à l’argile verte commence à estomper les marques qu’elles laissent — c’est un processus distinct et plus lent que celui d’éliminer l’imperfection elle-même, d’où le fait qu’il ne devienne la priorité qu’à la semaine trois.', tasks: ['Masque à l’argile verte, une fois par semaine — le soir', 'Poursuivre les compresses + soin localisé', 'Réappliquer la protection solaire à midi', 'Ne pas triturer la peau (vérification de la série)'] },
        { n: 4, focus: 'Stabiliser', why: 'Le masque hebdomadaire à l’argile et une routine naturelle fixée existent pour empêcher la congestion de revenir maintenant que la peau est claire — la clarté est un état que l’on entretient, pas une correction ponctuelle, ce que cette dernière semaine vérifie.', tasks: ['Rituel d’entretien fixé', 'Masque à l’argile hebdomadaire', 'Photo de progression, peau nue', 'Bilan alimentation + sommeil + hydratation'] }
      ]
    }
  },
  {
    id: 'grooming', section: 'SKIN & GROOMING',
    mins: 10, level: 'CORE', plate: 'face', img: '/images/programs/grooming.png',
    name: 'Power Grooming System', tagline: 'Brows · hair · beard · presentation', anatomy: 'Presentation',
    overview: 'Dial in the controllables that instantly raise presentation: brows, hairline, facial hair, teeth and grooming detail — refined and maintained weekly.',
    benefits: ['Sharper, well-shaped brows and hairline', 'A cleaner, more defined facial hair line', 'An overall more polished presentation'],
    weeks: [
      { n: 1, focus: 'Audit & shape', why: "Presentation improves fastest from the controllables you can fix in a single session — a proper brow shape and haircut change how the whole face reads immediately, which is why they come first.", tasks: ['Brow clean-up (map, then trim)', 'Book / plan a sharp haircut', 'Define beard or clean shave line', 'Start whitening routine'] },
      { n: 2, focus: 'Refine hair', why: 'Once the shape is set, daily execution — styling, maintaining the line, basic hand/nail upkeep — is what keeps that first-week improvement from fading back to baseline within days.', tasks: ['Style hair with correct products', 'Maintain beard/shave line', 'Nail + hand grooming', 'Whitening + flossing streak'] },
      { n: 3, focus: 'Detail work', why: "This week moves to the details that separate 'put together' from 'polished' — fragrance, skin base, precise edge-ups — plus a wardrobe check, since grooming and clothing fit read as one system, not separately.", tasks: ['Brow maintenance', 'Fragrance + skin base routine', 'Trim + edge-up touch-ups', 'Wardrobe fit check (top 3 outfits)'] },
      { n: 4, focus: 'System on autopilot', why: 'The goal is a repeatable weekly schedule, not a one-time effort — restocking low products and fixing a maintenance cadence now is what keeps the whole system running after the 28 days end.', tasks: ['Full grooming pass', 'Progress photo, styled', 'Restock products low on stock', 'Set weekly maintenance schedule'] }
    ],
    fr: {
      name: 'Système Power Grooming', tagline: 'Sourcils · cheveux · barbe · présentation', anatomy: 'Présentation',
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
    name: 'Natural Energy & Balance', tagline: 'Real food · sunlight · natural balance', anatomy: 'Whole Body',
    overview: 'Eat and move in a way that supports your body\'s own natural balance — real food, steady blood sugar, and the everyday habits (sunlight, sleep, movement) that actually move the needle. No supplements, just the basics done consistently.',
    benefits: ['More stable energy throughout the day', 'Support for your body\'s natural balance', 'A leaner, more defined body over time'],
    weeks: [
      { n: 1, focus: 'Fix the foundation', why: 'Your body needs real building blocks and steady blood sugar before anything else works — cutting sugary drinks and fried food, plus morning sunlight and real sleep, removes the biggest disruptors first.', tasks: ['Eat protein with every meal', 'Cut sugary drinks + fried food', 'Sunlight 15 min before noon', 'Sleep 8h window'] },
      { n: 2, focus: 'Keep blood sugar steady', why: 'Big swings in blood sugar throw everything else off balance, so whole, unprocessed foods, meals rich in natural minerals, and a longer overnight gap without eating all aim at the same thing — keeping your energy steady instead of spiking and crashing.', tasks: ['Whole, unprocessed food only', 'Meals rich in nuts, seeds & greens', 'Strength train 3×/week', '12-hour overnight gap without eating'] },
      { n: 3, focus: 'Support the basics', why: 'Healthy fats are literal building blocks your body uses to stay in balance — this week adds those fats and more strength training on top of the fixes made in weeks one and two.', tasks: ['Healthy fats: eggs, olive oil, fish', 'Strength training, a little heavier', 'Evening wind-down to lower stress', 'Water + natural minerals through the day'] },
      { n: 4, focus: 'Dial it in', why: 'Real change shows up in energy, waist measurement and sleep quality before it shows up anywhere else — tracking those this week is how you actually know the previous three weeks worked.', tasks: ['A full, nutrient-rich day of eating', 'Track measurements + energy', 'Progress photo + waist measure', 'Review sleep, training, eating streaks'] }
    ],
    fr: {
      name: 'Énergie & Équilibre Naturels', tagline: 'Vraie nourriture · soleil · équilibre naturel', anatomy: 'Corps entier',
      overview: 'Mangez et bougez d’une façon qui soutient l’équilibre naturel de votre corps : vraie nourriture, glycémie stable, et les habitudes du quotidien (soleil, sommeil, mouvement) qui font vraiment la différence. Pas de complément, juste les bases, appliquées avec régularité.',
      benefits: ['Une énergie plus stable tout au long de la journée', 'Un soutien à l’équilibre naturel du corps', 'Un corps plus sec et défini avec le temps'],
      weeks: [
        { n: 1, focus: 'Réparer les fondations', why: 'Le corps a besoin de vrais matériaux de base et d’une glycémie stable avant tout le reste — supprimer les boissons sucrées et les fritures, ainsi que s’assurer d’un soleil matinal et d’un vrai sommeil, élimine d’abord les plus grands perturbateurs.', tasks: ['Manger des protéines à chaque repas', 'Supprimer boissons sucrées + fritures', 'Soleil 15 min avant midi', 'Fenêtre de sommeil de 8h'] },
        { n: 2, focus: 'Garder une glycémie stable', why: 'De grandes variations de glycémie déséquilibrent tout le reste, donc des aliments complets et non transformés, des repas riches en minéraux naturels et une pause plus longue sans manger la nuit visent tous la même chose — garder une énergie stable plutôt que des pics suivis de coups de fatigue.', tasks: ['Aliments complets et non transformés uniquement', 'Repas riches en noix, graines et légumes verts', 'Musculation 3×/semaine', 'Pause de 12h sans manger la nuit'] },
        { n: 3, focus: 'Soutenir les bases', why: 'Les bonnes graisses sont de vrais matériaux de base que le corps utilise pour rester en équilibre — cette semaine ajoute ces graisses et un peu plus de musculation, en plus des corrections apportées aux semaines une et deux.', tasks: ['Bonnes graisses : œufs, huile d’olive, poisson', 'Musculation, un peu plus lourde', 'Décompression du soir pour réduire le stress', 'Eau + minéraux naturels dans la journée'] },
        { n: 4, focus: 'Affiner', why: 'Le vrai changement se manifeste dans l’énergie, le tour de taille et la qualité du sommeil avant de se voir ailleurs — suivre ces indicateurs cette semaine est la façon de vérifier que les trois semaines précédentes ont réellement fonctionné.', tasks: ['Une journée complète et riche en nutriments', 'Suivre mensurations + énergie', 'Photo de progression + mesure de tour de taille', 'Bilan des séries sommeil, entraînement, alimentation'] }
      ]
    }
  },
  {
    id: 'sleep', section: 'SYSTEMS',
    mins: 5, level: 'CORE', plate: 'sleep',
    name: 'Natural Sleep Reset', tagline: 'Deep sleep · recovery · a natural rhythm', anatomy: 'Sleep',
    overview: 'Sleep is where the face de-puffs and the body recovers. Rebuild deep, consistent sleep with light timing, temperature and a locked wind-down ritual.',
    benefits: ['Deeper, more restorative sleep', 'Less morning puffiness', 'More consistent energy and recovery'],
    weeks: [
      { n: 1, focus: 'Anchor the rhythm', why: 'Your body\'s natural clock is set mainly by wake time and morning light, not bedtime — fixing when you wake up and getting sunlight early is what actually resets the rhythm before anything else can work.', tasks: ['Fixed wake time, 7 days', 'Morning sunlight within 30 min', 'No caffeine after 2pm', 'Screens off 60 min before bed'] },
      { n: 2, focus: 'Build the ritual', why: 'A cool, dark room and a consistent wind-down tell the body that sleep is coming — this only works as a signal if it’s repeated at the same time every night, which is why consistency matters more than any single input.', tasks: ['Cool, dark room (18°C)', 'Wind-down routine, 30 min', 'No large meals 3h before bed', 'Consistent bedtime ±15 min'] },
      { n: 3, focus: 'Deepen recovery', why: 'Alcohol and late blue light both fragment deep sleep even when total hours look normal — removing them plus adding magnesium and a short breathing practice improves sleep quality, not just duration.', tasks: ['Magnesium + no alcohol test', 'Blue-light filter after sunset', 'Breathing / relaxation, 5 min', 'Track sleep + morning puffiness'] },
      { n: 4, focus: 'Lock it in', why: 'Morning puffiness is a direct, visible readout of sleep quality — checking it against consistent 8-hour nights this week is how you confirm the routine is actually working, not just being followed.', tasks: ['Full routine nightly', 'Consistent 8h achieved', 'Review de-puff in AM photos', 'Set permanent sleep schedule'] }
    ],
    fr: {
      name: 'Reset Sommeil Naturel', tagline: 'Sommeil profond · récupération · rythme naturel', anatomy: 'Sommeil',
      overview: 'C’est pendant le sommeil que le visage se dégonfle et que le corps récupère. Reconstruisez un sommeil profond et régulier grâce au minutage de la lumière, à la température et à un rituel de décompression fixe.',
      benefits: ['Un sommeil plus profond et réparateur', 'Moins de poches le matin', 'Une énergie et une récupération plus constantes'],
      weeks: [
        { n: 1, focus: 'Ancrer le rythme', why: 'L’horloge naturelle du corps est réglée surtout par l’heure de réveil et la lumière du matin, pas par l’heure du coucher — fixer l’heure de réveil et s’exposer tôt au soleil est ce qui remet réellement le rythme à zéro avant que le reste ne puisse fonctionner.', tasks: ['Heure de réveil fixe, 7 jours', 'Lumière du soleil le matin dans les 30 min', 'Pas de caféine après 14h', 'Écrans éteints 60 min avant le coucher'] },
        { n: 2, focus: 'Construire le rituel', why: 'Une chambre fraîche et sombre ainsi qu’une décompression régulière indiquent au corps que le sommeil arrive — cela ne fonctionne comme signal que si c’est répété à la même heure chaque soir, d’où l’importance de la régularité plus que celle d’un seul élément.', tasks: ['Chambre fraîche et sombre (18°C)', 'Routine de décompression, 30 min', 'Pas de gros repas 3h avant le coucher', 'Heure de coucher constante ±15 min'] },
        { n: 3, focus: 'Approfondir la récupération', why: 'L’alcool et la lumière bleue tardive fragmentent tous deux le sommeil profond même quand le nombre d’heures total paraît normal — les supprimer et ajouter du magnésium et une courte pratique de respiration améliore la qualité du sommeil, pas seulement sa durée.', tasks: ['Test magnésium + sans alcool', 'Filtre lumière bleue après le coucher du soleil', 'Respiration / relaxation, 5 min', 'Suivre sommeil + poches du matin'] },
        { n: 4, focus: 'Verrouiller la routine', why: 'Les poches du matin sont un indicateur direct et visible de la qualité du sommeil — les vérifier face à des nuits de 8h constantes cette semaine permet de confirmer que la routine fonctionne réellement, pas seulement qu’elle est suivie.', tasks: ['Routine complète chaque soir', '8h constantes atteintes', 'Bilan des poches sur les photos du matin', 'Fixer un horaire de sommeil permanent'] }
      ]
    }
  },
  {
    id: 'hydration', section: 'SYSTEMS',
    mins: 3, level: 'CORE', plate: 'body',
    name: 'Natural Hydration Reset', tagline: 'Skin plumpness · de-puff · energy', anatomy: 'Hydration',
    overview: 'Drinking enough water and eating natural mineral-rich foods visibly plumps skin, reduces puffiness and sharpens features — the lowest-effort, fastest-visible input.',
    benefits: ['Visibly plumper, less puffy skin', 'Sharper-looking facial features', 'More consistent daily energy'],
    weeks: [
      { n: 1, focus: 'Hit the baseline', why: "Most people are chronically under-hydrated without noticing, which shows up first as puffiness and dull skin — hitting a real 2.5L baseline plus a pinch of natural salt is what actually plumps tissue, not just drinking 'more water' vaguely.", tasks: ['Water: 500ml on waking', 'Reach 2.5L across the day', 'A pinch of natural salt in your water once a day', 'Cut excess salt + alcohol'] },
      { n: 2, focus: 'Add natural minerals', why: 'Water alone, without a little natural salt and potassium-rich food, just passes through — this week adds that side of hydration, which is what actually lets your cells hold onto the water instead of flushing it straight out.', tasks: ['3L water target', 'Potassium-rich foods (bananas, greens) in meals', 'Herbal tea instead of late caffeine', 'Track AM facial puffiness'] },
      { n: 3, focus: 'Get the timing right', why: 'Front-loading water earlier in the day, instead of all at night, reduces overnight puffiness directly — timing matters here almost as much as total volume, which is the whole point of this week.', tasks: ['Front-load water before evening', 'Natural minerals in the morning + after training', 'Water-rich foods each meal', 'Cold-water face rinse AM'] },
      { n: 4, focus: 'Make it effortless', why: 'The last week checks that 3L and the de-puff routine hold without conscious effort — hydration only compounds in its visible effects (skin, energy) if it’s sustained past this month, not just during it.', tasks: ['Consistent 3L habit', 'De-puff routine locked', 'Progress photo, AM face', 'Review energy + skin clarity'] }
    ],
    fr: {
      name: 'Reset Hydratation Naturelle', tagline: 'Peau repulpée · anti-poches · énergie', anatomy: 'Hydratation',
      overview: 'Bien boire et manger des aliments naturellement riches en minéraux repulpe visiblement la peau, réduit les poches et affine les traits — le levier le moins coûteux en effort et le plus rapide à voir.',
      benefits: ['Une peau visiblement plus repulpée et moins gonflée', 'Des traits du visage à l’apparence plus nette', 'Une énergie quotidienne plus constante'],
      weeks: [
        { n: 1, focus: 'Atteindre la base', why: 'La plupart des gens sont chroniquement sous-hydratés sans s’en rendre compte, ce qui se voit d’abord par des poches et un teint terne — atteindre une vraie base de 2,5 L plus une pincée de sel naturel est ce qui repulpe réellement les tissus, pas juste boire « un peu plus d’eau » vaguement.', tasks: ['Eau : 500 ml au réveil', 'Atteindre 2,5 L dans la journée', 'Une pincée de sel naturel dans l’eau une fois par jour', 'Réduire l’excès de sel + alcool'] },
        { n: 2, focus: 'Ajouter des minéraux naturels', why: 'L’eau seule, sans un peu de sel naturel et d’aliments riches en potassium, ne fait que traverser le corps — cette semaine ajoute ce volet de l’hydratation, ce qui permet réellement aux cellules de retenir l’eau au lieu de l’évacuer directement.', tasks: ['Objectif 3 L d’eau', 'Aliments riches en potassium (bananes, légumes verts) dans les repas', 'Tisane au lieu de caféine tardive', 'Suivre les poches du visage le matin'] },
        { n: 3, focus: 'Trouver le bon rythme', why: 'Répartir l’eau plus tôt dans la journée, plutôt que tout le soir, réduit directement les poches nocturnes — le moment où l’on boit compte ici presque autant que le volume total, ce qui est tout l’enjeu de cette semaine.', tasks: ['Répartir l’eau avant le soir', 'Minéraux naturels le matin + après l’entraînement', 'Aliments riches en eau à chaque repas', 'Rinçage du visage à l’eau froide le matin'] },
        { n: 4, focus: 'Rendre ça sans effort', why: 'La dernière semaine vérifie que les 3 L et la routine anti-poches tiennent sans effort conscient — l’hydratation n’a d’effets visibles cumulés (peau, énergie) que si elle est maintenue au-delà de ce mois-ci, pas seulement pendant.', tasks: ['Habitude de 3 L constante', 'Routine anti-poches fixée', 'Photo de progression, visage du matin', 'Bilan énergie + clarté de peau'] }
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
