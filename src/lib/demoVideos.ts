/** Curated real YouTube video + a detailed how-to guide per recurring exercise/routine,
 * matched by keyword against the (always-English) task text. */
export interface DemoEntry {
  keywords: string[];
  videoId: string;
  guide: { en: string; fr: string };
}

const DEMO_ENTRIES: DemoEntry[] = [
  {
    keywords: ['mewing'],
    videoId: 'YoKy55QNivQ',
    guide: {
      en: 'Mewing means resting your entire tongue — tip to back — flat against the roof of your mouth, not just the tip behind your teeth. Keep your lips sealed and breathe through your nose. Your back teeth should touch lightly, without clenching. It should feel like a gentle, constant pressure, never straining. Hold it as a default resting posture, not just during dedicated reps — the cumulative time matters more than any single session.',
      fr: 'Le mewing consiste à poser toute la langue — de la pointe à l’arrière — bien à plat contre le palais, pas seulement le bout derrière les dents. Gardez les lèvres scellées et respirez par le nez. Les dents du fond doivent se toucher légèrement, sans serrer. Cela doit ressembler à une pression douce et constante, jamais forcée. Adoptez-la comme posture de repos par défaut, pas seulement pendant les répétitions dédiées — le temps cumulé compte plus qu’une seule séance.',
    },
  },
  {
    keywords: ['cheekbone', 'buccal'],
    videoId: 'KxKijURpcQA',
    guide: {
      en: 'For the cheekbone lift, smile without showing your teeth, then push your cheeks up and back toward your ears using the muscle, not your hand. Hold each rep for a full second at the top. For buccal hollow holds, suck your cheeks in against your teeth and hold — you should feel it under the cheekbone, not in your jaw. Keep reps slow and controlled rather than fast and sloppy; quality of contraction matters more than speed.',
      fr: 'Pour le lift des pommettes, souriez sans montrer les dents, puis poussez les joues vers le haut et l’arrière, vers les oreilles, en utilisant le muscle, pas la main. Maintenez chaque répétition une seconde complète en haut. Pour les maintiens des joues creuses, aspirez les joues contre les dents et maintenez — vous devez le sentir sous la pommette, pas dans la mâchoire. Gardez des répétitions lentes et contrôlées plutôt que rapides et négligées ; la qualité de la contraction compte plus que la vitesse.',
    },
  },
  {
    keywords: ['gua sha', 'lymphatic', 'drainage', 'facial massage'],
    videoId: 'lxlU0Fh5RAo',
    guide: {
      en: 'Always work with light-to-medium pressure, never hard enough to bruise, and always move toward the lymph nodes — from the center of the face outward and down toward the neck/collarbone, never upward or inward. Use a facial oil first so the tool or fingers glide instead of dragging the skin. A full pass usually takes 2–3 minutes: jaw, cheeks, under-eyes, then a few gentle strokes down the neck to help fluid actually drain.',
      fr: 'Travaillez toujours avec une pression légère à modérée, jamais assez forte pour marquer, et déplacez-vous toujours vers les ganglions lymphatiques — du centre du visage vers l’extérieur puis vers le bas, vers le cou/la clavicule, jamais vers le haut ou l’intérieur. Utilisez d’abord une huile pour le visage afin que l’outil ou les doigts glissent sans tirer sur la peau. Un passage complet prend généralement 2 à 3 minutes : mâchoire, joues, dessous des yeux, puis quelques mouvements doux vers le bas du cou pour vraiment aider le drainage.',
    },
  },
  {
    keywords: ['cold-water', 'cold water', 'cold compress', 'cold immersion'],
    videoId: '0vYy3GKOa0w',
    guide: {
      en: "Fill a bowl with cold water (ice optional) and submerge your face for 15–30 seconds, or splash/compress if full immersion isn't practical. This constricts blood vessels near the surface, which reduces puffiness and inflammation fast. Don't hold your breath in a panic — a few seconds of adjustment is normal. Avoid this if you have a heart condition or are advised against cold exposure; a cold compress works nearly as well with less shock to the system.",
      fr: 'Remplissez un bol d’eau froide (glaçons optionnels) et immergez le visage pendant 15 à 30 secondes, ou faites des éclaboussures/une compresse si l’immersion complète n’est pas pratique. Cela resserre les vaisseaux sanguins proches de la surface, ce qui réduit rapidement les poches et l’inflammation. Ne retenez pas votre respiration par panique — quelques secondes d’adaptation sont normales. Évitez si vous avez une condition cardiaque ou un avis médical contre l’exposition au froid ; une compresse froide fonctionne presque aussi bien avec moins de choc pour l’organisme.',
    },
  },
  {
    keywords: ['gum', 'clench', 'masseter'],
    videoId: 'WgNeY1fnOIE',
    guide: {
      en: "Chew firmly on one side at a time, not both — this isolates each masseter fully instead of splitting the work. Keep your jaw relaxed between reps; a tight neck or headache means you're clenching too hard for your current level, so drop to a softer gum. For isometric holds, bite down firmly and hold without grinding, breathing normally throughout rather than holding your breath.",
      fr: 'Mâchez fermement d’un côté à la fois, pas des deux — cela isole complètement chaque masséter au lieu de répartir le travail. Gardez la mâchoire détendue entre les répétitions ; une tension au cou ou un mal de tête signifie que vous serrez trop fort pour votre niveau actuel, donc passez à un chewing-gum plus souple. Pour les maintiens isométriques, mordez fermement et maintenez sans grincer, en respirant normalement plutôt qu’en bloquant votre respiration.',
    },
  },
  {
    keywords: ['canthal', 'squint', 'orbital', 'hunter eye'],
    videoId: 'fybOjy_OsLQ',
    guide: {
      en: 'Squint gently as if in bright sun, focusing the effort at the outer corner of the eye rather than scrunching the whole face. For canthal lift resistance, place a finger lightly at the outer corner and press up/out while your eye muscle resists the movement. Keep the inner face relaxed — forehead and nose should not move at all during these reps.',
      fr: 'Plissez doucement les yeux comme en plein soleil, en concentrant l’effort sur le coin externe de l’œil plutôt qu’en crispant tout le visage. Pour la résistance au lift canthal, placez un doigt légèrement sur le coin externe et appuyez vers le haut/l’extérieur pendant que le muscle de l’œil résiste au mouvement. Gardez le reste du visage détendu — le front et le nez ne doivent pas bouger du tout pendant ces répétitions.',
    },
  },
  {
    keywords: ['chin tuck'],
    videoId: 'gIBoxQ6AlS0',
    guide: {
      en: 'Sitting or standing tall, draw your chin straight back — like making a double chin on purpose — without tilting your head down. You should feel a stretch at the base of the skull and light activation in the front of the neck. Hold 2–3 seconds, then release. This is a small movement; if your head is visibly bobbing, you’re moving too much.',
      fr: 'Assis ou debout, redressé, ramenez le menton bien droit vers l’arrière — comme pour faire volontairement un double menton — sans incliner la tête vers le bas. Vous devez sentir un étirement à la base du crâne et une légère activation à l’avant du cou. Maintenez 2 à 3 secondes, puis relâchez. C’est un petit mouvement ; si votre tête bouge visiblement, vous en faites trop.',
    },
  },
  {
    keywords: ['wall angel', 'thoracic', 'doorway stretch'],
    videoId: '1UU4VvklQ44',
    guide: {
      en: 'Stand with your back, head and arms against a wall, elbows bent at 90°. Slowly slide your arms up like making a snow angel, keeping wrists, elbows and lower back in contact with the wall as long as possible. For the doorway stretch, place forearms on the frame and step forward gently until you feel the stretch across your chest — never past mild discomfort.',
      fr: 'Tenez-vous dos, tête et bras contre un mur, coudes pliés à 90°. Faites glisser lentement les bras vers le haut comme pour faire un ange dans la neige, en gardant poignets, coudes et bas du dos en contact avec le mur aussi longtemps que possible. Pour l’étirement dans l’embrasure de porte, posez les avant-bras sur le cadre et avancez doucement jusqu’à sentir l’étirement dans la poitrine — jamais au-delà d’une gêne légère.',
    },
  },
  {
    keywords: ['face pull', 'band pull-apart'],
    videoId: 'eTCBSFlCJ_s',
    guide: {
      en: 'With a band anchored at chest height, pull the handles toward your face, leading with your elbows and finishing with your hands beside your ears, thumbs pointing back. Squeeze your shoulder blades together at the end of each rep. For pull-aparts, hold the band at shoulder height and pull it apart by driving your shoulder blades back, not just your arms.',
      fr: 'Avec une bande fixée à hauteur de poitrine, tirez les poignées vers votre visage en menant avec les coudes, pour finir mains près des oreilles, pouces vers l’arrière. Serrez les omoplates l’une vers l’autre à la fin de chaque répétition. Pour les écartés à la bande, tenez-la à hauteur d’épaules et écartez-la en poussant les omoplates vers l’arrière, pas seulement avec les bras.',
    },
  },
  {
    keywords: ['cleanse', 'spf', 'retinoid', 'niacinamide', 'moisturiz', 'exfoliat'],
    videoId: '-Jt3gczy_4o',
    guide: {
      en: 'Order matters: cleanse first on damp skin, pat dry, then apply active ingredients (retinoid or niacinamide) before a moisturizer to seal them in, and SPF last every morning as the final step. Retinoids go on at night only — they break down in sunlight and increase sun sensitivity. Use a pea-sized amount; more product doesn’t mean faster results, just more irritation.',
      fr: 'L’ordre compte : nettoyez d’abord sur peau humide, séchez en tamponnant, puis appliquez les actifs (rétinoïde ou niacinamide) avant une crème hydratante pour les sceller, et le SPF en dernier chaque matin comme étape finale. Les rétinoïdes s’appliquent uniquement le soir — ils se dégradent à la lumière du jour et augmentent la sensibilité au soleil. Utilisez une quantité de la taille d’un petit pois ; plus de produit ne veut pas dire des résultats plus rapides, juste plus d’irritation.',
    },
  },
  {
    keywords: ['brow clean', 'brow maintenance'],
    videoId: 'SkCQaMQnrlw',
    guide: {
      en: "Map your natural brow shape first — don't just remove hair randomly. The brow should start roughly above the inner corner of your eye and end on a line from your nostril through the outer eye corner. Tweeze or trim only the strays outside that shape, a few hairs at a time, checking in good light as you go rather than removing a lot at once.",
      fr: 'Cartographiez d’abord la forme naturelle de vos sourcils — ne retirez pas de poils au hasard. Le sourcil doit commencer environ au-dessus du coin interne de l’œil et se terminer sur une ligne allant de la narine au coin externe de l’œil. Épilez ou taillez uniquement les poils qui dépassent de cette forme, quelques-uns à la fois, en vérifiant sous bonne lumière au fur et à mesure plutôt que d’en enlever beaucoup d’un coup.',
    },
  },
  {
    keywords: ['beard', 'shave line'],
    videoId: 'paUSXWMboxM',
    guide: {
      en: "Define your line along your natural jaw and cheek boundary, not higher — going too high looks unnatural as it grows out. Use a trimmer guard one size longer than you think first, then go shorter if needed; you can always take off more, not put it back. Keep the neckline just above your Adam's apple, not up at your jawbone.",
      fr: 'Définissez votre ligne le long du contour naturel de la mâchoire et de la joue, pas plus haut — aller trop haut paraît artificiel en repoussant. Utilisez d’abord un sabot de tondeuse une taille plus longue que ce que vous pensez, puis raccourcissez si besoin ; vous pouvez toujours en enlever plus, pas en remettre. Gardez la ligne du cou juste au-dessus de la pomme d’Adam, pas au niveau de la mâchoire.',
    },
  },
  {
    keywords: ['wind-down', 'screens off'],
    videoId: 'nlPOgN7ZGc8',
    guide: {
      en: 'Stop screens at least 60 minutes before bed — blue light delays melatonin release, and scrolling keeps your mind alert exactly when it should be slowing down. Replace that time with something low-stimulation: reading, stretching, or just dimming the lights. The goal is a consistent cue your body learns to associate with sleep approaching.',
      fr: 'Arrêtez les écrans au moins 60 minutes avant de dormir — la lumière bleue retarde la libération de mélatonine, et le défilement garde l’esprit en alerte juste au moment où il devrait ralentir. Remplacez ce temps par quelque chose de peu stimulant : lecture, étirements, ou simplement baisser les lumières. L’objectif est un signal cohérent que le corps apprend à associer à l’arrivée du sommeil.',
    },
  },
  {
    keywords: ['lateral raise'],
    videoId: 'nnH63icHYXY',
    guide: {
      en: 'Stand tall, dumbbells at your sides, and raise your arms out to shoulder height with a slight bend in the elbows, leading with your elbows rather than your hands. Stop at shoulder height — going higher shifts the work to your traps instead of your shoulders. Lower slowly; the negative matters as much as the lift.',
      fr: 'Tenez-vous droit, haltères le long du corps, et levez les bras sur le côté jusqu’à hauteur d’épaules avec une légère flexion des coudes, en menant avec les coudes plutôt qu’avec les mains. Arrêtez-vous à hauteur d’épaules — monter plus haut transfère le travail vers les trapèzes au lieu des épaules. Redescendez lentement ; la phase négative compte autant que la montée.',
    },
  },
  {
    keywords: ['vacuum'],
    videoId: '5ygAHVvbvJE',
    guide: {
      en: "Exhale completely, then pull your belly button in and up toward your spine as if trying to touch it, without sucking in your chest or shoulders. Hold while breathing shallow, or hold your breath briefly if you're comfortable doing so. This trains the transverse abdominis — the deep muscle that pulls your waist in — not the visible six-pack muscle.",
      fr: 'Expirez complètement, puis rentrez le nombril vers l’intérieur et le haut, en direction de la colonne, comme pour essayer de la toucher, sans rentrer la poitrine ou les épaules. Maintenez en respirant faiblement, ou en bloquant brièvement votre respiration si c’est confortable. Cela entraîne le transverse de l’abdomen — le muscle profond qui resserre la taille — pas les abdominaux visibles.',
    },
  },
  {
    keywords: ['push session', 'overhead press'],
    videoId: 'OhOdvjKCvr0',
    guide: {
      en: 'Push movements (chest press, shoulder press, dips) all work the same direction — away from your body. Keep your core braced throughout so the force comes from your chest/shoulders, not your lower back arching. For overhead press specifically, press the bar or dumbbells in a straight line above your head, not out in front, and avoid locking your elbows hard at the top.',
      fr: 'Les mouvements de poussée (développé couché, développé épaules, dips) travaillent tous dans la même direction — en éloignant du corps. Gardez le tronc gainé tout du long pour que la force vienne de la poitrine/des épaules, pas d’un bas du dos qui se cambre. Pour le développé militaire en particulier, poussez la barre ou les haltères en ligne droite au-dessus de la tête, pas vers l’avant, et évitez de bloquer fort les coudes en haut.',
    },
  },
  {
    keywords: ['pull session'],
    videoId: 'Sc8rL8sK7zE',
    guide: {
      en: "Pull movements (rows, pull-ups, curls) work back toward your body. Start each row by pulling your shoulder blade back first, then your arm follows — leading with the arm alone turns it into a biceps exercise instead of a back exercise. Control the return; don't let the weight just drop.",
      fr: 'Les mouvements de tirage (rowing, tractions, curls) travaillent en ramenant vers le corps. Commencez chaque rowing en tirant d’abord l’omoplate vers l’arrière, puis le bras suit — mener uniquement avec le bras en fait un exercice de biceps plutôt que de dos. Contrôlez le retour ; ne laissez pas simplement tomber la charge.',
    },
  },
];

/** Returns the curated entry (video id + guide) for a task's English text, or null if nothing matches. */
export function findDemoEntry(taskEn: string): DemoEntry | null {
  const lower = taskEn.toLowerCase();
  for (const entry of DEMO_ENTRIES) {
    if (entry.keywords.some((k) => lower.includes(k))) return entry;
  }
  return null;
}
