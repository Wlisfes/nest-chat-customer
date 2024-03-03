import { computed, ComputedRef } from 'vue'
import { useThemeVars, darkTheme, lightTheme, GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'
import { useConfiger } from '@/store/configer'
export interface CustomThemeCommonVars extends ThemeCommonVars {
    '--chat-layout-before': string
    '--chat-layout-color': string
    '--chat-layout-context': string
    '--chat-compose-color': string
    '--chat-searcher-color': string
    '--chat-searcher-wrapper': string
    '--chat-context-color': string
}

export function useProvider() {
    const configer = useConfiger()
    const vars = useThemeVars() as ComputedRef<Omix<CustomThemeCommonVars>>
    const inverted = computed(() => {
        return configer.theme === 'dark'
    })

    const theme = computed(() => {
        return inverted.value ? darkTheme : lightTheme
    })
    const themeOverrides = computed(() => {
        return inverted.value ? darkThemeOverrides.value : lightThemeOverrides.value
    })
    const lightThemeOverrides = computed<GlobalThemeOverrides & { common: Omix<Partial<CustomThemeCommonVars>> }>(() => ({
        common: {
            fontWeightStrong: '600',
            primaryColor: configer.primaryColor,
            '--chat-layout-before': 'var(--primary-color)',
            '--chat-layout-color': '#e6e3dd',
            '--chat-layout-context': '#f0f2f5',
            '--chat-compose-color': '#f0f2f5',
            '--chat-searcher-color': '#ffffff',
            '--chat-searcher-wrapper': '#f0f2f5',
            '--chat-context-color': '#f0f2f5'
        }
    }))
    const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            fontWeightStrong: '600',
            '--chat-layout-before': '#0d1317',
            '--chat-layout-color': '#0d1317',
            '--chat-layout-context': '#232e35',
            '--chat-compose-color': '#202c33',
            '--chat-searcher-color': '#111b21',
            '--chat-searcher-wrapper': '#202c33',
            '--chat-context-color': '#232e35'
        }
    }))

    return { theme, themeOverrides, vars, inverted }
}
