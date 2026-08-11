/** A detailed step-by-step guide per distinct task, matched by keyword against the (always-English)
 * task text. No video is linked — every guide is self-contained: a clear title, the exact steps to
 * follow (each with an estimated duration and a diagram category), and the single biggest reason
 * it's worth doing. Entries are kept narrow on purpose — sibling tasks that are genuinely the same
 * movement at a different volume/duration share one entry (e.g. "Cheekbone lift: 3 sets" / "4 sets"),
 * but tasks that are different actions each get their own entry, even when several appear in the
 * same program week. */

/** Action-type category for a step's diagram icon. A small reusable icon set (see DiagramIcon.tsx)
 * covers every step by category rather than illustrating each of the ~350 steps individually. */
export type DiagramKind =
  | 'press'
  | 'circular'
  | 'hold'
  | 'stretch'
  | 'breathe'
  | 'posture'
  | 'chew'
  | 'apply'
  | 'cold'
  | 'groom'
  | 'diet'
  | 'repeat'
  | 'check'
  | 'general';

export interface DemoStep {
  text: string;
  /** Estimated duration for this step, in seconds — drives both the displayed time and the countdown timer. */
  seconds: number;
  diagram: DiagramKind;
}

export interface DemoGuide {
  title: string;
  steps: DemoStep[];
  /** Exactly one item: the single biggest reason this task is worth doing. */
  benefits: string[];
}

export interface DemoEntry {
  keywords: string[];
  guide: { en: DemoGuide; fr: DemoGuide };
}

/** Total estimated duration of a guide, in seconds — the sum of its steps. */
export function guideDurationSeconds(guide: DemoGuide): number {
  return guide.steps.reduce((sum, step) => sum + step.seconds, 0);
}

/** Compact duration label, e.g. "45s" or "3 min" — language-agnostic (min/s read fine in both). */
export function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.round(totalSeconds / 60);
  return `${minutes} min`;
}

/** mm:ss countdown display, e.g. 90 -> "1:30". */
export function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const DEMO_ENTRIES: DemoEntry[] = [
  {
    keywords: ["mewing + hard swallow"],
    guide: {
      en:       {
        title: "Mewing + Hard Swallow",
        steps: [
          { text: "Get into full mewing posture — tongue flat against the palate, lips sealed.", seconds: 15, diagram: "posture" },
          { text: "From that position, swallow forcefully, pressing the whole tongue up hard against the roof of the mouth as you do.", seconds: 15, diagram: "posture" },
          { text: "Reset to relaxed mewing posture between repetitions rather than staying tensed.", seconds: 15, diagram: "posture" },
        ],
        benefits: ["The forceful swallow adds real resistance on top of passive mewing, which is what drives adaptation once the posture itself is automatic."],
      },
      fr:       {
        title: "Mewing + déglutition forcée",
        steps: [
          { text: "Installez-vous en posture de mewing complète — langue à plat contre le palais, lèvres scellées.", seconds: 15, diagram: "posture" },
          { text: "Depuis cette position, déglutissez avec force, en pressant toute la langue vers le haut contre le palais pendant le mouvement.", seconds: 15, diagram: "posture" },
          { text: "Revenez à une posture de mewing détendue entre les répétitions plutôt que de rester en tension.", seconds: 15, diagram: "posture" },
        ],
        benefits: ["La déglutition forcée ajoute une vraie résistance en plus du mewing passif, ce qui relance l’adaptation une fois la posture devenue automatique."],
      },
    },
  },
  {
    keywords: ["nasal breathing check"],
    guide: {
      en:       {
        title: "Nasal Breathing Check",
        steps: [
          { text: "At random points through the day, notice whether your mouth is open or closed.", seconds: 10, diagram: "check" },
          { text: "If it’s open, close your lips and take your next breath through your nose instead.", seconds: 20, diagram: "breathe" },
          { text: "Repeat the check every waking hour until it stops needing conscious thought.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Mouth breathing dries the mouth and undoes the pressure mewing is meant to build."],
      },
      fr:       {
        title: "Vérification de la respiration nasale",
        steps: [
          { text: "À des moments aléatoires de la journée, remarquez si votre bouche est ouverte ou fermée.", seconds: 10, diagram: "check" },
          { text: "Si elle est ouverte, fermez les lèvres et prenez votre prochaine respiration par le nez.", seconds: 20, diagram: "breathe" },
          { text: "Répétez la vérification à chaque heure éveillée jusqu’à ce que cela ne demande plus d’y penser.", seconds: 10, diagram: "check" },
        ],
        benefits: ["La respiration par la bouche assèche la bouche et annule la pression que le mewing est censé construire."],
      },
    },
  },
  {
    keywords: ["mewing"],
    guide: {
      en:       {
        title: "Mewing (Tongue Posture)",
        steps: [
          { text: "Rest your entire tongue — tip to back — flat against the roof of your mouth, not just the tip behind your teeth.", seconds: 15, diagram: "posture" },
          { text: "Seal your lips and breathe only through your nose.", seconds: 20, diagram: "breathe" },
          { text: "Let your back teeth touch lightly, without clenching.", seconds: 15, diagram: "general" },
          { text: "Hold it as your default resting posture all day, not just during dedicated practice — check in on it every waking hour until it’s automatic.", seconds: 20, diagram: "hold" },
        ],
        benefits: ["Applies gentle, constant pressure that supports a well-developed maxilla over time."],
      },
      fr:       {
        title: "Mewing (posture linguale)",
        steps: [
          { text: "Posez toute la langue — de la pointe à l’arrière — bien à plat contre le palais, pas seulement le bout derrière les dents.", seconds: 15, diagram: "posture" },
          { text: "Scellez les lèvres et respirez uniquement par le nez.", seconds: 20, diagram: "breathe" },
          { text: "Laissez les dents du fond se toucher légèrement, sans serrer.", seconds: 15, diagram: "general" },
          { text: "Adoptez-la comme posture de repos par défaut toute la journée, pas seulement pendant les exercices dédiés — vérifiez-la à chaque heure éveillée jusqu’à ce qu’elle devienne automatique.", seconds: 20, diagram: "hold" },
        ],
        benefits: ["Applique une pression douce et constante qui favorise un bon développement du maxillaire dans la durée."],
      },
    },
  },
  {
    keywords: ["cheekbone lift", "cheek + buccal circuit", "cheekbone lift + buccal", "buccal hollow"],
    guide: {
      en:       {
        title: "Cheekbone Lift & Buccal Holds",
        steps: [
          { text: "Smile without showing your teeth, then push your cheeks up and back toward your ears using the muscle, not your hand — hold each rep a full second at the top.", seconds: 20, diagram: "hold" },
          { text: "For buccal holds, suck your cheeks in against your teeth and hold — you should feel it under the cheekbone, not in the jaw.", seconds: 20, diagram: "hold" },
          { text: "When doing them as a combined circuit, alternate the two movements rather than resting fully between them.", seconds: 30, diagram: "repeat" },
        ],
        benefits: ["Trains the muscles that lift and define the midface."],
      },
      fr:       {
        title: "Lift des pommettes et joues creuses",
        steps: [
          { text: "Souriez sans montrer les dents, puis poussez les joues vers le haut et l’arrière, vers les oreilles, en utilisant le muscle, pas la main — maintenez chaque répétition une seconde complète en haut.", seconds: 20, diagram: "hold" },
          { text: "Pour les joues creuses, aspirez les joues contre les dents et maintenez — vous devez le sentir sous la pommette, pas dans la mâchoire.", seconds: 20, diagram: "hold" },
          { text: "En circuit combiné, alternez les deux mouvements plutôt que de vous reposer complètement entre les deux.", seconds: 30, diagram: "repeat" },
        ],
        benefits: ["Entraîne les muscles qui soulèvent et définissent le milieu du visage."],
      },
    },
  },
  {
    keywords: ["under-eye tapping", "inner-to-outer drainage", "de-puff + drainage", "compress + massage", "temple + orbital"],
    guide: {
      en:       {
        title: "Under-Eye & Facial Drainage Taps",
        steps: [
          { text: "Using your ring finger (lightest touch), tap gently from the inner corner of the eye outward, then down toward the temple.", seconds: 20, diagram: "press" },
          { text: "Keep the pressure light — this is drainage, not massage; you should never feel like you’re stretching the skin.", seconds: 30, diagram: "circular" },
          { text: "Finish by sweeping down along the side of the face toward the neck to help fluid actually leave the area.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Moves fluid away from the delicate under-eye area, reducing morning puffiness."],
      },
      fr:       {
        title: "Tapotements de drainage sous les yeux et du visage",
        steps: [
          { text: "Avec l’annulaire (le toucher le plus léger), tapotez doucement du coin interne de l’œil vers l’extérieur, puis vers le bas en direction de la tempe.", seconds: 20, diagram: "press" },
          { text: "Gardez une pression légère — c’est du drainage, pas du massage ; vous ne devez jamais sentir la peau s’étirer.", seconds: 30, diagram: "circular" },
          { text: "Terminez par un mouvement vers le bas le long du visage, en direction du cou, pour vraiment aider le liquide à s’évacuer.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Déplace le liquide loin de la zone délicate sous les yeux, ce qui réduit les poches du matin."],
      },
    },
  },
  {
    keywords: ["gua sha", "lymphatic", "am + pm lymphatic", "facial massage", "face gua sha"],
    guide: {
      en:       {
        title: "Gua Sha & Lymphatic Drainage",
        steps: [
          { text: "Apply a facial oil first so the tool or your fingers glide instead of dragging the skin.", seconds: 30, diagram: "apply" },
          { text: "Work with light-to-medium pressure only, never hard enough to bruise.", seconds: 15, diagram: "general" },
          { text: "Always move toward the lymph nodes — from the center of the face outward, then down toward the neck and collarbone.", seconds: 30, diagram: "circular" },
          { text: "Finish with a few gentle strokes down the neck to help fluid actually drain, over 2–3 minutes total.", seconds: 180, diagram: "circular" },
        ],
        benefits: ["Reduces puffiness and visible fluid retention."],
      },
      fr:       {
        title: "Gua sha et drainage lymphatique",
        steps: [
          { text: "Appliquez d’abord une huile pour le visage afin que l’outil ou les doigts glissent sans tirer sur la peau.", seconds: 30, diagram: "apply" },
          { text: "Travaillez uniquement avec une pression légère à modérée, jamais assez forte pour marquer la peau.", seconds: 15, diagram: "general" },
          { text: "Déplacez-vous toujours vers les ganglions lymphatiques — du centre du visage vers l’extérieur, puis vers le bas, vers le cou et la clavicule.", seconds: 30, diagram: "circular" },
          { text: "Terminez par quelques mouvements doux vers le bas du cou pour vraiment aider le drainage, sur 2 à 3 minutes au total.", seconds: 180, diagram: "circular" },
        ],
        benefits: ["Réduit les poches et la rétention d’eau visible."],
      },
    },
  },
  {
    keywords: ["cold-water", "cold water", "cold compress", "cold immersion", "cold-water face rinse"],
    guide: {
      en:       {
        title: "Cold-Water Face Immersion",
        steps: [
          { text: "Fill a bowl with cold water (ice optional) and submerge your face for 15–30 seconds.", seconds: 30, diagram: "cold" },
          { text: "If full immersion isn’t practical, splash cold water or use a cold compress instead.", seconds: 30, diagram: "cold" },
          { text: "Breathe steadily — a few seconds of adjustment is normal, don’t hold your breath in a panic.", seconds: 20, diagram: "breathe" },
          { text: "Skip this if you have a heart condition or have been advised against cold exposure.", seconds: 30, diagram: "cold" },
        ],
        benefits: ["Constricts surface blood vessels, which reduces puffiness and inflammation fast."],
      },
      fr:       {
        title: "Immersion du visage dans l’eau froide",
        steps: [
          { text: "Remplissez un bol d’eau froide (glaçons facultatifs) et immergez le visage pendant 15 à 30 secondes.", seconds: 30, diagram: "cold" },
          { text: "Si l’immersion complète n’est pas pratique, utilisez plutôt des éclaboussures d’eau froide ou une compresse froide.", seconds: 30, diagram: "cold" },
          { text: "Respirez calmement — quelques secondes d’adaptation sont normales, ne bloquez pas votre respiration par réflexe.", seconds: 20, diagram: "breathe" },
          { text: "Évitez cet exercice en cas de problème cardiaque ou d’avis médical contre l’exposition au froid.", seconds: 30, diagram: "cold" },
        ],
        benefits: ["Resserre les vaisseaux sanguins de surface, ce qui réduit rapidement les poches et l’inflammation."],
      },
    },
  },
  {
    keywords: ["full face circuit"],
    guide: {
      en:       {
        title: "Face Structure Recap Circuit",
        steps: [
          { text: "Run through mewing, the cheekbone lift + buccal hold circuit, and a full gua sha pass back to back in one session.", seconds: 30, diagram: "circular" },
          { text: "Keep good form throughout at a pace you can sustain — this isn’t about going harder than before.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Confirms the whole face-structure routine now runs together smoothly, without thinking through each step."],
      },
      fr:       {
        title: "Circuit de récapitulatif — Structure faciale",
        steps: [
          { text: "Enchaînez le mewing, le circuit lift des pommettes + joues creuses, et un passage complet de gua sha en une seule séance.", seconds: 30, diagram: "circular" },
          { text: "Gardez une bonne forme tout du long, à un rythme que vous pouvez tenir — l’objectif n’est pas d’aller plus fort qu’avant.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Confirme que toute la routine de structure faciale s’enchaîne désormais bien, sans réfléchir à chaque étape."],
      },
    },
  },
  {
    keywords: ["progress photo"],
    guide: {
      en:       {
        title: "Progress Photo",
        steps: [
          { text: "Take the photo in the same spot, with the same lighting, at the same time of day each time.", seconds: 10, diagram: "check" },
          { text: "Prefer natural daylight over overhead artificial light.", seconds: 15, diagram: "general" },
          { text: "Keep a neutral expression and pull your hair back.", seconds: 20, diagram: "stretch" },
          { text: "Stay the same distance from the camera so photos line up for a fair comparison.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Consistent conditions are the only way to actually see real change."],
      },
      fr:       {
        title: "Photo de progression",
        steps: [
          { text: "Prenez la photo au même endroit, avec le même éclairage, au même moment de la journée à chaque fois.", seconds: 10, diagram: "check" },
          { text: "Préférez la lumière naturelle du jour à un éclairage artificiel au plafond.", seconds: 15, diagram: "general" },
          { text: "Gardez une expression neutre et dégagez les cheveux.", seconds: 20, diagram: "stretch" },
          { text: "Restez à la même distance de l’appareil pour que les photos s’alignent pour une comparaison équitable.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Des conditions cohérentes sont le seul moyen de vraiment voir un changement réel."],
      },
    },
  },
  {
    keywords: ["gum", "clench"],
    guide: {
      en:       {
        title: "Jaw Clenching & Resistance Gum",
        steps: [
          { text: "Chew firmly on one side at a time, not both — this isolates each masseter fully.", seconds: 90, diagram: "chew" },
          { text: "Keep your jaw relaxed between repetitions; a tight neck or headache means you’re clenching too hard.", seconds: 15, diagram: "general" },
          { text: "For isometric or weighted holds, bite down firmly and hold without grinding, breathing normally throughout.", seconds: 20, diagram: "hold" },
          { text: "Follow the program’s progression — softer gum and lighter holds early, firmer gum and longer or weighted holds as the weeks go on.", seconds: 90, diagram: "chew" },
        ],
        benefits: ["Builds masseter size and strength for a sharper, wider jawline."],
      },
      fr:       {
        title: "Serrage de mâchoire et gomme à mâcher résistante",
        steps: [
          { text: "Mâchez fermement d’un côté à la fois, pas des deux — cela isole complètement chaque masséter.", seconds: 90, diagram: "chew" },
          { text: "Gardez la mâchoire détendue entre les répétitions ; une tension au cou ou un mal de tête signifie que vous serrez trop fort.", seconds: 15, diagram: "general" },
          { text: "Pour les maintiens isométriques ou lestés, mordez fermement et maintenez sans grincer, en respirant normalement.", seconds: 20, diagram: "hold" },
          { text: "Suivez la progression du programme — gomme plus souple et maintiens légers au début, gomme plus ferme et maintiens plus longs ou lestés au fil des semaines.", seconds: 90, diagram: "chew" },
        ],
        benefits: ["Développe le volume et la force du masséter pour une mâchoire plus nette et plus large."],
      },
    },
  },
  {
    keywords: ["chin tuck"],
    guide: {
      en:       {
        title: "Chin Tucks",
        steps: [
          { text: "Sit or stand tall, then draw your chin straight back — like making a double chin on purpose — without tilting your head down.", seconds: 15, diagram: "posture" },
          { text: "Feel for a stretch at the base of the skull and light activation at the front of the neck.", seconds: 20, diagram: "stretch" },
          { text: "Hold for 2–3 seconds, then release with control.", seconds: 5, diagram: "hold" },
          { text: "Keep the movement small; if your head is visibly bobbing, you’re moving too much.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Corrects forward-head posture, which changes how the whole face and neck read."],
      },
      fr:       {
        title: "Rentrées de menton",
        steps: [
          { text: "Assis ou debout, redressé, ramenez le menton bien droit vers l’arrière — comme pour faire volontairement un double menton — sans incliner la tête vers le bas.", seconds: 15, diagram: "posture" },
          { text: "Recherchez un étirement à la base du crâne et une légère activation à l’avant du cou.", seconds: 20, diagram: "stretch" },
          { text: "Maintenez 2 à 3 secondes, puis relâchez avec contrôle.", seconds: 5, diagram: "hold" },
          { text: "Gardez le mouvement petit ; si votre tête bouge visiblement, vous en faites trop.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Corrige la posture tête en avant, ce qui change la lecture de tout le visage et du cou."],
      },
    },
  },
  {
    keywords: ["jaw-fascia release", "deep masseter release"],
    guide: {
      en:       {
        title: "Jaw-Fascia Release",
        steps: [
          { text: "Use your knuckles or a massage tool to apply firm, slow circular pressure along the jaw muscle.", seconds: 30, diagram: "circular" },
          { text: "Work from the back of the jaw (near the ear) forward toward the chin.", seconds: 15, diagram: "posture" },
          { text: "Spend extra time on any spot that feels tight or tender.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Releases tension built up from clenching, without adding training load."],
      },
      fr:       {
        title: "Relâchement du fascia mandibulaire",
        steps: [
          { text: "Utilisez vos jointures ou un outil de massage pour appliquer une pression circulaire ferme et lente le long du muscle de la mâchoire.", seconds: 30, diagram: "circular" },
          { text: "Travaillez de l’arrière de la mâchoire (près de l’oreille) vers l’avant, en direction du menton.", seconds: 15, diagram: "posture" },
          { text: "Passez plus de temps sur les zones qui paraissent tendues ou sensibles.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Relâche la tension accumulée par le serrage, sans ajouter de charge d’entraînement."],
      },
    },
  },
  {
    keywords: ["neck + jaw stretch"],
    guide: {
      en:       {
        title: "Neck & Jaw Stretch",
        steps: [
          { text: "Tilt your head gently to one side until you feel a mild stretch along the opposite side of the neck.", seconds: 20, diagram: "stretch" },
          { text: "Hold the stretch for the full duration rather than bouncing in and out of it.", seconds: 20, diagram: "stretch" },
          { text: "Repeat on the other side, keeping the jaw relaxed throughout.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Keeps the neck and jaw mobile alongside heavier masseter training."],
      },
      fr:       {
        title: "Étirement du cou et de la mâchoire",
        steps: [
          { text: "Inclinez doucement la tête d’un côté jusqu’à sentir un étirement léger sur le côté opposé du cou.", seconds: 20, diagram: "stretch" },
          { text: "Maintenez l’étirement pendant toute la durée plutôt que de faire des à-coups.", seconds: 20, diagram: "stretch" },
          { text: "Répétez de l’autre côté, en gardant la mâchoire détendue tout du long.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Garde le cou et la mâchoire mobiles aux côtés d’un entraînement du masséter plus intense."],
      },
    },
  },
  {
    keywords: ["lower-lip pull downs"],
    guide: {
      en:       {
        title: "Lower-Lip Pull Downs",
        steps: [
          { text: "Press your lower lip down and out with light resistance from your finger, or against gentle tension from a jaw exerciser.", seconds: 20, diagram: "press" },
          { text: "Feel the effort in the muscles around the chin and lower lip, not the neck.", seconds: 15, diagram: "posture" },
          { text: "Perform slow, controlled repetitions rather than fast pulses.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Targets the small muscles around the chin and lower lip that complement masseter training."],
      },
      fr:       {
        title: "Tirés de lèvre inférieure",
        steps: [
          { text: "Poussez la lèvre inférieure vers le bas et l’extérieur avec une légère résistance du doigt, ou contre la tension douce d’un appareil de mâchoire.", seconds: 20, diagram: "press" },
          { text: "Sentez l’effort dans les muscles autour du menton et de la lèvre inférieure, pas dans le cou.", seconds: 15, diagram: "posture" },
          { text: "Effectuez des répétitions lentes et contrôlées plutôt que des à-coups rapides.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Cible les petits muscles autour du menton et de la lèvre inférieure qui complètent l’entraînement du masséter."],
      },
    },
  },
  {
    keywords: ["full jaw + neck recovery"],
    guide: {
      en:       {
        title: "Jawmaxing Recap & Recovery",
        steps: [
          { text: "Run through a full gum circuit, then finish with jaw-fascia release and a neck + jaw stretch in the same session.", seconds: 90, diagram: "chew" },
          { text: "Treat this as a lighter, recovery-focused pass rather than a maximum-effort session.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Confirms the gum progression, chin tucks and release work all now fit together as one routine."],
      },
      fr:       {
        title: "Récapitulatif et récupération — Jawmaxing",
        steps: [
          { text: "Enchaînez un circuit complet de gomme à mâcher, puis terminez par un relâchement du fascia mandibulaire et un étirement du cou et de la mâchoire dans la même séance.", seconds: 90, diagram: "chew" },
          { text: "Considérez cela comme une séance plus légère, centrée sur la récupération, plutôt qu’un effort maximal.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Confirme que la progression de gomme, les rentrées de menton et le relâchement s’articulent désormais en une seule routine."],
      },
    },
  },
  {
    keywords: ["lateral gaze holds"],
    guide: {
      en:       {
        title: "Lateral Gaze Holds",
        steps: [
          { text: "Without moving your head, look as far as comfortable to one side and hold.", seconds: 20, diagram: "hold" },
          { text: "Keep the movement in the eyes only — forehead and face stay still.", seconds: 15, diagram: "general" },
          { text: "Hold for the full duration, then repeat on the other side.", seconds: 20, diagram: "hold" },
        ],
        benefits: ["Wakes up the muscles around the eye that barely get trained in daily life."],
      },
      fr:       {
        title: "Maintiens du regard latéral",
        steps: [
          { text: "Sans bouger la tête, regardez aussi loin que confortable d’un côté et maintenez.", seconds: 20, diagram: "hold" },
          { text: "Gardez le mouvement uniquement dans les yeux — le front et le visage restent immobiles.", seconds: 15, diagram: "general" },
          { text: "Maintenez pendant toute la durée, puis répétez de l’autre côté.", seconds: 20, diagram: "hold" },
        ],
        benefits: ["Réveille les muscles autour de l’œil, à peine sollicités au quotidien."],
      },
    },
  },
  {
    keywords: ["outer-corner lift + squint", "squint holds", "sustained squint"],
    guide: {
      en:       {
        title: "Squint Training",
        steps: [
          { text: "Squint gently as if in bright sun, focusing the effort at the outer corner of the eye rather than scrunching the whole face.", seconds: 15, diagram: "general" },
          { text: "In week one, combine it with a light outer-corner lift; in later weeks, hold the squint alone for longer.", seconds: 20, diagram: "hold" },
          { text: "Keep the forehead and nose completely still throughout.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Trains a more positive canthal tilt and a sharper, more alert-looking gaze."],
      },
      fr:       {
        title: "Entraînement du plissement des yeux",
        steps: [
          { text: "Plissez doucement les yeux comme en plein soleil, en concentrant l’effort sur le coin externe de l’œil plutôt qu’en crispant tout le visage.", seconds: 15, diagram: "general" },
          { text: "En semaine 1, combinez-le avec un léger lift du coin externe ; les semaines suivantes, maintenez le plissement seul plus longtemps.", seconds: 20, diagram: "hold" },
          { text: "Gardez le front et le nez complètement immobiles tout du long.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Entraîne une inclinaison canthale plus positive et un regard plus net et plus éveillé."],
      },
    },
  },
  {
    keywords: ["canthal + brow superset"],
    guide: {
      en:       {
        title: "Canthal & Brow Superset",
        steps: [
          { text: "Perform a set of canthal lift resistance immediately followed by a set of brow-set downward press, with no rest in between.", seconds: 60, diagram: "groom" },
          { text: "Rest briefly, then repeat for the prescribed number of rounds.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Combining both movements back to back pushes past the adaptation from training them separately in earlier weeks."],
      },
      fr:       {
        title: "Superset canthal et sourcil",
        steps: [
          { text: "Enchaînez une série de résistance au lift canthal immédiatement suivie d’une série de pression descendante au sourcil, sans repos entre les deux.", seconds: 60, diagram: "groom" },
          { text: "Reposez-vous brièvement, puis répétez pour le nombre de tours prescrit.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Combiner les deux mouvements l’un après l’autre dépasse l’adaptation obtenue en les entraînant séparément les semaines précédentes."],
      },
    },
  },
  {
    keywords: ["canthal lift resistance"],
    guide: {
      en:       {
        title: "Canthal Lift Resistance",
        steps: [
          { text: "Place a finger lightly at the outer corner of the eye.", seconds: 15, diagram: "general" },
          { text: "Press up and out with the finger while your eye muscle actively resists the movement.", seconds: 20, diagram: "press" },
          { text: "Keep the pressure light — this is resisted engagement, not a stretch.", seconds: 20, diagram: "stretch" },
        ],
        benefits: ["Trains the outer-corner muscles to hold a slightly lifted position under load, which is what actually shifts canthal tilt."],
      },
      fr:       {
        title: "Résistance au lift canthal",
        steps: [
          { text: "Placez un doigt légèrement sur le coin externe de l’œil.", seconds: 15, diagram: "general" },
          { text: "Appuyez vers le haut et l’extérieur avec le doigt pendant que le muscle de l’œil résiste activement au mouvement.", seconds: 20, diagram: "press" },
          { text: "Gardez une pression légère — c’est un engagement résisté, pas un étirement.", seconds: 20, diagram: "stretch" },
        ],
        benefits: ["Entraîne les muscles du coin externe à tenir une position légèrement relevée sous tension, ce qui modifie réellement l’inclinaison canthale."],
      },
    },
  },
  {
    keywords: ["brow-set downward press"],
    guide: {
      en:       {
        title: "Brow-Set Downward Press",
        steps: [
          { text: "Place your fingers along the brow bone and press gently downward.", seconds: 60, diagram: "groom" },
          { text: "Resist that press by trying to keep the brow in place, without frowning.", seconds: 60, diagram: "groom" },
          { text: "Keep the rest of the face relaxed throughout.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Trains the brow to hold a stable, neutral position rather than drifting upward with fatigue."],
      },
      fr:       {
        title: "Pression descendante au sourcil",
        steps: [
          { text: "Placez les doigts le long de l’arcade sourcilière et appuyez doucement vers le bas.", seconds: 60, diagram: "groom" },
          { text: "Résistez à cette pression en essayant de garder le sourcil en place, sans froncer.", seconds: 60, diagram: "groom" },
          { text: "Gardez le reste du visage détendu tout du long.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Entraîne le sourcil à tenir une position stable et neutre plutôt que de remonter avec la fatigue."],
      },
    },
  },
  {
    keywords: ["screen-distance"],
    guide: {
      en:       {
        title: "Screen-Distance & Sleep Hygiene Check",
        steps: [
          { text: "Position your screen roughly an arm’s length away and at eye level.", seconds: 15, diagram: "posture" },
          { text: "Check that you’re not squinting or leaning in to compensate for a screen that’s too far, small or dim.", seconds: 10, diagram: "check" },
          { text: "Pair this with your evening wind-down and sleep habits for the week.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Correct screen distance prevents eye strain that undermines the definition you’re training."],
      },
      fr:       {
        title: "Vérification de la distance à l’écran et de l’hygiène de sommeil",
        steps: [
          { text: "Positionnez votre écran à peu près à une longueur de bras et à hauteur des yeux.", seconds: 15, diagram: "posture" },
          { text: "Vérifiez que vous ne plissez pas les yeux ou ne vous penchez pas pour compenser un écran trop loin, trop petit ou trop sombre.", seconds: 10, diagram: "check" },
          { text: "Associez cela à votre rituel du soir et à vos habitudes de sommeil de la semaine.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Une bonne distance à l’écran évite une fatigue oculaire qui nuirait à la définition que vous entraînez."],
      },
    },
  },
  {
    keywords: ["full orbital circuit"],
    guide: {
      en:       {
        title: "Hunter Eyes Recap Circuit",
        steps: [
          { text: "Run through lateral gaze holds, squint training and canthal lift resistance back to back in one session.", seconds: 15, diagram: "general" },
          { text: "Finish with a drainage pass to de-puff before checking your neutral, resting gaze in the mirror.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Proves the tilt holds under a neutral, resting gaze — not just mid-exercise."],
      },
      fr:       {
        title: "Circuit de récapitulatif — Hunter Eyes",
        steps: [
          { text: "Enchaînez les maintiens du regard latéral, l’entraînement du plissement et la résistance au lift canthal en une seule séance.", seconds: 15, diagram: "general" },
          { text: "Terminez par un passage de drainage anti-poches avant de vérifier votre regard neutre au repos dans le miroir.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Prouve que l’inclinaison tient avec un regard neutre au repos — pas seulement pendant l’exercice."],
      },
    },
  },
  {
    keywords: ["moderate calorie deficit", "moderate deficit"],
    guide: {
      en:       {
        title: "Calorie Deficit Basics",
        steps: [
          { text: "Estimate your maintenance calories, then eat roughly 300–500 fewer per day.", seconds: 15, diagram: "diet" },
          { text: "Track intake for at least the first two weeks so the deficit is real, not guessed.", seconds: 10, diagram: "check" },
          { text: "Create most of that deficit by cutting sugary drinks and alcohol before touching solid meals.", seconds: 15, diagram: "general" },
        ],
        benefits: ["A moderate, sustainable deficit is the only real lever for facial fat — there’s no spot reduction."],
      },
      fr:       {
        title: "Bases du déficit calorique",
        steps: [
          { text: "Estimez vos calories de maintien, puis mangez environ 300 à 500 calories de moins par jour.", seconds: 15, diagram: "diet" },
          { text: "Suivez votre apport pendant au moins les deux premières semaines pour que le déficit soit réel, pas estimé au hasard.", seconds: 10, diagram: "check" },
          { text: "Créez l’essentiel de ce déficit en supprimant les boissons sucrées et l’alcool avant de toucher aux repas solides.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Un déficit modéré et durable est le seul vrai levier pour la graisse du visage — il n’existe pas de réduction ciblée."],
      },
    },
  },
  {
    keywords: ["elevate head", "elevate your head"],
    guide: {
      en:       {
        title: "Elevated Sleep Position",
        steps: [
          { text: "Add an extra pillow or wedge to keep your head slightly raised overnight.", seconds: 15, diagram: "posture" },
          { text: "Avoid sleeping face-down, which encourages fluid to pool in the face.", seconds: 15, diagram: "general" },
          { text: "Keep the elevation consistent every night, not just occasionally.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Gravity helps drain fluid instead of letting it settle in the face overnight."],
      },
      fr:       {
        title: "Position de sommeil surélevée",
        steps: [
          { text: "Ajoutez un oreiller supplémentaire ou un coussin en coin pour garder la tête légèrement surélevée pendant la nuit.", seconds: 15, diagram: "posture" },
          { text: "Évitez de dormir sur le ventre, ce qui favorise l’accumulation de liquide dans le visage.", seconds: 15, diagram: "general" },
          { text: "Gardez cette surélévation constante chaque nuit, pas seulement de temps en temps.", seconds: 10, diagram: "check" },
        ],
        benefits: ["La gravité aide à drainer le liquide au lieu de le laisser s’installer dans le visage pendant la nuit."],
      },
    },
  },
  {
    keywords: ["full fat-loss circuit"],
    guide: {
      en:       {
        title: "Facial Fat-Loss Recap Circuit",
        steps: [
          { text: "Combine a gua sha drainage pass with the cheekbone lift + buccal hold circuit and a set of chewing-gum resistance work in one session.", seconds: 90, diagram: "chew" },
          { text: "Check in on your deficit, water and sodium habits from the past three weeks at the same time.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Confirms the nutrition side and the facial training side are both still on track together."],
      },
      fr:       {
        title: "Circuit de récapitulatif — Perte de graisse du visage",
        steps: [
          { text: "Combinez un passage de drainage au gua sha avec le circuit lift des pommettes + joues creuses et une série de gomme à mâcher résistante dans la même séance.", seconds: 90, diagram: "chew" },
          { text: "Vérifiez en même temps vos habitudes de déficit, d’eau et de sel des trois dernières semaines.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Confirme que le volet nutrition et le volet entraînement facial sont tous deux encore sur la bonne voie."],
      },
    },
  },
  {
    keywords: ["push session", "overhead press"],
    guide: {
      en:       {
        title: "Push Session & Overhead Press",
        steps: [
          { text: "Push movements (chest press, shoulder press, dips) all work in the same direction — away from your body.", seconds: 20, diagram: "press" },
          { text: "Keep your core braced throughout so the force comes from your chest and shoulders, not an arching lower back.", seconds: 15, diagram: "general" },
          { text: "For overhead press specifically, drive the bar or dumbbells in a straight line above your head, not out in front, and avoid locking your elbows hard at the top.", seconds: 20, diagram: "press" },
        ],
        benefits: ["Builds the chest and shoulder mass that widens the upper-body silhouette."],
      },
      fr:       {
        title: "Séance poussée et développé au-dessus de la tête",
        steps: [
          { text: "Les mouvements de poussée (développé couché, développé épaules, dips) travaillent tous dans la même direction — en éloignant du corps.", seconds: 20, diagram: "press" },
          { text: "Gardez le tronc gainé tout du long pour que la force vienne de la poitrine et des épaules, pas d’un bas du dos qui se cambre.", seconds: 15, diagram: "general" },
          { text: "Pour le développé au-dessus de la tête, poussez la barre ou les haltères en ligne droite au-dessus de la tête, pas vers l’avant, et évitez de bloquer fort les coudes en haut.", seconds: 20, diagram: "press" },
        ],
        benefits: ["Développe la masse des pectoraux et des épaules qui élargit la silhouette du haut du corps."],
      },
    },
  },
  {
    keywords: ["pull session"],
    guide: {
      en:       {
        title: "Pull Session (Back, Rear Delts, Biceps)",
        steps: [
          { text: "Pull movements (rows, pull-ups, curls) work back toward your body.", seconds: 20, diagram: "stretch" },
          { text: "Start each row by pulling your shoulder blade back first, then let your arm follow.", seconds: 20, diagram: "stretch" },
          { text: "Avoid leading with the arm alone — that turns it into a biceps exercise instead of a back exercise.", seconds: 15, diagram: "general" },
          { text: "Control the return; don’t let the weight simply drop.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Widens the back, which frames the shoulders and completes the V-taper from behind."],
      },
      fr:       {
        title: "Séance tirage (dos, deltoïdes postérieurs, biceps)",
        steps: [
          { text: "Les mouvements de tirage (rowing, tractions, flexions de biceps) travaillent en ramenant vers le corps.", seconds: 20, diagram: "stretch" },
          { text: "Commencez chaque rowing en tirant d’abord l’omoplate vers l’arrière, puis laissez le bras suivre.", seconds: 20, diagram: "stretch" },
          { text: "Évitez de mener uniquement avec le bras — cela en fait un exercice de biceps plutôt que de dos.", seconds: 15, diagram: "general" },
          { text: "Contrôlez le retour ; ne laissez pas simplement tomber la charge.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Élargit le dos, ce qui encadre les épaules et complète la silhouette en V vue de dos."],
      },
    },
  },
  {
    keywords: ["push/pull superset"],
    guide: {
      en:       {
        title: "Push/Pull Superset Circuit",
        steps: [
          { text: "Pair one push movement with one pull movement, performing them back to back with no rest in between.", seconds: 20, diagram: "stretch" },
          { text: "Rest after the pair, then repeat for the prescribed rounds.", seconds: 15, diagram: "general" },
          { text: "Keep form strict on both halves even as fatigue builds.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Pushes past the adaptation from two weeks of separate push and pull sessions."],
      },
      fr:       {
        title: "Circuit superset poussée/tirage",
        steps: [
          { text: "Associez un mouvement de poussée à un mouvement de tirage, enchaînés sans repos entre les deux.", seconds: 20, diagram: "stretch" },
          { text: "Reposez-vous après la paire, puis répétez pour le nombre de tours prescrit.", seconds: 15, diagram: "general" },
          { text: "Gardez une forme stricte sur les deux mouvements même quand la fatigue s’installe.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Dépasse l’adaptation obtenue après deux semaines de séances de poussée et de tirage séparées."],
      },
    },
  },
  {
    keywords: ["lateral raise", "shoulder finisher"],
    guide: {
      en:       {
        title: "Lateral Raises",
        steps: [
          { text: "Stand tall, dumbbells at your sides, and raise your arms out to shoulder height with a slight bend in the elbows.", seconds: 20, diagram: "stretch" },
          { text: "Lead with your elbows rather than your hands.", seconds: 30, diagram: "repeat" },
          { text: "Stop right at shoulder height — going higher shifts the work to your traps.", seconds: 15, diagram: "general" },
          { text: "Lower slowly; the negative matters as much as the lift.", seconds: 30, diagram: "repeat" },
        ],
        benefits: ["Builds shoulder width, which sharpens the V-taper silhouette."],
      },
      fr:       {
        title: "Élévations latérales",
        steps: [
          { text: "Tenez-vous droit, haltères le long du corps, et levez les bras sur le côté jusqu’à hauteur d’épaules avec une légère flexion des coudes.", seconds: 20, diagram: "stretch" },
          { text: "Menez avec les coudes plutôt qu’avec les mains.", seconds: 30, diagram: "repeat" },
          { text: "Arrêtez-vous exactement à hauteur d’épaules — monter plus haut transfère le travail vers les trapèzes.", seconds: 15, diagram: "general" },
          { text: "Redescendez lentement ; la phase négative compte autant que la montée.", seconds: 30, diagram: "repeat" },
        ],
        benefits: ["Développe la largeur des épaules, ce qui affine la silhouette en V."],
      },
    },
  },
  {
    keywords: ["core + waist vacuum", "vacuum"],
    guide: {
      en:       {
        title: "Stomach Vacuum",
        steps: [
          { text: "Exhale completely, then pull your belly button in and up toward your spine as if trying to touch it.", seconds: 20, diagram: "breathe" },
          { text: "Keep your chest and shoulders relaxed — don’t suck them in.", seconds: 20, diagram: "press" },
          { text: "Hold while breathing shallow, or hold your breath briefly if comfortable.", seconds: 20, diagram: "breathe" },
          { text: "Release with control and repeat.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Trains the transverse abdominis, the deep muscle that pulls the waist in."],
      },
      fr:       {
        title: "Vacuum abdominal",
        steps: [
          { text: "Expirez complètement, puis rentrez le nombril vers l’intérieur et le haut, en direction de la colonne, comme pour essayer de la toucher.", seconds: 20, diagram: "breathe" },
          { text: "Gardez la poitrine et les épaules détendues — ne les rentrez pas.", seconds: 20, diagram: "press" },
          { text: "Maintenez en respirant faiblement, ou en bloquant brièvement la respiration si c’est confortable.", seconds: 20, diagram: "breathe" },
          { text: "Relâchez avec contrôle et recommencez.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Entraîne le transverse de l’abdomen, le muscle profond qui resserre la taille."],
      },
    },
  },
  {
    keywords: ["full-body strength circuit"],
    guide: {
      en:       {
        title: "Bodymaxing Recap Circuit",
        steps: [
          { text: "Combine a push movement, a pull movement and lateral raises into one full-body session.", seconds: 20, diagram: "stretch" },
          { text: "Keep the pace steady and the form clean rather than chasing a new personal best.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Confirms push, pull and shoulder work all fit together as one routine now."],
      },
      fr:       {
        title: "Circuit de récapitulatif — Bodymaxing",
        steps: [
          { text: "Combinez un mouvement de poussée, un mouvement de tirage et des élévations latérales en une seule séance complète.", seconds: 20, diagram: "stretch" },
          { text: "Gardez un rythme stable et une forme propre plutôt que de chercher un nouveau record.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Confirme que le travail de poussée, de tirage et d’épaules s’articule désormais en une seule routine."],
      },
    },
  },
  {
    keywords: ["wall angel", "y-t-w"],
    guide: {
      en:       {
        title: "Wall Angels",
        steps: [
          { text: "Stand with your back, head and arms against a wall, elbows bent at 90°.", seconds: 15, diagram: "posture" },
          { text: "Slowly slide your arms up like making a snow angel, keeping wrists, elbows and lower back against the wall as long as possible.", seconds: 20, diagram: "stretch" },
          { text: "In later weeks, trace Y, T and W shapes with your arms instead of the standard angel motion for variety.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Opens a tight chest and strengthens the upper back for straighter posture."],
      },
      fr:       {
        title: "Anges au mur",
        steps: [
          { text: "Tenez-vous dos, tête et bras contre un mur, coudes pliés à 90°.", seconds: 15, diagram: "posture" },
          { text: "Faites glisser lentement les bras vers le haut comme pour dessiner un ange dans la neige, en gardant poignets, coudes et bas du dos contre le mur aussi longtemps que possible.", seconds: 20, diagram: "stretch" },
          { text: "Les semaines suivantes, dessinez des formes Y, T et W avec les bras au lieu du mouvement d’ange classique, pour varier.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Ouvre une poitrine raide et renforce le haut du dos pour une posture plus droite."],
      },
    },
  },
  {
    keywords: ["doorway stretch"],
    guide: {
      en:       {
        title: "Doorway Chest Stretch",
        steps: [
          { text: "Place your forearms on the door frame at shoulder height, elbows bent at 90°.", seconds: 15, diagram: "general" },
          { text: "Step forward gently through the doorway until you feel the stretch across your chest.", seconds: 20, diagram: "stretch" },
          { text: "Hold for the full duration without bouncing — never push past mild discomfort.", seconds: 20, diagram: "hold" },
        ],
        benefits: ["Opens a chest tightened by sitting and screen time, which pulls the shoulders forward."],
      },
      fr:       {
        title: "Étirement de la poitrine dans l’embrasure de porte",
        steps: [
          { text: "Posez les avant-bras sur le cadre de la porte à hauteur d’épaules, coudes pliés à 90°.", seconds: 15, diagram: "general" },
          { text: "Avancez doucement à travers l’embrasure jusqu’à sentir l’étirement dans la poitrine.", seconds: 20, diagram: "stretch" },
          { text: "Maintenez pendant toute la durée sans à-coups — ne dépassez jamais une légère gêne.", seconds: 20, diagram: "hold" },
        ],
        benefits: ["Ouvre une poitrine raidie par la position assise et le temps d’écran, qui tire les épaules vers l’avant."],
      },
    },
  },
  {
    keywords: ["thoracic extension"],
    guide: {
      en:       {
        title: "Thoracic Extensions Over a Chair",
        steps: [
          { text: "Sit toward the front of a sturdy chair with your hands behind your head.", seconds: 15, diagram: "posture" },
          { text: "Arch your upper back over the top of the chair back, opening the chest toward the ceiling.", seconds: 15, diagram: "general" },
          { text: "Return to upright with control and repeat for the prescribed reps.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Directly mobilizes the mid-back that rounds forward from long sitting."],
      },
      fr:       {
        title: "Extensions thoraciques sur chaise",
        steps: [
          { text: "Asseyez-vous vers l’avant d’une chaise stable, mains derrière la tête.", seconds: 15, diagram: "posture" },
          { text: "Arquez le haut du dos par-dessus le dossier de la chaise, en ouvrant la poitrine vers le plafond.", seconds: 15, diagram: "general" },
          { text: "Revenez à la verticale avec contrôle et répétez pour le nombre de répétitions prescrit.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Mobilise directement le milieu du dos qui s’arrondit à force de position assise prolongée."],
      },
    },
  },
  {
    keywords: ["posture reset alarm", "alignment habit check"],
    guide: {
      en:       {
        title: "All-Day Posture Check-Ins",
        steps: [
          { text: "Set an actual phone alarm or reminder to check in hourly, rather than relying on memory.", seconds: 30, diagram: "repeat" },
          { text: "When it goes off, reset: ears over shoulders, shoulders back and down, core lightly braced.", seconds: 15, diagram: "posture" },
          { text: "Repeat every day — the conscious check-in is what turns into an unconscious default.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Catches slouching throughout the day, not just during a single training session."],
      },
      fr:       {
        title: "Vérifications de posture tout au long de la journée",
        steps: [
          { text: "Réglez une vraie alarme ou un rappel sur votre téléphone pour vérifier toutes les heures, plutôt que de compter sur votre mémoire.", seconds: 30, diagram: "repeat" },
          { text: "Quand il sonne, réajustez-vous : oreilles au-dessus des épaules, épaules en arrière et basses, tronc légèrement gainé.", seconds: 15, diagram: "posture" },
          { text: "Répétez chaque jour — c’est cette vérification consciente qui devient un réflexe inconscient.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Rattrape l’affaissement tout au long de la journée, pas seulement pendant une séance d’entraînement."],
      },
    },
  },
  {
    keywords: ["band pull-apart", "face pull"],
    guide: {
      en:       {
        title: "Face Pulls & Band Pull-Aparts",
        steps: [
          { text: "Anchor a band at chest height, then pull the handles toward your face, leading with your elbows.", seconds: 20, diagram: "stretch" },
          { text: "Finish with your hands beside your ears, thumbs pointing back, squeezing your shoulder blades together.", seconds: 15, diagram: "general" },
          { text: "For pull-aparts, hold the band at shoulder height and pull it apart by driving your shoulder blades back, not just your arms.", seconds: 20, diagram: "stretch" },
          { text: "Control the return on every repetition instead of letting the band snap back.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Strengthens the rear shoulders and upper back that pull posture upright."],
      },
      fr:       {
        title: "Tirages au visage et écartés à la bande élastique",
        steps: [
          { text: "Fixez une bande élastique à hauteur de poitrine, puis tirez les poignées vers votre visage en menant avec les coudes.", seconds: 20, diagram: "stretch" },
          { text: "Terminez mains près des oreilles, pouces vers l’arrière, en serrant les omoplates l’une vers l’autre.", seconds: 15, diagram: "general" },
          { text: "Pour les écartés, tenez la bande à hauteur d’épaules et écartez-la en poussant les omoplates vers l’arrière, pas seulement avec les bras.", seconds: 20, diagram: "stretch" },
          { text: "Contrôlez le retour à chaque répétition au lieu de laisser la bande claquer en arrière.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Renforce l’arrière des épaules et le haut du dos, qui redressent la posture."],
      },
    },
  },
  {
    keywords: ["desk ergonomics"],
    guide: {
      en:       {
        title: "Desk Ergonomics Check",
        steps: [
          { text: "Set your screen top at eye level so you don’t tilt your head down or up to see it.", seconds: 20, diagram: "stretch" },
          { text: "Keep elbows near 90° with forearms supported, and feet flat on the floor or a footrest.", seconds: 15, diagram: "general" },
          { text: "Check your setup once, then re-check weekly — chairs and desks drift out of position.", seconds: 10, diagram: "check" },
        ],
        benefits: ["A better setup removes the constant forward-head pull that undoes chin tuck and wall angel work."],
      },
      fr:       {
        title: "Vérification de l’ergonomie du bureau",
        steps: [
          { text: "Réglez le haut de l’écran à hauteur des yeux pour ne pas incliner la tête vers le bas ou le haut pour le voir.", seconds: 20, diagram: "stretch" },
          { text: "Gardez les coudes proches de 90° avec les avant-bras soutenus, et les pieds à plat au sol ou sur un repose-pieds.", seconds: 15, diagram: "general" },
          { text: "Vérifiez votre installation une fois, puis chaque semaine — chaises et bureaux se dérèglent avec le temps.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Une meilleure installation supprime la traction constante vers l’avant qui annule le travail des rentrées de menton et des anges au mur."],
      },
    },
  },
  {
    keywords: ["deep neck flexor"],
    guide: {
      en:       {
        title: "Deep Neck Flexor Holds",
        steps: [
          { text: "Lying on your back, gently nod your chin as if saying \"yes\" in a very small range, flattening the back of your neck slightly toward the floor.", seconds: 15, diagram: "posture" },
          { text: "Hold that light activation without straining the front of the neck or lifting your head.", seconds: 20, diagram: "hold" },
          { text: "Breathe normally throughout the hold.", seconds: 20, diagram: "hold" },
        ],
        benefits: ["Strengthens the small stabilizing muscles that keep good head position under real, all-day load."],
      },
      fr:       {
        title: "Maintiens des fléchisseurs profonds du cou",
        steps: [
          { text: "Allongé sur le dos, hochez doucement le menton comme pour dire « oui » sur une très petite amplitude, en aplatissant légèrement l’arrière du cou vers le sol.", seconds: 15, diagram: "posture" },
          { text: "Maintenez cette activation légère sans forcer l’avant du cou ni soulever la tête.", seconds: 20, diagram: "hold" },
          { text: "Respirez normalement pendant tout le maintien.", seconds: 20, diagram: "hold" },
        ],
        benefits: ["Renforce les petits muscles stabilisateurs qui maintiennent une bonne position de tête sous charge réelle, toute la journée."],
      },
    },
  },
  {
    keywords: ["standing posture holds"],
    guide: {
      en:       {
        title: "Standing Posture Holds Through the Day",
        steps: [
          { text: "At set points through the day, stand tall for a full minute: ears over shoulders, chest open, core lightly braced.", seconds: 15, diagram: "posture" },
          { text: "Notice what it feels like compared to your default standing habit.", seconds: 10, diagram: "check" },
          { text: "Repeat several times daily rather than one long session.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Turns the corrected position from an exercise into how you actually stand by default."],
      },
      fr:       {
        title: "Maintiens de posture debout tout au long de la journée",
        steps: [
          { text: "À des moments fixes de la journée, tenez-vous droit pendant une minute complète : oreilles au-dessus des épaules, poitrine ouverte, tronc légèrement gainé.", seconds: 15, diagram: "posture" },
          { text: "Remarquez la différence avec votre position debout habituelle.", seconds: 10, diagram: "check" },
          { text: "Répétez plusieurs fois par jour plutôt qu’une seule longue séance.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Transforme la position corrigée en votre façon réelle de vous tenir par défaut."],
      },
    },
  },
  {
    keywords: ["loaded carries"],
    guide: {
      en:       {
        title: "Loaded Carries",
        steps: [
          { text: "Pick up a moderately heavy dumbbell or kettlebell in each hand.", seconds: 10, diagram: "check" },
          { text: "Walk a set distance or for a set time keeping shoulders back and down, core braced, and a tall, neutral spine.", seconds: 15, diagram: "posture" },
          { text: "Set the weights down with control rather than dropping them.", seconds: 30, diagram: "repeat" },
        ],
        benefits: ["Proves the alignment you’ve trained holds under real load, not just in a controlled exercise."],
      },
      fr:       {
        title: "Portés chargés",
        steps: [
          { text: "Prenez un haltère ou un kettlebell modérément lourd dans chaque main.", seconds: 10, diagram: "check" },
          { text: "Marchez sur une distance ou une durée donnée en gardant les épaules en arrière et basses, le tronc gainé, et une colonne droite et neutre.", seconds: 15, diagram: "posture" },
          { text: "Reposez les charges avec contrôle plutôt que de les laisser tomber.", seconds: 30, diagram: "repeat" },
        ],
        benefits: ["Prouve que l’alignement entraîné tient sous charge réelle, pas seulement pendant un exercice contrôlé."],
      },
    },
  },
  {
    keywords: ["full posture circuit"],
    guide: {
      en:       {
        title: "Posture Recap Circuit",
        steps: [
          { text: "Combine wall angels, face pulls and deep neck flexor holds into one session, without any new movement.", seconds: 15, diagram: "general" },
          { text: "Add a set of loaded carries at the end to test the position under load.", seconds: 30, diagram: "repeat" },
        ],
        benefits: ["Proves the alignment holds without cueing, under load, and across a full day — the actual definition of a fixed posture."],
      },
      fr:       {
        title: "Circuit de récapitulatif — Posture",
        steps: [
          { text: "Combinez les anges au mur, les tirages au visage et les maintiens des fléchisseurs profonds du cou en une seule séance, sans aucun nouveau mouvement.", seconds: 15, diagram: "general" },
          { text: "Ajoutez une série de portés chargés à la fin pour tester la position sous charge.", seconds: 30, diagram: "repeat" },
        ],
        benefits: ["Prouve que l’alignement tient sans y penser, sous charge, et sur une journée complète — la définition réelle d’une posture corrigée."],
      },
    },
  },
  {
    keywords: ["am: cleanse", "pm: cleanse", "am routine + spf", "am antioxidant", "full am + pm routine", "gentle cleanse am/pm", "non-comedogenic moisturizer", "spf every morning", "spf reapply midday", "maintenance routine locked"],
    guide: {
      en:       {
        title: "Skincare Routine Order",
        steps: [
          { text: "Cleanse first on damp skin, then pat dry.", seconds: 30, diagram: "apply" },
          { text: "Apply active ingredients (retinoid or niacinamide, whichever the week calls for) before a moisturizer to seal them in.", seconds: 30, diagram: "apply" },
          { text: "Finish every morning with SPF as the final step, and reapply midday if you’re outdoors.", seconds: 30, diagram: "apply" },
        ],
        benefits: ["The correct order lets every product actually absorb and work as intended."],
      },
      fr:       {
        title: "Ordre de la routine de soin",
        steps: [
          { text: "Nettoyez d’abord sur peau humide, puis séchez en tamponnant.", seconds: 30, diagram: "apply" },
          { text: "Appliquez les actifs (rétinoïde ou niacinamide, selon la semaine) avant une crème hydratante pour les sceller.", seconds: 30, diagram: "apply" },
          { text: "Terminez chaque matin par le SPF comme étape finale, et renouvelez à midi si vous êtes dehors.", seconds: 30, diagram: "apply" },
        ],
        benefits: ["Le bon ordre permet à chaque produit de vraiment pénétrer et d’agir comme prévu."],
      },
    },
  },
  {
    keywords: ["low-% retinoid", "retinoid nightly"],
    guide: {
      en:       {
        title: "Retinoid Usage",
        steps: [
          { text: "Apply at night only, in a pea-sized amount for the whole face — retinoids break down in sunlight and increase sun sensitivity.", seconds: 30, diagram: "apply" },
          { text: "Start on alternate nights; move to nightly only once your skin tolerates it without irritation.", seconds: 30, diagram: "repeat" },
          { text: "Always follow with a moisturizer, and never skip morning SPF the next day.", seconds: 30, diagram: "apply" },
        ],
        benefits: ["Increases cell turnover, which is what drives smoother texture and fewer fine lines over time."],
      },
      fr:       {
        title: "Utilisation du rétinoïde",
        steps: [
          { text: "Appliquez uniquement le soir, en quantité de la taille d’un petit pois pour tout le visage — les rétinoïdes se dégradent à la lumière du jour et augmentent la sensibilité au soleil.", seconds: 30, diagram: "apply" },
          { text: "Commencez une nuit sur deux ; passez à un usage quotidien seulement une fois que la peau le tolère sans irritation.", seconds: 30, diagram: "repeat" },
          { text: "Faites toujours suivre d’une crème hydratante, et ne sautez jamais le SPF du matin le lendemain.", seconds: 30, diagram: "apply" },
        ],
        benefits: ["Augmente le renouvellement cellulaire, ce qui affine la texture et réduit les ridules avec le temps."],
      },
    },
  },
  {
    keywords: ["niacinamide"],
    guide: {
      en:       {
        title: "Niacinamide Usage",
        steps: [
          { text: "Apply in the morning after cleansing, before your moisturizer and SPF.", seconds: 30, diagram: "apply" },
          { text: "It layers well with most other actives, so no need to alternate nights the way you would with a retinoid.", seconds: 30, diagram: "repeat" },
          { text: "Give it several weeks of consistent use before judging the result.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Targets post-inflammatory marks left behind once active breakouts have calmed down."],
      },
      fr:       {
        title: "Utilisation de la niacinamide",
        steps: [
          { text: "Appliquez le matin après le nettoyage, avant la crème hydratante et le SPF.", seconds: 30, diagram: "apply" },
          { text: "Elle se superpose bien à la plupart des autres actifs, pas besoin d’alterner les nuits comme avec un rétinoïde.", seconds: 30, diagram: "repeat" },
          { text: "Laissez plusieurs semaines d’usage régulier avant de juger le résultat.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Cible les marques post-inflammatoires laissées une fois que les imperfections actives se sont calmées."],
      },
    },
  },
  {
    keywords: ["weekly gentle exfoliation"],
    guide: {
      en:       {
        title: "Weekly Gentle Exfoliation",
        steps: [
          { text: "Exfoliate once a week only — more than that strips the barrier you’ve spent weeks building.", seconds: 30, diagram: "apply" },
          { text: "Use a gentle chemical exfoliant rather than a harsh physical scrub.", seconds: 30, diagram: "circular" },
          { text: "Follow immediately with a moisturizer, since freshly exfoliated skin loses water faster.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Removes the buildup from three weeks of actives without over-stripping the skin."],
      },
      fr:       {
        title: "Exfoliation douce hebdomadaire",
        steps: [
          { text: "Exfoliez seulement une fois par semaine — plus que cela abîme la barrière que vous avez mis des semaines à construire.", seconds: 30, diagram: "apply" },
          { text: "Utilisez un exfoliant chimique doux plutôt qu’un gommage physique agressif.", seconds: 30, diagram: "circular" },
          { text: "Faites suivre immédiatement d’une crème hydratante, car une peau fraîchement exfoliée perd l’eau plus vite.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Élimine l’accumulation de trois semaines d’actifs sans agresser la peau."],
      },
    },
  },
  {
    keywords: ["bha exfoliant"],
    guide: {
      en:       {
        title: "BHA Exfoliant Routine",
        steps: [
          { text: "Apply to the whole face on alternate nights, not every night, to avoid over-exfoliating.", seconds: 30, diagram: "apply" },
          { text: "BHA works specifically inside the pore to clear the congestion causing breakouts.", seconds: 30, diagram: "apply" },
          { text: "Follow with a non-comedogenic moisturizer to protect the barrier.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Clears congestion at the source instead of just treating visible breakouts."],
      },
      fr:       {
        title: "Routine à l’exfoliant BHA",
        steps: [
          { text: "Appliquez sur tout le visage une nuit sur deux, pas chaque soir, pour éviter de sur-exfolier.", seconds: 30, diagram: "apply" },
          { text: "Le BHA agit spécifiquement à l’intérieur du pore pour dégager la congestion à l’origine des imperfections.", seconds: 30, diagram: "apply" },
          { text: "Faites suivre d’un hydratant non comédogène pour protéger la barrière.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Dégage la congestion à la source au lieu de traiter seulement les imperfections visibles."],
      },
    },
  },
  {
    keywords: ["spot treat", "continue bha + spot care"],
    guide: {
      en:       {
        title: "Spot Treatment (BHA / Benzoyl Peroxide)",
        steps: [
          { text: "Apply a small amount directly onto active breakouts only, on clean, dry skin.", seconds: 30, diagram: "apply" },
          { text: "Never apply to the whole face — this is a targeted treatment, not a leave-on routine step.", seconds: 30, diagram: "apply" },
          { text: "Continue daily on active spots until they’ve visibly calmed down.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Treats active breakouts directly without irritating skin that isn’t broken out."],
      },
      fr:       {
        title: "Traitement localisé (BHA / peroxyde de benzoyle)",
        steps: [
          { text: "Appliquez une petite quantité directement sur les imperfections actives uniquement, sur peau propre et sèche.", seconds: 30, diagram: "apply" },
          { text: "N’appliquez jamais sur tout le visage — c’est un traitement ciblé, pas une étape de routine généralisée.", seconds: 30, diagram: "apply" },
          { text: "Continuez chaque jour sur les zones actives jusqu’à ce qu’elles se calment visiblement.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Traite directement les imperfections actives sans irriter la peau qui n’en a pas."],
      },
    },
  },
  {
    keywords: ["no touching / picking", "no picking"],
    guide: {
      en:       {
        title: "No Touching or Picking",
        steps: [
          { text: "Notice the habit first — most touching happens without realizing it, so awareness is the actual first step.", seconds: 10, diagram: "check" },
          { text: "Keep hands away from the face entirely, not just away from active breakouts.", seconds: 15, diagram: "general" },
          { text: "Use the app’s streak tracker or a simple daily note to hold yourself accountable.", seconds: 20, diagram: "hold" },
        ],
        benefits: ["Picking is one of the biggest drivers of scarring and prolonged healing time."],
      },
      fr:       {
        title: "Ne pas toucher ni triturer",
        steps: [
          { text: "Repérez d’abord l’habitude — on touche souvent son visage sans s’en rendre compte, donc la prise de conscience est la vraie première étape.", seconds: 10, diagram: "check" },
          { text: "Gardez les mains loin du visage en général, pas seulement loin des imperfections actives.", seconds: 15, diagram: "general" },
          { text: "Utilisez la série de suivi de l’application ou une simple note quotidienne pour vous responsabiliser.", seconds: 20, diagram: "hold" },
        ],
        benefits: ["Triturer est l’un des plus grands facteurs de cicatrices et de temps de guérison prolongé."],
      },
    },
  },
  {
    keywords: ["pillowcase", "clean phone screen"],
    guide: {
      en:       {
        title: "Pillowcase & Phone-Screen Hygiene",
        steps: [
          { text: "Change your pillowcase at least twice a week — it collects oil, product residue and bacteria that touch your face all night.", seconds: 15, diagram: "general" },
          { text: "Wipe down your phone screen daily with an alcohol wipe before it touches your cheek on calls.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Removes a constant, easy-to-miss source of recontamination for skin that’s already trying to clear up."],
      },
      fr:       {
        title: "Hygiène de la taie d’oreiller et de l’écran de téléphone",
        steps: [
          { text: "Changez votre taie d’oreiller au moins deux fois par semaine — elle accumule huile, résidus de produits et bactéries qui touchent votre visage toute la nuit.", seconds: 15, diagram: "general" },
          { text: "Essuyez l’écran de votre téléphone chaque jour avec une lingette alcoolisée avant qu’il touche votre joue pendant les appels.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Élimine une source constante et facile à négliger de recontamination pour une peau déjà en train de se rétablir."],
      },
    },
  },
  {
    keywords: ["protein + vitamin-c rich meals"],
    guide: {
      en:       {
        title: "Protein + Vitamin-C Meals",
        steps: [
          { text: "Include a protein source and a vitamin-C-rich food (citrus, peppers, berries) at the same meal.", seconds: 15, diagram: "diet" },
          { text: "Aim for this pairing at least once daily during this phase of the program.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Protein and vitamin C are both directly involved in collagen production."],
      },
      fr:       {
        title: "Repas riches en protéines et vitamine C",
        steps: [
          { text: "Associez une source de protéines et un aliment riche en vitamine C (agrumes, poivrons, fruits rouges) au même repas.", seconds: 15, diagram: "diet" },
          { text: "Visez cette association au moins une fois par jour pendant cette phase du programme.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Les protéines et la vitamine C sont toutes deux directement impliquées dans la production de collagène."],
      },
    },
  },
  {
    keywords: ["cut dairy + high-sugar test"],
    guide: {
      en:       {
        title: "Dairy & High-Sugar Elimination Test",
        steps: [
          { text: "Cut dairy and high-sugar foods for one full week to see if your skin responds.", seconds: 15, diagram: "diet" },
          { text: "Keep everything else in your routine unchanged during the test so you can actually attribute any change to this one variable.", seconds: 15, diagram: "general" },
          { text: "Reintroduce afterward if you saw no difference — this is a test, not a permanent rule.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Both are common, individual triggers for breakouts in some people — this finds out if that’s true for you."],
      },
      fr:       {
        title: "Test d’élimination des produits laitiers et du sucre",
        steps: [
          { text: "Supprimez les produits laitiers et les aliments très sucrés pendant une semaine complète pour voir si votre peau réagit.", seconds: 15, diagram: "diet" },
          { text: "Gardez le reste de votre routine inchangé pendant le test pour pouvoir vraiment attribuer un changement à cette seule variable.", seconds: 15, diagram: "general" },
          { text: "Réintroduisez-les ensuite si vous n’avez vu aucune différence — c’est un test, pas une règle permanente.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Ce sont deux déclencheurs individuels courants d’imperfections chez certaines personnes — ce test vérifie si c’est votre cas."],
      },
    },
  },
  {
    keywords: ["clay mask"],
    guide: {
      en:       {
        title: "Weekly Clay Mask",
        steps: [
          { text: "Apply a thin, even layer to clean skin, avoiding the eye area.", seconds: 30, diagram: "apply" },
          { text: "Leave on until just before it fully hardens — over-drying it on the skin pulls out too much moisture.", seconds: 15, diagram: "general" },
          { text: "Rinse with lukewarm water and follow with your normal moisturizer.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Draws out excess oil and buildup that daily cleansing alone doesn’t reach."],
      },
      fr:       {
        title: "Masque à l’argile hebdomadaire",
        steps: [
          { text: "Appliquez une couche fine et uniforme sur peau propre, en évitant le contour des yeux.", seconds: 30, diagram: "apply" },
          { text: "Laissez poser jusqu’à juste avant qu’il ne durcisse complètement — le laisser sécher trop longtemps sur la peau retire trop d’hydratation.", seconds: 15, diagram: "general" },
          { text: "Rincez à l’eau tiède et faites suivre de votre hydratant habituel.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Retire l’excès de sébum et l’accumulation que le nettoyage quotidien seul n’atteint pas."],
      },
    },
  },
  {
    keywords: ["brow clean", "brow maintenance"],
    guide: {
      en:       {
        title: "Brow Shaping & Maintenance",
        steps: [
          { text: "Map your natural brow shape first — don’t remove hair randomly.", seconds: 60, diagram: "groom" },
          { text: "Start the brow roughly above the inner corner of the eye, ending on a line from the nostril through the outer eye corner.", seconds: 60, diagram: "groom" },
          { text: "Tweeze or trim only the strays outside that shape, a few hairs at a time.", seconds: 60, diagram: "groom" },
          { text: "Check your work in good light as you go, rather than removing a lot at once.", seconds: 10, diagram: "check" },
        ],
        benefits: ["A well-shaped brow instantly changes how the whole face reads."],
      },
      fr:       {
        title: "Mise en forme et entretien des sourcils",
        steps: [
          { text: "Cartographiez d’abord la forme naturelle de vos sourcils — ne retirez pas de poils au hasard.", seconds: 60, diagram: "groom" },
          { text: "Faites commencer le sourcil environ au-dessus du coin interne de l’œil, jusqu’à une ligne allant de la narine au coin externe de l’œil.", seconds: 60, diagram: "groom" },
          { text: "Épilez ou taillez uniquement les poils qui dépassent de cette forme, quelques-uns à la fois.", seconds: 60, diagram: "groom" },
          { text: "Vérifiez sous bonne lumière au fur et à mesure, plutôt que d’en enlever beaucoup d’un coup.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Des sourcils bien dessinés changent immédiatement la lecture de tout le visage."],
      },
    },
  },
  {
    keywords: ["book / plan a sharp haircut"],
    guide: {
      en:       {
        title: "Book a Sharp Haircut",
        steps: [
          { text: "Book the appointment now rather than waiting until you need one urgently.", seconds: 15, diagram: "general" },
          { text: "Bring a reference photo close to your face shape rather than describing it from memory.", seconds: 10, diagram: "check" },
          { text: "Ask specifically for a shape that frames your jawline, not just a generic trim.", seconds: 60, diagram: "groom" },
        ],
        benefits: ["A proper haircut changes how the whole face reads immediately — the fastest single win in the program."],
      },
      fr:       {
        title: "Réserver une coupe nette",
        steps: [
          { text: "Réservez le rendez-vous maintenant plutôt que d’attendre un besoin urgent.", seconds: 15, diagram: "general" },
          { text: "Apportez une photo de référence proche de la forme de votre visage plutôt que de la décrire de mémoire.", seconds: 10, diagram: "check" },
          { text: "Demandez spécifiquement une coupe qui encadre votre mâchoire, pas juste une coupe générique.", seconds: 60, diagram: "groom" },
        ],
        benefits: ["Une bonne coupe change immédiatement la lecture de tout le visage — le gain le plus rapide du programme."],
      },
    },
  },
  {
    keywords: ["beard", "shave line"],
    guide: {
      en:       {
        title: "Beard & Shave Line",
        steps: [
          { text: "Define your line along your natural jaw and cheek boundary, not higher.", seconds: 15, diagram: "general" },
          { text: "Use a trimmer guard one size longer than you think first, then go shorter if needed.", seconds: 60, diagram: "groom" },
          { text: "Keep the neckline just above your Adam’s apple, not up at the jawbone.", seconds: 15, diagram: "general" },
          { text: "Trim gradually — you can always take off more, not put it back.", seconds: 60, diagram: "groom" },
        ],
        benefits: ["A natural line looks sharp immediately and stays natural as hair grows back."],
      },
      fr:       {
        title: "Ligne de barbe et de rasage",
        steps: [
          { text: "Définissez votre ligne le long du contour naturel de la mâchoire et de la joue, pas plus haut.", seconds: 15, diagram: "general" },
          { text: "Utilisez d’abord un sabot de tondeuse une taille plus longue que ce que vous pensez, puis raccourcissez si besoin.", seconds: 60, diagram: "groom" },
          { text: "Gardez la ligne du cou juste au-dessus de la pomme d’Adam, pas au niveau de la mâchoire.", seconds: 15, diagram: "general" },
          { text: "Taillez progressivement — vous pouvez toujours en enlever plus, pas en remettre.", seconds: 60, diagram: "groom" },
        ],
        benefits: ["Une ligne naturelle paraît nette immédiatement et reste naturelle à la repousse."],
      },
    },
  },
  {
    keywords: ["start whitening routine", "whitening + flossing", "whitening routine"],
    guide: {
      en:       {
        title: "Teeth Whitening & Flossing",
        steps: [
          { text: "Follow your whitening product’s instructions exactly, especially the contact time — more isn’t faster, just more sensitivity.", seconds: 15, diagram: "general" },
          { text: "Floss before whitening so the product reaches between teeth, not just the surface.", seconds: 15, diagram: "general" },
          { text: "Keep the routine going daily; whitening fades without maintenance.", seconds: 15, diagram: "general" },
        ],
        benefits: ["A brighter smile is one of the fastest-reading presentation upgrades."],
      },
      fr:       {
        title: "Blanchiment dentaire et fil dentaire",
        steps: [
          { text: "Suivez exactement les instructions de votre produit blanchissant, en particulier le temps de pose — en faire plus n’accélère pas les résultats, ça augmente juste la sensibilité.", seconds: 15, diagram: "general" },
          { text: "Passez le fil dentaire avant le blanchiment pour que le produit atteigne aussi l’espace entre les dents, pas seulement la surface.", seconds: 15, diagram: "general" },
          { text: "Continuez la routine chaque jour ; le blanchiment s’estompe sans entretien.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Un sourire plus lumineux est l’une des améliorations de présentation les plus immédiatement visibles."],
      },
    },
  },
  {
    keywords: ["style hair with correct products"],
    guide: {
      en:       {
        title: "Daily Hair Styling",
        steps: [
          { text: "Match the product to your hair type and the haircut you booked — a matte clay or paste for texture, a light cream for control.", seconds: 30, diagram: "apply" },
          { text: "Apply to towel-dried, not soaking wet, hair for the best hold.", seconds: 30, diagram: "apply" },
          { text: "Style toward the shape your barber gave you, not against it.", seconds: 60, diagram: "groom" },
        ],
        benefits: ["Keeps the fresh-cut look going daily instead of fading back to shapeless within a week."],
      },
      fr:       {
        title: "Coiffage quotidien",
        steps: [
          { text: "Adaptez le produit à votre type de cheveux et à la coupe réservée — une argile ou pâte mate pour la texture, une crème légère pour le contrôle.", seconds: 30, diagram: "apply" },
          { text: "Appliquez sur cheveux essorés à la serviette, pas trempés, pour une meilleure tenue.", seconds: 30, diagram: "apply" },
          { text: "Coiffez dans le sens de la forme donnée par votre coiffeur, pas à contre-sens.", seconds: 60, diagram: "groom" },
        ],
        benefits: ["Maintient l’effet fraîchement coupé au quotidien au lieu qu’il s’estompe en une semaine."],
      },
    },
  },
  {
    keywords: ["nail + hand grooming"],
    guide: {
      en:       {
        title: "Nail & Hand Grooming",
        steps: [
          { text: "Trim nails straight across, then round the edges slightly with a file.", seconds: 60, diagram: "groom" },
          { text: "Push back cuticles gently after a shower, when they’re softest — never cut them.", seconds: 20, diagram: "press" },
          { text: "Finish with a hand moisturizer, especially if you wash your hands often.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Hands are visible constantly in conversation — small detail, disproportionately noticed."],
      },
      fr:       {
        title: "Entretien des ongles et des mains",
        steps: [
          { text: "Coupez les ongles droit, puis arrondissez légèrement les bords à la lime.", seconds: 60, diagram: "groom" },
          { text: "Repoussez doucement les cuticules après une douche, quand elles sont les plus souples — ne les coupez jamais.", seconds: 20, diagram: "press" },
          { text: "Terminez par une crème pour les mains, surtout si vous vous les lavez souvent.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Les mains sont constamment visibles en conversation — un petit détail, remarqué de façon disproportionnée."],
      },
    },
  },
  {
    keywords: ["fragrance + skin base"],
    guide: {
      en:       {
        title: "Fragrance & Skin-Base Routine",
        steps: [
          { text: "Apply fragrance to pulse points (wrists, neck) right after a shower, on slightly damp skin, so it lasts longer.", seconds: 30, diagram: "apply" },
          { text: "Keep it to 2–3 sprays — the goal is someone noticing up close, not across the room.", seconds: 15, diagram: "general" },
          { text: "For skin base, a light, even tone product only where needed, blended well at the jawline so there’s no visible line.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Correct application makes a small amount of product last the whole day."],
      },
      fr:       {
        title: "Routine parfum et base de peau",
        steps: [
          { text: "Appliquez le parfum sur les points de pulsation (poignets, cou) juste après la douche, sur peau légèrement humide, pour qu’il tienne plus longtemps.", seconds: 30, diagram: "apply" },
          { text: "Limitez-vous à 2 ou 3 pulvérisations — l’objectif est d’être remarqué de près, pas depuis l’autre bout de la pièce.", seconds: 15, diagram: "general" },
          { text: "Pour la base de peau, un produit léger et uniforme uniquement où nécessaire, bien fondu au niveau de la mâchoire pour qu’aucune ligne ne soit visible.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Une bonne application fait durer une petite quantité de produit toute la journée."],
      },
    },
  },
  {
    keywords: ["edge-up touch-ups"],
    guide: {
      en:       {
        title: "Edge-Up Touch-Ups",
        steps: [
          { text: "Use a trimmer to clean up the hairline and beard edges that grow back fastest — sideburns, neckline, cheek line.", seconds: 60, diagram: "groom" },
          { text: "Follow the same lines your barber set, don’t redesign them yourself between full cuts.", seconds: 60, diagram: "groom" },
          { text: "A quick touch-up every few days keeps the shape sharp without a full trim.", seconds: 60, diagram: "groom" },
        ],
        benefits: ["Keeps the sharp lines from your last haircut and beard shape from softening between sessions."],
      },
      fr:       {
        title: "Retouches de contours",
        steps: [
          { text: "Utilisez une tondeuse pour nettoyer la ligne de cheveux et les contours de barbe qui repoussent le plus vite — pattes, ligne de cou, ligne de joue.", seconds: 60, diagram: "groom" },
          { text: "Suivez les mêmes lignes fixées par votre coiffeur, ne les redessinez pas vous-même entre deux coupes complètes.", seconds: 60, diagram: "groom" },
          { text: "Une retouche rapide tous les quelques jours garde la forme nette sans une coupe complète.", seconds: 60, diagram: "groom" },
        ],
        benefits: ["Empêche les lignes nettes de votre dernière coupe et forme de barbe de s’estomper entre les séances."],
      },
    },
  },
  {
    keywords: ["wardrobe fit check"],
    guide: {
      en:       {
        title: "Wardrobe Fit Check",
        steps: [
          { text: "Try on your top 3 go-to outfits and check the fit at the shoulders, chest and waist — not just whether it \"fits\" loosely.", seconds: 10, diagram: "check" },
          { text: "Set aside anything clearly too big or too small rather than wearing it out of habit.", seconds: 30, diagram: "repeat" },
          { text: "Note what actually flatters your current build so future purchases target that fit.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Well-fitted clothing changes how your whole physique reads, independent of any training progress."],
      },
      fr:       {
        title: "Vérification de la garde-robe",
        steps: [
          { text: "Essayez vos 3 tenues favorites et vérifiez la coupe aux épaules, à la poitrine et à la taille — pas juste si ça « rentre » vaguement.", seconds: 10, diagram: "check" },
          { text: "Mettez de côté tout ce qui est clairement trop grand ou trop petit plutôt que de le porter par habitude.", seconds: 30, diagram: "repeat" },
          { text: "Notez ce qui met réellement en valeur votre carrure actuelle pour orienter vos futurs achats.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Des vêtements bien ajustés changent la lecture de toute votre silhouette, indépendamment des progrès à l’entraînement."],
      },
    },
  },
  {
    keywords: ["restock products"],
    guide: {
      en:       {
        title: "Restock Low Products",
        steps: [
          { text: "Check every product used daily in your routine — skincare, whitening, grooming tools — for how much is left.", seconds: 10, diagram: "check" },
          { text: "Reorder anything below about a week’s supply now, before it runs out mid-routine.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Running out mid-routine is one of the most common reasons habits quietly stop."],
      },
      fr:       {
        title: "Réapprovisionner les produits en fin de stock",
        steps: [
          { text: "Vérifiez chaque produit utilisé quotidiennement dans votre routine — soin, blanchiment, outils de grooming — pour voir ce qu’il reste.", seconds: 10, diagram: "check" },
          { text: "Recommandez tout ce qui représente moins d’une semaine d’utilisation, avant la rupture en pleine routine.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Manquer d’un produit en pleine routine est l’une des raisons les plus courantes pour lesquelles une habitude s’arrête sans qu’on s’en rende compte."],
      },
    },
  },
  {
    keywords: ["set weekly maintenance schedule"],
    guide: {
      en:       {
        title: "Set a Weekly Maintenance Schedule",
        steps: [
          { text: "Pick fixed days for recurring upkeep — edge-ups, nails, restocking — instead of doing them whenever you remember.", seconds: 10, diagram: "check" },
          { text: "Write the schedule down or set recurring reminders so it doesn’t rely on memory.", seconds: 30, diagram: "repeat" },
        ],
        benefits: ["A repeatable weekly rhythm is what keeps the whole system running after the 28 days end."],
      },
      fr:       {
        title: "Fixer un calendrier d’entretien hebdomadaire",
        steps: [
          { text: "Choisissez des jours fixes pour l’entretien récurrent — retouches, ongles, réapprovisionnement — plutôt que de les faire quand vous y pensez.", seconds: 10, diagram: "check" },
          { text: "Notez le calendrier ou réglez des rappels récurrents pour ne pas dépendre de votre mémoire.", seconds: 30, diagram: "repeat" },
        ],
        benefits: ["Un rythme hebdomadaire reproductible est ce qui fait tourner tout le système après la fin des 28 jours."],
      },
    },
  },
  {
    keywords: ["full grooming pass"],
    guide: {
      en:       {
        title: "Grooming Recap Pass",
        steps: [
          { text: "In one session, touch up brows, beard/shave line, hair styling, nails and fragrance together.", seconds: 60, diagram: "groom" },
          { text: "Take your styled progress photo right after, while everything is freshly done.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Confirms every part of the system — hair, face, hands, scent — still works together as one presentation."],
      },
      fr:       {
        title: "Passage de récapitulatif — Grooming",
        steps: [
          { text: "En une seule séance, retouchez sourcils, ligne de barbe/rasage, coiffage, ongles et parfum ensemble.", seconds: 60, diagram: "groom" },
          { text: "Prenez votre photo de progression stylée juste après, pendant que tout est fraîchement fait.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Confirme que chaque élément du système — cheveux, visage, mains, parfum — fonctionne encore ensemble comme une seule présentation."],
      },
    },
  },
  {
    keywords: ["protein target", "protein:", "hit protein"],
    guide: {
      en:       {
        title: "Protein Target",
        steps: [
          { text: "Divide your daily protein target across 3–4 meals rather than one large serving.", seconds: 15, diagram: "diet" },
          { text: "Prioritize complete protein sources — meat, fish, eggs, dairy — with legumes as a supplement, not the sole source.", seconds: 15, diagram: "diet" },
          { text: "Track it for the first couple of weeks until you know your usual meals well enough to estimate by eye.", seconds: 10, diagram: "check" },
        ],
        benefits: ["The body can only use so much protein at once, so spreading it out improves results."],
      },
      fr:       {
        title: "Objectif protéines",
        steps: [
          { text: "Répartissez votre objectif quotidien de protéines sur 3 à 4 repas plutôt qu’une seule grosse portion.", seconds: 15, diagram: "diet" },
          { text: "Privilégiez les sources de protéines complètes — viande, poisson, œufs, produits laitiers — avec les légumineuses en complément, pas comme seule source.", seconds: 15, diagram: "diet" },
          { text: "Suivez-le pendant les deux premières semaines jusqu’à bien connaître vos repas habituels pour estimer à l’œil.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Le corps ne peut utiliser qu’une certaine quantité de protéines à la fois, donc les répartir améliore les résultats."],
      },
    },
  },
  {
    keywords: ["cut liquid sugar"],
    guide: {
      en:       {
        title: "Cut Liquid Sugar & Seed-Oil Fried Food",
        steps: [
          { text: "Replace soda, juice and sweetened drinks with water, black coffee or unsweetened tea.", seconds: 15, diagram: "general" },
          { text: "Cut food fried in seed oils (most fast food and packaged snacks) in favor of home-cooked meals with olive oil or butter.", seconds: 15, diagram: "diet" },
        ],
        benefits: ["Liquid sugar causes the sharpest blood-sugar spikes, which directly suppress testosterone production."],
      },
      fr:       {
        title: "Supprimer le sucre liquide et les fritures à l’huile de graines",
        steps: [
          { text: "Remplacez sodas, jus et boissons sucrées par de l’eau, du café noir ou du thé non sucré.", seconds: 15, diagram: "general" },
          { text: "Supprimez les aliments frits dans l’huile de graines (la plupart des fast-foods et snacks industriels) au profit de repas faits maison à l’huile d’olive ou au beurre.", seconds: 15, diagram: "diet" },
        ],
        benefits: ["Le sucre liquide provoque les pics de glycémie les plus marqués, qui suppriment directement la production de testostérone."],
      },
    },
  },
  {
    keywords: ["whole-food carbs"],
    guide: {
      en:       {
        title: "Whole-Food Carbs Only",
        steps: [
          { text: "Choose rice, oats, potatoes and fruit over bread, pastries and packaged carb sources.", seconds: 10, diagram: "check" },
          { text: "Pair carbs with protein or fat at the same meal to blunt the blood-sugar spike.", seconds: 15, diagram: "diet" },
        ],
        benefits: ["Whole-food carbs digest more slowly, which keeps insulin — and by extension testosterone — more stable."],
      },
      fr:       {
        title: "Glucides uniquement issus d’aliments complets",
        steps: [
          { text: "Choisissez riz, flocons d’avoine, pommes de terre et fruits plutôt que pain, viennoiseries et glucides industriels.", seconds: 10, diagram: "check" },
          { text: "Associez les glucides à une protéine ou un lipide au même repas pour atténuer le pic de glycémie.", seconds: 15, diagram: "diet" },
        ],
        benefits: ["Les glucides issus d’aliments complets se digèrent plus lentement, ce qui garde l’insuline — et donc la testostérone — plus stable."],
      },
    },
  },
  {
    keywords: ["zinc + magnesium"],
    guide: {
      en:       {
        title: "Zinc & Magnesium Rich Meals",
        steps: [
          { text: "Include a zinc source (red meat, shellfish, pumpkin seeds) at least once daily.", seconds: 15, diagram: "general" },
          { text: "Include a magnesium source (leafy greens, nuts, dark chocolate) at least once daily, ideally in the evening.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Both minerals are directly involved in testosterone production and are commonly under-eaten."],
      },
      fr:       {
        title: "Repas riches en zinc et magnésium",
        steps: [
          { text: "Incluez une source de zinc (viande rouge, fruits de mer, graines de courge) au moins une fois par jour.", seconds: 15, diagram: "general" },
          { text: "Incluez une source de magnésium (légumes verts, noix, chocolat noir) au moins une fois par jour, idéalement le soir.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Ces deux minéraux sont directement impliqués dans la production de testostérone et souvent sous-consommés."],
      },
    },
  },
  {
    keywords: ["strength train", "resistance training progression"],
    guide: {
      en:       {
        title: "Strength Training Progression",
        steps: [
          { text: "Favor compound movements (squats, presses, rows, deadlifts) that work multiple muscle groups at once.", seconds: 15, diagram: "general" },
          { text: "Add small amounts of weight or repetitions week to week rather than jumping too fast.", seconds: 15, diagram: "general" },
          { text: "Prioritize consistent, gradual overload over sporadic maxing out.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Compound movements drive the biggest hormonal response per session."],
      },
      fr:       {
        title: "Progression en musculation",
        steps: [
          { text: "Privilégiez les mouvements polyarticulaires (squats, développés, rowing, soulevé de terre) qui sollicitent plusieurs groupes musculaires à la fois.", seconds: 15, diagram: "general" },
          { text: "Ajoutez de petites quantités de poids ou de répétitions semaine après semaine plutôt que d’avancer trop vite.", seconds: 15, diagram: "general" },
          { text: "Priorisez une surcharge progressive et régulière plutôt que des efforts maximaux sporadiques.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Les mouvements polyarticulaires déclenchent la plus grande réponse hormonale par séance."],
      },
    },
  },
  {
    keywords: ["fasting"],
    guide: {
      en:       {
        title: "Overnight Fasting Window",
        steps: [
          { text: "Stop eating at least 12 hours before your first meal the next day — usually just means no late-night snacking.", seconds: 15, diagram: "diet" },
          { text: "Keep the window consistent night to night rather than fasting 15 hours one day and 8 the next.", seconds: 10, diagram: "check" },
        ],
        benefits: ["A consistent overnight fast supports insulin sensitivity, which keeps blood sugar — and hormone signaling — more stable."],
      },
      fr:       {
        title: "Fenêtre de jeûne nocturne",
        steps: [
          { text: "Arrêtez de manger au moins 12 heures avant votre premier repas du lendemain — cela revient souvent à simplement éviter le grignotage tardif.", seconds: 15, diagram: "diet" },
          { text: "Gardez cette fenêtre constante d’une nuit à l’autre plutôt que de jeûner 15 heures un jour et 8 le lendemain.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Un jeûne nocturne constant soutient la sensibilité à l’insuline, ce qui garde la glycémie — et la signalisation hormonale — plus stable."],
      },
    },
  },
  {
    keywords: ["healthy fats"],
    guide: {
      en:       {
        title: "Healthy Fats",
        steps: [
          { text: "Include eggs, olive oil and fatty fish (salmon, sardines) regularly through the week.", seconds: 15, diagram: "general" },
          { text: "Don’t default to low-fat versions of foods — dietary cholesterol from these sources is a literal building block for testosterone.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Directly supports hormone production, unlike carbs or protein alone."],
      },
      fr:       {
        title: "Bonnes graisses",
        steps: [
          { text: "Incluez régulièrement œufs, huile d’olive et poissons gras (saumon, sardines) sur la semaine.", seconds: 15, diagram: "general" },
          { text: "Ne vous rabattez pas par défaut sur des versions allégées — le cholestérol alimentaire de ces sources est un élément constitutif direct de la testostérone.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Soutient directement la production hormonale, contrairement aux glucides ou aux protéines seuls."],
      },
    },
  },
  {
    keywords: ["stress / cortisol wind-down"],
    guide: {
      en:       {
        title: "Stress & Cortisol Wind-Down",
        steps: [
          { text: "Set aside 10–15 minutes each evening for something that actively lowers stress: slow breathing, a short walk, journaling or stretching.", seconds: 600, diagram: "repeat" },
          { text: "Keep it screen-free and separate from your regular evening wind-down routine.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Chronically elevated cortisol directly suppresses testosterone production."],
      },
      fr:       {
        title: "Décompression du stress et du cortisol",
        steps: [
          { text: "Réservez 10 à 15 minutes chaque soir à quelque chose qui réduit activement le stress : respiration lente, courte marche, journaling ou étirements.", seconds: 600, diagram: "repeat" },
          { text: "Gardez ce moment sans écran et séparé de votre rituel du soir habituel.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Un cortisol chroniquement élevé supprime directement la production de testostérone."],
      },
    },
  },
  {
    keywords: ["full nutrient-dense day"],
    guide: {
      en:       {
        title: "Hormonal Recap Day",
        steps: [
          { text: "Combine your protein target, healthy fats, zinc/magnesium meals and overnight fast into one full day.", seconds: 15, diagram: "diet" },
          { text: "Note your energy, mood and training performance at the end of the day.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Confirms every nutrition principle from the past three weeks fits together in a single real day, not just in isolation."],
      },
      fr:       {
        title: "Journée de récapitulatif — Régime hormonal",
        steps: [
          { text: "Combinez votre objectif protéines, les bonnes graisses, les repas zinc/magnésium et le jeûne nocturne en une seule journée complète.", seconds: 15, diagram: "diet" },
          { text: "Notez votre énergie, votre humeur et votre performance à l’entraînement en fin de journée.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Confirme que tous les principes nutritionnels des trois dernières semaines s’articulent en une vraie journée, pas seulement isolément."],
      },
    },
  },
  {
    keywords: ["track measurements"],
    guide: {
      en:       {
        title: "Track Measurements & Energy",
        steps: [
          { text: "Measure your waist and note your energy level (1–10) at the same time each week.", seconds: 10, diagram: "check" },
          { text: "Write both down somewhere you’ll actually see again — a note, the app’s tracker, or a calendar.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Hormonal shifts show up in waist measurement and energy before they show up anywhere else."],
      },
      fr:       {
        title: "Suivi des mensurations et de l’énergie",
        steps: [
          { text: "Mesurez votre tour de taille et notez votre niveau d’énergie (1 à 10) au même moment chaque semaine.", seconds: 10, diagram: "check" },
          { text: "Notez les deux quelque part que vous reverrez vraiment — une note, le suivi de l’application, ou un calendrier.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Les changements hormonaux se manifestent dans le tour de taille et l’énergie avant de se voir ailleurs."],
      },
    },
  },
  {
    keywords: ["fixed wake time", "set permanent sleep schedule"],
    guide: {
      en:       {
        title: "Fixed Wake Time",
        steps: [
          { text: "Pick one wake-up time and keep it every day this week, weekends included.", seconds: 10, diagram: "check" },
          { text: "Use an alarm rather than trying to wake naturally while your rhythm is still resetting.", seconds: 15, diagram: "general" },
          { text: "Once the week proves it, keep that same time permanently rather than treating it as a temporary experiment.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Wake time anchors your circadian rhythm more strongly than bedtime does."],
      },
      fr:       {
        title: "Heure de réveil fixe",
        steps: [
          { text: "Choisissez une heure de réveil et gardez-la chaque jour cette semaine, week-end compris.", seconds: 10, diagram: "check" },
          { text: "Utilisez une alarme plutôt que d’essayer de vous réveiller naturellement pendant que votre rythme se recalibre encore.", seconds: 15, diagram: "general" },
          { text: "Une fois la semaine validée, gardez cette même heure de façon permanente plutôt que de la traiter comme un essai temporaire.", seconds: 15, diagram: "general" },
        ],
        benefits: ["L’heure de réveil ancre le rythme circadien plus fortement que l’heure du coucher."],
      },
    },
  },
  {
    keywords: ["morning sunlight", "sunlight 15 min"],
    guide: {
      en:       {
        title: "Morning Sunlight",
        steps: [
          { text: "Get outside, or at least right next to a window, within 30 minutes of waking.", seconds: 600, diagram: "general" },
          { text: "Aim for roughly 15 minutes of direct light exposure — no sunglasses needed for this.", seconds: 600, diagram: "general" },
          { text: "On overcast days, stay outside longer; even cloudy daylight is far brighter than indoor lighting.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Morning light exposure is the strongest signal that locks in your circadian rhythm."],
      },
      fr:       {
        title: "Lumière du soleil le matin",
        steps: [
          { text: "Sortez, ou au moins installez-vous juste à côté d’une fenêtre, dans les 30 minutes suivant le réveil.", seconds: 600, diagram: "general" },
          { text: "Visez environ 15 minutes d’exposition directe à la lumière — pas besoin de lunettes de soleil pour cela.", seconds: 600, diagram: "general" },
          { text: "Les jours nuageux, restez dehors plus longtemps ; même une lumière voilée est bien plus intense qu’un éclairage intérieur.", seconds: 15, diagram: "general" },
        ],
        benefits: ["L’exposition à la lumière du matin est le signal le plus fort pour verrouiller le rythme circadien."],
      },
    },
  },
  {
    keywords: ["no caffeine after"],
    guide: {
      en:       {
        title: "Caffeine Cutoff",
        steps: [
          { text: "Have your last caffeine (coffee, tea, energy drinks) by early-to-mid afternoon at the latest.", seconds: 15, diagram: "general" },
          { text: "Watch for hidden caffeine in chocolate or some sodas if you’re sensitive.", seconds: 15, diagram: "general" },
          { text: "Switch to herbal tea or water for anything you’d normally drink later in the day.", seconds: 15, diagram: "diet" },
        ],
        benefits: ["Caffeine has a long half-life — an afternoon cup can still be affecting sleep depth that night."],
      },
      fr:       {
        title: "Heure limite pour la caféine",
        steps: [
          { text: "Prenez votre dernière caféine (café, thé, boissons énergisantes) au plus tard en début ou milieu d’après-midi.", seconds: 15, diagram: "general" },
          { text: "Faites attention à la caféine cachée dans le chocolat ou certains sodas si vous y êtes sensible.", seconds: 15, diagram: "general" },
          { text: "Passez à une tisane ou de l’eau pour tout ce que vous boiriez normalement plus tard dans la journée.", seconds: 15, diagram: "diet" },
        ],
        benefits: ["La caféine a une longue demi-vie — un café pris l’après-midi peut encore affecter la profondeur du sommeil ce soir-là."],
      },
    },
  },
  {
    keywords: ["cool, dark room"],
    guide: {
      en:       {
        title: "Cool, Dark Room",
        steps: [
          { text: "Set the bedroom temperature to around 18°C — cooler than most people default to.", seconds: 30, diagram: "repeat" },
          { text: "Block outside light with blackout curtains or an eye mask.", seconds: 15, diagram: "general" },
          { text: "Cover or turn away any small standby lights from electronics.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Body temperature naturally drops to initiate sleep, so a cool room works with that process instead of against it."],
      },
      fr:       {
        title: "Chambre fraîche et sombre",
        steps: [
          { text: "Réglez la température de la chambre autour de 18°C — plus frais que ce à quoi la plupart des gens sont habitués.", seconds: 30, diagram: "repeat" },
          { text: "Bloquez la lumière extérieure avec des rideaux occultants ou un masque de sommeil.", seconds: 15, diagram: "general" },
          { text: "Couvrez ou détournez les petites veilleuses des appareils électroniques.", seconds: 15, diagram: "general" },
        ],
        benefits: ["La température du corps baisse naturellement pour déclencher le sommeil, donc une chambre fraîche accompagne ce processus au lieu de le contrarier."],
      },
    },
  },
  {
    keywords: ["no large meals"],
    guide: {
      en:       {
        title: "No Large Meals Before Bed",
        steps: [
          { text: "Finish your last substantial meal at least 3 hours before bedtime.", seconds: 15, diagram: "diet" },
          { text: "If you’re hungry later, keep it small and light rather than skipping this rule entirely.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Digestion competes with the body’s ability to lower core temperature and fall into deep sleep."],
      },
      fr:       {
        title: "Pas de gros repas avant le coucher",
        steps: [
          { text: "Terminez votre dernier repas conséquent au moins 3 heures avant le coucher.", seconds: 15, diagram: "diet" },
          { text: "Si la faim se fait sentir plus tard, privilégiez quelque chose de léger plutôt que d’ignorer complètement cette règle.", seconds: 15, diagram: "general" },
        ],
        benefits: ["La digestion entre en concurrence avec la capacité du corps à baisser sa température centrale et à entrer en sommeil profond."],
      },
    },
  },
  {
    keywords: ["consistent bedtime"],
    guide: {
      en:       {
        title: "Consistent Bedtime",
        steps: [
          { text: "Pick a target bedtime that gives you a full night before your fixed wake time.", seconds: 10, diagram: "check" },
          { text: "Stay within about ±15 minutes of it every night, weekends included.", seconds: 600, diagram: "general" },
          { text: "Start your wind-down routine early enough that you’re actually ready at that time, not just in bed scrolling.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Consistency matters more than the exact hour chosen — the body learns the rhythm either way."],
      },
      fr:       {
        title: "Heure de coucher constante",
        steps: [
          { text: "Choisissez une heure de coucher cible qui vous laisse une nuit complète avant votre heure de réveil fixe.", seconds: 10, diagram: "check" },
          { text: "Restez à environ ±15 minutes de cette heure chaque soir, week-end compris.", seconds: 600, diagram: "general" },
          { text: "Commencez votre rituel du soir assez tôt pour être vraiment prêt à cette heure-là, pas juste au lit en train de défiler sur votre téléphone.", seconds: 15, diagram: "general" },
        ],
        benefits: ["La régularité compte plus que l’heure exacte choisie — le corps apprend le rythme dans les deux cas."],
      },
    },
  },
  {
    keywords: ["magnesium + no alcohol"],
    guide: {
      en:       {
        title: "Magnesium + No-Alcohol Test",
        steps: [
          { text: "Take a magnesium supplement in the evening (check the label for timing and dose).", seconds: 10, diagram: "check" },
          { text: "Cut alcohol entirely for this test period, even small amounts.", seconds: 15, diagram: "general" },
          { text: "Compare how you sleep and feel in the morning against your usual baseline.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Alcohol fragments deep sleep even when total hours look normal — this isolates that effect."],
      },
      fr:       {
        title: "Test magnésium et sans alcool",
        steps: [
          { text: "Prenez un supplément de magnésium le soir (vérifiez le dosage et le moment sur l’étiquette).", seconds: 10, diagram: "check" },
          { text: "Supprimez complètement l’alcool pendant cette période de test, même en petite quantité.", seconds: 15, diagram: "general" },
          { text: "Comparez votre sommeil et votre forme au réveil par rapport à votre référence habituelle.", seconds: 10, diagram: "check" },
        ],
        benefits: ["L’alcool fragmente le sommeil profond même quand le nombre d’heures total paraît normal — ce test isole cet effet."],
      },
    },
  },
  {
    keywords: ["blue-light filter"],
    guide: {
      en:       {
        title: "Blue-Light Filter After Sunset",
        steps: [
          { text: "Turn on your phone and computer’s built-in night mode or blue-light filter as soon as the sun sets.", seconds: 15, diagram: "general" },
          { text: "Dim overhead lights and switch to warmer, lower lamps in the evening.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Blue light is the specific wavelength that most strongly delays melatonin release."],
      },
      fr:       {
        title: "Filtre de lumière bleue après le coucher du soleil",
        steps: [
          { text: "Activez le mode nuit ou le filtre de lumière bleue intégré de votre téléphone et ordinateur dès le coucher du soleil.", seconds: 15, diagram: "general" },
          { text: "Baissez l’éclairage principal et passez à des lampes plus chaudes et plus tamisées le soir.", seconds: 15, diagram: "general" },
        ],
        benefits: ["La lumière bleue est la longueur d’onde qui retarde le plus fortement la libération de mélatonine."],
      },
    },
  },
  {
    keywords: ["breathing / relaxation"],
    guide: {
      en:       {
        title: "Breathing & Relaxation Practice",
        steps: [
          { text: "Lie down or sit comfortably, then breathe in for 4 counts, hold for 4, and out for 6–8.", seconds: 20, diagram: "hold" },
          { text: "Continue for about 5 minutes, letting each exhale be slightly longer than the inhale.", seconds: 300, diagram: "breathe" },
        ],
        benefits: ["A longer exhale activates the body’s relaxation response, which helps you fall asleep faster."],
      },
      fr:       {
        title: "Pratique de respiration et relaxation",
        steps: [
          { text: "Allongé ou assis confortablement, inspirez sur 4 temps, retenez 4 temps, puis expirez sur 6 à 8 temps.", seconds: 20, diagram: "hold" },
          { text: "Continuez pendant environ 5 minutes, en laissant chaque expiration légèrement plus longue que l’inspiration.", seconds: 300, diagram: "breathe" },
        ],
        benefits: ["Une expiration plus longue active la réponse de relaxation du corps, ce qui aide à s’endormir plus vite."],
      },
    },
  },
  {
    keywords: ["track sleep + morning puffiness", "review de-puff in am"],
    guide: {
      en:       {
        title: "Track Sleep & Morning Puffiness",
        steps: [
          { text: "Note roughly how many hours you slept and rate morning facial puffiness (1–10) as soon as you wake up.", seconds: 10, diagram: "check" },
          { text: "Compare against your progress photos from the same morning to keep the rating honest.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Morning puffiness is a direct, visible readout of sleep quality — this is how you confirm the protocol is actually working, not just being followed."],
      },
      fr:       {
        title: "Suivi du sommeil et des poches du matin",
        steps: [
          { text: "Notez approximativement vos heures de sommeil et évaluez les poches du matin (1 à 10) dès le réveil.", seconds: 10, diagram: "check" },
          { text: "Comparez avec vos photos de progression du même matin pour garder une évaluation honnête.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Les poches du matin sont un indicateur direct et visible de la qualité du sommeil — c’est ainsi que vous confirmez que le protocole fonctionne réellement, pas seulement qu’il est suivi."],
      },
    },
  },
  {
    keywords: ["full protocol nightly"],
    guide: {
      en:       {
        title: "Full Sleep Protocol Nightly",
        steps: [
          { text: "Run the complete routine every night this week: fixed wake time, morning sunlight, caffeine cutoff, cool dark room, and the wind-down ritual.", seconds: 15, diagram: "general" },
          { text: "Don’t skip any single piece, even on an off day — this week is specifically testing whether it holds together as one system.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Confirms every piece works as one system, not as isolated habits that only sometimes align."],
      },
      fr:       {
        title: "Protocole de sommeil complet chaque soir",
        steps: [
          { text: "Appliquez la routine complète chaque soir cette semaine : heure de réveil fixe, lumière du matin, limite de caféine, chambre fraîche et sombre, et le rituel de décompression.", seconds: 15, diagram: "general" },
          { text: "Ne sautez aucun élément, même un jour compliqué — cette semaine teste spécifiquement si tout tient ensemble comme un seul système.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Confirme que chaque élément fonctionne comme un seul système, pas comme des habitudes isolées qui ne s’alignent que parfois."],
      },
    },
  },
  {
    keywords: ["consistent 8h achieved", "sleep 8h window", "sleep 7.5h"],
    guide: {
      en:       {
        title: "Consistent Sleep Duration Target",
        steps: [
          { text: "Set your bedtime and wake time so you get the target number of hours the program calls for this week.", seconds: 30, diagram: "repeat" },
          { text: "Track for several nights in a row — one good night doesn’t confirm a consistent window.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Consistent duration, not just occasional long nights, is what recovery and skin quality actually depend on."],
      },
      fr:       {
        title: "Objectif de durée de sommeil constante",
        steps: [
          { text: "Réglez votre heure de coucher et de réveil pour atteindre le nombre d’heures visé cette semaine par le programme.", seconds: 30, diagram: "repeat" },
          { text: "Suivez sur plusieurs nuits d’affilée — une seule bonne nuit ne confirme pas une durée constante.", seconds: 10, diagram: "check" },
        ],
        benefits: ["C’est la durée constante, pas seulement des nuits occasionnellement longues, dont dépendent réellement la récupération et la qualité de la peau."],
      },
    },
  },
  {
    keywords: ["screens off"],
    guide: {
      en:       {
        title: "Screens Off Before Bed",
        steps: [
          { text: "Stop all screens — phone, TV, laptop — at least 60 minutes before your target bedtime.", seconds: 600, diagram: "general" },
          { text: "Replace that time with something low-stimulation: reading, stretching, or dimming the lights.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Blue light delays melatonin release, so cutting it helps you fall asleep faster."],
      },
      fr:       {
        title: "Écrans éteints avant le coucher",
        steps: [
          { text: "Arrêtez tous les écrans — téléphone, télévision, ordinateur — au moins 60 minutes avant l’heure de coucher visée.", seconds: 600, diagram: "general" },
          { text: "Remplacez ce temps par quelque chose de peu stimulant : lecture, étirements, ou lumières tamisées.", seconds: 15, diagram: "general" },
        ],
        benefits: ["La lumière bleue retarde la libération de mélatonine, donc la couper aide à s’endormir plus vite."],
      },
    },
  },
  {
    keywords: ["wind-down routine"],
    guide: {
      en:       {
        title: "Evening Wind-Down Routine",
        steps: [
          { text: "Set aside 30 minutes before bed for the same sequence every night: dim lights, a calm activity, then bed.", seconds: 600, diagram: "repeat" },
          { text: "Keep it screen-free and low-stimulation throughout.", seconds: 15, diagram: "general" },
        ],
        benefits: ["A consistent cue trains your body to associate it with sleep approaching."],
      },
      fr:       {
        title: "Rituel de décompression du soir",
        steps: [
          { text: "Réservez 30 minutes avant le coucher pour la même séquence chaque soir : lumières tamisées, activité calme, puis coucher.", seconds: 600, diagram: "repeat" },
          { text: "Gardez ce moment sans écran et peu stimulant tout du long.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Un signal cohérent entraîne le corps à l’associer à l’arrivée du sommeil."],
      },
    },
  },
  {
    keywords: ["500ml on waking"],
    guide: {
      en:       {
        title: "Water on Waking",
        steps: [
          { text: "Drink about 500ml of water within the first few minutes of waking, before coffee or anything else.", seconds: 15, diagram: "diet" },
          { text: "Keep a glass or bottle by your bed the night before so it’s the first thing you see.", seconds: 15, diagram: "general" },
        ],
        benefits: ["You wake up mildly dehydrated after 7–8 hours without fluids — this is the fastest way to correct it."],
      },
      fr:       {
        title: "Eau au réveil",
        steps: [
          { text: "Buvez environ 500 ml d’eau dans les premières minutes après le réveil, avant le café ou toute autre chose.", seconds: 15, diagram: "diet" },
          { text: "Gardez un verre ou une bouteille près du lit la veille au soir pour que ce soit la première chose que vous voyiez.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Vous vous réveillez légèrement déshydraté après 7 à 8 heures sans liquide — c’est le moyen le plus rapide d’y remédier."],
      },
    },
  },
  {
    keywords: ["reach 2.5l", "3l water target", "consistent 3l", "water:", "water target"],
    guide: {
      en:       {
        title: "Daily Water Target",
        steps: [
          { text: "Spread your total water target across the whole day rather than drinking it all at once.", seconds: 15, diagram: "general" },
          { text: "Keep a marked bottle nearby so you can see progress at a glance instead of guessing.", seconds: 15, diagram: "general" },
          { text: "The body absorbs a steady intake much better than a flood, so little and often beats catching up late in the day.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Well-hydrated skin looks visibly plumper and less puffy."],
      },
      fr:       {
        title: "Objectif d’eau quotidien",
        steps: [
          { text: "Répartissez votre objectif d’eau total sur toute la journée plutôt que de tout boire d’un coup.", seconds: 15, diagram: "general" },
          { text: "Gardez une bouteille graduée à portée de main pour voir votre progression d’un coup d’œil plutôt que de deviner.", seconds: 15, diagram: "general" },
          { text: "Le corps absorbe bien mieux un apport régulier qu’un afflux soudain, donc peu et souvent vaut mieux que rattraper en fin de journée.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Une peau bien hydratée paraît visiblement plus repulpée et moins gonflée."],
      },
    },
  },
  {
    keywords: ["add electrolytes", "electrolytes am + post-training", "sodium/potassium", "hydration + electrolytes"],
    guide: {
      en:       {
        title: "Electrolyte Balance",
        steps: [
          { text: "Add a pinch of salt or an electrolyte packet once daily, and again after training if you sweat heavily.", seconds: 20, diagram: "press" },
          { text: "Balance sodium with potassium-rich foods (bananas, leafy greens, potatoes) rather than salt alone.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Minerals let cells actually hold onto the water you drink instead of flushing it straight out."],
      },
      fr:       {
        title: "Équilibre en électrolytes",
        steps: [
          { text: "Ajoutez une pincée de sel ou un sachet d’électrolytes une fois par jour, et à nouveau après l’entraînement en cas de forte transpiration.", seconds: 20, diagram: "press" },
          { text: "Équilibrez le sodium avec des aliments riches en potassium (bananes, légumes verts, pommes de terre) plutôt que le sel seul.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Les minéraux permettent aux cellules de vraiment retenir l’eau que vous buvez au lieu de l’évacuer directement."],
      },
    },
  },
  {
    keywords: ["cut excess salt"],
    guide: {
      en:       {
        title: "Cut Excess Salt",
        steps: [
          { text: "Cut back on packaged and restaurant food, which carries most of the excess sodium in a typical diet.", seconds: 15, diagram: "diet" },
          { text: "Cook more meals at home where you control the salt directly.", seconds: 15, diagram: "general" },
          { text: "This is about excess salt on top of meals, not the electrolytes you deliberately add — those stay.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Excess sodium is one of the biggest drivers of water retention and visible facial puffiness."],
      },
      fr:       {
        title: "Réduire l’excès de sel",
        steps: [
          { text: "Réduisez les plats industriels et de restaurant, qui apportent l’essentiel du sodium en excès dans une alimentation typique.", seconds: 15, diagram: "diet" },
          { text: "Cuisinez davantage à la maison, où vous contrôlez directement la quantité de sel.", seconds: 15, diagram: "general" },
          { text: "Il s’agit de l’excès de sel ajouté aux repas, pas des électrolytes ajoutés volontairement — ceux-là restent.", seconds: 15, diagram: "general" },
        ],
        benefits: ["L’excès de sodium est l’un des plus grands facteurs de rétention d’eau et de poches visibles sur le visage."],
      },
    },
  },
  {
    keywords: ["herbal tea"],
    guide: {
      en:       {
        title: "Herbal Tea Instead of Late Caffeine",
        steps: [
          { text: "Swap any caffeine you’d normally have later in the day for a caffeine-free herbal tea (chamomile, peppermint, rooibos).", seconds: 15, diagram: "general" },
          { text: "Use it as part of your water target too — it still counts toward daily fluid intake.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Keeps a warm, habitual drink in your routine without the sleep-disrupting effect of late caffeine."],
      },
      fr:       {
        title: "Tisane à la place de la caféine tardive",
        steps: [
          { text: "Remplacez toute caféine que vous prendriez normalement plus tard dans la journée par une tisane sans caféine (camomille, menthe poivrée, rooibos).", seconds: 15, diagram: "general" },
          { text: "Intégrez-la aussi à votre objectif d’eau — elle compte tout de même dans l’apport en liquide quotidien.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Garde une boisson chaude et rituelle dans votre routine sans l’effet perturbateur de la caféine tardive sur le sommeil."],
      },
    },
  },
  {
    keywords: ["front-load water"],
    guide: {
      en:       {
        title: "Front-Load Water Before Evening",
        steps: [
          { text: "Aim to hit most of your daily water target before early evening rather than drinking it all at night.", seconds: 15, diagram: "general" },
          { text: "Taper off in the hours before bed so you’re not waking up for bathroom trips.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Timing matters here almost as much as total volume — front-loading reduces overnight puffiness directly."],
      },
      fr:       {
        title: "Répartir l’eau avant le soir",
        steps: [
          { text: "Visez à atteindre l’essentiel de votre objectif d’eau avant le début de soirée plutôt que de tout boire le soir.", seconds: 15, diagram: "general" },
          { text: "Réduisez dans les heures précédant le coucher pour éviter de vous réveiller pour aller aux toilettes.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Le timing compte ici presque autant que le volume total — répartir l’eau plus tôt réduit directement les poches nocturnes."],
      },
    },
  },
  {
    keywords: ["water-rich foods"],
    guide: {
      en:       {
        title: "Water-Rich Foods",
        steps: [
          { text: "Include a water-rich food (cucumber, watermelon, oranges, tomatoes) at each meal.", seconds: 15, diagram: "diet" },
          { text: "Treat this as additional to your water target, not a replacement for it.", seconds: 15, diagram: "general" },
        ],
        benefits: ["Food-based water comes with electrolytes and fiber that help the body actually retain and use it."],
      },
      fr:       {
        title: "Aliments riches en eau",
        steps: [
          { text: "Incluez un aliment riche en eau (concombre, pastèque, oranges, tomates) à chaque repas.", seconds: 15, diagram: "diet" },
          { text: "Considérez cela comme un ajout à votre objectif d’eau, pas un remplacement.", seconds: 15, diagram: "general" },
        ],
        benefits: ["L’eau apportée par l’alimentation vient avec des électrolytes et des fibres qui aident le corps à vraiment la retenir et l’utiliser."],
      },
    },
  },
  {
    keywords: ["de-puff routine locked", "facial puffiness", "track am facial puffiness"],
    guide: {
      en:       {
        title: "De-Puff Routine Check",
        steps: [
          { text: "Run your cold-water rinse and drainage massage every morning without skipping, even on rushed days.", seconds: 30, diagram: "circular" },
          { text: "Rate your facial puffiness (1–10) right after waking, before the routine, to track real change.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Consistency is what turns a de-puff routine into a lasting result instead of a one-off effect."],
      },
      fr:       {
        title: "Vérification de la routine anti-poches",
        steps: [
          { text: "Faites votre rinçage à l’eau froide et votre massage de drainage chaque matin sans exception, même les jours pressés.", seconds: 30, diagram: "circular" },
          { text: "Évaluez vos poches (1 à 10) juste après le réveil, avant la routine, pour suivre un vrai changement.", seconds: 10, diagram: "check" },
        ],
        benefits: ["La régularité est ce qui transforme une routine anti-poches en résultat durable plutôt qu’un effet ponctuel."],
      },
    },
  },
  {
    keywords: ["review energy + skin clarity"],
    guide: {
      en:       {
        title: "Review Energy & Skin Clarity",
        steps: [
          { text: "Rate your energy (1–10) and skin clarity (1–10) at the end of the week.", seconds: 15, diagram: "general" },
          { text: "Compare against week one to see the real trend rather than judging any single day.", seconds: 10, diagram: "check" },
        ],
        benefits: ["These are the two honest, fast-moving indicators that hydration is actually working."],
      },
      fr:       {
        title: "Bilan énergie et clarté de peau",
        steps: [
          { text: "Évaluez votre énergie (1 à 10) et la clarté de votre peau (1 à 10) en fin de semaine.", seconds: 15, diagram: "general" },
          { text: "Comparez avec la semaine 1 pour voir la vraie tendance plutôt que de juger une seule journée.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Ce sont les deux indicateurs honnêtes et rapides qui montrent que l’hydratation fonctionne vraiment."],
      },
    },
  },
  {
    keywords: ["steps for the day", "10k steps", "8k steps"],
    guide: {
      en:       {
        title: "Daily Steps",
        steps: [
          { text: "Let steps add up from stairs, parking further away, pacing during calls, or a short walk after meals.", seconds: 15, diagram: "general" },
          { text: "Spread them through the day rather than one long walk.", seconds: 15, diagram: "general" },
          { text: "Track with your phone’s built-in step counter — no special equipment needed.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Spreading activity through the day helps regulate blood sugar better after eating."],
      },
      fr:       {
        title: "Pas quotidiens",
        steps: [
          { text: "Laissez les pas s’accumuler avec les escaliers, se garer plus loin, marcher pendant les appels, ou une courte marche après les repas.", seconds: 15, diagram: "general" },
          { text: "Répartissez-les sur la journée plutôt qu’une seule longue marche.", seconds: 15, diagram: "general" },
          { text: "Suivez-les avec le compteur de pas intégré à votre téléphone — aucun équipement spécial nécessaire.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Répartir l’activité sur la journée aide à mieux réguler la glycémie après les repas."],
      },
    },
  },
  {
    keywords: ["hit protein + 300 cal deficit", "deficit + protein + 10k steps"],
    guide: {
      en:       {
        title: "Protein Target Under a Deficit",
        steps: [
          { text: "Hit your protein target first when planning meals, then fill remaining calories to stay within your deficit.", seconds: 15, diagram: "diet" },
          { text: "Keep steps and training consistent — a deficit combined with dropping activity slows results rather than speeding them up.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Protein under a deficit is what protects muscle while body fat comes down, instead of losing both."],
      },
      fr:       {
        title: "Objectif protéines en période de déficit",
        steps: [
          { text: "Atteignez d’abord votre objectif de protéines en planifiant vos repas, puis complétez le reste des calories pour rester dans votre déficit.", seconds: 15, diagram: "diet" },
          { text: "Gardez les pas et l’entraînement constants — un déficit combiné à une baisse d’activité ralentit les résultats au lieu de les accélérer.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Les protéines en période de déficit protègent le muscle pendant que la graisse corporelle diminue, au lieu de perdre les deux."],
      },
    },
  },
  {
    keywords: ["review sleep, training, diet", "diet + sleep + hydration", "sleep + hydration + spf"],
    guide: {
      en:       {
        title: "Weekly Habit Review",
        steps: [
          { text: "At the end of the week, look back at your sleep, training and diet streaks together, not separately.", seconds: 15, diagram: "general" },
          { text: "Note which one slipped first — habits usually fail in a predictable order, and knowing yours helps you catch it earlier next time.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Reviewing together (not separately) is what reveals how the three actually interact for you."],
      },
      fr:       {
        title: "Bilan hebdomadaire des habitudes",
        steps: [
          { text: "En fin de semaine, regardez vos séries de sommeil, d’entraînement et d’alimentation ensemble, pas séparément.", seconds: 15, diagram: "general" },
          { text: "Notez laquelle a flanché en premier — les habitudes échouent généralement dans un ordre prévisible, et connaître le vôtre aide à le rattraper plus tôt la prochaine fois.", seconds: 10, diagram: "check" },
        ],
        benefits: ["Les revoir ensemble (pas séparément) révèle comment les trois interagissent réellement pour vous."],
      },
    },
  },
];

/** Returns the curated guide entry for a task's English text, or null if nothing matches. */
export function findDemoEntry(taskEn: string): DemoEntry | null {
  const lower = taskEn.toLowerCase();
  for (const entry of DEMO_ENTRIES) {
    if (entry.keywords.some((k) => lower.includes(k))) return entry;
  }
  return null;
}
