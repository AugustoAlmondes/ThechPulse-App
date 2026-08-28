export { colors } from '@/src/design/tokens'

export const COLORS = {
    primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3B7DD8',
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A',
        950: '#172554',
    },
    secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748B',
        600: '#475569',
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A',
        950: '#0B1020',
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
    feedback: {
        success: {
            100: '#D1FAE5',
            500: '#10B981',
            700: '#059669',
        },
        error: {
            100: '#FEE2E2',
            500: '#EF4444',
            700: '#DC2626',
        },
        warning: {
            100: '#FEF3C7',
            500: '#F59E0B',
            700: '#D97706',
        },
    },
    github: '#171717',
    badges: {
        blue: '#3B7DD8',
        green: '#10B981',
        purple: '#8B5CF6',
        pink: '#EC4899',
        orange: '#F59E0B',
        teal: '#14B8A6',
        red: '#EF4444',
        indigo: '#6366F1',
        cyan: '#06B6D4',
        lime: '#84CC16',
    },
    rank: {
        gold: '#F59E0B',
        silver: '#94A3B8',
        bronze: '#D97706',
    },
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
} as const

export interface AppTheme {
    background: string;
    backgroundSecondary: string;
    backgroundTertiary: string;
    surface: string;
    surfaceHover: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textMuted: string;
    textSubtle: string;
    textDisabled: string;
    border: string;
    divider: string;
    headerBackground: string;
    headerText: string;
    headerIcon: string;
    tabBarBackground: string;
    tabBarActive: string;
    tabBarInactive: string;
    drawerBackground: string;
    drawerActiveBackground: string;
    drawerActiveText: string;
    drawerInactiveText: string;
    cardBackground: string;
    cardTitle: string;
    cardDescription: string;
    cardDate: string;
    cardSubject: string;
    searchBackground: string;
    searchText: string;
    searchPlaceholder: string;
    primaryButton: string;
    primaryButtonText: string;
    accentButton: string;
    statusBarStyle: 'light' | 'dark';
    overlay: string;
    settingItemBackground: string;
    settingItemText: string;
    sectionTitleColor: string;
    chevronColor: string;
    favoriteCardBackground: string;
    statsBackground: string;
    statsText: string;
    
    // New token structure (for migration) - prefixed with 'token'
    tokenBg: {
        primary: string;
        surface: string;
        elevated: string;
        hover: string;
    };
    tokenText: {
        primary: string;
        secondary: string;
        tertiary: string;
        muted: string;
        inverse: string;
        onBrand: string;
    };
    tokenBorder: {
        subtle: string;
        strong: string;
        focus: string;
    };
    tokenBrand: {
        primary: string;
        hover: string;
        onPrimary: string;
    };
    tokenSemantic: {
        success: string;
        warning: string;
        error: string;
    };
    tokenCategory: {
        tech: string;
        science: string;
        business: string;
        default: string;
    };
    tokenOverlay: string;
    tokenStatusBar: 'light' | 'dark';
}

export const darkTheme: AppTheme = {
    background: COLORS.neutral[950],
    backgroundSecondary: COLORS.neutral[900],
    backgroundTertiary: COLORS.neutral[800],
    surface: '#111827',
    surfaceHover: '#1E293B',
    textPrimary: COLORS.neutral.white,
    textSecondary: COLORS.neutral[200],
    textTertiary: COLORS.neutral[400],
    textMuted: COLORS.neutral[500],
    textSubtle: COLORS.neutral[500],
    textDisabled: COLORS.neutral[600],
    border: '#1E293B',
    divider: '#1E293B66',
    headerBackground: COLORS.neutral[950],
    headerText: COLORS.neutral.white,
    headerIcon: COLORS.neutral.white,
    tabBarBackground: COLORS.neutral[950],
    tabBarActive: COLORS.neutral.white,
    tabBarInactive: COLORS.neutral[400] + '99',
    drawerBackground: COLORS.neutral[950],
    drawerActiveBackground: '#111827',
    drawerActiveText: COLORS.neutral.white,
    drawerInactiveText: COLORS.neutral[400],
    cardBackground: '#111827',
    cardTitle: COLORS.neutral[200],
    cardDescription: COLORS.neutral[400],
    cardDate: COLORS.neutral[500],
    cardSubject: COLORS.neutral.white,
    searchBackground: '#1E293BB3',
    searchText: COLORS.neutral.white,
    searchPlaceholder: COLORS.neutral[400],
    primaryButton: COLORS.primary[500],
    primaryButtonText: COLORS.neutral.white,
    accentButton: COLORS.badges.indigo,
    statusBarStyle: 'light',
    overlay: 'rgba(0, 0, 0, 0.7)',
    settingItemBackground: '#111827',
    settingItemText: COLORS.neutral.white,
    sectionTitleColor: COLORS.neutral[500],
    chevronColor: COLORS.neutral[600],
    favoriteCardBackground: COLORS.primary[800] + 'CC',
    statsBackground: COLORS.secondary[700],
    statsText: COLORS.secondary[200],
    
    tokenBg: {
        primary: COLORS.neutral[950],
        surface: '#111827',
        elevated: '#1E293B',
        hover: '#1E293B',
    },
    tokenText: {
        primary: COLORS.neutral[50],
        secondary: COLORS.neutral[200],
        tertiary: COLORS.neutral[400],
        muted: COLORS.neutral[500],
        inverse: COLORS.neutral[950],
        onBrand: COLORS.neutral.white,
    },
    tokenBorder: {
        subtle: '#1E293B',
        strong: COLORS.neutral[700],
        focus: COLORS.brand.primary.dark,
    },
    tokenBrand: {
        primary: COLORS.brand.primary.dark,
        hover: COLORS.brand.hover.dark,
        onPrimary: COLORS.neutral.white,
    },
    tokenSemantic: {
        success: COLORS.semantic.success.dark,
        warning: COLORS.semantic.warning.dark,
        error: COLORS.semantic.error.dark,
    },
    tokenCategory: {
        tech: COLORS.category.tech.dark,
        science: COLORS.category.science.dark,
        business: COLORS.category.business.dark,
        default: COLORS.category.default.dark,
    },
    tokenOverlay: 'rgba(0, 0, 0, 0.7)',
    tokenStatusBar: 'light',
}

export const lightTheme: AppTheme = {
    background: '#F8FAFC',
    backgroundSecondary: '#F8FAFC',
    backgroundTertiary: '#F1F5F9',
    surface: '#FFFFFF',
    surfaceHover: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textTertiary: '#64748B',
    textMuted: '#94A3B8',
    textSubtle: '#94A3B8',
    textDisabled: '#CBD5E1',
    border: '#E2E8F0',
    divider: '#E2E8F099',
    headerBackground: '#F8FAFC',
    headerText: '#0F172A',
    headerIcon: '#334155',
    tabBarBackground: '#F8FAFC',
    tabBarActive: '#0F172A',
    tabBarInactive: '#94A3B8',
    drawerBackground: '#F8FAFC',
    drawerActiveBackground: '#E2E8F0',
    drawerActiveText: '#0F172A',
    drawerInactiveText: '#64748B',
    cardBackground: '#FFFFFF',
    cardTitle: '#334155',
    cardDescription: '#64748B',
    cardDate: '#94A3B8',
    cardSubject: '#F8FAFC',
    searchBackground: '#F1F5F9',
    searchText: '#0F172A',
    searchPlaceholder: '#94A3B8',
    primaryButton: COLORS.primary[500],
    primaryButtonText: '#FFFFFF',
    accentButton: COLORS.badges.indigo,
    statusBarStyle: 'dark',
    overlay: 'rgba(11, 16, 32, 0.6)',
    settingItemBackground: '#FFFFFF',
    settingItemText: '#0F172A',
    sectionTitleColor: '#64748B',
    chevronColor: '#CBD5E1',
    favoriteCardBackground: COLORS.primary[100],
    statsBackground: COLORS.secondary[100],
    statsText: COLORS.secondary[800],
    
    tokenBg: {
        primary: '#F8FAFC',
        surface: '#FFFFFF',
        elevated: '#FFFFFF',
        hover: '#F1F5F9',
    },
    tokenText: {
        primary: '#0F172A',
        secondary: '#334155',
        tertiary: '#64748B',
        muted: '#94A3B8',
        inverse: '#FFFFFF',
        onBrand: COLORS.neutral.white,
    },
    tokenBorder: {
        subtle: '#E2E8F0',
        strong: '#CBD5E1',
        focus: COLORS.brand.primary.light,
    },
    tokenBrand: {
        primary: COLORS.brand.primary.light,
        hover: COLORS.brand.hover.light,
        onPrimary: COLORS.neutral.white,
    },
    tokenSemantic: {
        success: COLORS.semantic.success.light,
        warning: COLORS.semantic.warning.light,
        error: COLORS.semantic.error.light,
    },
    tokenCategory: {
        tech: COLORS.category.tech.light,
        science: COLORS.category.science.light,
        business: COLORS.category.business.light,
        default: COLORS.category.default.light,
    },
    tokenOverlay: 'rgba(11, 16, 32, 0.6)',
    tokenStatusBar: 'dark',
}