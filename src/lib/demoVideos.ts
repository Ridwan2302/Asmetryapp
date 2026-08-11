/** A detailed step-by-step guide per recurring exercise/routine, matched by keyword against the
 * (always-English) task text. No video is linked — every guide is self-contained: a clear title,
 * the exact steps to follow, and why it's worth doing (the benefits). */
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
  {
    keywords: ['mewing', 'nasal breathing'],
    guide: {
      en: {
        title: 'Mewing (Tongue Posture)',
        steps: [
          'Rest your entire tongue — tip to back — flat against the roof of your mouth, not just the tip behind your teeth.',
          'Seal your lips and breathe only through your nose.',
          'Let your back teeth touch lightly, without clenching.',
          'Hold it as your default resting posture all day, not just during dedicated practice.',
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
          'Adoptez-la comme posture de repos par défaut toute la journée, pas seulement pendant les exercices dédiés.',
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
    keywords: ['cheekbone', 'buccal'],
    guide: {
      en: {
        title: 'Cheekbone Lift & Buccal Holds',
        steps: [
          'Smile without showing your teeth, then push your cheeks up and back toward your ears using the muscle, not your hand.',
          'Hold each repetition for a full second at the top.',
          'For buccal holds, suck your cheeks in against your teeth and hold — you should feel it under the cheekbone, not in the jaw.',
          'Keep every repetition slow and controlled rather than fast and sloppy.',
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
          'Souriez sans montrer les dents, puis poussez les joues vers le haut et l’arrière, vers les oreilles, en utilisant le muscle, pas la main.',
          'Maintenez chaque répétition une seconde complète en haut.',
          'Pour les joues creuses, aspirez les joues contre les dents et maintenez — vous devez le sentir sous la pommette, pas dans la mâchoire.',
          'Gardez chaque répétition lente et contrôlée plutôt que rapide et négligée.',
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
    keywords: ['gua sha', 'lymphatic', 'drainage', 'facial massage'],
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
    keywords: ['cold-water', 'cold water', 'cold compress', 'cold immersion'],
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
    keywords: ['gum', 'clench', 'masseter'],
    guide: {
      en: {
        title: 'Jaw Clenching & Resistance Gum',
        steps: [
          'Chew firmly on one side at a time, not both — this isolates each masseter fully.',
          'Keep your jaw relaxed between repetitions; a tight neck or headache means you’re clenching too hard.',
          'For isometric holds, bite down firmly and hold without grinding, breathing normally throughout.',
          'Drop to a softer gum if the strain goes beyond mild fatigue.',
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
          'Pour les maintiens isométriques, mordez fermement et maintenez sans grincer, en respirant normalement.',
          'Passez à une gomme plus souple si la tension dépasse une légère fatigue.',
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
    keywords: ['canthal', 'squint', 'orbital', 'hunter eye'],
    guide: {
      en: {
        title: 'Canthal Tilt & Orbital Training',
        steps: [
          'Squint gently as if in bright sun, focusing the effort at the outer corner of the eye — not the whole face.',
          'For canthal lift resistance, place a finger lightly at the outer corner and press up and out while your eye muscle resists.',
          'Keep the inner face relaxed — your forehead and nose should not move at all.',
          'Perform every repetition slowly and with control.',
        ],
        benefits: [
          'Trains a more positive canthal tilt and a sharper, more alert-looking gaze.',
          'Builds a stronger, more hooded look over time.',
          'Very low-risk since the movements are small and fully controlled.',
        ],
      },
      fr: {
        title: 'Inclinaison canthale et entraînement orbitaire',
        steps: [
          'Plissez doucement les yeux comme en plein soleil, en concentrant l’effort sur le coin externe de l’œil, pas tout le visage.',
          'Pour la résistance au lift canthal, placez un doigt légèrement sur le coin externe et appuyez vers le haut et l’extérieur pendant que le muscle de l’œil résiste.',
          'Gardez le reste du visage détendu — le front et le nez ne doivent pas bouger du tout.',
          'Effectuez chaque répétition lentement et avec contrôle.',
        ],
        benefits: [
          'Entraîne une inclinaison canthale plus positive et un regard plus net et plus éveillé.',
          'Construit un regard plus creusé et affirmé avec le temps.',
          'Très faible risque puisque les mouvements sont petits et totalement contrôlés.',
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
    keywords: ['wall angel', 'thoracic', 'doorway stretch'],
    guide: {
      en: {
        title: 'Wall Angels & Doorway Stretch',
        steps: [
          'Stand with your back, head and arms against a wall, elbows bent at 90°.',
          'Slowly slide your arms up like making a snow angel, keeping wrists, elbows and lower back against the wall as long as possible.',
          'For the doorway stretch, place your forearms on the frame and step forward gently until you feel the stretch across your chest.',
          'Never push past mild discomfort.',
        ],
        benefits: [
          'Opens a tight chest and strengthens the upper back for straighter posture.',
          'Directly counters the forward-shoulder position from sitting and screens.',
          'Improves how the shoulders and neck line reads within a few weeks.',
        ],
      },
      fr: {
        title: 'Étirement mural en ange et dans l’embrasure de porte',
        steps: [
          'Tenez-vous dos, tête et bras contre un mur, coudes pliés à 90°.',
          'Faites glisser lentement les bras vers le haut comme pour dessiner un ange dans la neige, en gardant poignets, coudes et bas du dos contre le mur aussi longtemps que possible.',
          'Pour l’étirement dans l’embrasure de porte, posez les avant-bras sur le cadre et avancez doucement jusqu’à sentir l’étirement dans la poitrine.',
          'Ne dépassez jamais une légère gêne.',
        ],
        benefits: [
          'Ouvre une poitrine raide et renforce le haut du dos pour une posture plus droite.',
          'Contrecarre directement les épaules projetées vers l’avant à cause de la position assise et des écrans.',
          'Améliore la lecture des épaules et du cou en quelques semaines.',
        ],
      },
    },
  },
  {
    keywords: ['face pull', 'band pull-apart'],
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
          'Directly supports a straighter neck and jawline presentation.',
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
          'Soutient directement un cou plus droit et une meilleure présentation de la mâchoire.',
        ],
      },
    },
  },
  {
    keywords: ['cleanse', 'spf', 'retinoid', 'niacinamide', 'moisturiz', 'exfolia'],
    guide: {
      en: {
        title: 'Skincare Routine Order',
        steps: [
          'Cleanse first on damp skin, then pat dry.',
          'Apply active ingredients (retinoid or niacinamide) before a moisturizer to seal them in.',
          'Finish every morning with SPF as the final step.',
          'Use retinoids at night only, in a pea-sized amount — they break down in sunlight and increase sun sensitivity.',
        ],
        benefits: [
          'The correct order lets every product actually absorb and work as intended.',
          'Builds a stronger, more resilient skin barrier over time.',
          'Prevents the irritation caused by over-applying active ingredients.',
        ],
      },
      fr: {
        title: 'Ordre de la routine de soin',
        steps: [
          'Nettoyez d’abord sur peau humide, puis séchez en tamponnant.',
          'Appliquez les actifs (rétinoïde ou niacinamide) avant une crème hydratante pour les sceller.',
          'Terminez chaque matin par le SPF comme étape finale.',
          'Utilisez les rétinoïdes uniquement le soir, en petite quantité — ils se dégradent à la lumière du jour et augmentent la sensibilité au soleil.',
        ],
        benefits: [
          'Le bon ordre permet à chaque produit de vraiment pénétrer et d’agir comme prévu.',
          'Construit une barrière cutanée plus forte et plus résiliente avec le temps.',
          'Évite l’irritation causée par un excès d’actifs appliqués.',
        ],
      },
    },
  },
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
    keywords: ['wind-down', 'screens off'],
    guide: {
      en: {
        title: 'Evening Wind-Down',
        steps: [
          'Stop screens at least 60 minutes before bed.',
          'Replace that time with something low-stimulation: reading, stretching, or dimming the lights.',
          'Keep the same wind-down routine every night so your body learns the cue.',
        ],
        benefits: [
          'Blue light delays melatonin release, so cutting it helps you fall asleep faster.',
          'A consistent cue trains your body to associate it with sleep approaching.',
          'Better sleep quality shows up directly in morning skin and under-eye puffiness.',
        ],
      },
      fr: {
        title: 'Rituel de décompression du soir',
        steps: [
          'Arrêtez les écrans au moins 60 minutes avant de dormir.',
          'Remplacez ce temps par quelque chose de peu stimulant : lecture, étirements, ou lumières tamisées.',
          'Gardez le même rituel chaque soir pour que le corps apprenne le signal.',
        ],
        benefits: [
          'La lumière bleue retarde la libération de mélatonine, donc la couper aide à s’endormir plus vite.',
          'Un signal cohérent entraîne le corps à l’associer à l’arrivée du sommeil.',
          'Une meilleure qualité de sommeil se voit directement sur la peau et les poches du matin.',
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
    keywords: ['vacuum'],
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
    keywords: ['push session', 'overhead press', 'push/pull superset'],
    guide: {
      en: {
        title: 'Push Session (Chest, Shoulders, Triceps)',
        steps: [
          'Push movements (chest press, shoulder press, dips) all work in the same direction — away from your body.',
          'Keep your core braced throughout so the force comes from your chest and shoulders, not an arching lower back.',
          'For overhead press, drive the bar or dumbbells in a straight line above your head, not out in front.',
          'Avoid locking your elbows hard at the top of each repetition.',
        ],
        benefits: [
          'Builds the chest and shoulder mass that widens the upper-body silhouette.',
          'Directly supports the V-taper alongside back training.',
          'Progressive pressing strength carries over to nearly every upper-body movement.',
        ],
      },
      fr: {
        title: 'Séance poussée (pectoraux, épaules, triceps)',
        steps: [
          'Les mouvements de poussée (développé couché, développé épaules, dips) travaillent tous dans la même direction — en éloignant du corps.',
          'Gardez le tronc gainé tout du long pour que la force vienne de la poitrine et des épaules, pas d’un bas du dos qui se cambre.',
          'Pour le développé au-dessus de la tête, poussez la barre ou les haltères en ligne droite au-dessus de la tête, pas vers l’avant.',
          'Évitez de bloquer fort les coudes en haut de chaque répétition.',
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
        title: 'Pull Session (Back, Biceps)',
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
        title: 'Séance tirage (dos, biceps)',
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
  {
    keywords: [
      'full face circuit',
      'full jaw + neck recovery',
      'full orbital circuit',
      'full-body strength circuit',
      'full posture circuit',
      'full am + pm routine',
      'full grooming pass',
      'full nutrient-dense day',
      'full protocol nightly',
    ],
    guide: {
      en: {
        title: 'Recap Circuit',
        steps: [
          'Run through everything you practiced across the last three weeks, back to back, in one session.',
          'Keep good form throughout, at a pace you can sustain.',
          'Don’t push harder than before — the goal is proving it runs smoothly, not going to failure.',
        ],
        benefits: [
          'Confirms the whole routine now runs automatically, without thinking through each step.',
          'Locks in the habit so it survives past the 28-day program.',
          'Reveals any weak point before you consider the plan complete.',
        ],
      },
      fr: {
        title: 'Circuit de récapitulatif',
        steps: [
          'Enchaînez tout ce que vous avez pratiqué au cours des trois dernières semaines, sans interruption, en une seule séance.',
          'Gardez une bonne forme tout du long, à un rythme que vous pouvez tenir.',
          'N’allez pas plus fort qu’avant — l’objectif est de prouver que tout s’enchaîne bien, pas d’aller jusqu’à l’échec.',
        ],
        benefits: [
          'Confirme que toute la routine s’enchaîne désormais automatiquement, sans réfléchir à chaque étape.',
          'Ancre l’habitude pour qu’elle survive au-delà du programme de 28 jours.',
          'Révèle un point faible éventuel avant de considérer le plan comme terminé.',
        ],
      },
    },
  },
  {
    keywords: [
      'protein target',
      'protein:',
      'hit protein',
      'protein + vitamin',
      'whole-food carbs',
      'zinc + magnesium',
      'fasting',
      'healthy fats',
      'cut dairy',
    ],
    guide: {
      en: {
        title: 'Protein & Whole-Food Nutrition',
        steps: [
          'Spread your protein target across 3–4 meals instead of one big serving.',
          'Favor whole foods (meat, eggs, dairy, legumes, vegetables) over processed ones.',
          'Aim for consistency day-to-day rather than one single perfect meal.',
        ],
        benefits: [
          'The body can only use so much protein at once, so spreading it out improves results.',
          'Whole foods carry the vitamins and minerals your body actually needs, not just calories.',
          'Day-to-day consistency compounds into real body-composition change.',
        ],
      },
      fr: {
        title: 'Protéines et alimentation complète',
        steps: [
          'Répartissez votre objectif de protéines sur 3 à 4 repas plutôt qu’une seule grosse portion.',
          'Privilégiez les aliments complets (viande, œufs, produits laitiers, légumineuses, légumes) aux aliments transformés.',
          'Visez la régularité au quotidien plutôt qu’un seul repas parfait.',
        ],
        benefits: [
          'Le corps ne peut utiliser qu’une certaine quantité de protéines à la fois, donc les répartir améliore les résultats.',
          'Les aliments complets apportent les vitamines et minéraux dont le corps a réellement besoin, pas seulement des calories.',
          'La régularité au quotidien se cumule en un vrai changement de composition corporelle.',
        ],
      },
    },
  },
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
          'Supports a leaner body composition alongside your training program.',
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
          'Soutient une composition corporelle plus sèche aux côtés de votre programme d’entraînement.',
        ],
      },
    },
  },
  {
    keywords: [
      'water:',
      'water target',
      'reach 2.5l',
      'electrolytes',
      'sodium/potassium',
      'herbal tea',
      'facial puffiness',
      'front-load water',
      'water-rich foods',
      'consistent 3l',
      'de-puff routine',
      'hydrate 2.5l',
      'cut excess salt',
      'review energy + skin clarity',
    ],
    guide: {
      en: {
        title: 'Hydration & Electrolytes',
        steps: [
          'Spread your water target across the whole day instead of drinking it all at once.',
          'Add a pinch of salt or an electrolyte packet if you’re sweating a lot or drinking well over 2.5L.',
          'Check that urine runs pale yellow, not clear or dark, to confirm you’re on track.',
        ],
        benefits: [
          'The body absorbs a steady intake much better than a flood all at once.',
          'Minerals let cells actually hold onto the water instead of flushing it straight out.',
          'Well-hydrated skin looks visibly plumper and less puffy.',
        ],
      },
      fr: {
        title: 'Hydratation et électrolytes',
        steps: [
          'Répartissez votre objectif d’eau sur toute la journée plutôt que de tout boire d’un coup.',
          'Ajoutez une pincée de sel ou un sachet d’électrolytes si vous transpirez beaucoup ou buvez bien plus de 2,5 L.',
          'Vérifiez que vos urines sont jaune pâle, ni claires ni foncées, pour confirmer que vous êtes sur la bonne voie.',
        ],
        benefits: [
          'Le corps absorbe bien mieux un apport régulier qu’un afflux soudain.',
          'Les minéraux permettent aux cellules de vraiment retenir l’eau au lieu de l’évacuer directement.',
          'Une peau bien hydratée paraît visiblement plus repulpée et moins gonflée.',
        ],
      },
    },
  },
  {
    keywords: [
      'wake time',
      'morning sunlight',
      'sunlight 15 min',
      'no caffeine after',
      'cool, dark room',
      'large meals',
      'consistent bedtime',
      'magnesium + no alcohol',
      'blue-light filter',
      'breathing / relaxation',
      'morning puffiness',
      'consistent 8h',
      'de-puff in am',
      'sleep schedule',
      'sleep 8h window',
      'sleep 7.5h',
    ],
    guide: {
      en: {
        title: 'Sleep & Circadian Rhythm',
        steps: [
          'Keep your wake time fixed every day, even on weekends.',
          'Get sunlight within 30 minutes of waking to lock in that signal.',
          'Cut caffeine by early afternoon and keep the bedroom cool and dark.',
        ],
        benefits: [
          'A fixed wake time anchors your circadian rhythm more than bedtime does.',
          'Consistent habits repeated nightly matter more than any single “perfect” night.',
          'Better sleep shows up directly as less morning puffiness and more energy.',
        ],
      },
      fr: {
        title: 'Sommeil et rythme circadien',
        steps: [
          'Gardez une heure de réveil fixe chaque jour, même le week-end.',
          'Exposez-vous au soleil dans les 30 minutes suivant le réveil pour verrouiller ce signal.',
          'Arrêtez la caféine en début d’après-midi et gardez la chambre fraîche et sombre.',
        ],
        benefits: [
          'Une heure de réveil fixe ancre le rythme circadien plus que l’heure du coucher.',
          'Des habitudes constantes répétées chaque soir comptent plus qu’une seule nuit « parfaite ».',
          'Un meilleur sommeil se traduit directement par moins de poches le matin et plus d’énergie.',
        ],
      },
    },
  },
  {
    keywords: ['posture reset alarm', 'desk ergonomics', 'deep neck flexor', 'standing posture holds', 'loaded carries', 'alignment habit check'],
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
          'Improves how the neck, jaw and shoulders read even without any exercise.',
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
          'Améliore la lecture du cou, de la mâchoire et des épaules même sans aucun exercice.',
        ],
      },
    },
  },
  {
    keywords: [
      'spot treat',
      'spot care',
      'no picking',
      'no touching / picking',
      'phone screen',
      'pillowcase',
      'maintenance routine locked',
      'clay mask',
      'diet + sleep + hydration',
      'track measurements',
      'review sleep, training, diet',
    ],
    guide: {
      en: {
        title: 'Skin Check-Ins & Hygiene Habits',
        steps: [
          'Write check-ins down — a note, a calendar tick, or the streak already built into this app.',
          'Apply spot treatments (like BHA) only on clean, dry skin where needed, not the whole face.',
          'Change your pillowcase regularly and avoid touching or picking at your skin.',
        ],
        benefits: [
          'Writing habits down makes them stick far better than relying on memory.',
          'Targeted treatment clears breakouts without irritating skin that isn’t broken out.',
          'Clean pillowcases and hands-off habits prevent a constant source of recontamination.',
        ],
      },
      fr: {
        title: 'Suivi de la peau et habitudes d’hygiène',
        steps: [
          'Notez vos suivis — une simple note, une coche sur un calendrier, ou la série déjà intégrée à l’application.',
          'Appliquez les traitements localisés (comme le BHA) uniquement sur peau propre et sèche, là où c’est nécessaire, pas sur tout le visage.',
          'Changez votre taie d’oreiller régulièrement et évitez de toucher ou triturer votre peau.',
        ],
        benefits: [
          'Noter ses habitudes les ancre bien mieux que de compter sur sa mémoire.',
          'Un traitement ciblé résorbe les imperfections sans irriter la peau qui n’en a pas.',
          'Une taie propre et des mains loin du visage évitent une source constante de recontamination.',
        ],
      },
    },
  },
  {
    keywords: [
      'sharp haircut',
      'whitening routine',
      'style hair',
      'nail + hand grooming',
      'whitening + flossing',
      'fragrance + skin base',
      'edge-up touch-ups',
      'wardrobe fit check',
      'restock products',
      'weekly maintenance schedule',
    ],
    guide: {
      en: {
        title: 'Grooming Upkeep',
        steps: [
          'Book grooming appointments (haircut, whitening) ahead of time, rather than waiting until you need one urgently.',
          'Handle daily upkeep — styling, nails, fragrance — in small, frequent sessions.',
          'Restock low products before they run out completely.',
        ],
        benefits: [
          'Staying ahead keeps presentation consistently sharp instead of cycling between “just cut” and “overdue.”',
          'Little and often beats one big effort once a week.',
          'A reliable weekly rhythm removes the need to think about it each time.',
        ],
      },
      fr: {
        title: 'Entretien de la présentation',
        steps: [
          'Réservez vos rendez-vous d’entretien (coupe, blanchiment) à l’avance plutôt que d’attendre un besoin urgent.',
          'Gérez l’entretien quotidien — coiffage, ongles, parfum — en petites séances fréquentes.',
          'Réapprovisionnez les produits en fin de stock avant la rupture complète.',
        ],
        benefits: [
          'Garder une longueur d’avance maintient une présentation toujours soignée, au lieu d’alterner entre « fraîchement coupé » et « en retard ».',
          'Un peu souvent vaut mieux qu’un gros effort une fois par semaine.',
          'Un rythme hebdomadaire fiable évite d’avoir à y penser à chaque fois.',
        ],
      },
    },
  },
  {
    keywords: ['jaw-fascia release', 'neck + jaw stretch', 'lower-lip pull downs'],
    guide: {
      en: {
        title: 'Jaw & Neck Release',
        steps: [
          'Use your knuckles or a massage tool to apply firm, slow circular pressure along the jaw muscle.',
          'Keep neck and jaw stretches slow and gentle, held for the full duration rather than bounced.',
          'Never force a stretch — that can strain the jaw joint.',
        ],
        benefits: [
          'Releases tension built up from clenching, without adding training load.',
          'Keeps the jaw joint healthy alongside masseter training.',
          'A few minutes of release balances out the harder training days.',
        ],
      },
      fr: {
        title: 'Relâchement de la mâchoire et du cou',
        steps: [
          'Utilisez vos jointures ou un outil de massage pour appliquer une pression circulaire ferme et lente le long du muscle de la mâchoire.',
          'Gardez les étirements du cou et de la mâchoire lents et doux, maintenus pendant toute la durée plutôt que réalisés en rebond.',
          'Ne forcez jamais un étirement — cela peut solliciter l’articulation de la mâchoire.',
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
    keywords: ['lateral gaze holds', 'brow-set downward press', 'screen-distance', 'compress + massage'],
    guide: {
      en: {
        title: 'Precise Eye-Area Training',
        steps: [
          'Keep every movement small and controlled — the muscles around the eyes are delicate.',
          'For screen-distance checks, position your screen roughly an arm’s length away and at eye level.',
          'Avoid squinting outside of your actual training repetitions.',
        ],
        benefits: [
          'Precise, gentle engagement builds definition without straining delicate tissue.',
          'Correct screen distance prevents unnecessary eye strain throughout the day.',
          'Protects the results you’re building during dedicated orbital training.',
        ],
      },
      fr: {
        title: 'Entraînement précis du contour des yeux',
        steps: [
          'Gardez chaque mouvement petit et contrôlé — les muscles autour des yeux sont délicats.',
          'Pour la distance à l’écran, positionnez-le à peu près à une longueur de bras et à hauteur des yeux.',
          'Évitez de plisser les yeux en dehors de vos répétitions d’entraînement réelles.',
        ],
        benefits: [
          'Un engagement précis et doux construit de la définition sans solliciter les tissus délicats.',
          'Une bonne distance à l’écran évite une fatigue oculaire inutile tout au long de la journée.',
          'Protège les résultats construits pendant l’entraînement orbitaire dédié.',
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
          'Supports every other program by improving overall body composition.',
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
          'Soutient tous les autres programmes en améliorant la composition corporelle globale.',
        ],
      },
    },
  },
  {
    keywords: ['moderate deficit', 'calorie deficit', 'cut liquid sugar'],
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
];

/** Returns the curated guide entry for a task's English text, or null if nothing matches. */
export function findDemoEntry(taskEn: string): DemoEntry | null {
  const lower = taskEn.toLowerCase();
  for (const entry of DEMO_ENTRIES) {
    if (entry.keywords.some((k) => lower.includes(k))) return entry;
  }
  return null;
}
