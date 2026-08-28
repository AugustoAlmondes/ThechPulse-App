import { useColorScheme } from 'react-native'
import { useThemeStore } from '@/src/store/useThemeStore'
import { lightTheme, darkTheme, AppTheme } from '@/src/theme/global'

export function useThemeColors(): AppTheme {
    const mode = useThemeStore((s) => s.mode)
    const systemScheme = useColorScheme()

    if (mode === 'system') {
        return systemScheme === 'light' ? lightTheme : darkTheme
    }

    return mode === 'light' ? lightTheme : darkTheme
}