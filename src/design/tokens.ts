export const colors = {
  brand: {
    primary: { light: '#3B7DD8', dark: '#5A9BF5' },
    hover: { light: '#2563EB', dark: '#7CB3F5' },
  },
  semantic: {
    success: { light: '#059669', dark: '#34D399' },
    warning: { light: '#D97706', dark: '#FBBF24' },
    error: { light: '#DC2626', dark: '#F87171' },
  },
  category: {
    tech: { light: '#3B7DD8', dark: '#5A9BF5' },
    science: { light: '#7C3AED', dark: '#A78BFA' },
    business: { light: '#059669', dark: '#34D399' },
    default: { light: '#64748B', dark: '#94A3B8' },
  },
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#0B1020',
    white: '#FFFFFF',
  },
} as const;

export const lightTheme = {
  bg: {
    primary: colors.neutral[50],
    surface: colors.neutral.white,
    elevated: colors.neutral.white,
    hover: colors.neutral[100],
  },
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[700],
    tertiary: colors.neutral[500],
    muted: colors.neutral[400],
    inverse: colors.neutral.white,
    onBrand: colors.neutral.white,
  },
  border: {
    subtle: colors.neutral[200],
    strong: colors.neutral[300],
    focus: colors.brand.primary.light,
  },
  brand: {
    primary: colors.brand.primary.light,
    hover: colors.brand.hover.light,
    onPrimary: colors.neutral.white,
  },
  semantic: {
    success: colors.semantic.success.light,
    warning: colors.semantic.warning.light,
    error: colors.semantic.error.light,
  },
  category: {
    tech: colors.category.tech.light,
    science: colors.category.science.light,
    business: colors.category.business.light,
    default: colors.category.default.light,
  },
  overlay: 'rgba(11, 16, 32, 0.6)',
  statusBar: 'dark' as const,
} as const;

export const darkTheme = {
  bg: {
    primary: colors.neutral[950],
    surface: '#111827',
    elevated: '#1E293B',
    hover: '#1E293B',
  },
  text: {
    primary: colors.neutral[50],
    secondary: colors.neutral[200],
    tertiary: colors.neutral[400],
    muted: colors.neutral[500],
    inverse: colors.neutral[950],
    onBrand: colors.neutral.white,
  },
  border: {
    subtle: '#1E293B',
    strong: colors.neutral[700],
    focus: colors.brand.primary.dark,
  },
  brand: {
    primary: colors.brand.primary.dark,
    hover: colors.brand.hover.dark,
    onPrimary: colors.neutral.white,
  },
  semantic: {
    success: colors.semantic.success.dark,
    warning: colors.semantic.warning.dark,
    error: colors.semantic.error.dark,
  },
  category: {
    tech: colors.category.tech.dark,
    science: colors.category.science.dark,
    business: colors.category.business.dark,
    default: colors.category.default.dark,
  },
  overlay: 'rgba(0, 0, 0, 0.7)',
  statusBar: 'light' as const,
} as const;

export type ThemeColors = typeof lightTheme;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;

export const elevation = {
  level0: { shadowOpacity: 0, elevation: 0 },
  level1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  level2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  level3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export const typography = {
  fontFamilies: {
    display: 'SpaceGrotesk_700Bold',
    displayMedium: 'SpaceGrotesk_600SemiBold',
    body: 'Inter_400Regular',
    bodyMedium: 'Inter_500Medium',
    bodySemiBold: 'Inter_600SemiBold',
    bodyBold: 'Inter_700Bold',
  },
  sizes: {
    displayLarge: { fontSize: 32, lineHeight: 40, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: -0.5 },
    displayMedium: { fontSize: 28, lineHeight: 36, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: -0.5 },
    displaySmall: { fontSize: 24, lineHeight: 32, fontFamily: 'SpaceGrotesk_600SemiBold', letterSpacing: -0.3 },
    headlineLarge: { fontSize: 22, lineHeight: 28, fontFamily: 'Inter_600SemiBold', letterSpacing: -0.2 },
    headlineMedium: { fontSize: 20, lineHeight: 28, fontFamily: 'Inter_600SemiBold', letterSpacing: -0.2 },
    headlineSmall: { fontSize: 18, lineHeight: 26, fontFamily: 'Inter_600SemiBold', letterSpacing: -0.1 },
    titleLarge: { fontSize: 16, lineHeight: 24, fontFamily: 'Inter_600SemiBold' },
    titleMedium: { fontSize: 14, lineHeight: 20, fontFamily: 'Inter_500Medium' },
    titleSmall: { fontSize: 12, lineHeight: 16, fontFamily: 'Inter_600SemiBold', textTransform: 'uppercase' as const, letterSpacing: 0.8 },
    bodyLarge: { fontSize: 16, lineHeight: 24, fontFamily: 'Inter_400Regular' },
    bodyMedium: { fontSize: 14, lineHeight: 20, fontFamily: 'Inter_400Regular' },
    bodySmall: { fontSize: 12, lineHeight: 16, fontFamily: 'Inter_400Regular' },
    labelLarge: { fontSize: 14, lineHeight: 20, fontFamily: 'Inter_500Medium' },
    labelSmall: { fontSize: 11, lineHeight: 16, fontFamily: 'Inter_600SemiBold', textTransform: 'uppercase' as const, letterSpacing: 0.6 },
  },
} as const;

export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
} as const;

export const motion = {
  duration: {
    instant: 0,
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    emphasized: 'cubic-bezier(0.4, 0, 0, 1)',
    decelerated: 'cubic-bezier(0, 0, 0.2, 1)',
  },
} as const;

export const breakpoints = {
  sm: 360,
  md: 480,
  lg: 768,
} as const;

export const zIndex = {
  base: 0,
  header: 100,
  drawer: 200,
  modal: 300,
  toast: 400,
  tooltip: 500,
} as const;