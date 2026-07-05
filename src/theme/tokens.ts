/** Design tokens — "Warm Paper" theme (default, shipping palette). */

export const colors = {
  paper: '#F4F2ED',
  ink: '#14110E',
  soft: '#9C968B',
  card: '#FBFAF7',
  accent: '#14110E',
  success: '#3B7A4F',
  negative: '#A33333',
  border: 'rgba(20,17,14,0.14)',
  borderStrong: 'rgba(20,17,14,0.2)',
  borderSoft: 'rgba(20,17,14,0.1)',
  onInk: '#F4F2ED',
  placeholder: '#EAE7DF',
} as const;

/** Display font family = Cormorant Garamond, per README. Gotham is the intended
 * shipping UI font (paid/unlicensed here) — Montserrat is the stand-in, per spec. */
export const fonts = {
  display: 'CormorantGaramond_600SemiBold',
  displayMedium: 'CormorantGaramond_500Medium',
  displayItalic: 'CormorantGaramond_500Medium_Italic',
  ui400: 'Montserrat_400Regular',
  ui500: 'Montserrat_500Medium',
  ui600: 'Montserrat_600SemiBold',
  ui700: 'Montserrat_700Bold',
};

export const type = {
  screenTitle: { fontFamily: fonts.display, fontSize: 34 },
  bigScore: { fontFamily: fonts.display, fontSize: 96, lineHeight: 82 },
  cardTitle: { fontFamily: fonts.display, fontSize: 22 },
  body: { fontFamily: fonts.displayMedium, fontSize: 18 },
  label: { fontFamily: fonts.ui600, fontSize: 10, letterSpacing: 2 },
};

export const spacing = {
  screenH: 26,
  screenTop: 60,
  screenBottom: 40,
  radiusSm: 14,
  radiusMd: 18,
  radiusLg: 22,
  radiusXl: 26,
  tabBarHeight: 82,
};

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
};
