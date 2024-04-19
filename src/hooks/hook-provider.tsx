import { computed, ComputedRef } from 'vue'
import { useThemeVars, darkTheme, lightTheme, GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'
import { useConfiger } from '@/store/configer'
export interface CustomThemeCommonVars extends Omix<ThemeCommonVars> {
    '--auth-layout-color': string
    '--chat-layout-loadiner': string
    '--chat-layout-before': string
    '--chat-carte-color': string
    '--chat-compose-color': string
    '--chat-searcher-color': string
    '--chat-searcher-wrapper': string
    '--chat-chat-sider': string
    '--chat-border-color': string
    '--chat-connect-color': string
    '--chat-comment-color': string
    '--chat-messenger-color': string
    '--chat-context-color': string

    '--chat-layout-color': string
    '--chat-layout-context': string
    '--chat-header-color': string
    '--chat-header-text-color': string
    '--layer-common-color': string
    '--layer-resolver-form-item': string
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
            '--auth-layout-color': '#ffffff',
            '--chat-layout-loadiner': '#f0f2f5',
            '--chat-layout-before': '#0000',
            '--chat-carte-color': '#f0f2f5',
            '--chat-compose-color': '#ffffff',
            '--chat-searcher-color': '#ffffff',
            '--chat-searcher-wrapper': '#f0f2f5',
            '--chat-chat-sider': '#ffffff',
            '--chat-border-color': 'rgba(134, 150, 160, 0.15)',
            '--chat-connect-color': '#f0f2f5',
            '--chat-comment-color': '#f0f2f5',
            '--chat-messenger-color': '#efeae2',
            '--chat-context-color': '#f0f2f5'

            // '--chat-layout-color': '#e6e3dd',
            // '--chat-layout-context': '#f0f2f5',
            // '--chat-carte-color': '#f0f2f5',
            // '--chat-header-color': '#008069',
            // '--chat-header-text-color': '#ffffff',
            // '--layer-common-color': '#f0f2f5',
            // '--layer-resolver-form-item': '#ffffff'
        }
    }))
    const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            fontWeightStrong: '600',
            '--auth-layout-color': '#0d1317',
            '--chat-layout-loadiner': '#202c33',
            '--chat-layout-before': '#000000b3',
            '--chat-carte-color': '#202c33',
            '--chat-compose-color': '#111b21',
            '--chat-searcher-color': '#111b21',
            '--chat-searcher-wrapper': '#202c33',
            '--chat-chat-sider': '#111b21',
            '--chat-border-color': 'rgba(134, 150, 160, 0.15)',
            '--chat-connect-color': '#202c33',
            '--chat-comment-color': '#202c33',
            '--chat-messenger-color': '#0b141a',
            '--chat-context-color': '#0b141a'

            // '--chat-layout-color': '#0d1317',
            // '--chat-layout-context': '#232e35',
            // '--chat-carte-color': '#111b21',
            // '--chat-header-color': '#202c33',
            // '--chat-header-text-color': 'var(--text-color-2)',
            // '--layer-common-color': '#111b21',
            // '--layer-resolver-form-item': '#0d1317'
        }
    }))

    return { theme, themeOverrides, vars, inverted }
}
