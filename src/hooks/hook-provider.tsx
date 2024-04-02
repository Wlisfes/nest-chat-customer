import { computed, ComputedRef } from 'vue'
import { useThemeVars, darkTheme, lightTheme, GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'
import { useConfiger } from '@/store/configer'
export interface CustomThemeCommonVars extends Omix<ThemeCommonVars> {
    '--chat-layout-before': string
    '--chat-layout-color': string
    '--chat-layout-context': string
    '--chat-border-color': string
    '--chat-compose-color': string
    '--chat-searcher-color': string
    '--chat-searcher-wrapper': string
    '--chat-context-color': string
    '--chat-messenger-color': string
    '--chat-comment-color': string
    '--chat-connect-color': string
    '--chat-header-color': string
    '--chat-header-text-color': string
    '--auth-layout-color': string
}

export function useProvider() {
    const configer = useConfiger()
    const vars = useThemeVars() as ComputedRef<CustomThemeCommonVars>
    const inverted = computed(() => {
        return configer.theme === 'dark'
    })

    const theme = computed(() => {
        return inverted.value ? darkTheme : lightTheme
    })
    const themeOverrides = computed(() => {
        return inverted.value ? darkThemeOverrides.value : lightThemeOverrides.value
    })
    const lightThemeOverrides = computed<GlobalThemeOverrides & { common: Partial<CustomThemeCommonVars> }>(() => ({
        common: {
            fontWeightStrong: '600',
            primaryColor: configer.primaryColor,
            '--chat-layout-before': 'var(--primary-color)',
            '--chat-layout-color': '#e6e3dd',
            '--chat-layout-context': '#f0f2f5',
            '--chat-border-color': 'rgba(134, 150, 160, 0.15)',
            '--chat-compose-color': '#f0f2f5',
            '--chat-searcher-color': '#ffffff',
            '--chat-searcher-wrapper': '#f0f2f5',
            '--chat-context-color': '#f0f2f5',
            '--chat-messenger-color': '#efeae2',
            '--chat-comment-color': '#f0f2f5',
            '--chat-connect-color': '#f0f2f5',
            '--chat-header-color': '#008069',
            '--chat-header-text-color': '#ffffff',
            '--auth-layout-color': '#ffffff'
        }
    }))
    const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            fontWeightStrong: '600',
            '--chat-layout-before': '#0d1317',
            '--chat-layout-color': '#0d1317',
            '--chat-layout-context': '#232e35',
            '--chat-border-color': 'rgba(134, 150, 160, 0.15)',
            '--chat-compose-color': '#202c33',
            '--chat-searcher-color': '#111b21',
            '--chat-searcher-wrapper': '#202c33',
            '--chat-context-color': '#0b141a',
            '--chat-messenger-color': '#0b141a',
            '--chat-comment-color': '#202c33',
            '--chat-connect-color': '#202c33',
            '--chat-header-color': '#202c33',
            '--chat-header-text-color': 'var(--text-color-2)',
            '--auth-layout-color': '#0d1317'
        }
    }))

    return { theme, themeOverrides, vars, inverted }
}
