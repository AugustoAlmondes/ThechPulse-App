export const COLORS = {
    primary: {
        50: "#f2f5f8",
        100: "#dce3ea",
        200: "#b8c4d3",
        300: "#94a5bc",
        400: "#7086a5",
        500: "#566981", // sua base atual
        600: "#4a5a70",
        700: "#3a415a", // seu hover atual
        800: "#2c3245",
        900: "#1f2433",
        950: "#141821",
    },

    secondary: {
        50: "#f4f8f9",
        100: "#e1edf0",
        200: "#c3dbe1",
        300: "#a5c9d2",
        400: "#97b8c2",
        500: "#89a7b1", // sua base atual
        600: "#6e8b95",
        700: "#566981", // conexão com primary
        800: "#3f4d5a",
        900: "#2a333b",
        950: "#1a2026",
    },

    neutral: {
        50: "#f6f8f9",
        100: "#e3e8ec",
        200: "#cbd5dc",
        300: "#aebbc6",
        400: "#8fa0ad",
        500: "#6b7c8a",
        600: "#566981", // usado como borda
        700: "#3f4d5a",
        800: "#2a3340",
        900: "#1f2933", // seu blackSoft
        950: "#12171d",

        white: "#ffffff",
    },

    feedback: {
        success: {
            100: "#e8f5e9",
            500: "#4caf50",
            700: "#388e3c",
        },
        error: {
            100: "#fdecea",
            500: "#e57373",
            700: "#d32f2f",
        },
        warning: {
            100: "#fff7e0",
            500: "#f4b400",
            700: "#c49000",
        },
    },

    github: "#171717",

    badges: {
        blue: "#4a90e2",
        green: "#27ae60",
        purple: "#9b59b6",
        pink: "#e2759f",
        orange: "#f39c12",
        teal: "#1abc9c",
        red: "#b45b51",
        indigo: "#5c6bc0",
        cyan: "#57afbb",
        lime: "#8bc34a",
    },

    rank:{
        gold:"#d1b827ff",
        silver:"#C0C0C0",
        bronze:"#CD7F32",
    }

};

// Semantic tokens for dark theme (matches current behavior)
export const darkTheme = {
    // Backgrounds
    background: COLORS.neutral[900],
    backgroundSecondary: COLORS.neutral[800],
    backgroundTertiary: COLORS.neutral[700],
    surface: COLORS.neutral[800],
    surfaceHover: COLORS.neutral[700],

    // Text
    textPrimary: COLORS.neutral.white,
    textSecondary: COLORS.neutral[200],
    textTertiary: COLORS.neutral[300],
    textMuted: COLORS.neutral[400],
    textSubtle: COLORS.neutral[500],
    textDisabled: COLORS.neutral[600],

    // Borders & Dividers
    border: COLORS.neutral[800],
    divider: COLORS.neutral[700] + '40',

    // Header / Navigation
    headerBackground: COLORS.neutral[900],
    headerText: COLORS.neutral.white,
    headerIcon: COLORS.neutral.white,
    tabBarBackground: COLORS.neutral[900],
    tabBarActive: COLORS.neutral.white,
    tabBarInactive: COLORS.neutral[300] + '60',
    drawerBackground: COLORS.neutral[900],
    drawerActiveBackground: COLORS.neutral[800],
    drawerActiveText: COLORS.neutral.white,
    drawerInactiveText: COLORS.neutral[400],

    // Cards
    cardBackground: COLORS.neutral[800],
    cardTitle: COLORS.neutral[200],
    cardDescription: COLORS.neutral[300],
    cardDate: COLORS.neutral[500],
    cardSubject: COLORS.neutral.white,

    // Search
    searchBackground: COLORS.neutral[700] + '70',
    searchText: COLORS.neutral.white,
    searchPlaceholder: COLORS.neutral[400],

    // Buttons
    primaryButton: COLORS.primary[500],
    primaryButtonText: COLORS.neutral.white,
    accentButton: COLORS.badges.indigo,

    // Misc
    statusBarStyle: 'light' as const,
    overlay: 'rgba(18, 23, 29, 0.85)',

    // Settings
    settingItemBackground: COLORS.neutral[800],
    settingItemText: COLORS.neutral.white,
    sectionTitleColor: COLORS.neutral[500],
    chevronColor: COLORS.neutral[600],

    // Favorite card
    favoriteCardBackground: COLORS.primary[800] + '80',

    // Stats boxes
    statsBackground: COLORS.secondary[700],
    statsText: COLORS.secondary[200],
};

// Semantic tokens for light theme
export const lightTheme = {
    // Backgrounds
    background: "#F5F7FA",
    backgroundSecondary: "#FFFFFF",
    backgroundTertiary: "#E8ECF1",
    surface: "#FFFFFF",
    surfaceHover: "#F0F3F7",

    // Text
    textPrimary: "#1A2233",
    textSecondary: "#2C3E50",
    textTertiary: "#4A5568",
    textMuted: "#6B7C8A",
    textSubtle: "#8FA0AD",
    textDisabled: "#B0BEC5",

    // Borders & Dividers
    border: "#E0E6ED",
    divider: "#CBD5DC" + '60',

    // Header / Navigation
    headerBackground: "#FFFFFF",
    headerText: "#1A2233",
    headerIcon: "#2C3E50",
    tabBarBackground: "#FFFFFF",
    tabBarActive: "#1A2233",
    tabBarInactive: "#8FA0AD",
    drawerBackground: "#FFFFFF",
    drawerActiveBackground: "#F0F3F7",
    drawerActiveText: "#1A2233",
    drawerInactiveText: "#6B7C8A",

    // Cards
    cardBackground: "#FFFFFF",
    cardTitle: "#2C3E50",
    cardDescription: "#4A5568",
    cardDate: "#8FA0AD",
    cardSubject: "#FFFFFF",

    // Search
    searchBackground: "#E8ECF1",
    searchText: "#1A2233",
    searchPlaceholder: "#8FA0AD",

    // Buttons
    primaryButton: COLORS.primary[500],
    primaryButtonText: "#FFFFFF",
    accentButton: COLORS.badges.indigo,

    // Misc
    statusBarStyle: 'dark' as const,
    overlay: 'rgba(245, 247, 250, 0.92)',

    // Settings
    settingItemBackground: "#FFFFFF",
    settingItemText: "#1A2233",
    sectionTitleColor: "#6B7C8A",
    chevronColor: "#B0BEC5",

    // Favorite card
    favoriteCardBackground: COLORS.primary[100],

    // Stats boxes
    statsBackground: COLORS.secondary[100],
    statsText: COLORS.secondary[800],
};

export type AppTheme = typeof darkTheme;