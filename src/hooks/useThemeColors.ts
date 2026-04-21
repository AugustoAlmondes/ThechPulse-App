import { useColorScheme } from 'react-native'
import { useThemeStore } from '@/src/store/useThemeStore'
import { darkTheme, lightTheme, AppTheme } from '@/src/theme/global'

/**
 * Returns the resolved theme colors based on the user's preference.
 * - 'dark'   → always dark palette
 * - 'light'  → always light palette
 * - 'system' → follows the OS color scheme
 */
export function useThemeColors(): AppTheme {
    const mode = useThemeStore((s) => s.mode)
    const systemScheme = useColorScheme() // 'light' | 'dark' | null

    if (mode === 'system') {
        return systemScheme === 'light' ? lightTheme : darkTheme
    }

    return mode === 'light' ? lightTheme : darkTheme
}
