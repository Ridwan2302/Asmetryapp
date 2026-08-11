/** Curated real YouTube video + a detailed how-to guide per recurring exercise/routine,
 * matched by keyword against the (always-English) task text. */
export interface DemoEntry {
  keywords: string[];
  /** Per-language video ids — a French-speaking user only ever gets a French video, never an
   * English one dubbed in as a fallback. Omitted entirely (or missing one language) when no
   * specific, verified video applies for that language — the guide always still shows, we just
   * never link out to an unverified/invented or wrong-language video id. */
  videoId?: { en?: string; fr?: string };
  guide: { en: string; fr: string };
}

const DEMO_ENTRIES: DemoEntry[] = [
  {
    keywords: ['mewing', 'nasal breathing'],
    videoId: { en: 'YoKy55QNivQ', fr: 'fn8tnQUZrng' },
    guide: {
      en: 'Mewing means resting your entire tongue — tip to back — flat against the roof of your mouth, not just the tip behind your teeth. Keep your lips sealed and breathe through your nose. Your back teeth should touch lightly, without clenching. It should feel like a gentle, constant pressure, never straining. Hold it as a default resting posture, not just during dedicated reps — the cumulative time matters more than any single session.',
      fr: 'Le mewing consiste à poser toute la langue — de la pointe à l’arrière — bien à plat contre le palais, pas seulement le bout derrière les dents. Gardez les lèvres scellées et respirez par le nez. Les dents du fond doivent se toucher légèrement, sans serrer. Cela doit ressembler à une pression douce et constante, jamais forcée. Faites-en votre posture de repos par défaut, pas seulement pendant les répétitions dédiées — le temps cumulé compte plus qu’une seule séance.',
    },
  },
  {
    keywords: ['cheekbone', 'buccal'],
    videoId: { en: 'KxKijURpcQA', fr: '_srnPiIxsWI' },
    guide: {
      en: 'For the cheekbone lift, smile without showing your teeth, then push your cheeks up and back toward your ears using the muscle, not your hand. Hold each rep for a full second at the top. For buccal hollow holds, suck your cheeks in against your teeth and hold — you should feel it under the cheekbone, not in your jaw. Keep reps slow and controlled rather than fast and sloppy; quality of contraction matters more than speed.',
      fr: 'Pour le lift des pommettes, souriez sans montrer les dents, puis poussez les joues vers le haut et l’arrière, vers les oreilles, en utilisant le muscle, pas la main. Maintenez chaque répétition une seconde complète en haut. Pour les maintiens des joues creuses, aspirez les joues contre les dents et maintenez — vous devez le sentir sous la pommette, pas dans la mâchoire. Gardez des répétitions lentes et contrôlées plutôt que rapides et négligées ; la qualité de la contraction compte plus que la vitesse.',
    },
  },
  {
    keywords: ['gua sha', 'lymphatic', 'drainage', 'facial massage'],
    videoId: { en: 'lxlU0Fh5RAo', fr: 'bG9gfEEUvAQ' },
    guide: {
      en: 'Always work with light-to-medium pressure, never hard enough to bruise, and always move toward the lymph nodes — from the center of the face outward and down toward the neck/collarbone, never upward or inward. Use a facial oil first so the tool or fingers glide instead of dragging the skin. A full pass usually takes 2–3 minutes: jaw, cheeks, under-eyes, then a few gentle strokes down the neck to help fluid actually drain.',
      fr: 'Travaillez toujours avec une pression légère à modérée, jamais assez forte pour marquer, et déplacez-vous toujours vers les ganglions lymphatiques — du centre du visage vers l’extérieur puis vers le bas, vers le cou/la clavicule, jamais vers le haut ou l’intérieur. Utilisez d’abord une huile pour le visage afin que l’outil ou les doigts glissent sans tirer sur la peau. Un passage complet prend généralement 2 à 3 minutes : mâchoire, joues, dessous des yeux, puis quelques mouvements doux vers le bas du cou pour vraiment aider le drainage.',
    },
  },
  {
    keywords: ['cold-water', 'cold water', 'cold compress', 'cold immersion'],
    videoId: { en: '0vYy3GKOa0w', fr: 'nZPQxG_9DYg' },
    guide: {
      en: "Fill a bowl with cold water (ice optional) and submerge your face for 15–30 seconds, or splash/compress if full immersion isn't practical. This constricts blood vessels near the surface, which reduces puffiness and inflammation fast. Don't hold your breath in a panic — a few seconds of adjustment is normal. Avoid this if you have a heart condition or are advised against cold exposure; a cold compress works nearly as well with less shock to the system.",
      fr: 'Remplissez un bol d’eau froide (glaçons optionnels) et immergez le visage pendant 15 à 30 secondes, ou faites des éclaboussures/une compresse si l’immersion complète n’est pas pratique. Cela resserre les vaisseaux sanguins proches de la surface, ce qui réduit rapidement les poches et l’inflammation. Ne retenez pas votre respiration par panique — quelques secondes d’adaptation sont normales. Évitez si vous avez un problème cardiaque ou un avis médical contre l’exposition au froid ; une compresse froide fonctionne presque aussi bien avec moins de choc pour l’organisme.',
    },
  },
  {
    keywords: ['gum', 'clench', 'masseter'],
    videoId: { en: 'WgNeY1fnOIE', fr: 'FQqsUfFtS5o' },
    guide: {
      en: "Chew firmly on one side at a time, not both — this isolates each masseter fully instead of splitting the work. Keep your jaw relaxed between reps; a tight neck or headache means you're clenching too hard for your current level, so drop to a softer gum. For isometric holds, bite down firmly and hold without grinding, breathing normally throughout rather than holding your breath.",
      fr: 'Mâchez fermement d’un côté à la fois, pas des deux — cela isole complètement chaque masséter au lieu de répartir le travail. Gardez la mâchoire détendue entre les répétitions ; une tension au cou ou un mal de tête signifie que vous serrez trop fort pour votre niveau actuel, donc passez à un chewing-gum plus souple. Pour les maintiens isométriques, mordez fermement et maintenez sans grincer, en respirant normalement plutôt qu’en bloquant votre respiration.',
    },
  },
  {
    keywords: ['canthal', 'squint', 'orbital', 'hunter eye'],
    videoId: { en: 'fybOjy_OsLQ', fr: 'ayqDzU3c05s' },
    guide: {
      en: 'Squint gently as if in bright sun, focusing the effort at the outer corner of the eye rather than scrunching the whole face. For canthal lift resistance, place a finger lightly at the outer corner and press up/out while your eye muscle resists the movement. Keep the inner face relaxed — forehead and nose should not move at all during these reps.',
      fr: 'Plissez doucement les yeux comme en plein soleil, en concentrant l’effort sur le coin externe de l’œil plutôt qu’en crispant tout le visage. Pour la résistance au lift canthal, placez un doigt légèrement sur le coin externe et appuyez vers le haut/l’extérieur pendant que le muscle de l’œil résiste au mouvement. Gardez le reste du visage détendu — le front et le nez ne doivent pas bouger du tout pendant ces répétitions.',
    },
  },
  {
    keywords: ['chin tuck'],
    videoId: { en: 'gIBoxQ6AlS0', fr: 'S7zkERMKiSw' },
    guide: {
      en: 'Sitting or standing tall, draw your chin straight back — like making a double chin on purpose — without tilting your head down. You should feel a stretch at the base of the skull and light activation in the front of the neck. Hold 2–3 seconds, then release. This is a small movement; if your head is visibly bobbing, you’re moving too much.',
      fr: 'Assis ou debout, redressé, ramenez le menton bien droit vers l’arrière — comme pour faire volontairement un double menton — sans incliner la tête vers le bas. Vous devez sentir un étirement à la base du crâne et une légère activation à l’avant du cou. Maintenez 2 à 3 secondes, puis relâchez. C’est un petit mouvement ; si votre tête bouge visiblement, vous en faites trop.',
    },
  },
  {
    keywords: ['wall angel', 'thoracic', 'doorway stretch'],
    videoId: { en: '1UU4VvklQ44', fr: 'lgLRtjLvNys' },
    guide: {
      en: 'Stand with your back, head and arms against a wall, elbows bent at 90°. Slowly slide your arms up like making a snow angel, keeping wrists, elbows and lower back in contact with the wall as long as possible. For the doorway stretch, place forearms on the frame and step forward gently until you feel the stretch across your chest — never past mild discomfort.',
      fr: 'Tenez-vous dos, tête et bras contre un mur, coudes pliés à 90°. Faites glisser lentement les bras vers le haut comme pour faire un ange dans la neige, en gardant poignets, coudes et bas du dos en contact avec le mur aussi longtemps que possible. Pour l’étirement dans l’embrasure de porte, posez les avant-bras sur le cadre et avancez doucement jusqu’à sentir l’étirement dans la poitrine — jamais au-delà d’une gêne légère.',
    },
  },
  {
    keywords: ['face pull', 'band pull-apart'],
    videoId: { en: 'eTCBSFlCJ_s', fr: 'AsJXJA5cby0' },
    guide: {
      en: 'With a band anchored at chest height, pull the handles toward your face, leading with your elbows and finishing with your hands beside your ears, thumbs pointing back. Squeeze your shoulder blades together at the end of each rep. For pull-aparts, hold the band at shoulder height and pull it apart by driving your shoulder blades back, not just your arms.',
      fr: 'Avec une bande fixée à hauteur de poitrine, tirez les poignées vers votre visage en menant avec les coudes, pour finir mains près des oreilles, pouces vers l’arrière. Serrez les omoplates l’une vers l’autre à la fin de chaque répétition. Pour les écartés à la bande, tenez-la à hauteur d’épaules et écartez-la en poussant les omoplates vers l’arrière, pas seulement avec les bras.',
    },
  },
  {
    keywords: ['cleanse', 'spf', 'retinoid', 'niacinamide', 'moisturiz', 'exfolia'],
    videoId: { en: '-Jt3gczy_4o', fr: 'MlltnlX1OAQ' },
    guide: {
      en: 'Order matters: cleanse first on damp skin, pat dry, then apply active ingredients (retinoid or niacinamide) before a moisturizer to seal them in, and SPF last every morning as the final step. Retinoids go on at night only — they break down in sunlight and increase sun sensitivity. Use a pea-sized amount; more product doesn’t mean faster results, just more irritation.',
      fr: 'L’ordre compte : nettoyez d’abord sur peau humide, séchez en tamponnant, puis appliquez les actifs (rétinoïde ou niacinamide) avant une crème hydratante pour les sceller, et le SPF en dernier chaque matin comme étape finale. Les rétinoïdes s’appliquent uniquement le soir — ils se dégradent à la lumière du jour et augmentent la sensibilité au soleil. Utilisez une quantité de la taille d’un petit pois ; plus de produit ne veut pas dire des résultats plus rapides, juste plus d’irritation.',
    },
  },
  {
    keywords: ['brow clean', 'brow maintenance'],
    videoId: { en: 'SkCQaMQnrlw', fr: 'MUVjcYYnEyE' },
    guide: {
      en: "Map your natural brow shape first — don't just remove hair randomly. The brow should start roughly above the inner corner of your eye and end on a line from your nostril through the outer eye corner. Tweeze or trim only the strays outside that shape, a few hairs at a time, checking in good light as you go rather than removing a lot at once.",
      fr: 'Cartographiez d’abord la forme naturelle de vos sourcils — ne retirez pas de poils au hasard. Le sourcil doit commencer environ au-dessus du coin interne de l’œil et se terminer sur une ligne allant de la narine au coin externe de l’œil. Épilez ou taillez uniquement les poils qui dépassent de cette forme, quelques-uns à la fois, en vérifiant sous bonne lumière au fur et à mesure plutôt que d’en enlever beaucoup d’un coup.',
    },
  },
  {
    keywords: ['beard', 'shave line'],
    videoId: { en: 'paUSXWMboxM', fr: '55nyahQFBTs' },
    guide: {
      en: "Define your line along your natural jaw and cheek boundary, not higher — going too high looks unnatural as it grows out. Use a trimmer guard one size longer than you think first, then go shorter if needed; you can always take off more, not put it back. Keep the neckline just above your Adam's apple, not up at your jawbone.",
      fr: 'Définissez votre ligne le long du contour naturel de la mâchoire et de la joue, pas plus haut — aller trop haut paraît artificiel en repoussant. Utilisez d’abord un sabot de tondeuse une taille plus longue que ce que vous pensez, puis raccourcissez si besoin ; vous pouvez toujours en enlever plus, pas en remettre. Gardez la ligne du cou juste au-dessus de la pomme d’Adam, pas au niveau de la mâchoire.',
    },
  },
  {
    keywords: ['wind-down', 'screens off'],
    videoId: { en: 'nlPOgN7ZGc8', fr: 'vO1Bg_7NKUE' },
    guide: {
      en: 'Stop screens at least 60 minutes before bed — blue light delays melatonin release, and scrolling keeps your mind alert exactly when it should be slowing down. Replace that time with something low-stimulation: reading, stretching, or just dimming the lights. The goal is a consistent cue your body learns to associate with sleep approaching.',
      fr: 'Arrêtez les écrans au moins 60 minutes avant de dormir — la lumière bleue retarde la libération de mélatonine, et le défilement garde l’esprit en alerte juste au moment où il devrait ralentir. Remplacez ce temps par quelque chose de peu stimulant : lecture, étirements, ou simplement baisser les lumières. L’objectif est un signal cohérent que le corps apprend à associer à l’arrivée du sommeil.',
    },
  },
  {
    keywords: ['lateral raise', 'shoulder finisher'],
    videoId: { en: 'nnH63icHYXY', fr: 'q_DYeb_daeY' },
    guide: {
      en: 'Stand tall, dumbbells at your sides, and raise your arms out to shoulder height with a slight bend in the elbows, leading with your elbows rather than your hands. Stop at shoulder height — going higher shifts the work to your traps instead of your shoulders. Lower slowly; the negative matters as much as the lift.',
      fr: 'Tenez-vous droit, haltères le long du corps, et levez les bras sur le côté jusqu’à hauteur d’épaules avec une légère flexion des coudes, en menant avec les coudes plutôt qu’avec les mains. Arrêtez-vous à hauteur d’épaules — monter plus haut transfère le travail vers les trapèzes au lieu des épaules. Redescendez lentement ; la phase négative compte autant que la montée.',
    },
  },
  {
    keywords: ['vacuum'],
    videoId: { en: '5ygAHVvbvJE', fr: 'QPv6jsq5htY' },
    guide: {
      en: "Exhale completely, then pull your belly button in and up toward your spine as if trying to touch it, without sucking in your chest or shoulders. Hold while breathing shallow, or hold your breath briefly if you're comfortable doing so. This trains the transverse abdominis — the deep muscle that pulls your waist in — not the visible six-pack muscle.",
      fr: 'Expirez complètement, puis rentrez le nombril vers l’intérieur et le haut, en direction de la colonne, comme pour essayer de la toucher, sans rentrer la poitrine ou les épaules. Maintenez en respirant faiblement, ou en bloquant brièvement votre respiration si c’est confortable. Cela entraîne le transverse de l’abdomen — le muscle profond qui resserre la taille — pas les abdominaux visibles.',
    },
  },
  {
    keywords: ['push session', 'overhead press', 'push/pull superset'],
    videoId: { en: 'OhOdvjKCvr0', fr: 'WmwFNLeuHd8' },
    guide: {
      en: 'Push movements (chest press, shoulder press, dips) all work the same direction — away from your body. Keep your core braced throughout so the force comes from your chest/shoulders, not your lower back arching. For overhead press specifically, press the bar or dumbbells in a straight line above your head, not out in front, and avoid locking your elbows hard at the top.',
      fr: 'Les mouvements de poussée (développé couché, développé épaules, dips) travaillent tous dans la même direction — en éloignant du corps. Gardez le tronc gainé tout du long pour que la force vienne de la poitrine/des épaules, pas d’un bas du dos qui se cambre. Pour le développé militaire en particulier, poussez la barre ou les haltères en ligne droite au-dessus de la tête, pas vers l’avant, et évitez de bloquer fort les coudes en haut.',
    },
  },
  {
    keywords: ['pull session'],
    videoId: { en: 'Sc8rL8sK7zE', fr: '2P2TyrYyTmU' },
    guide: {
      en: "Pull movements (rows, pull-ups, curls) work back toward your body. Start each row by pulling your shoulder blade back first, then your arm follows — leading with the arm alone turns it into a biceps exercise instead of a back exercise. Control the return; don't let the weight just drop.",
      fr: 'Les mouvements de tirage (rowing, tractions, curls) travaillent en ramenant vers le corps. Commencez chaque rowing en tirant d’abord l’omoplate vers l’arrière, puis le bras suit — mener uniquement avec le bras en fait un exercice de biceps plutôt que de dos. Contrôlez le retour ; ne laissez pas simplement tomber la charge.',
    },
  },
  {
    keywords: ['progress photo'],
    guide: {
      en: 'Take your progress photo in the same spot, same lighting (ideally natural daylight, not overhead artificial light), and the same time of day each time — inconsistent conditions make real changes impossible to see. Keep a neutral expression, pull hair back, and use the same distance from the camera so photos line up for a fair side-by-side comparison.',
      fr: 'Prenez votre photo de progression au même endroit, avec le même éclairage (idéalement la lumière naturelle du jour, pas un éclairage artificiel au plafond), et au même moment de la journée à chaque fois — des conditions incohérentes rendent les vrais changements impossibles à voir. Gardez une expression neutre, dégagez les cheveux, et utilisez la même distance par rapport à l’appareil pour que les photos s’alignent pour une comparaison côte à côte équitable.',
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
      en: "This is a recap week, not new material — run through everything you practiced across the last three weeks in one session, back to back, at a pace you can sustain with good form throughout. The point isn't to go harder than before; it's to prove the whole routine now runs together smoothly without needing to think through each step.",
      fr: 'C’est une semaine de récapitulatif, pas de nouveau contenu — enchaînez tout ce que vous avez pratiqué au cours des trois dernières semaines en une seule séance, sans interruption, à un rythme que vous pouvez tenir en gardant une bonne forme tout du long. L’objectif n’est pas d’aller plus fort qu’avant ; c’est de prouver que toute la routine s’enchaîne désormais sans effort de réflexion à chaque étape.',
    },
  },
  {
    keywords: [
      'protein target',
      'protein:',
      'hit protein',
      'protein + vitamin',
      'cut liquid sugar',
      'whole-food carbs',
      'zinc + magnesium',
      'fasting',
      'healthy fats',
      'cut dairy',
    ],
    guide: {
      en: 'Hit your protein target by spreading it across 3-4 meals rather than one big serving — the body can only use so much at once. Favor whole foods (meat, eggs, dairy, legumes, vegetables) over processed ones, since they carry the vitamins and minerals your body actually needs for this to work, not just calories. Consistency day-to-day matters far more than any single perfect meal.',
      fr: 'Atteignez votre objectif de protéines en le répartissant sur 3 à 4 repas plutôt qu’une seule grosse portion — le corps ne peut en utiliser qu’une certaine quantité à la fois. Privilégiez les aliments complets (viande, œufs, produits laitiers, légumineuses, légumes) aux aliments transformés, car ils apportent les vitamines et minéraux dont votre corps a réellement besoin pour que cela fonctionne, pas seulement des calories. La régularité au quotidien compte bien plus qu’un seul repas parfait.',
    },
  },
  {
    keywords: ['steps for the day', '10k steps', '8k steps'],
    guide: {
      en: "Steps don't need to come from a dedicated walk — they add up from stairs, parking further away, pacing during calls, or a short walk after meals. Spreading them through the day (rather than one long walk) also helps regulate blood sugar better after eating. Track with your phone's built-in step counter; no special equipment needed.",
      fr: 'Les pas n’ont pas besoin de venir d’une marche dédiée — ils s’accumulent avec les escaliers, se garer plus loin, marcher pendant les appels, ou une courte marche après les repas. Les répartir sur la journée (plutôt qu’une seule longue marche) aide aussi à mieux réguler la glycémie après les repas. Suivez avec le compteur de pas intégré à votre téléphone ; aucun équipement spécial n’est nécessaire.',
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
      en: "Spread your water target across the whole day rather than drinking it all at once — the body absorbs a steady intake much better than a flood. Add a pinch of salt or an electrolyte packet if you're sweating a lot or drinking well over 2.5L, since water alone without minerals can actually flush out what you need. You'll know you're on track when urine runs pale yellow, not clear or dark.",
      fr: 'Répartissez votre objectif d’eau sur toute la journée plutôt que de tout boire d’un coup — le corps absorbe bien mieux un apport régulier qu’un afflux soudain. Ajoutez une pincée de sel ou un sachet d’électrolytes si vous transpirez beaucoup ou buvez bien plus de 2,5 L, car l’eau seule sans minéraux peut en réalité évacuer ce dont vous avez besoin. Vous saurez que c’est le cas quand vos urines sont jaune pâle, ni claires ni foncées.',
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
      en: 'Keep your wake time fixed even on weekends — that\'s what actually anchors your circadian rhythm, more than bedtime does. Get sunlight within 30 minutes of waking to lock that signal in, cut caffeine by early afternoon since it has a long half-life, and keep the bedroom cool and dark. Small, consistent habits repeated nightly matter far more than any single "perfect" night.',
      fr: 'Gardez une heure de réveil fixe même le week-end — c’est en réalité elle qui ancre votre rythme circadien, plus que l’heure du coucher. Exposez-vous au soleil dans les 30 minutes suivant le réveil pour verrouiller ce signal, arrêtez la caféine en début d’après-midi car elle a une longue demi-vie, et gardez la chambre fraîche et sombre. De petites habitudes constantes répétées chaque soir comptent bien plus qu’une seule nuit « parfaite ».',
    },
  },
  {
    keywords: ['posture reset alarm', 'desk ergonomics', 'deep neck flexor', 'standing posture holds', 'loaded carries', 'alignment habit check'],
    guide: {
      en: 'These are about catching yourself throughout the day, not a single training session — set an actual phone alarm or reminder so you check in hourly rather than relying on memory. When it goes off, reset: ears over shoulders, shoulders back and down, core lightly braced. Over weeks, this conscious check-in is what turns into an unconscious default.',
      fr: 'Il s’agit ici de vous reprendre tout au long de la journée, pas d’une seule séance d’entraînement — réglez une vraie alarme ou un rappel sur votre téléphone pour vérifier votre posture toutes les heures plutôt que de compter sur votre mémoire. Quand il sonne, réajustez-vous : oreilles au-dessus des épaules, épaules en arrière et basses, tronc légèrement gainé. Au fil des semaines, cette vérification consciente devient un réflexe inconscient.',
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
      en: 'These check-ins work because you write them down, not because you remember them — use a simple note, calendar tick, or the streak already built into this app. Spot treatments (like BHA on active breakouts) should go on clean, dry skin only where needed, not the whole face — over-applying just irritates skin that isn\'t broken out.',
      fr: 'Ces suivis fonctionnent parce que vous les notez, pas parce que vous vous en souvenez — utilisez une simple note, une coche sur un calendrier, ou la série déjà intégrée à cette application. Les traitements localisés (comme le BHA sur les imperfections actives) doivent s’appliquer uniquement sur peau propre et sèche, là où c’est nécessaire, pas sur tout le visage — trop en mettre irrite juste la peau qui n’a pas d’imperfection.',
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
      en: 'Book grooming appointments (haircut, whitening) ahead rather than waiting until you need one urgently — staying ahead of it is what keeps presentation consistently sharp instead of cycling between "just cut" and "overdue." For daily upkeep (styling, nails, fragrance), little and often beats a big effort once a week.',
      fr: 'Réservez vos rendez-vous grooming (coupe, blanchiment) à l’avance plutôt que d’attendre d’en avoir un besoin urgent — garder une longueur d’avance est ce qui maintient une présentation toujours soignée, au lieu d’alterner entre « fraîchement coupé » et « en retard ». Pour l’entretien quotidien (coiffage, ongles, parfum), un peu souvent vaut mieux qu’un gros effort une fois par semaine.',
    },
  },
  {
    keywords: ['jaw-fascia release', 'neck + jaw stretch', 'lower-lip pull downs'],
    guide: {
      en: "For jaw-fascia release, use your knuckles or a massage tool to apply firm, slow circular pressure along the jaw muscle — this releases tension built up from clenching, it isn't a strength exercise. Neck + jaw stretches should be slow and gentle, held for the full duration rather than bounced, since forcing a stretch can strain the jaw joint.",
      fr: 'Pour le relâchement du fascia mandibulaire, utilisez vos jointures ou un outil de massage pour appliquer une pression circulaire ferme et lente le long du muscle de la mâchoire — cela relâche la tension accumulée par le serrage, ce n’est pas un exercice de force. Les étirements cou + mâchoire doivent être lents et doux, maintenus pendant toute la durée plutôt que réalisés en rebond, car forcer un étirement peut solliciter l’articulation de la mâchoire.',
    },
  },
  {
    keywords: ['lateral gaze holds', 'brow-set downward press', 'screen-distance', 'compress + massage'],
    guide: {
      en: "Keep these movements small and controlled — the muscles around the eyes are delicate, so this is about precise, gentle engagement, not force. For screen-distance checks, your screen should sit roughly an arm's length away and at eye level; too close or too low strains the eyes and encourages squinting outside of your actual training reps.",
      fr: 'Gardez ces mouvements petits et contrôlés — les muscles autour des yeux sont délicats, il s’agit donc d’un engagement précis et doux, pas de force. Pour la vérification de la distance à l’écran, celui-ci doit se trouver à peu près à une longueur de bras et à hauteur des yeux ; trop proche ou trop bas fatigue les yeux et encourage à plisser les yeux en dehors de vos répétitions d’entraînement.',
    },
  },
  {
    keywords: ['strength train', 'resistance training progression'],
    guide: {
      en: 'Aim for compound movements (squats, presses, rows, deadlifts) that work multiple muscle groups at once — they drive the biggest hormonal response per session. Progress by adding small amounts of weight or reps week to week rather than jumping too fast; consistent, gradual overload beats sporadic maxing out.',
      fr: 'Privilégiez les mouvements polyarticulaires (squats, développés, rowing, soulevé de terre) qui sollicitent plusieurs groupes musculaires à la fois — ils déclenchent la plus grande réponse hormonale par séance. Progressez en ajoutant de petites quantités de poids ou de répétitions semaine après semaine plutôt qu’en avançant trop vite ; une surcharge progressive et régulière vaut mieux que des efforts maximaux sporadiques.',
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
