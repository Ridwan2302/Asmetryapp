/** A detailed step-by-step guide per distinct task, matched by keyword against the (always-English)
 * task text. No video is linked — every guide is self-contained: a clear title, the exact steps to
 * follow, and why it's worth doing (the benefits). Entries are kept narrow on purpose — sibling
 * tasks that are genuinely the same movement at a different volume/duration share one entry (e.g.
 * "Cheekbone lift: 3 sets" / "4 sets"), but tasks that are different actions each get their own
 * entry, even when several appear in the same program week. */
export interface DemoGuide {
  title: string;
  steps: string[];
  benefits: string[];
}

export interface DemoEntry {
  keywords: string[];
  guide: { en: DemoGuide; fr: DemoGuide };
}

const DEMO_ENTRIES: DemoEntry[] = [
  // ---------- Face Structure ----------
  {
    keywords: ['mewing + hard swallow'],
    guide: {
      en: {
        title: 'Mewing + Hard Swallow',
        steps: [
          'Get into full mewing posture — tongue flat against the palate, lips sealed.',
          'From that position, swallow forcefully, pressing the whole tongue up hard against the roof of the mouth as you do.',
          'Reset to relaxed mewing posture between repetitions rather than staying tensed.',
        ],
        benefits: [
          'The forceful swallow adds real resistance on top of passive mewing, which is what drives adaptation once the posture itself is automatic.',
          'Trains the same muscles used in normal swallowing to work in your favor instead of against your posture.',
        ],
      },
      fr: {
        title: 'Mewing + déglutition forcée',
        steps: [
          'Installez-vous en posture de mewing complète — langue à plat contre le palais, lèvres scellées.',
          'Depuis cette position, déglutissez avec force, en pressant toute la langue vers le haut contre le palais pendant le mouvement.',
          'Revenez à une posture de mewing détendue entre les répétitions plutôt que de rester en tension.',
        ],
        benefits: [
          'La déglutition forcée ajoute une vraie résistance en plus du mewing passif, ce qui relance l’adaptation une fois la posture devenue automatique.',
          'Entraîne les muscles de la déglutition normale à jouer en votre faveur plutôt que contre votre posture.',
        ],
      },
    },
  },
  {
    keywords: ['mewing', 'nasal breathing check'],
    guide: {
      en: {
        title: 'Mewing (Tongue Posture)',
        steps: [
          'Rest your entire tongue — tip to back — flat against the roof of your mouth, not just the tip behind your teeth.',
          'Seal your lips and breathe only through your nose.',
          'Let your back teeth touch lightly, without clenching.',
          'Hold it as your default resting posture all day, not just during dedicated practice — check in on it every waking hour until it’s automatic.',
        ],
        benefits: [
          'Applies gentle, constant pressure that supports a well-developed maxilla over time.',
          'Builds nasal breathing as a lasting habit instead of mouth breathing.',
          'Costs nothing and stacks with every other program.',
        ],
      },
      fr: {
        title: 'Mewing (posture linguale)',
        steps: [
          'Posez toute la langue — de la pointe à l’arrière — bien à plat contre le palais, pas seulement le bout derrière les dents.',
          'Scellez les lèvres et respirez uniquement par le nez.',
          'Laissez les dents du fond se toucher légèrement, sans serrer.',
          'Adoptez-la comme posture de repos par défaut toute la journée, pas seulement pendant les exercices dédiés — vérifiez-la à chaque heure éveillée jusqu’à ce qu’elle devienne automatique.',
        ],
        benefits: [
          'Applique une pression douce et constante qui favorise un bon développement du maxillaire dans la durée.',
          'Installe la respiration nasale comme habitude durable, à la place de la respiration par la bouche.',
          'Ne coûte rien et se combine avec tous les autres programmes.',
        ],
      },
    },
  },
  {
    keywords: ['cheekbone lift', 'cheek + buccal circuit', 'cheekbone lift + buccal', 'buccal hollow'],
    guide: {
      en: {
        title: 'Cheekbone Lift & Buccal Holds',
        steps: [
          'Smile without showing your teeth, then push your cheeks up and back toward your ears using the muscle, not your hand — hold each rep a full second at the top.',
          'For buccal holds, suck your cheeks in against your teeth and hold — you should feel it under the cheekbone, not in the jaw.',
          'When doing them as a combined circuit, alternate the two movements rather than resting fully between them.',
        ],
        benefits: [
          'Trains the muscles that lift and define the midface.',
          'Builds visible definition under the cheekbones over time.',
          'Quality of contraction matters more than speed, so it stays low-injury-risk.',
        ],
      },
      fr: {
        title: 'Lift des pommettes et joues creuses',
        steps: [
          'Souriez sans montrer les dents, puis poussez les joues vers le haut et l’arrière, vers les oreilles, en utilisant le muscle, pas la main — maintenez chaque répétition une seconde complète en haut.',
          'Pour les joues creuses, aspirez les joues contre les dents et maintenez — vous devez le sentir sous la pommette, pas dans la mâchoire.',
          'En circuit combiné, alternez les deux mouvements plutôt que de vous reposer complètement entre les deux.',
        ],
        benefits: [
          'Entraîne les muscles qui soulèvent et définissent le milieu du visage.',
          'Construit une définition visible sous les pommettes avec le temps.',
          'La qualité de la contraction compte plus que la vitesse, donc peu de risque de blessure.',
        ],
      },
    },
  },
  {
    keywords: ['under-eye tapping', 'inner-to-outer drainage', 'de-puff + drainage', 'compress + massage', 'temple + orbital'],
    guide: {
      en: {
        title: 'Under-Eye & Facial Drainage Taps',
        steps: [
          'Using your ring finger (lightest touch), tap gently from the inner corner of the eye outward, then down toward the temple.',
          'Keep the pressure light — this is drainage, not massage; you should never feel like you’re stretching the skin.',
          'Finish by sweeping down along the side of the face toward the neck to help fluid actually leave the area.',
        ],
        benefits: [
          'Moves fluid away from the delicate under-eye area, reducing morning puffiness.',
          'Takes under two minutes and needs no tools or product.',
          'Safe to do daily since the pressure is minimal.',
        ],
      },
      fr: {
        title: 'Tapotements de drainage sous les yeux et du visage',
        steps: [
          'Avec l’annulaire (le toucher le plus léger), tapotez doucement du coin interne de l’œil vers l’extérieur, puis vers le bas en direction de la tempe.',
          'Gardez une pression légère — c’est du drainage, pas du massage ; vous ne devez jamais sentir la peau s’étirer.',
          'Terminez par un mouvement vers le bas le long du visage, en direction du cou, pour vraiment aider le liquide à s’évacuer.',
        ],
        benefits: [
          'Déplace le liquide loin de la zone délicate sous les yeux, ce qui réduit les poches du matin.',
          'Prend moins de deux minutes et ne nécessite ni outil ni produit.',
          'Sans risque à faire quotidiennement puisque la pression est minimale.',
        ],
      },
    },
  },
  {
    keywords: ['gua sha', 'lymphatic', 'am + pm lymphatic', 'facial massage', 'face gua sha'],
    guide: {
      en: {
        title: 'Gua Sha & Lymphatic Drainage',
        steps: [
          'Apply a facial oil first so the tool or your fingers glide instead of dragging the skin.',
          'Work with light-to-medium pressure only, never hard enough to bruise.',
          'Always move toward the lymph nodes — from the center of the face outward, then down toward the neck and collarbone.',
          'Finish with a few gentle strokes down the neck to help fluid actually drain, over 2–3 minutes total.',
        ],
        benefits: [
          'Reduces puffiness and visible fluid retention.',
          'Helps sharpen the appearance of the jawline and cheekbones.',
          'Takes only a few minutes and pairs well with any skincare routine.',
        ],
      },
      fr: {
        title: 'Gua sha et drainage lymphatique',
        steps: [
          'Appliquez d’abord une huile pour le visage afin que l’outil ou les doigts glissent sans tirer sur la peau.',
          'Travaillez uniquement avec une pression légère à modérée, jamais assez forte pour marquer la peau.',
          'Déplacez-vous toujours vers les ganglions lymphatiques — du centre du visage vers l’extérieur, puis vers le bas, vers le cou et la clavicule.',
          'Terminez par quelques mouvements doux vers le bas du cou pour vraiment aider le drainage, sur 2 à 3 minutes au total.',
        ],
        benefits: [
          'Réduit les poches et la rétention d’eau visible.',
          'Aide à affiner l’apparence de la mâchoire et des pommettes.',
          'Ne prend que quelques minutes et s’associe bien à toute routine de soin.',
        ],
      },
    },
  },
  {
    keywords: ['cold-water', 'cold water', 'cold compress', 'cold immersion', 'cold-water face rinse'],
    guide: {
      en: {
        title: 'Cold-Water Face Immersion',
        steps: [
          'Fill a bowl with cold water (ice optional) and submerge your face for 15–30 seconds.',
          'If full immersion isn’t practical, splash cold water or use a cold compress instead.',
          'Breathe steadily — a few seconds of adjustment is normal, don’t hold your breath in a panic.',
          'Skip this if you have a heart condition or have been advised against cold exposure.',
        ],
        benefits: [
          'Constricts surface blood vessels, which reduces puffiness and inflammation fast.',
          'Gives an immediate, visible de-puffing effect before photos or events.',
          'A cold compress delivers most of the same benefit with less shock to the system.',
        ],
      },
      fr: {
        title: 'Immersion du visage dans l’eau froide',
        steps: [
          'Remplissez un bol d’eau froide (glaçons facultatifs) et immergez le visage pendant 15 à 30 secondes.',
          'Si l’immersion complète n’est pas pratique, utilisez plutôt des éclaboussures d’eau froide ou une compresse froide.',
          'Respirez calmement — quelques secondes d’adaptation sont normales, ne bloquez pas votre respiration par réflexe.',
          'Évitez cet exercice en cas de problème cardiaque ou d’avis médical contre l’exposition au froid.',
        ],
        benefits: [
          'Resserre les vaisseaux sanguins de surface, ce qui réduit rapidement les poches et l’inflammation.',
          'Donne un effet anti-poches immédiat et visible avant une photo ou un événement.',
          'Une compresse froide apporte presque le même bénéfice avec moins de choc pour l’organisme.',
        ],
      },
    },
  },
  {
    keywords: ['full face circuit'],
    guide: {
      en: {
        title: 'Face Structure Recap Circuit',
        steps: [
          'Run through mewing, the cheekbone lift + buccal hold circuit, and a full gua sha pass back to back in one session.',
          'Keep good form throughout at a pace you can sustain — this isn’t about going harder than before.',
        ],
        benefits: [
          'Confirms the whole face-structure routine now runs together smoothly, without thinking through each step.',
          'Locks in the habit so it survives past the 28-day program.',
        ],
      },
      fr: {
        title: 'Circuit de récapitulatif — Structure faciale',
        steps: [
          'Enchaînez le mewing, le circuit lift des pommettes + joues creuses, et un passage complet de gua sha en une seule séance.',
          'Gardez une bonne forme tout du long, à un rythme que vous pouvez tenir — l’objectif n’est pas d’aller plus fort qu’avant.',
        ],
        benefits: [
          'Confirme que toute la routine de structure faciale s’enchaîne désormais bien, sans réfléchir à chaque étape.',
          'Ancre l’habitude pour qu’elle survive au-delà du programme de 28 jours.',
        ],
      },
    },
  },
  {
    keywords: ['progress photo'],
    guide: {
      en: {
        title: 'Progress Photo',
        steps: [
          'Take the photo in the same spot, with the same lighting, at the same time of day each time.',
          'Prefer natural daylight over overhead artificial light.',
          'Keep a neutral expression and pull your hair back.',
          'Stay the same distance from the camera so photos line up for a fair comparison.',
        ],
        benefits: [
          'Consistent conditions are the only way to actually see real change.',
          'Gives you an honest, comparable record instead of a misleading snapshot.',
          'Takes under a minute and builds a visual history of your progress.',
        ],
      },
      fr: {
        title: 'Photo de progression',
        steps: [
          'Prenez la photo au même endroit, avec le même éclairage, au même moment de la journée à chaque fois.',
          'Préférez la lumière naturelle du jour à un éclairage artificiel au plafond.',
          'Gardez une expression neutre et dégagez les cheveux.',
          'Restez à la même distance de l’appareil pour que les photos s’alignent pour une comparaison équitable.',
        ],
        benefits: [
          'Des conditions cohérentes sont le seul moyen de vraiment voir un changement réel.',
          'Donne un enregistrement honnête et comparable plutôt qu’un instantané trompeur.',
          'Prend moins d’une minute et construit un historique visuel de vos progrès.',
        ],
      },
    },
  },

  // ---------- Jawmaxing ----------
  {
    keywords: ['gum', 'clench'],
    guide: {
      en: {
        title: 'Jaw Clenching & Resistance Gum',
        steps: [
          'Chew firmly on one side at a time, not both — this isolates each masseter fully.',
          'Keep your jaw relaxed between repetitions; a tight neck or headache means you’re clenching too hard.',
          'For isometric or weighted holds, bite down firmly and hold without grinding, breathing normally throughout.',
          'Follow the program’s progression — softer gum and lighter holds early, firmer gum and longer or weighted holds as the weeks go on.',
        ],
        benefits: [
          'Builds masseter size and strength for a sharper, wider jawline.',
          'Sharpens the gonial angle over consistent weeks of training.',
          'Fully adjustable intensity, so it scales with your current jaw strength.',
        ],
      },
      fr: {
        title: 'Serrage de mâchoire et gomme à mâcher résistante',
        steps: [
          'Mâchez fermement d’un côté à la fois, pas des deux — cela isole complètement chaque masséter.',
          'Gardez la mâchoire détendue entre les répétitions ; une tension au cou ou un mal de tête signifie que vous serrez trop fort.',
          'Pour les maintiens isométriques ou lestés, mordez fermement et maintenez sans grincer, en respirant normalement.',
          'Suivez la progression du programme — gomme plus souple et maintiens légers au début, gomme plus ferme et maintiens plus longs ou lestés au fil des semaines.',
        ],
        benefits: [
          'Développe le volume et la force du masséter pour une mâchoire plus nette et plus large.',
          'Affine l’angle goniaque au fil de semaines d’entraînement régulier.',
          'Intensité totalement ajustable, donc adaptée à la force actuelle de votre mâchoire.',
        ],
      },
    },
  },
  {
    keywords: ['chin tuck'],
    guide: {
      en: {
        title: 'Chin Tucks',
        steps: [
          'Sit or stand tall, then draw your chin straight back — like making a double chin on purpose — without tilting your head down.',
          'Feel for a stretch at the base of the skull and light activation at the front of the neck.',
          'Hold for 2–3 seconds, then release with control.',
          'Keep the movement small; if your head is visibly bobbing, you’re moving too much.',
        ],
        benefits: [
          'Corrects forward-head posture, which changes how the whole face and neck read.',
          'Strengthens the deep neck flexors that hold a better head position.',
          'Takes seconds per repetition and can be done almost anywhere.',
        ],
      },
      fr: {
        title: 'Rentrées de menton',
        steps: [
          'Assis ou debout, redressé, ramenez le menton bien droit vers l’arrière — comme pour faire volontairement un double menton — sans incliner la tête vers le bas.',
          'Recherchez un étirement à la base du crâne et une légère activation à l’avant du cou.',
          'Maintenez 2 à 3 secondes, puis relâchez avec contrôle.',
          'Gardez le mouvement petit ; si votre tête bouge visiblement, vous en faites trop.',
        ],
        benefits: [
          'Corrige la posture tête en avant, ce qui change la lecture de tout le visage et du cou.',
          'Renforce les fléchisseurs profonds du cou qui maintiennent une meilleure position de la tête.',
          'Ne prend que quelques secondes par répétition et se fait presque partout.',
        ],
      },
    },
  },
  {
    keywords: ['jaw-fascia release', 'deep masseter release'],
    guide: {
      en: {
        title: 'Jaw-Fascia Release',
        steps: [
          'Use your knuckles or a massage tool to apply firm, slow circular pressure along the jaw muscle.',
          'Work from the back of the jaw (near the ear) forward toward the chin.',
          'Spend extra time on any spot that feels tight or tender.',
        ],
        benefits: [
          'Releases tension built up from clenching, without adding training load.',
          'Keeps the jaw joint healthy alongside masseter training.',
          'A few minutes of release balances out the harder training days.',
        ],
      },
      fr: {
        title: 'Relâchement du fascia mandibulaire',
        steps: [
          'Utilisez vos jointures ou un outil de massage pour appliquer une pression circulaire ferme et lente le long du muscle de la mâchoire.',
          'Travaillez de l’arrière de la mâchoire (près de l’oreille) vers l’avant, en direction du menton.',
          'Passez plus de temps sur les zones qui paraissent tendues ou sensibles.',
        ],
        benefits: [
          'Relâche la tension accumulée par le serrage, sans ajouter de charge d’entraînement.',
          'Garde l’articulation de la mâchoire en bonne santé aux côtés de l’entraînement du masséter.',
          'Quelques minutes de relâchement équilibrent les jours d’entraînement plus intenses.',
        ],
      },
    },
  },
  {
    keywords: ['neck + jaw stretch'],
    guide: {
      en: {
        title: 'Neck & Jaw Stretch',
        steps: [
          'Tilt your head gently to one side until you feel a mild stretch along the opposite side of the neck.',
          'Hold the stretch for the full duration rather than bouncing in and out of it.',
          'Repeat on the other side, keeping the jaw relaxed throughout.',
        ],
        benefits: [
          'Keeps the neck and jaw mobile alongside heavier masseter training.',
          'Forcing a stretch can strain the jaw joint, so slow and gentle is what actually helps.',
        ],
      },
      fr: {
        title: 'Étirement du cou et de la mâchoire',
        steps: [
          'Inclinez doucement la tête d’un côté jusqu’à sentir un étirement léger sur le côté opposé du cou.',
          'Maintenez l’étirement pendant toute la durée plutôt que de faire des à-coups.',
          'Répétez de l’autre côté, en gardant la mâchoire détendue tout du long.',
        ],
        benefits: [
          'Garde le cou et la mâchoire mobiles aux côtés d’un entraînement du masséter plus intense.',
          'Forcer un étirement peut solliciter l’articulation de la mâchoire, donc lent et doux est ce qui aide vraiment.',
        ],
      },
    },
  },
  {
    keywords: ['lower-lip pull downs'],
    guide: {
      en: {
        title: 'Lower-Lip Pull Downs',
        steps: [
          'Press your lower lip down and out with light resistance from your finger, or against gentle tension from a jaw exerciser.',
          'Feel the effort in the muscles around the chin and lower lip, not the neck.',
          'Perform slow, controlled repetitions rather than fast pulses.',
        ],
        benefits: [
          'Targets the small muscles around the chin and lower lip that complement masseter training.',
          'Adds definition to the lower-face area that pure jaw-clenching work doesn’t reach.',
        ],
      },
      fr: {
        title: 'Tirés de lèvre inférieure',
        steps: [
          'Poussez la lèvre inférieure vers le bas et l’extérieur avec une légère résistance du doigt, ou contre la tension douce d’un appareil de mâchoire.',
          'Sentez l’effort dans les muscles autour du menton et de la lèvre inférieure, pas dans le cou.',
          'Effectuez des répétitions lentes et contrôlées plutôt que des à-coups rapides.',
        ],
        benefits: [
          'Cible les petits muscles autour du menton et de la lèvre inférieure qui complètent l’entraînement du masséter.',
          'Ajoute de la définition au bas du visage, une zone que le seul travail de serrage n’atteint pas.',
        ],
      },
    },
  },
  {
    keywords: ['full jaw + neck recovery'],
    guide: {
      en: {
        title: 'Jawmaxing Recap & Recovery',
        steps: [
          'Run through a full gum circuit, then finish with jaw-fascia release and a neck + jaw stretch in the same session.',
          'Treat this as a lighter, recovery-focused pass rather than a maximum-effort session.',
        ],
        benefits: [
          'Confirms the gum progression, chin tucks and release work all now fit together as one routine.',
          'The recovery work keeps the jaw joint healthy after three weeks of building load.',
        ],
      },
      fr: {
        title: 'Récapitulatif et récupération — Jawmaxing',
        steps: [
          'Enchaînez un circuit complet de gomme à mâcher, puis terminez par un relâchement du fascia mandibulaire et un étirement du cou et de la mâchoire dans la même séance.',
          'Considérez cela comme une séance plus légère, centrée sur la récupération, plutôt qu’un effort maximal.',
        ],
        benefits: [
          'Confirme que la progression de gomme, les rentrées de menton et le relâchement s’articulent désormais en une seule routine.',
          'Le travail de récupération garde l’articulation de la mâchoire en bonne santé après trois semaines de charge croissante.',
        ],
      },
    },
  },

  // ---------- Hunter Eyes ----------
  {
    keywords: ['lateral gaze holds'],
    guide: {
      en: {
        title: 'Lateral Gaze Holds',
        steps: [
          'Without moving your head, look as far as comfortable to one side and hold.',
          'Keep the movement in the eyes only — forehead and face stay still.',
          'Hold for the full duration, then repeat on the other side.',
        ],
        benefits: [
          'Wakes up the muscles around the eye that barely get trained in daily life.',
          'A gentle first step before asking the eye area to do harder work later in the program.',
        ],
      },
      fr: {
        title: 'Maintiens du regard latéral',
        steps: [
          'Sans bouger la tête, regardez aussi loin que confortable d’un côté et maintenez.',
          'Gardez le mouvement uniquement dans les yeux — le front et le visage restent immobiles.',
          'Maintenez pendant toute la durée, puis répétez de l’autre côté.',
        ],
        benefits: [
          'Réveille les muscles autour de l’œil, à peine sollicités au quotidien.',
          'Une première étape en douceur avant de leur demander un travail plus intense plus tard dans le programme.',
        ],
      },
    },
  },
  {
    keywords: ['outer-corner lift + squint', 'squint holds', 'sustained squint'],
    guide: {
      en: {
        title: 'Squint Training',
        steps: [
          'Squint gently as if in bright sun, focusing the effort at the outer corner of the eye rather than scrunching the whole face.',
          'In week one, combine it with a light outer-corner lift; in later weeks, hold the squint alone for longer.',
          'Keep the forehead and nose completely still throughout.',
        ],
        benefits: [
          'Trains a more positive canthal tilt and a sharper, more alert-looking gaze.',
          'Longer holds in later weeks push past the adaptation from the earlier, shorter sets.',
        ],
      },
      fr: {
        title: 'Entraînement du plissement des yeux',
        steps: [
          'Plissez doucement les yeux comme en plein soleil, en concentrant l’effort sur le coin externe de l’œil plutôt qu’en crispant tout le visage.',
          'En semaine 1, combinez-le avec un léger lift du coin externe ; les semaines suivantes, maintenez le plissement seul plus longtemps.',
          'Gardez le front et le nez complètement immobiles tout du long.',
        ],
        benefits: [
          'Entraîne une inclinaison canthale plus positive et un regard plus net et plus éveillé.',
          'Les maintiens plus longs des semaines suivantes dépassent l’adaptation des séries plus courtes du début.',
        ],
      },
    },
  },
  {
    keywords: ['canthal + brow superset'],
    guide: {
      en: {
        title: 'Canthal & Brow Superset',
        steps: [
          'Perform a set of canthal lift resistance immediately followed by a set of brow-set downward press, with no rest in between.',
          'Rest briefly, then repeat for the prescribed number of rounds.',
        ],
        benefits: [
          'Combining both movements back to back pushes past the adaptation from training them separately in earlier weeks.',
          'This is where the tilt starts to hold on its own between sessions.',
        ],
      },
      fr: {
        title: 'Superset canthal et sourcil',
        steps: [
          'Enchaînez une série de résistance au lift canthal immédiatement suivie d’une série de pression descendante au sourcil, sans repos entre les deux.',
          'Reposez-vous brièvement, puis répétez pour le nombre de tours prescrit.',
        ],
        benefits: [
          'Combiner les deux mouvements l’un après l’autre dépasse l’adaptation obtenue en les entraînant séparément les semaines précédentes.',
          'C’est ici que l’inclinaison commence à tenir d’elle-même entre les séances.',
        ],
      },
    },
  },
  {
    keywords: ['canthal lift resistance'],
    guide: {
      en: {
        title: 'Canthal Lift Resistance',
        steps: [
          'Place a finger lightly at the outer corner of the eye.',
          'Press up and out with the finger while your eye muscle actively resists the movement.',
          'Keep the pressure light — this is resisted engagement, not a stretch.',
        ],
        benefits: [
          'Trains the outer-corner muscles to hold a slightly lifted position under load, which is what actually shifts canthal tilt.',
          'More effective than passive holds alone since it adds real resistance.',
        ],
      },
      fr: {
        title: 'Résistance au lift canthal',
        steps: [
          'Placez un doigt légèrement sur le coin externe de l’œil.',
          'Appuyez vers le haut et l’extérieur avec le doigt pendant que le muscle de l’œil résiste activement au mouvement.',
          'Gardez une pression légère — c’est un engagement résisté, pas un étirement.',
        ],
        benefits: [
          'Entraîne les muscles du coin externe à tenir une position légèrement relevée sous tension, ce qui modifie réellement l’inclinaison canthale.',
          'Plus efficace que des maintiens passifs seuls puisque cela ajoute une vraie résistance.',
        ],
      },
    },
  },
  {
    keywords: ['brow-set downward press'],
    guide: {
      en: {
        title: 'Brow-Set Downward Press',
        steps: [
          'Place your fingers along the brow bone and press gently downward.',
          'Resist that press by trying to keep the brow in place, without frowning.',
          'Keep the rest of the face relaxed throughout.',
        ],
        benefits: [
          'Trains the brow to hold a stable, neutral position rather than drifting upward with fatigue.',
          'Pairs directly with canthal work to support the overall eye-area look.',
        ],
      },
      fr: {
        title: 'Pression descendante au sourcil',
        steps: [
          'Placez les doigts le long de l’arcade sourcilière et appuyez doucement vers le bas.',
          'Résistez à cette pression en essayant de garder le sourcil en place, sans froncer.',
          'Gardez le reste du visage détendu tout du long.',
        ],
        benefits: [
          'Entraîne le sourcil à tenir une position stable et neutre plutôt que de remonter avec la fatigue.',
          'Se combine directement avec le travail canthal pour soutenir le regard dans son ensemble.',
        ],
      },
    },
  },
  {
    keywords: ['screen-distance'],
    guide: {
      en: {
        title: 'Screen-Distance & Sleep Hygiene Check',
        steps: [
          'Position your screen roughly an arm’s length away and at eye level.',
          'Check that you’re not squinting or leaning in to compensate for a screen that’s too far, small or dim.',
          'Pair this with your evening wind-down and sleep habits for the week.',
        ],
        benefits: [
          'Correct screen distance prevents eye strain that undermines the definition you’re training.',
          'Protects the results built during dedicated orbital and canthal training.',
        ],
      },
      fr: {
        title: 'Vérification de la distance à l’écran et de l’hygiène de sommeil',
        steps: [
          'Positionnez votre écran à peu près à une longueur de bras et à hauteur des yeux.',
          'Vérifiez que vous ne plissez pas les yeux ou ne vous penchez pas pour compenser un écran trop loin, trop petit ou trop sombre.',
          'Associez cela à votre rituel du soir et à vos habitudes de sommeil de la semaine.',
        ],
        benefits: [
          'Une bonne distance à l’écran évite une fatigue oculaire qui nuirait à la définition que vous entraînez.',
          'Protège les résultats construits pendant l’entraînement orbitaire et canthal dédié.',
        ],
      },
    },
  },
  {
    keywords: ['full orbital circuit'],
    guide: {
      en: {
        title: 'Hunter Eyes Recap Circuit',
        steps: [
          'Run through lateral gaze holds, squint training and canthal lift resistance back to back in one session.',
          'Finish with a drainage pass to de-puff before checking your neutral, resting gaze in the mirror.',
        ],
        benefits: [
          'Proves the tilt holds under a neutral, resting gaze — not just mid-exercise.',
          'Confirms the whole orbital routine now runs together as one habit.',
        ],
      },
      fr: {
        title: 'Circuit de récapitulatif — Hunter Eyes',
        steps: [
          'Enchaînez les maintiens du regard latéral, l’entraînement du plissement et la résistance au lift canthal en une seule séance.',
          'Terminez par un passage de drainage anti-poches avant de vérifier votre regard neutre au repos dans le miroir.',
        ],
        benefits: [
          'Prouve que l’inclinaison tient avec un regard neutre au repos — pas seulement pendant l’exercice.',
          'Confirme que toute la routine orbitaire s’enchaîne désormais comme une seule habitude.',
        ],
      },
    },
  },

  // ---------- Facial Fat Reduction ----------
  {
    keywords: ['moderate calorie deficit', 'moderate deficit'],
    guide: {
      en: {
        title: 'Calorie Deficit Basics',
        steps: [
          'Estimate your maintenance calories, then eat roughly 300–500 fewer per day.',
          'Track intake for at least the first two weeks so the deficit is real, not guessed.',
          'Create most of that deficit by cutting sugary drinks and alcohol before touching solid meals.',
        ],
        benefits: [
          'A moderate, sustainable deficit is the only real lever for facial fat — there’s no spot reduction.',
          'Cutting drinks first is the easiest change with the least impact on how full you feel.',
          'Tracking removes the guesswork that stalls most attempts at fat loss.',
        ],
      },
      fr: {
        title: 'Bases du déficit calorique',
        steps: [
          'Estimez vos calories de maintien, puis mangez environ 300 à 500 calories de moins par jour.',
          'Suivez votre apport pendant au moins les deux premières semaines pour que le déficit soit réel, pas estimé au hasard.',
          'Créez l’essentiel de ce déficit en supprimant les boissons sucrées et l’alcool avant de toucher aux repas solides.',
        ],
        benefits: [
          'Un déficit modéré et durable est le seul vrai levier pour la graisse du visage — il n’existe pas de réduction ciblée.',
          'Supprimer les boissons est le changement le plus facile, avec le moins d’impact sur la sensation de satiété.',
          'Le suivi élimine les approximations qui bloquent la plupart des tentatives de perte de graisse.',
        ],
      },
    },
  },
  {
    keywords: ['elevate head', 'elevate your head'],
    guide: {
      en: {
        title: 'Elevated Sleep Position',
        steps: [
          'Add an extra pillow or wedge to keep your head slightly raised overnight.',
          'Avoid sleeping face-down, which encourages fluid to pool in the face.',
          'Keep the elevation consistent every night, not just occasionally.',
        ],
        benefits: [
          'Gravity helps drain fluid instead of letting it settle in the face overnight.',
          'Reduces morning facial puffiness so the jawline reads sharper right after waking.',
          'A one-time setup that works passively every single night.',
        ],
      },
      fr: {
        title: 'Position de sommeil surélevée',
        steps: [
          'Ajoutez un oreiller supplémentaire ou un coussin en coin pour garder la tête légèrement surélevée pendant la nuit.',
          'Évitez de dormir sur le ventre, ce qui favorise l’accumulation de liquide dans le visage.',
          'Gardez cette surélévation constante chaque nuit, pas seulement de temps en temps.',
        ],
        benefits: [
          'La gravité aide à drainer le liquide au lieu de le laisser s’installer dans le visage pendant la nuit.',
          'Réduit les poches du matin pour une mâchoire plus nette dès le réveil.',
          'Une installation unique qui agit passivement chaque nuit.',
        ],
      },
    },
  },
  {
    keywords: ['full fat-loss circuit'],
    guide: {
      en: {
        title: 'Facial Fat-Loss Recap Circuit',
        steps: [
          'Combine a gua sha drainage pass with the cheekbone lift + buccal hold circuit and a set of chewing-gum resistance work in one session.',
          'Check in on your deficit, water and sodium habits from the past three weeks at the same time.',
        ],
        benefits: [
          'Confirms the nutrition side and the facial training side are both still on track together.',
          'This is what proves four weeks of compounding changes, not any single session.',
        ],
      },
      fr: {
        title: 'Circuit de récapitulatif — Perte de graisse du visage',
        steps: [
          'Combinez un passage de drainage au gua sha avec le circuit lift des pommettes + joues creuses et une série de gomme à mâcher résistante dans la même séance.',
          'Vérifiez en même temps vos habitudes de déficit, d’eau et de sel des trois dernières semaines.',
        ],
        benefits: [
          'Confirme que le volet nutrition et le volet entraînement facial sont tous deux encore sur la bonne voie.',
          'C’est ce qui prouve quatre semaines de changements cumulés, pas une seule séance.',
        ],
      },
    },
  },

  // ---------- Bodymaxing ----------
  {
    keywords: ['push session', 'overhead press'],
    guide: {
      en: {
        title: 'Push Session & Overhead Press',
        steps: [
          'Push movements (chest press, shoulder press, dips) all work in the same direction — away from your body.',
          'Keep your core braced throughout so the force comes from your chest and shoulders, not an arching lower back.',
          'For overhead press specifically, drive the bar or dumbbells in a straight line above your head, not out in front, and avoid locking your elbows hard at the top.',
        ],
        benefits: [
          'Builds the chest and shoulder mass that widens the upper-body silhouette.',
          'Directly supports the V-taper alongside back training.',
          'Progressive pressing strength carries over to nearly every upper-body movement.',
        ],
      },
      fr: {
        title: 'Séance poussée et développé au-dessus de la tête',
        steps: [
          'Les mouvements de poussée (développé couché, développé épaules, dips) travaillent tous dans la même direction — en éloignant du corps.',
          'Gardez le tronc gainé tout du long pour que la force vienne de la poitrine et des épaules, pas d’un bas du dos qui se cambre.',
          'Pour le développé au-dessus de la tête, poussez la barre ou les haltères en ligne droite au-dessus de la tête, pas vers l’avant, et évitez de bloquer fort les coudes en haut.',
        ],
        benefits: [
          'Développe la masse des pectoraux et des épaules qui élargit la silhouette du haut du corps.',
          'Soutient directement la silhouette en V aux côtés du travail du dos.',
          'La force de poussée progressive profite à presque tous les mouvements du haut du corps.',
        ],
      },
    },
  },
  {
    keywords: ['pull session'],
    guide: {
      en: {
        title: 'Pull Session (Back, Rear Delts, Biceps)',
        steps: [
          'Pull movements (rows, pull-ups, curls) work back toward your body.',
          'Start each row by pulling your shoulder blade back first, then let your arm follow.',
          'Avoid leading with the arm alone — that turns it into a biceps exercise instead of a back exercise.',
          'Control the return; don’t let the weight simply drop.',
        ],
        benefits: [
          'Widens the back, which frames the shoulders and completes the V-taper from behind.',
          'Balances pushing work to protect posture and shoulder health.',
          'Builds pulling strength that carries over to everyday movement.',
        ],
      },
      fr: {
        title: 'Séance tirage (dos, deltoïdes postérieurs, biceps)',
        steps: [
          'Les mouvements de tirage (rowing, tractions, flexions de biceps) travaillent en ramenant vers le corps.',
          'Commencez chaque rowing en tirant d’abord l’omoplate vers l’arrière, puis laissez le bras suivre.',
          'Évitez de mener uniquement avec le bras — cela en fait un exercice de biceps plutôt que de dos.',
          'Contrôlez le retour ; ne laissez pas simplement tomber la charge.',
        ],
        benefits: [
          'Élargit le dos, ce qui encadre les épaules et complète la silhouette en V vue de dos.',
          'Équilibre le travail de poussée pour protéger la posture et la santé des épaules.',
          'Développe une force de tirage qui profite aux mouvements du quotidien.',
        ],
      },
    },
  },
  {
    keywords: ['push/pull superset'],
    guide: {
      en: {
        title: 'Push/Pull Superset Circuit',
        steps: [
          'Pair one push movement with one pull movement, performing them back to back with no rest in between.',
          'Rest after the pair, then repeat for the prescribed rounds.',
          'Keep form strict on both halves even as fatigue builds.',
        ],
        benefits: [
          'Pushes past the adaptation from two weeks of separate push and pull sessions.',
          'Trains opposing muscle groups in balance so neither pushing nor pulling strength outruns the other.',
        ],
      },
      fr: {
        title: 'Circuit superset poussée/tirage',
        steps: [
          'Associez un mouvement de poussée à un mouvement de tirage, enchaînés sans repos entre les deux.',
          'Reposez-vous après la paire, puis répétez pour le nombre de tours prescrit.',
          'Gardez une forme stricte sur les deux mouvements même quand la fatigue s’installe.',
        ],
        benefits: [
          'Dépasse l’adaptation obtenue après deux semaines de séances de poussée et de tirage séparées.',
          'Entraîne les groupes musculaires opposés en équilibre pour qu’aucune force ne prenne le pas sur l’autre.',
        ],
      },
    },
  },
  {
    keywords: ['lateral raise', 'shoulder finisher'],
    guide: {
      en: {
        title: 'Lateral Raises',
        steps: [
          'Stand tall, dumbbells at your sides, and raise your arms out to shoulder height with a slight bend in the elbows.',
          'Lead with your elbows rather than your hands.',
          'Stop right at shoulder height — going higher shifts the work to your traps.',
          'Lower slowly; the negative matters as much as the lift.',
        ],
        benefits: [
          'Builds shoulder width, which sharpens the V-taper silhouette.',
          'Directly widens the frame that shapes the whole upper body.',
          'Low weight, high control — safe to train frequently.',
        ],
      },
      fr: {
        title: 'Élévations latérales',
        steps: [
          'Tenez-vous droit, haltères le long du corps, et levez les bras sur le côté jusqu’à hauteur d’épaules avec une légère flexion des coudes.',
          'Menez avec les coudes plutôt qu’avec les mains.',
          'Arrêtez-vous exactement à hauteur d’épaules — monter plus haut transfère le travail vers les trapèzes.',
          'Redescendez lentement ; la phase négative compte autant que la montée.',
        ],
        benefits: [
          'Développe la largeur des épaules, ce qui affine la silhouette en V.',
          'Élargit directement la carrure qui structure tout le haut du corps.',
          'Charge légère, contrôle élevé — s’entraîne sans risque à fréquence élevée.',
        ],
      },
    },
  },
  {
    keywords: ['core + waist vacuum', 'vacuum'],
    guide: {
      en: {
        title: 'Stomach Vacuum',
        steps: [
          'Exhale completely, then pull your belly button in and up toward your spine as if trying to touch it.',
          'Keep your chest and shoulders relaxed — don’t suck them in.',
          'Hold while breathing shallow, or hold your breath briefly if comfortable.',
          'Release with control and repeat.',
        ],
        benefits: [
          'Trains the transverse abdominis, the deep muscle that pulls the waist in.',
          'Tightens waist appearance without training the visible six-pack muscle.',
          'Takes seconds per repetition and needs no equipment.',
        ],
      },
      fr: {
        title: 'Vacuum abdominal',
        steps: [
          'Expirez complètement, puis rentrez le nombril vers l’intérieur et le haut, en direction de la colonne, comme pour essayer de la toucher.',
          'Gardez la poitrine et les épaules détendues — ne les rentrez pas.',
          'Maintenez en respirant faiblement, ou en bloquant brièvement la respiration si c’est confortable.',
          'Relâchez avec contrôle et recommencez.',
        ],
        benefits: [
          'Entraîne le transverse de l’abdomen, le muscle profond qui resserre la taille.',
          'Affine l’apparence de la taille sans entraîner les abdominaux visibles.',
          'Ne prend que quelques secondes par répétition et ne demande aucun équipement.',
        ],
      },
    },
  },
  {
    keywords: ['full-body strength circuit'],
    guide: {
      en: {
        title: 'Bodymaxing Recap Circuit',
        steps: [
          'Combine a push movement, a pull movement and lateral raises into one full-body session.',
          'Keep the pace steady and the form clean rather than chasing a new personal best.',
        ],
        benefits: [
          'Confirms push, pull and shoulder work all fit together as one routine now.',
          'Maintains what’s been built while your deficit and step count reveal it.',
        ],
      },
      fr: {
        title: 'Circuit de récapitulatif — Bodymaxing',
        steps: [
          'Combinez un mouvement de poussée, un mouvement de tirage et des élévations latérales en une seule séance complète.',
          'Gardez un rythme stable et une forme propre plutôt que de chercher un nouveau record.',
        ],
        benefits: [
          'Confirme que le travail de poussée, de tirage et d’épaules s’articule désormais en une seule routine.',
          'Maintient ce qui a été construit pendant que le déficit et le nombre de pas le révèlent.',
        ],
      },
    },
  },

  // ---------- Posture Reset ----------
  {
    keywords: ['wall angel', 'y-t-w'],
    guide: {
      en: {
        title: 'Wall Angels',
        steps: [
          'Stand with your back, head and arms against a wall, elbows bent at 90°.',
          'Slowly slide your arms up like making a snow angel, keeping wrists, elbows and lower back against the wall as long as possible.',
          'In later weeks, trace Y, T and W shapes with your arms instead of the standard angel motion for variety.',
        ],
        benefits: [
          'Opens a tight chest and strengthens the upper back for straighter posture.',
          'Directly counters the forward-shoulder position from sitting and screens.',
        ],
      },
      fr: {
        title: 'Anges au mur',
        steps: [
          'Tenez-vous dos, tête et bras contre un mur, coudes pliés à 90°.',
          'Faites glisser lentement les bras vers le haut comme pour dessiner un ange dans la neige, en gardant poignets, coudes et bas du dos contre le mur aussi longtemps que possible.',
          'Les semaines suivantes, dessinez des formes Y, T et W avec les bras au lieu du mouvement d’ange classique, pour varier.',
        ],
        benefits: [
          'Ouvre une poitrine raide et renforce le haut du dos pour une posture plus droite.',
          'Contrecarre directement les épaules projetées vers l’avant à cause de la position assise et des écrans.',
        ],
      },
    },
  },
  {
    keywords: ['doorway stretch'],
    guide: {
      en: {
        title: 'Doorway Chest Stretch',
        steps: [
          'Place your forearms on the door frame at shoulder height, elbows bent at 90°.',
          'Step forward gently through the doorway until you feel the stretch across your chest.',
          'Hold for the full duration without bouncing — never push past mild discomfort.',
        ],
        benefits: [
          'Opens a chest tightened by sitting and screen time, which pulls the shoulders forward.',
          'Prepares the chest to open further alongside wall angel training.',
        ],
      },
      fr: {
        title: 'Étirement de la poitrine dans l’embrasure de porte',
        steps: [
          'Posez les avant-bras sur le cadre de la porte à hauteur d’épaules, coudes pliés à 90°.',
          'Avancez doucement à travers l’embrasure jusqu’à sentir l’étirement dans la poitrine.',
          'Maintenez pendant toute la durée sans à-coups — ne dépassez jamais une légère gêne.',
        ],
        benefits: [
          'Ouvre une poitrine raidie par la position assise et le temps d’écran, qui tire les épaules vers l’avant.',
          'Prépare la poitrine à s’ouvrir davantage aux côtés de l’entraînement des anges au mur.',
        ],
      },
    },
  },
  {
    keywords: ['thoracic extension'],
    guide: {
      en: {
        title: 'Thoracic Extensions Over a Chair',
        steps: [
          'Sit toward the front of a sturdy chair with your hands behind your head.',
          'Arch your upper back over the top of the chair back, opening the chest toward the ceiling.',
          'Return to upright with control and repeat for the prescribed reps.',
        ],
        benefits: [
          'Directly mobilizes the mid-back that rounds forward from long sitting.',
          'Complements wall angels by adding active extension, not just a static stretch.',
        ],
      },
      fr: {
        title: 'Extensions thoraciques sur chaise',
        steps: [
          'Asseyez-vous vers l’avant d’une chaise stable, mains derrière la tête.',
          'Arquez le haut du dos par-dessus le dossier de la chaise, en ouvrant la poitrine vers le plafond.',
          'Revenez à la verticale avec contrôle et répétez pour le nombre de répétitions prescrit.',
        ],
        benefits: [
          'Mobilise directement le milieu du dos qui s’arrondit à force de position assise prolongée.',
          'Complète les anges au mur en ajoutant une extension active, pas seulement un étirement statique.',
        ],
      },
    },
  },
  {
    keywords: ['posture reset alarm', 'alignment habit check'],
    guide: {
      en: {
        title: 'All-Day Posture Check-Ins',
        steps: [
          'Set an actual phone alarm or reminder to check in hourly, rather than relying on memory.',
          'When it goes off, reset: ears over shoulders, shoulders back and down, core lightly braced.',
          'Repeat every day — the conscious check-in is what turns into an unconscious default.',
        ],
        benefits: [
          'Catches slouching throughout the day, not just during a single training session.',
          'Over weeks, this becomes an automatic default posture.',
        ],
      },
      fr: {
        title: 'Vérifications de posture tout au long de la journée',
        steps: [
          'Réglez une vraie alarme ou un rappel sur votre téléphone pour vérifier toutes les heures, plutôt que de compter sur votre mémoire.',
          'Quand il sonne, réajustez-vous : oreilles au-dessus des épaules, épaules en arrière et basses, tronc légèrement gainé.',
          'Répétez chaque jour — c’est cette vérification consciente qui devient un réflexe inconscient.',
        ],
        benefits: [
          'Rattrape l’affaissement tout au long de la journée, pas seulement pendant une séance d’entraînement.',
          'Devient une posture par défaut automatique au fil des semaines.',
        ],
      },
    },
  },
  {
    keywords: ['band pull-apart', 'face pull'],
    guide: {
      en: {
        title: 'Face Pulls & Band Pull-Aparts',
        steps: [
          'Anchor a band at chest height, then pull the handles toward your face, leading with your elbows.',
          'Finish with your hands beside your ears, thumbs pointing back, squeezing your shoulder blades together.',
          'For pull-aparts, hold the band at shoulder height and pull it apart by driving your shoulder blades back, not just your arms.',
          'Control the return on every repetition instead of letting the band snap back.',
        ],
        benefits: [
          'Strengthens the rear shoulders and upper back that pull posture upright.',
          'Balances out pressing movements so shoulders don’t round forward.',
        ],
      },
      fr: {
        title: 'Tirages au visage et écartés à la bande élastique',
        steps: [
          'Fixez une bande élastique à hauteur de poitrine, puis tirez les poignées vers votre visage en menant avec les coudes.',
          'Terminez mains près des oreilles, pouces vers l’arrière, en serrant les omoplates l’une vers l’autre.',
          'Pour les écartés, tenez la bande à hauteur d’épaules et écartez-la en poussant les omoplates vers l’arrière, pas seulement avec les bras.',
          'Contrôlez le retour à chaque répétition au lieu de laisser la bande claquer en arrière.',
        ],
        benefits: [
          'Renforce l’arrière des épaules et le haut du dos, qui redressent la posture.',
          'Équilibre les mouvements de poussée pour éviter que les épaules s’arrondissent vers l’avant.',
        ],
      },
    },
  },
  {
    keywords: ['desk ergonomics'],
    guide: {
      en: {
        title: 'Desk Ergonomics Check',
        steps: [
          'Set your screen top at eye level so you don’t tilt your head down or up to see it.',
          'Keep elbows near 90° with forearms supported, and feet flat on the floor or a footrest.',
          'Check your setup once, then re-check weekly — chairs and desks drift out of position.',
        ],
        benefits: [
          'A better setup removes the constant forward-head pull that undoes chin tuck and wall angel work.',
          'A one-time fix that keeps paying off every hour you sit at the desk.',
        ],
      },
      fr: {
        title: 'Vérification de l’ergonomie du bureau',
        steps: [
          'Réglez le haut de l’écran à hauteur des yeux pour ne pas incliner la tête vers le bas ou le haut pour le voir.',
          'Gardez les coudes proches de 90° avec les avant-bras soutenus, et les pieds à plat au sol ou sur un repose-pieds.',
          'Vérifiez votre installation une fois, puis chaque semaine — chaises et bureaux se dérèglent avec le temps.',
        ],
        benefits: [
          'Une meilleure installation supprime la traction constante vers l’avant qui annule le travail des rentrées de menton et des anges au mur.',
          'Un réglage unique qui continue de payer à chaque heure passée au bureau.',
        ],
      },
    },
  },
  {
    keywords: ['deep neck flexor'],
    guide: {
      en: {
        title: 'Deep Neck Flexor Holds',
        steps: [
          'Lying on your back, gently nod your chin as if saying "yes" in a very small range, flattening the back of your neck slightly toward the floor.',
          'Hold that light activation without straining the front of the neck or lifting your head.',
          'Breathe normally throughout the hold.',
        ],
        benefits: [
          'Strengthens the small stabilizing muscles that keep good head position under real, all-day load.',
          'Complements chin tucks by training the same muscles isometrically.',
        ],
      },
      fr: {
        title: 'Maintiens des fléchisseurs profonds du cou',
        steps: [
          'Allongé sur le dos, hochez doucement le menton comme pour dire « oui » sur une très petite amplitude, en aplatissant légèrement l’arrière du cou vers le sol.',
          'Maintenez cette activation légère sans forcer l’avant du cou ni soulever la tête.',
          'Respirez normalement pendant tout le maintien.',
        ],
        benefits: [
          'Renforce les petits muscles stabilisateurs qui maintiennent une bonne position de tête sous charge réelle, toute la journée.',
          'Complète les rentrées de menton en entraînant les mêmes muscles de façon isométrique.',
        ],
      },
    },
  },
  {
    keywords: ['standing posture holds'],
    guide: {
      en: {
        title: 'Standing Posture Holds Through the Day',
        steps: [
          'At set points through the day, stand tall for a full minute: ears over shoulders, chest open, core lightly braced.',
          'Notice what it feels like compared to your default standing habit.',
          'Repeat several times daily rather than one long session.',
        ],
        benefits: [
          'Turns the corrected position from an exercise into how you actually stand by default.',
          'No equipment and no dedicated time block needed — it fits into any moment of the day.',
        ],
      },
      fr: {
        title: 'Maintiens de posture debout tout au long de la journée',
        steps: [
          'À des moments fixes de la journée, tenez-vous droit pendant une minute complète : oreilles au-dessus des épaules, poitrine ouverte, tronc légèrement gainé.',
          'Remarquez la différence avec votre position debout habituelle.',
          'Répétez plusieurs fois par jour plutôt qu’une seule longue séance.',
        ],
        benefits: [
          'Transforme la position corrigée en votre façon réelle de vous tenir par défaut.',
          'Aucun équipement ni créneau dédié nécessaire — s’intègre à n’importe quel moment de la journée.',
        ],
      },
    },
  },
  {
    keywords: ['loaded carries'],
    guide: {
      en: {
        title: 'Loaded Carries',
        steps: [
          'Pick up a moderately heavy dumbbell or kettlebell in each hand.',
          'Walk a set distance or for a set time keeping shoulders back and down, core braced, and a tall, neutral spine.',
          'Set the weights down with control rather than dropping them.',
        ],
        benefits: [
          'Proves the alignment you’ve trained holds under real load, not just in a controlled exercise.',
          'Builds grip and core strength alongside posture.',
        ],
      },
      fr: {
        title: 'Portés chargés',
        steps: [
          'Prenez un haltère ou un kettlebell modérément lourd dans chaque main.',
          'Marchez sur une distance ou une durée donnée en gardant les épaules en arrière et basses, le tronc gainé, et une colonne droite et neutre.',
          'Reposez les charges avec contrôle plutôt que de les laisser tomber.',
        ],
        benefits: [
          'Prouve que l’alignement entraîné tient sous charge réelle, pas seulement pendant un exercice contrôlé.',
          'Développe la force de préhension et du tronc en plus de la posture.',
        ],
      },
    },
  },
  {
    keywords: ['full posture circuit'],
    guide: {
      en: {
        title: 'Posture Recap Circuit',
        steps: [
          'Combine wall angels, face pulls and deep neck flexor holds into one session, without any new movement.',
          'Add a set of loaded carries at the end to test the position under load.',
        ],
        benefits: [
          'Proves the alignment holds without cueing, under load, and across a full day — the actual definition of a fixed posture.',
        ],
      },
      fr: {
        title: 'Circuit de récapitulatif — Posture',
        steps: [
          'Combinez les anges au mur, les tirages au visage et les maintiens des fléchisseurs profonds du cou en une seule séance, sans aucun nouveau mouvement.',
          'Ajoutez une série de portés chargés à la fin pour tester la position sous charge.',
        ],
        benefits: [
          'Prouve que l’alignement tient sans y penser, sous charge, et sur une journée complète — la définition réelle d’une posture corrigée.',
        ],
      },
    },
  },

  // ---------- Skin (Skinmaxing / Skin Clarity, shared concepts) ----------
  {
    keywords: ['am: cleanse', 'pm: cleanse', 'am routine + spf', 'am antioxidant', 'full am + pm routine', 'gentle cleanse am/pm', 'non-comedogenic moisturizer', 'spf every morning', 'spf reapply midday', 'maintenance routine locked'],
    guide: {
      en: {
        title: 'Skincare Routine Order',
        steps: [
          'Cleanse first on damp skin, then pat dry.',
          'Apply active ingredients (retinoid or niacinamide, whichever the week calls for) before a moisturizer to seal them in.',
          'Finish every morning with SPF as the final step, and reapply midday if you’re outdoors.',
        ],
        benefits: [
          'The correct order lets every product actually absorb and work as intended.',
          'Builds a stronger, more resilient skin barrier over time.',
          'Once this order is automatic, it takes no extra thought to maintain.',
        ],
      },
      fr: {
        title: 'Ordre de la routine de soin',
        steps: [
          'Nettoyez d’abord sur peau humide, puis séchez en tamponnant.',
          'Appliquez les actifs (rétinoïde ou niacinamide, selon la semaine) avant une crème hydratante pour les sceller.',
          'Terminez chaque matin par le SPF comme étape finale, et renouvelez à midi si vous êtes dehors.',
        ],
        benefits: [
          'Le bon ordre permet à chaque produit de vraiment pénétrer et d’agir comme prévu.',
          'Construit une barrière cutanée plus forte et plus résiliente avec le temps.',
          'Une fois cet ordre automatique, il ne demande plus aucun effort de réflexion.',
        ],
      },
    },
  },
  {
    keywords: ['low-% retinoid', 'retinoid nightly'],
    guide: {
      en: {
        title: 'Retinoid Usage',
        steps: [
          'Apply at night only, in a pea-sized amount for the whole face — retinoids break down in sunlight and increase sun sensitivity.',
          'Start on alternate nights; move to nightly only once your skin tolerates it without irritation.',
          'Always follow with a moisturizer, and never skip morning SPF the next day.',
        ],
        benefits: [
          'Increases cell turnover, which is what drives smoother texture and fewer fine lines over time.',
          'Going in slowly avoids irritating the barrier instead of strengthening it.',
        ],
      },
      fr: {
        title: 'Utilisation du rétinoïde',
        steps: [
          'Appliquez uniquement le soir, en quantité de la taille d’un petit pois pour tout le visage — les rétinoïdes se dégradent à la lumière du jour et augmentent la sensibilité au soleil.',
          'Commencez une nuit sur deux ; passez à un usage quotidien seulement une fois que la peau le tolère sans irritation.',
          'Faites toujours suivre d’une crème hydratante, et ne sautez jamais le SPF du matin le lendemain.',
        ],
        benefits: [
          'Augmente le renouvellement cellulaire, ce qui affine la texture et réduit les ridules avec le temps.',
          'Une introduction progressive évite d’irriter la barrière au lieu de la renforcer.',
        ],
      },
    },
  },
  {
    keywords: ['niacinamide'],
    guide: {
      en: {
        title: 'Niacinamide Usage',
        steps: [
          'Apply in the morning after cleansing, before your moisturizer and SPF.',
          'It layers well with most other actives, so no need to alternate nights the way you would with a retinoid.',
          'Give it several weeks of consistent use before judging the result.',
        ],
        benefits: [
          'Targets post-inflammatory marks left behind once active breakouts have calmed down.',
          'Gentle enough for daily use without the irritation risk of stronger actives.',
        ],
      },
      fr: {
        title: 'Utilisation de la niacinamide',
        steps: [
          'Appliquez le matin après le nettoyage, avant la crème hydratante et le SPF.',
          'Elle se superpose bien à la plupart des autres actifs, pas besoin d’alterner les nuits comme avec un rétinoïde.',
          'Laissez plusieurs semaines d’usage régulier avant de juger le résultat.',
        ],
        benefits: [
          'Cible les marques post-inflammatoires laissées une fois que les imperfections actives se sont calmées.',
          'Assez douce pour un usage quotidien, sans le risque d’irritation des actifs plus forts.',
        ],
      },
    },
  },
  {
    keywords: ['weekly gentle exfoliation'],
    guide: {
      en: {
        title: 'Weekly Gentle Exfoliation',
        steps: [
          'Exfoliate once a week only — more than that strips the barrier you’ve spent weeks building.',
          'Use a gentle chemical exfoliant rather than a harsh physical scrub.',
          'Follow immediately with a moisturizer, since freshly exfoliated skin loses water faster.',
        ],
        benefits: [
          'Removes the buildup from three weeks of actives without over-stripping the skin.',
          'Keeps texture smooth without adding daily irritation risk.',
        ],
      },
      fr: {
        title: 'Exfoliation douce hebdomadaire',
        steps: [
          'Exfoliez seulement une fois par semaine — plus que cela abîme la barrière que vous avez mis des semaines à construire.',
          'Utilisez un exfoliant chimique doux plutôt qu’un gommage physique agressif.',
          'Faites suivre immédiatement d’une crème hydratante, car une peau fraîchement exfoliée perd l’eau plus vite.',
        ],
        benefits: [
          'Élimine l’accumulation de trois semaines d’actifs sans agresser la peau.',
          'Garde la texture lisse sans ajouter de risque d’irritation quotidien.',
        ],
      },
    },
  },
  {
    keywords: ['bha exfoliant'],
    guide: {
      en: {
        title: 'BHA Exfoliant Routine',
        steps: [
          'Apply to the whole face on alternate nights, not every night, to avoid over-exfoliating.',
          'BHA works specifically inside the pore to clear the congestion causing breakouts.',
          'Follow with a non-comedogenic moisturizer to protect the barrier.',
        ],
        benefits: [
          'Clears congestion at the source instead of just treating visible breakouts.',
          'Alternating nights lets already-inflamed skin recover between applications.',
        ],
      },
      fr: {
        title: 'Routine à l’exfoliant BHA',
        steps: [
          'Appliquez sur tout le visage une nuit sur deux, pas chaque soir, pour éviter de sur-exfolier.',
          'Le BHA agit spécifiquement à l’intérieur du pore pour dégager la congestion à l’origine des imperfections.',
          'Faites suivre d’un hydratant non comédogène pour protéger la barrière.',
        ],
        benefits: [
          'Dégage la congestion à la source au lieu de traiter seulement les imperfections visibles.',
          'Alterner les nuits laisse à une peau déjà inflammée le temps de récupérer entre les applications.',
        ],
      },
    },
  },
  {
    keywords: ['spot treat', 'continue bha + spot care'],
    guide: {
      en: {
        title: 'Spot Treatment (BHA / Benzoyl Peroxide)',
        steps: [
          'Apply a small amount directly onto active breakouts only, on clean, dry skin.',
          'Never apply to the whole face — this is a targeted treatment, not a leave-on routine step.',
          'Continue daily on active spots until they’ve visibly calmed down.',
        ],
        benefits: [
          'Treats active breakouts directly without irritating skin that isn’t broken out.',
          'Over-applying elsewhere on the face just adds irritation with no extra benefit.',
        ],
      },
      fr: {
        title: 'Traitement localisé (BHA / peroxyde de benzoyle)',
        steps: [
          'Appliquez une petite quantité directement sur les imperfections actives uniquement, sur peau propre et sèche.',
          'N’appliquez jamais sur tout le visage — c’est un traitement ciblé, pas une étape de routine généralisée.',
          'Continuez chaque jour sur les zones actives jusqu’à ce qu’elles se calment visiblement.',
        ],
        benefits: [
          'Traite directement les imperfections actives sans irriter la peau qui n’en a pas.',
          'En mettre ailleurs sur le visage n’ajoute que de l’irritation, sans bénéfice supplémentaire.',
        ],
      },
    },
  },
  {
    keywords: ['no touching / picking', 'no picking'],
    guide: {
      en: {
        title: 'No Touching or Picking',
        steps: [
          'Notice the habit first — most touching happens without realizing it, so awareness is the actual first step.',
          'Keep hands away from the face entirely, not just away from active breakouts.',
          'Use the app’s streak tracker or a simple daily note to hold yourself accountable.',
        ],
        benefits: [
          'Picking is one of the biggest drivers of scarring and prolonged healing time.',
          'A habit, not a product — costs nothing and works alongside any routine.',
        ],
      },
      fr: {
        title: 'Ne pas toucher ni triturer',
        steps: [
          'Repérez d’abord l’habitude — on touche souvent son visage sans s’en rendre compte, donc la prise de conscience est la vraie première étape.',
          'Gardez les mains loin du visage en général, pas seulement loin des imperfections actives.',
          'Utilisez la série de suivi de l’application ou une simple note quotidienne pour vous responsabiliser.',
        ],
        benefits: [
          'Triturer est l’un des plus grands facteurs de cicatrices et de temps de guérison prolongé.',
          'Une habitude, pas un produit — ne coûte rien et fonctionne avec n’importe quelle routine.',
        ],
      },
    },
  },
  {
    keywords: ['pillowcase', 'clean phone screen'],
    guide: {
      en: {
        title: 'Pillowcase & Phone-Screen Hygiene',
        steps: [
          'Change your pillowcase at least twice a week — it collects oil, product residue and bacteria that touch your face all night.',
          'Wipe down your phone screen daily with an alcohol wipe before it touches your cheek on calls.',
        ],
        benefits: [
          'Removes a constant, easy-to-miss source of recontamination for skin that’s already trying to clear up.',
          'Takes seconds and needs no products beyond what you already own.',
        ],
      },
      fr: {
        title: 'Hygiène de la taie d’oreiller et de l’écran de téléphone',
        steps: [
          'Changez votre taie d’oreiller au moins deux fois par semaine — elle accumule huile, résidus de produits et bactéries qui touchent votre visage toute la nuit.',
          'Essuyez l’écran de votre téléphone chaque jour avec une lingette alcoolisée avant qu’il touche votre joue pendant les appels.',
        ],
        benefits: [
          'Élimine une source constante et facile à négliger de recontamination pour une peau déjà en train de se rétablir.',
          'Prend quelques secondes et ne demande aucun produit supplémentaire.',
        ],
      },
    },
  },
  {
    keywords: ['protein + vitamin-c rich meals'],
    guide: {
      en: {
        title: 'Protein + Vitamin-C Meals',
        steps: [
          'Include a protein source and a vitamin-C-rich food (citrus, peppers, berries) at the same meal.',
          'Aim for this pairing at least once daily during this phase of the program.',
        ],
        benefits: [
          'Protein and vitamin C are both directly involved in collagen production.',
          'Supports the structural changes the program is training for from the inside, not just topically.',
        ],
      },
      fr: {
        title: 'Repas riches en protéines et vitamine C',
        steps: [
          'Associez une source de protéines et un aliment riche en vitamine C (agrumes, poivrons, fruits rouges) au même repas.',
          'Visez cette association au moins une fois par jour pendant cette phase du programme.',
        ],
        benefits: [
          'Les protéines et la vitamine C sont toutes deux directement impliquées dans la production de collagène.',
          'Soutient de l’intérieur les changements structurels visés par le programme, pas seulement en surface.',
        ],
      },
    },
  },
  {
    keywords: ['cut dairy + high-sugar test'],
    guide: {
      en: {
        title: 'Dairy & High-Sugar Elimination Test',
        steps: [
          'Cut dairy and high-sugar foods for one full week to see if your skin responds.',
          'Keep everything else in your routine unchanged during the test so you can actually attribute any change to this one variable.',
          'Reintroduce afterward if you saw no difference — this is a test, not a permanent rule.',
        ],
        benefits: [
          'Both are common, individual triggers for breakouts in some people — this finds out if that’s true for you.',
          'A one-week test is low-cost and gives a real, personal answer instead of a generic rule.',
        ],
      },
      fr: {
        title: 'Test d’élimination des produits laitiers et du sucre',
        steps: [
          'Supprimez les produits laitiers et les aliments très sucrés pendant une semaine complète pour voir si votre peau réagit.',
          'Gardez le reste de votre routine inchangé pendant le test pour pouvoir vraiment attribuer un changement à cette seule variable.',
          'Réintroduisez-les ensuite si vous n’avez vu aucune différence — c’est un test, pas une règle permanente.',
        ],
        benefits: [
          'Ce sont deux déclencheurs individuels courants d’imperfections chez certaines personnes — ce test vérifie si c’est votre cas.',
          'Un test d’une semaine ne coûte rien et donne une réponse réelle et personnelle plutôt qu’une règle générique.',
        ],
      },
    },
  },
  {
    keywords: ['clay mask'],
    guide: {
      en: {
        title: 'Weekly Clay Mask',
        steps: [
          'Apply a thin, even layer to clean skin, avoiding the eye area.',
          'Leave on until just before it fully hardens — over-drying it on the skin pulls out too much moisture.',
          'Rinse with lukewarm water and follow with your normal moisturizer.',
        ],
        benefits: [
          'Draws out excess oil and buildup that daily cleansing alone doesn’t reach.',
          'A weekly deep-clean that keeps congestion from building back up now that skin is clear.',
        ],
      },
      fr: {
        title: 'Masque à l’argile hebdomadaire',
        steps: [
          'Appliquez une couche fine et uniforme sur peau propre, en évitant le contour des yeux.',
          'Laissez poser jusqu’à juste avant qu’il ne durcisse complètement — le laisser sécher trop longtemps sur la peau retire trop d’hydratation.',
          'Rincez à l’eau tiède et faites suivre de votre hydratant habituel.',
        ],
        benefits: [
          'Retire l’excès de sébum et l’accumulation que le nettoyage quotidien seul n’atteint pas.',
          'Un nettoyage en profondeur hebdomadaire qui empêche la congestion de revenir maintenant que la peau est claire.',
        ],
      },
    },
  },

  // ---------- Grooming ----------
  {
    keywords: ['brow clean', 'brow maintenance'],
    guide: {
      en: {
        title: 'Brow Shaping & Maintenance',
        steps: [
          'Map your natural brow shape first — don’t remove hair randomly.',
          'Start the brow roughly above the inner corner of the eye, ending on a line from the nostril through the outer eye corner.',
          'Tweeze or trim only the strays outside that shape, a few hairs at a time.',
          'Check your work in good light as you go, rather than removing a lot at once.',
        ],
        benefits: [
          'A well-shaped brow instantly changes how the whole face reads.',
          'Keeps your natural shape instead of over-plucking into an unnatural line.',
          'A few minutes of upkeep keeps the shape sharp between full sessions.',
        ],
      },
      fr: {
        title: 'Mise en forme et entretien des sourcils',
        steps: [
          'Cartographiez d’abord la forme naturelle de vos sourcils — ne retirez pas de poils au hasard.',
          'Faites commencer le sourcil environ au-dessus du coin interne de l’œil, jusqu’à une ligne allant de la narine au coin externe de l’œil.',
          'Épilez ou taillez uniquement les poils qui dépassent de cette forme, quelques-uns à la fois.',
          'Vérifiez sous bonne lumière au fur et à mesure, plutôt que d’en enlever beaucoup d’un coup.',
        ],
        benefits: [
          'Des sourcils bien dessinés changent immédiatement la lecture de tout le visage.',
          'Conserve votre forme naturelle au lieu de sur-épiler vers une ligne artificielle.',
          'Quelques minutes d’entretien suffisent à garder la forme nette entre deux séances complètes.',
        ],
      },
    },
  },
  {
    keywords: ['book / plan a sharp haircut'],
    guide: {
      en: {
        title: 'Book a Sharp Haircut',
        steps: [
          'Book the appointment now rather than waiting until you need one urgently.',
          'Bring a reference photo close to your face shape rather than describing it from memory.',
          'Ask specifically for a shape that frames your jawline, not just a generic trim.',
        ],
        benefits: [
          'A proper haircut changes how the whole face reads immediately — the fastest single win in the program.',
          'Booking ahead avoids the rushed, last-minute cut that rarely turns out well.',
        ],
      },
      fr: {
        title: 'Réserver une coupe nette',
        steps: [
          'Réservez le rendez-vous maintenant plutôt que d’attendre un besoin urgent.',
          'Apportez une photo de référence proche de la forme de votre visage plutôt que de la décrire de mémoire.',
          'Demandez spécifiquement une coupe qui encadre votre mâchoire, pas juste une coupe générique.',
        ],
        benefits: [
          'Une bonne coupe change immédiatement la lecture de tout le visage — le gain le plus rapide du programme.',
          'Réserver à l’avance évite la coupe précipitée de dernière minute, qui donne rarement un bon résultat.',
        ],
      },
    },
  },
  {
    keywords: ['beard', 'shave line'],
    guide: {
      en: {
        title: 'Beard & Shave Line',
        steps: [
          'Define your line along your natural jaw and cheek boundary, not higher.',
          'Use a trimmer guard one size longer than you think first, then go shorter if needed.',
          'Keep the neckline just above your Adam’s apple, not up at the jawbone.',
          'Trim gradually — you can always take off more, not put it back.',
        ],
        benefits: [
          'A natural line looks sharp immediately and stays natural as hair grows back.',
          'Frames and sharpens the jawline instead of hiding it.',
          'A clean neckline instantly reads as more groomed and put-together.',
        ],
      },
      fr: {
        title: 'Ligne de barbe et de rasage',
        steps: [
          'Définissez votre ligne le long du contour naturel de la mâchoire et de la joue, pas plus haut.',
          'Utilisez d’abord un sabot de tondeuse une taille plus longue que ce que vous pensez, puis raccourcissez si besoin.',
          'Gardez la ligne du cou juste au-dessus de la pomme d’Adam, pas au niveau de la mâchoire.',
          'Taillez progressivement — vous pouvez toujours en enlever plus, pas en remettre.',
        ],
        benefits: [
          'Une ligne naturelle paraît nette immédiatement et reste naturelle à la repousse.',
          'Encadre et affine la mâchoire au lieu de la masquer.',
          'Une ligne de cou propre se lit immédiatement comme plus soignée.',
        ],
      },
    },
  },
  {
    keywords: ['start whitening routine', 'whitening + flossing', 'whitening routine'],
    guide: {
      en: {
        title: 'Teeth Whitening & Flossing',
        steps: [
          'Follow your whitening product’s instructions exactly, especially the contact time — more isn’t faster, just more sensitivity.',
          'Floss before whitening so the product reaches between teeth, not just the surface.',
          'Keep the routine going daily; whitening fades without maintenance.',
        ],
        benefits: [
          'A brighter smile is one of the fastest-reading presentation upgrades.',
          'Flossing alongside it protects gum health, not just appearance.',
        ],
      },
      fr: {
        title: 'Blanchiment dentaire et fil dentaire',
        steps: [
          'Suivez exactement les instructions de votre produit blanchissant, en particulier le temps de pose — en faire plus n’accélère pas les résultats, ça augmente juste la sensibilité.',
          'Passez le fil dentaire avant le blanchiment pour que le produit atteigne aussi l’espace entre les dents, pas seulement la surface.',
          'Continuez la routine chaque jour ; le blanchiment s’estompe sans entretien.',
        ],
        benefits: [
          'Un sourire plus lumineux est l’une des améliorations de présentation les plus immédiatement visibles.',
          'Le fil dentaire en parallèle protège la santé des gencives, pas seulement l’apparence.',
        ],
      },
    },
  },
  {
    keywords: ['style hair with correct products'],
    guide: {
      en: {
        title: 'Daily Hair Styling',
        steps: [
          'Match the product to your hair type and the haircut you booked — a matte clay or paste for texture, a light cream for control.',
          'Apply to towel-dried, not soaking wet, hair for the best hold.',
          'Style toward the shape your barber gave you, not against it.',
        ],
        benefits: [
          'Keeps the fresh-cut look going daily instead of fading back to shapeless within a week.',
          'The right product makes styling faster, not more complicated.',
        ],
      },
      fr: {
        title: 'Coiffage quotidien',
        steps: [
          'Adaptez le produit à votre type de cheveux et à la coupe réservée — une argile ou pâte mate pour la texture, une crème légère pour le contrôle.',
          'Appliquez sur cheveux essorés à la serviette, pas trempés, pour une meilleure tenue.',
          'Coiffez dans le sens de la forme donnée par votre coiffeur, pas à contre-sens.',
        ],
        benefits: [
          'Maintient l’effet fraîchement coupé au quotidien au lieu qu’il s’estompe en une semaine.',
          'Le bon produit rend le coiffage plus rapide, pas plus compliqué.',
        ],
      },
    },
  },
  {
    keywords: ['nail + hand grooming'],
    guide: {
      en: {
        title: 'Nail & Hand Grooming',
        steps: [
          'Trim nails straight across, then round the edges slightly with a file.',
          'Push back cuticles gently after a shower, when they’re softest — never cut them.',
          'Finish with a hand moisturizer, especially if you wash your hands often.',
        ],
        benefits: [
          'Hands are visible constantly in conversation — small detail, disproportionately noticed.',
          'Takes a few minutes and prevents the ragged look that comes from neglect.',
        ],
      },
      fr: {
        title: 'Entretien des ongles et des mains',
        steps: [
          'Coupez les ongles droit, puis arrondissez légèrement les bords à la lime.',
          'Repoussez doucement les cuticules après une douche, quand elles sont les plus souples — ne les coupez jamais.',
          'Terminez par une crème pour les mains, surtout si vous vous les lavez souvent.',
        ],
        benefits: [
          'Les mains sont constamment visibles en conversation — un petit détail, remarqué de façon disproportionnée.',
          'Prend quelques minutes et évite l’aspect négligé qui vient du manque d’entretien.',
        ],
      },
    },
  },
  {
    keywords: ['fragrance + skin base'],
    guide: {
      en: {
        title: 'Fragrance & Skin-Base Routine',
        steps: [
          'Apply fragrance to pulse points (wrists, neck) right after a shower, on slightly damp skin, so it lasts longer.',
          'Keep it to 2–3 sprays — the goal is someone noticing up close, not across the room.',
          'For skin base, a light, even tone product only where needed, blended well at the jawline so there’s no visible line.',
        ],
        benefits: [
          'Correct application makes a small amount of product last the whole day.',
          'A subtle, even base reads as naturally clear skin, not as makeup.',
        ],
      },
      fr: {
        title: 'Routine parfum et base de peau',
        steps: [
          'Appliquez le parfum sur les points de pulsation (poignets, cou) juste après la douche, sur peau légèrement humide, pour qu’il tienne plus longtemps.',
          'Limitez-vous à 2 ou 3 pulvérisations — l’objectif est d’être remarqué de près, pas depuis l’autre bout de la pièce.',
          'Pour la base de peau, un produit léger et uniforme uniquement où nécessaire, bien fondu au niveau de la mâchoire pour qu’aucune ligne ne soit visible.',
        ],
        benefits: [
          'Une bonne application fait durer une petite quantité de produit toute la journée.',
          'Une base subtile et uniforme se lit comme une peau naturellement nette, pas comme du maquillage.',
        ],
      },
    },
  },
  {
    keywords: ['edge-up touch-ups'],
    guide: {
      en: {
        title: 'Edge-Up Touch-Ups',
        steps: [
          'Use a trimmer to clean up the hairline and beard edges that grow back fastest — sideburns, neckline, cheek line.',
          'Follow the same lines your barber set, don’t redesign them yourself between full cuts.',
          'A quick touch-up every few days keeps the shape sharp without a full trim.',
        ],
        benefits: [
          'Keeps the sharp lines from your last haircut and beard shape from softening between sessions.',
          'A few minutes, not a full grooming session, is enough to maintain it.',
        ],
      },
      fr: {
        title: 'Retouches de contours',
        steps: [
          'Utilisez une tondeuse pour nettoyer la ligne de cheveux et les contours de barbe qui repoussent le plus vite — pattes, ligne de cou, ligne de joue.',
          'Suivez les mêmes lignes fixées par votre coiffeur, ne les redessinez pas vous-même entre deux coupes complètes.',
          'Une retouche rapide tous les quelques jours garde la forme nette sans une coupe complète.',
        ],
        benefits: [
          'Empêche les lignes nettes de votre dernière coupe et forme de barbe de s’estomper entre les séances.',
          'Quelques minutes suffisent, pas besoin d’une séance de grooming complète.',
        ],
      },
    },
  },
  {
    keywords: ['wardrobe fit check'],
    guide: {
      en: {
        title: 'Wardrobe Fit Check',
        steps: [
          'Try on your top 3 go-to outfits and check the fit at the shoulders, chest and waist — not just whether it "fits" loosely.',
          'Set aside anything clearly too big or too small rather than wearing it out of habit.',
          'Note what actually flatters your current build so future purchases target that fit.',
        ],
        benefits: [
          'Well-fitted clothing changes how your whole physique reads, independent of any training progress.',
          'A one-time check saves you from defaulting to old, ill-fitting favorites.',
        ],
      },
      fr: {
        title: 'Vérification de la garde-robe',
        steps: [
          'Essayez vos 3 tenues favorites et vérifiez la coupe aux épaules, à la poitrine et à la taille — pas juste si ça « rentre » vaguement.',
          'Mettez de côté tout ce qui est clairement trop grand ou trop petit plutôt que de le porter par habitude.',
          'Notez ce qui met réellement en valeur votre carrure actuelle pour orienter vos futurs achats.',
        ],
        benefits: [
          'Des vêtements bien ajustés changent la lecture de toute votre silhouette, indépendamment des progrès à l’entraînement.',
          'Une vérification ponctuelle évite de se rabattre sur d’anciens favoris mal ajustés.',
        ],
      },
    },
  },
  {
    keywords: ['restock products'],
    guide: {
      en: {
        title: 'Restock Low Products',
        steps: [
          'Check every product used daily in your routine — skincare, whitening, grooming tools — for how much is left.',
          'Reorder anything below about a week’s supply now, before it runs out mid-routine.',
        ],
        benefits: [
          'Running out mid-routine is one of the most common reasons habits quietly stop.',
          'A five-minute check now prevents a multi-day gap later.',
        ],
      },
      fr: {
        title: 'Réapprovisionner les produits en fin de stock',
        steps: [
          'Vérifiez chaque produit utilisé quotidiennement dans votre routine — soin, blanchiment, outils de grooming — pour voir ce qu’il reste.',
          'Recommandez tout ce qui représente moins d’une semaine d’utilisation, avant la rupture en pleine routine.',
        ],
        benefits: [
          'Manquer d’un produit en pleine routine est l’une des raisons les plus courantes pour lesquelles une habitude s’arrête sans qu’on s’en rende compte.',
          'Cinq minutes de vérification maintenant évitent plusieurs jours d’interruption plus tard.',
        ],
      },
    },
  },
  {
    keywords: ['set weekly maintenance schedule'],
    guide: {
      en: {
        title: 'Set a Weekly Maintenance Schedule',
        steps: [
          'Pick fixed days for recurring upkeep — edge-ups, nails, restocking — instead of doing them whenever you remember.',
          'Write the schedule down or set recurring reminders so it doesn’t rely on memory.',
        ],
        benefits: [
          'A repeatable weekly rhythm is what keeps the whole system running after the 28 days end.',
          'Removes the daily decision of "should I do this today," which is what usually causes upkeep to slip.',
        ],
      },
      fr: {
        title: 'Fixer un calendrier d’entretien hebdomadaire',
        steps: [
          'Choisissez des jours fixes pour l’entretien récurrent — retouches, ongles, réapprovisionnement — plutôt que de les faire quand vous y pensez.',
          'Notez le calendrier ou réglez des rappels récurrents pour ne pas dépendre de votre mémoire.',
        ],
        benefits: [
          'Un rythme hebdomadaire reproductible est ce qui fait tourner tout le système après la fin des 28 jours.',
          'Supprime la décision quotidienne de « dois-je le faire aujourd’hui », ce qui est souvent la cause d’un entretien qui se relâche.',
        ],
      },
    },
  },
  {
    keywords: ['full grooming pass'],
    guide: {
      en: {
        title: 'Grooming Recap Pass',
        steps: [
          'In one session, touch up brows, beard/shave line, hair styling, nails and fragrance together.',
          'Take your styled progress photo right after, while everything is freshly done.',
        ],
        benefits: [
          'Confirms every part of the system — hair, face, hands, scent — still works together as one presentation.',
          'A full pass before the final photo shows the real, complete result.',
        ],
      },
      fr: {
        title: 'Passage de récapitulatif — Grooming',
        steps: [
          'En une seule séance, retouchez sourcils, ligne de barbe/rasage, coiffage, ongles et parfum ensemble.',
          'Prenez votre photo de progression stylée juste après, pendant que tout est fraîchement fait.',
        ],
        benefits: [
          'Confirme que chaque élément du système — cheveux, visage, mains, parfum — fonctionne encore ensemble comme une seule présentation.',
          'Un passage complet avant la photo finale montre le résultat réel et complet.',
        ],
      },
    },
  },

  // ---------- Hormonal Optimization Diet ----------
  {
    keywords: ['protein target', 'protein:', 'hit protein'],
    guide: {
      en: {
        title: 'Protein Target',
        steps: [
          'Divide your daily protein target across 3–4 meals rather than one large serving.',
          'Prioritize complete protein sources — meat, fish, eggs, dairy — with legumes as a supplement, not the sole source.',
          'Track it for the first couple of weeks until you know your usual meals well enough to estimate by eye.',
        ],
        benefits: [
          'The body can only use so much protein at once, so spreading it out improves results.',
          'Adequate protein is a direct building block for the muscle changes the rest of the program trains for.',
        ],
      },
      fr: {
        title: 'Objectif protéines',
        steps: [
          'Répartissez votre objectif quotidien de protéines sur 3 à 4 repas plutôt qu’une seule grosse portion.',
          'Privilégiez les sources de protéines complètes — viande, poisson, œufs, produits laitiers — avec les légumineuses en complément, pas comme seule source.',
          'Suivez-le pendant les deux premières semaines jusqu’à bien connaître vos repas habituels pour estimer à l’œil.',
        ],
        benefits: [
          'Le corps ne peut utiliser qu’une certaine quantité de protéines à la fois, donc les répartir améliore les résultats.',
          'Un apport suffisant en protéines est un élément constitutif direct des changements musculaires visés par le reste du programme.',
        ],
      },
    },
  },
  {
    keywords: ['cut liquid sugar'],
    guide: {
      en: {
        title: 'Cut Liquid Sugar & Seed-Oil Fried Food',
        steps: [
          'Replace soda, juice and sweetened drinks with water, black coffee or unsweetened tea.',
          'Cut food fried in seed oils (most fast food and packaged snacks) in favor of home-cooked meals with olive oil or butter.',
        ],
        benefits: [
          'Liquid sugar causes the sharpest blood-sugar spikes, which directly suppress testosterone production.',
          'Removes two of the biggest hormone disruptors first, before adding anything else to the diet.',
        ],
      },
      fr: {
        title: 'Supprimer le sucre liquide et les fritures à l’huile de graines',
        steps: [
          'Remplacez sodas, jus et boissons sucrées par de l’eau, du café noir ou du thé non sucré.',
          'Supprimez les aliments frits dans l’huile de graines (la plupart des fast-foods et snacks industriels) au profit de repas faits maison à l’huile d’olive ou au beurre.',
        ],
        benefits: [
          'Le sucre liquide provoque les pics de glycémie les plus marqués, qui suppriment directement la production de testostérone.',
          'Élimine d’abord deux des plus grands perturbateurs hormonaux, avant d’ajouter quoi que ce soit d’autre au régime.',
        ],
      },
    },
  },
  {
    keywords: ['whole-food carbs'],
    guide: {
      en: {
        title: 'Whole-Food Carbs Only',
        steps: [
          'Choose rice, oats, potatoes and fruit over bread, pastries and packaged carb sources.',
          'Pair carbs with protein or fat at the same meal to blunt the blood-sugar spike.',
        ],
        benefits: [
          'Whole-food carbs digest more slowly, which keeps insulin — and by extension testosterone — more stable.',
          'Same energy for training, without the crash that refined carbs cause.',
        ],
      },
      fr: {
        title: 'Glucides uniquement issus d’aliments complets',
        steps: [
          'Choisissez riz, flocons d’avoine, pommes de terre et fruits plutôt que pain, viennoiseries et glucides industriels.',
          'Associez les glucides à une protéine ou un lipide au même repas pour atténuer le pic de glycémie.',
        ],
        benefits: [
          'Les glucides issus d’aliments complets se digèrent plus lentement, ce qui garde l’insuline — et donc la testostérone — plus stable.',
          'La même énergie pour l’entraînement, sans le coup de fatigue que causent les glucides raffinés.',
        ],
      },
    },
  },
  {
    keywords: ['zinc + magnesium'],
    guide: {
      en: {
        title: 'Zinc & Magnesium Rich Meals',
        steps: [
          'Include a zinc source (red meat, shellfish, pumpkin seeds) at least once daily.',
          'Include a magnesium source (leafy greens, nuts, dark chocolate) at least once daily, ideally in the evening.',
        ],
        benefits: [
          'Both minerals are directly involved in testosterone production and are commonly under-eaten.',
          'Magnesium in the evening also supports the sleep quality the rest of the program relies on.',
        ],
      },
      fr: {
        title: 'Repas riches en zinc et magnésium',
        steps: [
          'Incluez une source de zinc (viande rouge, fruits de mer, graines de courge) au moins une fois par jour.',
          'Incluez une source de magnésium (légumes verts, noix, chocolat noir) au moins une fois par jour, idéalement le soir.',
        ],
        benefits: [
          'Ces deux minéraux sont directement impliqués dans la production de testostérone et souvent sous-consommés.',
          'Le magnésium le soir soutient aussi la qualité de sommeil dont dépend le reste du programme.',
        ],
      },
    },
  },
  {
    keywords: ['strength train', 'resistance training progression'],
    guide: {
      en: {
        title: 'Strength Training Progression',
        steps: [
          'Favor compound movements (squats, presses, rows, deadlifts) that work multiple muscle groups at once.',
          'Add small amounts of weight or repetitions week to week rather than jumping too fast.',
          'Prioritize consistent, gradual overload over sporadic maxing out.',
        ],
        benefits: [
          'Compound movements drive the biggest hormonal response per session.',
          'Gradual progression builds real, lasting strength without injury risk.',
        ],
      },
      fr: {
        title: 'Progression en musculation',
        steps: [
          'Privilégiez les mouvements polyarticulaires (squats, développés, rowing, soulevé de terre) qui sollicitent plusieurs groupes musculaires à la fois.',
          'Ajoutez de petites quantités de poids ou de répétitions semaine après semaine plutôt que d’avancer trop vite.',
          'Priorisez une surcharge progressive et régulière plutôt que des efforts maximaux sporadiques.',
        ],
        benefits: [
          'Les mouvements polyarticulaires déclenchent la plus grande réponse hormonale par séance.',
          'Une progression progressive construit une force réelle et durable sans risque de blessure.',
        ],
      },
    },
  },
  {
    keywords: ['fasting'],
    guide: {
      en: {
        title: 'Overnight Fasting Window',
        steps: [
          'Stop eating at least 12 hours before your first meal the next day — usually just means no late-night snacking.',
          'Keep the window consistent night to night rather than fasting 15 hours one day and 8 the next.',
        ],
        benefits: [
          'A consistent overnight fast supports insulin sensitivity, which keeps blood sugar — and hormone signaling — more stable.',
          'Easier to sustain than it sounds, since most of the window is spent asleep.',
        ],
      },
      fr: {
        title: 'Fenêtre de jeûne nocturne',
        steps: [
          'Arrêtez de manger au moins 12 heures avant votre premier repas du lendemain — cela revient souvent à simplement éviter le grignotage tardif.',
          'Gardez cette fenêtre constante d’une nuit à l’autre plutôt que de jeûner 15 heures un jour et 8 le lendemain.',
        ],
        benefits: [
          'Un jeûne nocturne constant soutient la sensibilité à l’insuline, ce qui garde la glycémie — et la signalisation hormonale — plus stable.',
          'Plus facile à tenir qu’il n’y paraît, puisque l’essentiel de la fenêtre se passe pendant le sommeil.',
        ],
      },
    },
  },
  {
    keywords: ['healthy fats'],
    guide: {
      en: {
        title: 'Healthy Fats',
        steps: [
          'Include eggs, olive oil and fatty fish (salmon, sardines) regularly through the week.',
          'Don’t default to low-fat versions of foods — dietary cholesterol from these sources is a literal building block for testosterone.',
        ],
        benefits: [
          'Directly supports hormone production, unlike carbs or protein alone.',
          'Adds alongside the resistance training already in the program rather than replacing it.',
        ],
      },
      fr: {
        title: 'Bonnes graisses',
        steps: [
          'Incluez régulièrement œufs, huile d’olive et poissons gras (saumon, sardines) sur la semaine.',
          'Ne vous rabattez pas par défaut sur des versions allégées — le cholestérol alimentaire de ces sources est un élément constitutif direct de la testostérone.',
        ],
        benefits: [
          'Soutient directement la production hormonale, contrairement aux glucides ou aux protéines seuls.',
          'S’ajoute au travail de musculation déjà présent dans le programme plutôt que de le remplacer.',
        ],
      },
    },
  },
  {
    keywords: ['stress / cortisol wind-down'],
    guide: {
      en: {
        title: 'Stress & Cortisol Wind-Down',
        steps: [
          'Set aside 10–15 minutes each evening for something that actively lowers stress: slow breathing, a short walk, journaling or stretching.',
          'Keep it screen-free and separate from your regular evening wind-down routine.',
        ],
        benefits: [
          'Chronically elevated cortisol directly suppresses testosterone production.',
          'A short daily practice compounds far more than occasional, longer sessions.',
        ],
      },
      fr: {
        title: 'Décompression du stress et du cortisol',
        steps: [
          'Réservez 10 à 15 minutes chaque soir à quelque chose qui réduit activement le stress : respiration lente, courte marche, journaling ou étirements.',
          'Gardez ce moment sans écran et séparé de votre rituel du soir habituel.',
        ],
        benefits: [
          'Un cortisol chroniquement élevé supprime directement la production de testostérone.',
          'Une courte pratique quotidienne se cumule bien plus que des séances occasionnelles et plus longues.',
        ],
      },
    },
  },
  {
    keywords: ['full nutrient-dense day'],
    guide: {
      en: {
        title: 'Hormonal Recap Day',
        steps: [
          'Combine your protein target, healthy fats, zinc/magnesium meals and overnight fast into one full day.',
          'Note your energy, mood and training performance at the end of the day.',
        ],
        benefits: [
          'Confirms every nutrition principle from the past three weeks fits together in a single real day, not just in isolation.',
          'Energy and training performance are the honest, immediate readout of whether the fundamentals are actually working.',
        ],
      },
      fr: {
        title: 'Journée de récapitulatif — Régime hormonal',
        steps: [
          'Combinez votre objectif protéines, les bonnes graisses, les repas zinc/magnésium et le jeûne nocturne en une seule journée complète.',
          'Notez votre énergie, votre humeur et votre performance à l’entraînement en fin de journée.',
        ],
        benefits: [
          'Confirme que tous les principes nutritionnels des trois dernières semaines s’articulent en une vraie journée, pas seulement isolément.',
          'L’énergie et la performance à l’entraînement sont le reflet honnête et immédiat de l’efficacité réelle des fondamentaux.',
        ],
      },
    },
  },
  {
    keywords: ['track measurements'],
    guide: {
      en: {
        title: 'Track Measurements & Energy',
        steps: [
          'Measure your waist and note your energy level (1–10) at the same time each week.',
          'Write both down somewhere you’ll actually see again — a note, the app’s tracker, or a calendar.',
        ],
        benefits: [
          'Hormonal shifts show up in waist measurement and energy before they show up anywhere else.',
          'A simple weekly number is how you actually confirm the diet is working, not just how it feels day to day.',
        ],
      },
      fr: {
        title: 'Suivi des mensurations et de l’énergie',
        steps: [
          'Mesurez votre tour de taille et notez votre niveau d’énergie (1 à 10) au même moment chaque semaine.',
          'Notez les deux quelque part que vous reverrez vraiment — une note, le suivi de l’application, ou un calendrier.',
        ],
        benefits: [
          'Les changements hormonaux se manifestent dans le tour de taille et l’énergie avant de se voir ailleurs.',
          'Un simple chiffre hebdomadaire permet de vraiment confirmer que le régime fonctionne, pas seulement une impression au jour le jour.',
        ],
      },
    },
  },

  // ---------- Elite Sleep Protocol ----------
  {
    keywords: ['fixed wake time', 'set permanent sleep schedule'],
    guide: {
      en: {
        title: 'Fixed Wake Time',
        steps: [
          'Pick one wake-up time and keep it every day this week, weekends included.',
          'Use an alarm rather than trying to wake naturally while your rhythm is still resetting.',
          'Once the week proves it, keep that same time permanently rather than treating it as a temporary experiment.',
        ],
        benefits: [
          'Wake time anchors your circadian rhythm more strongly than bedtime does.',
          'A fixed anchor is what every other sleep habit in the program builds on.',
        ],
      },
      fr: {
        title: 'Heure de réveil fixe',
        steps: [
          'Choisissez une heure de réveil et gardez-la chaque jour cette semaine, week-end compris.',
          'Utilisez une alarme plutôt que d’essayer de vous réveiller naturellement pendant que votre rythme se recalibre encore.',
          'Une fois la semaine validée, gardez cette même heure de façon permanente plutôt que de la traiter comme un essai temporaire.',
        ],
        benefits: [
          'L’heure de réveil ancre le rythme circadien plus fortement que l’heure du coucher.',
          'Cet ancrage fixe est ce sur quoi repose chaque autre habitude de sommeil du programme.',
        ],
      },
    },
  },
  {
    keywords: ['morning sunlight', 'sunlight 15 min'],
    guide: {
      en: {
        title: 'Morning Sunlight',
        steps: [
          'Get outside, or at least right next to a window, within 30 minutes of waking.',
          'Aim for roughly 15 minutes of direct light exposure — no sunglasses needed for this.',
          'On overcast days, stay outside longer; even cloudy daylight is far brighter than indoor lighting.',
        ],
        benefits: [
          'Morning light exposure is the strongest signal that locks in your circadian rhythm.',
          'Directly supports the fixed wake time by reinforcing the same signal every day.',
        ],
      },
      fr: {
        title: 'Lumière du soleil le matin',
        steps: [
          'Sortez, ou au moins installez-vous juste à côté d’une fenêtre, dans les 30 minutes suivant le réveil.',
          'Visez environ 15 minutes d’exposition directe à la lumière — pas besoin de lunettes de soleil pour cela.',
          'Les jours nuageux, restez dehors plus longtemps ; même une lumière voilée est bien plus intense qu’un éclairage intérieur.',
        ],
        benefits: [
          'L’exposition à la lumière du matin est le signal le plus fort pour verrouiller le rythme circadien.',
          'Soutient directement l’heure de réveil fixe en renforçant le même signal chaque jour.',
        ],
      },
    },
  },
  {
    keywords: ['no caffeine after'],
    guide: {
      en: {
        title: 'Caffeine Cutoff',
        steps: [
          'Have your last caffeine (coffee, tea, energy drinks) by early-to-mid afternoon at the latest.',
          'Watch for hidden caffeine in chocolate or some sodas if you’re sensitive.',
          'Switch to herbal tea or water for anything you’d normally drink later in the day.',
        ],
        benefits: [
          'Caffeine has a long half-life — an afternoon cup can still be affecting sleep depth that night.',
          'A firm cutoff is simpler to stick to than trying to judge it case by case.',
        ],
      },
      fr: {
        title: 'Heure limite pour la caféine',
        steps: [
          'Prenez votre dernière caféine (café, thé, boissons énergisantes) au plus tard en début ou milieu d’après-midi.',
          'Faites attention à la caféine cachée dans le chocolat ou certains sodas si vous y êtes sensible.',
          'Passez à une tisane ou de l’eau pour tout ce que vous boiriez normalement plus tard dans la journée.',
        ],
        benefits: [
          'La caféine a une longue demi-vie — un café pris l’après-midi peut encore affecter la profondeur du sommeil ce soir-là.',
          'Une limite fixe est plus simple à tenir que d’essayer de juger au cas par cas.',
        ],
      },
    },
  },
  {
    keywords: ['cool, dark room'],
    guide: {
      en: {
        title: 'Cool, Dark Room',
        steps: [
          'Set the bedroom temperature to around 18°C — cooler than most people default to.',
          'Block outside light with blackout curtains or an eye mask.',
          'Cover or turn away any small standby lights from electronics.',
        ],
        benefits: [
          'Body temperature naturally drops to initiate sleep, so a cool room works with that process instead of against it.',
          'Darkness directly supports melatonin release, which light — even small amounts — suppresses.',
        ],
      },
      fr: {
        title: 'Chambre fraîche et sombre',
        steps: [
          'Réglez la température de la chambre autour de 18°C — plus frais que ce à quoi la plupart des gens sont habitués.',
          'Bloquez la lumière extérieure avec des rideaux occultants ou un masque de sommeil.',
          'Couvrez ou détournez les petites veilleuses des appareils électroniques.',
        ],
        benefits: [
          'La température du corps baisse naturellement pour déclencher le sommeil, donc une chambre fraîche accompagne ce processus au lieu de le contrarier.',
          'L’obscurité soutient directement la libération de mélatonine, que la lumière — même en petite quantité — supprime.',
        ],
      },
    },
  },
  {
    keywords: ['no large meals'],
    guide: {
      en: {
        title: 'No Large Meals Before Bed',
        steps: [
          'Finish your last substantial meal at least 3 hours before bedtime.',
          'If you’re hungry later, keep it small and light rather than skipping this rule entirely.',
        ],
        benefits: [
          'Digestion competes with the body’s ability to lower core temperature and fall into deep sleep.',
          'A simple timing rule, not a diet restriction — what you eat matters less here than when.',
        ],
      },
      fr: {
        title: 'Pas de gros repas avant le coucher',
        steps: [
          'Terminez votre dernier repas conséquent au moins 3 heures avant le coucher.',
          'Si la faim se fait sentir plus tard, privilégiez quelque chose de léger plutôt que d’ignorer complètement cette règle.',
        ],
        benefits: [
          'La digestion entre en concurrence avec la capacité du corps à baisser sa température centrale et à entrer en sommeil profond.',
          'Une simple règle de timing, pas une restriction alimentaire — ce que vous mangez compte ici moins que le moment.',
        ],
      },
    },
  },
  {
    keywords: ['consistent bedtime'],
    guide: {
      en: {
        title: 'Consistent Bedtime',
        steps: [
          'Pick a target bedtime that gives you a full night before your fixed wake time.',
          'Stay within about ±15 minutes of it every night, weekends included.',
          'Start your wind-down routine early enough that you’re actually ready at that time, not just in bed scrolling.',
        ],
        benefits: [
          'Consistency matters more than the exact hour chosen — the body learns the rhythm either way.',
          'Removes the "one late night" pattern that quietly undoes a week of good sleep.',
        ],
      },
      fr: {
        title: 'Heure de coucher constante',
        steps: [
          'Choisissez une heure de coucher cible qui vous laisse une nuit complète avant votre heure de réveil fixe.',
          'Restez à environ ±15 minutes de cette heure chaque soir, week-end compris.',
          'Commencez votre rituel du soir assez tôt pour être vraiment prêt à cette heure-là, pas juste au lit en train de défiler sur votre téléphone.',
        ],
        benefits: [
          'La régularité compte plus que l’heure exacte choisie — le corps apprend le rythme dans les deux cas.',
          'Supprime le schéma du « juste un soir tardif » qui annule discrètement une semaine de bon sommeil.',
        ],
      },
    },
  },
  {
    keywords: ['magnesium + no alcohol'],
    guide: {
      en: {
        title: 'Magnesium + No-Alcohol Test',
        steps: [
          'Take a magnesium supplement in the evening (check the label for timing and dose).',
          'Cut alcohol entirely for this test period, even small amounts.',
          'Compare how you sleep and feel in the morning against your usual baseline.',
        ],
        benefits: [
          'Alcohol fragments deep sleep even when total hours look normal — this isolates that effect.',
          'Magnesium supports the relaxation that makes falling and staying asleep easier.',
        ],
      },
      fr: {
        title: 'Test magnésium et sans alcool',
        steps: [
          'Prenez un supplément de magnésium le soir (vérifiez le dosage et le moment sur l’étiquette).',
          'Supprimez complètement l’alcool pendant cette période de test, même en petite quantité.',
          'Comparez votre sommeil et votre forme au réveil par rapport à votre référence habituelle.',
        ],
        benefits: [
          'L’alcool fragmente le sommeil profond même quand le nombre d’heures total paraît normal — ce test isole cet effet.',
          'Le magnésium favorise la détente qui facilite l’endormissement et le maintien du sommeil.',
        ],
      },
    },
  },
  {
    keywords: ['blue-light filter'],
    guide: {
      en: {
        title: 'Blue-Light Filter After Sunset',
        steps: [
          'Turn on your phone and computer’s built-in night mode or blue-light filter as soon as the sun sets.',
          'Dim overhead lights and switch to warmer, lower lamps in the evening.',
        ],
        benefits: [
          'Blue light is the specific wavelength that most strongly delays melatonin release.',
          'A one-time setting that works automatically every evening after this.',
        ],
      },
      fr: {
        title: 'Filtre de lumière bleue après le coucher du soleil',
        steps: [
          'Activez le mode nuit ou le filtre de lumière bleue intégré de votre téléphone et ordinateur dès le coucher du soleil.',
          'Baissez l’éclairage principal et passez à des lampes plus chaudes et plus tamisées le soir.',
        ],
        benefits: [
          'La lumière bleue est la longueur d’onde qui retarde le plus fortement la libération de mélatonine.',
          'Un réglage unique qui agit ensuite automatiquement chaque soir.',
        ],
      },
    },
  },
  {
    keywords: ['breathing / relaxation'],
    guide: {
      en: {
        title: 'Breathing & Relaxation Practice',
        steps: [
          'Lie down or sit comfortably, then breathe in for 4 counts, hold for 4, and out for 6–8.',
          'Continue for about 5 minutes, letting each exhale be slightly longer than the inhale.',
        ],
        benefits: [
          'A longer exhale activates the body’s relaxation response, which helps you fall asleep faster.',
          'No equipment, no app required — works anywhere, including once you’re already in bed.',
        ],
      },
      fr: {
        title: 'Pratique de respiration et relaxation',
        steps: [
          'Allongé ou assis confortablement, inspirez sur 4 temps, retenez 4 temps, puis expirez sur 6 à 8 temps.',
          'Continuez pendant environ 5 minutes, en laissant chaque expiration légèrement plus longue que l’inspiration.',
        ],
        benefits: [
          'Une expiration plus longue active la réponse de relaxation du corps, ce qui aide à s’endormir plus vite.',
          'Aucun équipement ni application nécessaire — fonctionne partout, y compris une fois déjà au lit.',
        ],
      },
    },
  },
  {
    keywords: ['track sleep + morning puffiness', 'review de-puff in am'],
    guide: {
      en: {
        title: 'Track Sleep & Morning Puffiness',
        steps: [
          'Note roughly how many hours you slept and rate morning facial puffiness (1–10) as soon as you wake up.',
          'Compare against your progress photos from the same morning to keep the rating honest.',
        ],
        benefits: [
          'Morning puffiness is a direct, visible readout of sleep quality — this is how you confirm the protocol is actually working, not just being followed.',
        ],
      },
      fr: {
        title: 'Suivi du sommeil et des poches du matin',
        steps: [
          'Notez approximativement vos heures de sommeil et évaluez les poches du matin (1 à 10) dès le réveil.',
          'Comparez avec vos photos de progression du même matin pour garder une évaluation honnête.',
        ],
        benefits: [
          'Les poches du matin sont un indicateur direct et visible de la qualité du sommeil — c’est ainsi que vous confirmez que le protocole fonctionne réellement, pas seulement qu’il est suivi.',
        ],
      },
    },
  },
  {
    keywords: ['full protocol nightly'],
    guide: {
      en: {
        title: 'Full Sleep Protocol Nightly',
        steps: [
          'Run the complete routine every night this week: fixed wake time, morning sunlight, caffeine cutoff, cool dark room, and the wind-down ritual.',
          'Don’t skip any single piece, even on an off day — this week is specifically testing whether it holds together as one system.',
        ],
        benefits: [
          'Confirms every piece works as one system, not as isolated habits that only sometimes align.',
          'Sets the permanent baseline you’ll carry past the 28 days.',
        ],
      },
      fr: {
        title: 'Protocole de sommeil complet chaque soir',
        steps: [
          'Appliquez la routine complète chaque soir cette semaine : heure de réveil fixe, lumière du matin, limite de caféine, chambre fraîche et sombre, et le rituel de décompression.',
          'Ne sautez aucun élément, même un jour compliqué — cette semaine teste spécifiquement si tout tient ensemble comme un seul système.',
        ],
        benefits: [
          'Confirme que chaque élément fonctionne comme un seul système, pas comme des habitudes isolées qui ne s’alignent que parfois.',
          'Fixe la base permanente que vous garderez au-delà des 28 jours.',
        ],
      },
    },
  },
  {
    keywords: ['consistent 8h achieved', 'sleep 8h window', 'sleep 7.5h'],
    guide: {
      en: {
        title: 'Consistent Sleep Duration Target',
        steps: [
          'Set your bedtime and wake time so you get the target number of hours the program calls for this week.',
          'Track for several nights in a row — one good night doesn’t confirm a consistent window.',
        ],
        benefits: [
          'Consistent duration, not just occasional long nights, is what recovery and skin quality actually depend on.',
        ],
      },
      fr: {
        title: 'Objectif de durée de sommeil constante',
        steps: [
          'Réglez votre heure de coucher et de réveil pour atteindre le nombre d’heures visé cette semaine par le programme.',
          'Suivez sur plusieurs nuits d’affilée — une seule bonne nuit ne confirme pas une durée constante.',
        ],
        benefits: [
          'C’est la durée constante, pas seulement des nuits occasionnellement longues, dont dépendent réellement la récupération et la qualité de la peau.',
        ],
      },
    },
  },
  {
    keywords: ['screens off'],
    guide: {
      en: {
        title: 'Screens Off Before Bed',
        steps: [
          'Stop all screens — phone, TV, laptop — at least 60 minutes before your target bedtime.',
          'Replace that time with something low-stimulation: reading, stretching, or dimming the lights.',
        ],
        benefits: [
          'Blue light delays melatonin release, so cutting it helps you fall asleep faster.',
          'Scrolling keeps the mind alert exactly when it should be slowing down.',
        ],
      },
      fr: {
        title: 'Écrans éteints avant le coucher',
        steps: [
          'Arrêtez tous les écrans — téléphone, télévision, ordinateur — au moins 60 minutes avant l’heure de coucher visée.',
          'Remplacez ce temps par quelque chose de peu stimulant : lecture, étirements, ou lumières tamisées.',
        ],
        benefits: [
          'La lumière bleue retarde la libération de mélatonine, donc la couper aide à s’endormir plus vite.',
          'Le défilement garde l’esprit en alerte juste au moment où il devrait ralentir.',
        ],
      },
    },
  },
  {
    keywords: ['wind-down routine'],
    guide: {
      en: {
        title: 'Evening Wind-Down Routine',
        steps: [
          'Set aside 30 minutes before bed for the same sequence every night: dim lights, a calm activity, then bed.',
          'Keep it screen-free and low-stimulation throughout.',
        ],
        benefits: [
          'A consistent cue trains your body to associate it with sleep approaching.',
          'The routine matters more than any single activity in it — repetition is what makes it a signal.',
        ],
      },
      fr: {
        title: 'Rituel de décompression du soir',
        steps: [
          'Réservez 30 minutes avant le coucher pour la même séquence chaque soir : lumières tamisées, activité calme, puis coucher.',
          'Gardez ce moment sans écran et peu stimulant tout du long.',
        ],
        benefits: [
          'Un signal cohérent entraîne le corps à l’associer à l’arrivée du sommeil.',
          'La routine compte plus que n’importe quelle activité qu’elle contient — c’est la répétition qui en fait un signal.',
        ],
      },
    },
  },

  // ---------- Hydration Protocol ----------
  {
    keywords: ['500ml on waking'],
    guide: {
      en: {
        title: 'Water on Waking',
        steps: [
          'Drink about 500ml of water within the first few minutes of waking, before coffee or anything else.',
          'Keep a glass or bottle by your bed the night before so it’s the first thing you see.',
        ],
        benefits: [
          'You wake up mildly dehydrated after 7–8 hours without fluids — this is the fastest way to correct it.',
          'Sets the tone for the rest of the day’s water target instead of starting behind.',
        ],
      },
      fr: {
        title: 'Eau au réveil',
        steps: [
          'Buvez environ 500 ml d’eau dans les premières minutes après le réveil, avant le café ou toute autre chose.',
          'Gardez un verre ou une bouteille près du lit la veille au soir pour que ce soit la première chose que vous voyiez.',
        ],
        benefits: [
          'Vous vous réveillez légèrement déshydraté après 7 à 8 heures sans liquide — c’est le moyen le plus rapide d’y remédier.',
          'Donne le ton pour le reste de l’objectif eau de la journée au lieu de partir en retard.',
        ],
      },
    },
  },
  {
    keywords: ['reach 2.5l', '3l water target', 'consistent 3l', 'water:', 'water target'],
    guide: {
      en: {
        title: 'Daily Water Target',
        steps: [
          'Spread your total water target across the whole day rather than drinking it all at once.',
          'Keep a marked bottle nearby so you can see progress at a glance instead of guessing.',
          'The body absorbs a steady intake much better than a flood, so little and often beats catching up late in the day.',
        ],
        benefits: [
          'Well-hydrated skin looks visibly plumper and less puffy.',
          'Steady intake supports energy and focus far more than sporadic, large amounts.',
        ],
      },
      fr: {
        title: 'Objectif d’eau quotidien',
        steps: [
          'Répartissez votre objectif d’eau total sur toute la journée plutôt que de tout boire d’un coup.',
          'Gardez une bouteille graduée à portée de main pour voir votre progression d’un coup d’œil plutôt que de deviner.',
          'Le corps absorbe bien mieux un apport régulier qu’un afflux soudain, donc peu et souvent vaut mieux que rattraper en fin de journée.',
        ],
        benefits: [
          'Une peau bien hydratée paraît visiblement plus repulpée et moins gonflée.',
          'Un apport régulier soutient bien mieux l’énergie et la concentration que de grosses quantités sporadiques.',
        ],
      },
    },
  },
  {
    keywords: ['add electrolytes', 'electrolytes am + post-training', 'sodium/potassium', 'hydration + electrolytes'],
    guide: {
      en: {
        title: 'Electrolyte Balance',
        steps: [
          'Add a pinch of salt or an electrolyte packet once daily, and again after training if you sweat heavily.',
          'Balance sodium with potassium-rich foods (bananas, leafy greens, potatoes) rather than salt alone.',
        ],
        benefits: [
          'Minerals let cells actually hold onto the water you drink instead of flushing it straight out.',
          'Water alone without electrolytes can flush out what your body actually needs, especially with a high water target.',
        ],
      },
      fr: {
        title: 'Équilibre en électrolytes',
        steps: [
          'Ajoutez une pincée de sel ou un sachet d’électrolytes une fois par jour, et à nouveau après l’entraînement en cas de forte transpiration.',
          'Équilibrez le sodium avec des aliments riches en potassium (bananes, légumes verts, pommes de terre) plutôt que le sel seul.',
        ],
        benefits: [
          'Les minéraux permettent aux cellules de vraiment retenir l’eau que vous buvez au lieu de l’évacuer directement.',
          'L’eau seule sans électrolytes peut évacuer ce dont le corps a réellement besoin, surtout avec un objectif d’eau élevé.',
        ],
      },
    },
  },
  {
    keywords: ['cut excess salt'],
    guide: {
      en: {
        title: 'Cut Excess Salt',
        steps: [
          'Cut back on packaged and restaurant food, which carries most of the excess sodium in a typical diet.',
          'Cook more meals at home where you control the salt directly.',
          'This is about excess salt on top of meals, not the electrolytes you deliberately add — those stay.',
        ],
        benefits: [
          'Excess sodium is one of the biggest drivers of water retention and visible facial puffiness.',
          'Cutting the hidden excess (not all salt) is what actually reduces puffiness without affecting hydration.',
        ],
      },
      fr: {
        title: 'Réduire l’excès de sel',
        steps: [
          'Réduisez les plats industriels et de restaurant, qui apportent l’essentiel du sodium en excès dans une alimentation typique.',
          'Cuisinez davantage à la maison, où vous contrôlez directement la quantité de sel.',
          'Il s’agit de l’excès de sel ajouté aux repas, pas des électrolytes ajoutés volontairement — ceux-là restent.',
        ],
        benefits: [
          'L’excès de sodium est l’un des plus grands facteurs de rétention d’eau et de poches visibles sur le visage.',
          'Supprimer l’excès caché (pas tout le sel) est ce qui réduit vraiment les poches sans nuire à l’hydratation.',
        ],
      },
    },
  },
  {
    keywords: ['herbal tea'],
    guide: {
      en: {
        title: 'Herbal Tea Instead of Late Caffeine',
        steps: [
          'Swap any caffeine you’d normally have later in the day for a caffeine-free herbal tea (chamomile, peppermint, rooibos).',
          'Use it as part of your water target too — it still counts toward daily fluid intake.',
        ],
        benefits: [
          'Keeps a warm, habitual drink in your routine without the sleep-disrupting effect of late caffeine.',
          'An easy swap that doesn’t require giving up the ritual, just the caffeine.',
        ],
      },
      fr: {
        title: 'Tisane à la place de la caféine tardive',
        steps: [
          'Remplacez toute caféine que vous prendriez normalement plus tard dans la journée par une tisane sans caféine (camomille, menthe poivrée, rooibos).',
          'Intégrez-la aussi à votre objectif d’eau — elle compte tout de même dans l’apport en liquide quotidien.',
        ],
        benefits: [
          'Garde une boisson chaude et rituelle dans votre routine sans l’effet perturbateur de la caféine tardive sur le sommeil.',
          'Un échange facile qui ne demande pas d’abandonner le rituel, juste la caféine.',
        ],
      },
    },
  },
  {
    keywords: ['front-load water'],
    guide: {
      en: {
        title: 'Front-Load Water Before Evening',
        steps: [
          'Aim to hit most of your daily water target before early evening rather than drinking it all at night.',
          'Taper off in the hours before bed so you’re not waking up for bathroom trips.',
        ],
        benefits: [
          'Timing matters here almost as much as total volume — front-loading reduces overnight puffiness directly.',
          'Protects sleep quality by avoiding late-night bathroom wake-ups.',
        ],
      },
      fr: {
        title: 'Répartir l’eau avant le soir',
        steps: [
          'Visez à atteindre l’essentiel de votre objectif d’eau avant le début de soirée plutôt que de tout boire le soir.',
          'Réduisez dans les heures précédant le coucher pour éviter de vous réveiller pour aller aux toilettes.',
        ],
        benefits: [
          'Le timing compte ici presque autant que le volume total — répartir l’eau plus tôt réduit directement les poches nocturnes.',
          'Protège la qualité du sommeil en évitant les réveils nocturnes pour aller aux toilettes.',
        ],
      },
    },
  },
  {
    keywords: ['water-rich foods'],
    guide: {
      en: {
        title: 'Water-Rich Foods',
        steps: [
          'Include a water-rich food (cucumber, watermelon, oranges, tomatoes) at each meal.',
          'Treat this as additional to your water target, not a replacement for it.',
        ],
        benefits: [
          'Food-based water comes with electrolytes and fiber that help the body actually retain and use it.',
          'An easy way to boost hydration without needing to drink more.',
        ],
      },
      fr: {
        title: 'Aliments riches en eau',
        steps: [
          'Incluez un aliment riche en eau (concombre, pastèque, oranges, tomates) à chaque repas.',
          'Considérez cela comme un ajout à votre objectif d’eau, pas un remplacement.',
        ],
        benefits: [
          'L’eau apportée par l’alimentation vient avec des électrolytes et des fibres qui aident le corps à vraiment la retenir et l’utiliser.',
          'Un moyen facile d’augmenter l’hydratation sans avoir à boire davantage.',
        ],
      },
    },
  },
  {
    keywords: ['de-puff routine locked', 'facial puffiness', 'track am facial puffiness'],
    guide: {
      en: {
        title: 'De-Puff Routine Check',
        steps: [
          'Run your cold-water rinse and drainage massage every morning without skipping, even on rushed days.',
          'Rate your facial puffiness (1–10) right after waking, before the routine, to track real change.',
        ],
        benefits: [
          'Consistency is what turns a de-puff routine into a lasting result instead of a one-off effect.',
          'Rating puffiness before the routine (not after) is what actually shows whether the underlying puffiness is improving.',
        ],
      },
      fr: {
        title: 'Vérification de la routine anti-poches',
        steps: [
          'Faites votre rinçage à l’eau froide et votre massage de drainage chaque matin sans exception, même les jours pressés.',
          'Évaluez vos poches (1 à 10) juste après le réveil, avant la routine, pour suivre un vrai changement.',
        ],
        benefits: [
          'La régularité est ce qui transforme une routine anti-poches en résultat durable plutôt qu’un effet ponctuel.',
          'Évaluer les poches avant la routine (pas après) montre vraiment si le gonflement sous-jacent s’améliore.',
        ],
      },
    },
  },
  {
    keywords: ['review energy + skin clarity'],
    guide: {
      en: {
        title: 'Review Energy & Skin Clarity',
        steps: [
          'Rate your energy (1–10) and skin clarity (1–10) at the end of the week.',
          'Compare against week one to see the real trend rather than judging any single day.',
        ],
        benefits: [
          'These are the two honest, fast-moving indicators that hydration is actually working.',
          'A weekly check catches the trend that day-to-day fluctuation hides.',
        ],
      },
      fr: {
        title: 'Bilan énergie et clarté de peau',
        steps: [
          'Évaluez votre énergie (1 à 10) et la clarté de votre peau (1 à 10) en fin de semaine.',
          'Comparez avec la semaine 1 pour voir la vraie tendance plutôt que de juger une seule journée.',
        ],
        benefits: [
          'Ce sont les deux indicateurs honnêtes et rapides qui montrent que l’hydratation fonctionne vraiment.',
          'Un bilan hebdomadaire capture la tendance que les variations quotidiennes cachent.',
        ],
      },
    },
  },

  // ---------- Shared: steps, deficit combos, habit review ----------
  {
    keywords: ['steps for the day', '10k steps', '8k steps'],
    guide: {
      en: {
        title: 'Daily Steps',
        steps: [
          'Let steps add up from stairs, parking further away, pacing during calls, or a short walk after meals.',
          'Spread them through the day rather than one long walk.',
          'Track with your phone’s built-in step counter — no special equipment needed.',
        ],
        benefits: [
          'Spreading activity through the day helps regulate blood sugar better after eating.',
          'Builds a sustainable activity habit that doesn’t depend on a dedicated workout.',
        ],
      },
      fr: {
        title: 'Pas quotidiens',
        steps: [
          'Laissez les pas s’accumuler avec les escaliers, se garer plus loin, marcher pendant les appels, ou une courte marche après les repas.',
          'Répartissez-les sur la journée plutôt qu’une seule longue marche.',
          'Suivez-les avec le compteur de pas intégré à votre téléphone — aucun équipement spécial nécessaire.',
        ],
        benefits: [
          'Répartir l’activité sur la journée aide à mieux réguler la glycémie après les repas.',
          'Construit une habitude d’activité durable qui ne dépend pas d’une séance dédiée.',
        ],
      },
    },
  },
  {
    keywords: ['hit protein + 300 cal deficit', 'deficit + protein + 10k steps'],
    guide: {
      en: {
        title: 'Protein Target Under a Deficit',
        steps: [
          'Hit your protein target first when planning meals, then fill remaining calories to stay within your deficit.',
          'Keep steps and training consistent — a deficit combined with dropping activity slows results rather than speeding them up.',
        ],
        benefits: [
          'Protein under a deficit is what protects muscle while body fat comes down, instead of losing both.',
          'Combining all three (protein, deficit, steps) is what actually reveals the muscle you’re building.',
        ],
      },
      fr: {
        title: 'Objectif protéines en période de déficit',
        steps: [
          'Atteignez d’abord votre objectif de protéines en planifiant vos repas, puis complétez le reste des calories pour rester dans votre déficit.',
          'Gardez les pas et l’entraînement constants — un déficit combiné à une baisse d’activité ralentit les résultats au lieu de les accélérer.',
        ],
        benefits: [
          'Les protéines en période de déficit protègent le muscle pendant que la graisse corporelle diminue, au lieu de perdre les deux.',
          'Combiner les trois (protéines, déficit, pas) est ce qui révèle réellement le muscle construit.',
        ],
      },
    },
  },
  {
    keywords: ['review sleep, training, diet', 'diet + sleep + hydration', 'sleep + hydration + spf'],
    guide: {
      en: {
        title: 'Weekly Habit Review',
        steps: [
          'At the end of the week, look back at your sleep, training and diet streaks together, not separately.',
          'Note which one slipped first — habits usually fail in a predictable order, and knowing yours helps you catch it earlier next time.',
        ],
        benefits: [
          'Reviewing together (not separately) is what reveals how the three actually interact for you.',
          'Writing habits down and reviewing them makes them stick far better than relying on memory.',
        ],
      },
      fr: {
        title: 'Bilan hebdomadaire des habitudes',
        steps: [
          'En fin de semaine, regardez vos séries de sommeil, d’entraînement et d’alimentation ensemble, pas séparément.',
          'Notez laquelle a flanché en premier — les habitudes échouent généralement dans un ordre prévisible, et connaître le vôtre aide à le rattraper plus tôt la prochaine fois.',
        ],
        benefits: [
          'Les revoir ensemble (pas séparément) révèle comment les trois interagissent réellement pour vous.',
          'Noter ses habitudes et les relire les ancre bien mieux que de compter sur sa mémoire.',
        ],
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
