import { computed, ComputedRef } from 'vue'
import { useThemeVars, darkTheme, lightTheme, GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'
import { useConfiger } from '@/store/configer'
import { divineHandler } from '@/utils/utils-common'

export interface CustomThemeCommonVars extends Omix<ThemeCommonVars> {
    '--auth-layout-color': string
    '--chat-layout-loadiner': string
    '--chat-layout-before': string
    '--chat-layer-color': string
    '--chat-carte-color': string
    '--chat-carte-popover': string
    '--chat-compose-color': string
    '--chat-searcher-color': string
    '--chat-searcher-wrapper': string
    '--chat-sider-color': string
    '--chat-border-color': string
    '--chat-connect-color': string
    '--chat-comment-color': string
    '--chat-messenger-color': string
    '--chat-messenger-opacity': number
    '--chat-context-color': string
    '--chat-column-color': string
    '--chat-column-hover-color': string
    '--custom-element-current-color': string
    '--custom-element-other-color': string
    '--custom-document-current-color': string
    '--custom-document-other-color': string

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
            '--chat-layer-color': '#ffffff',
            '--chat-carte-color': '#f0f2f5',
            '--chat-carte-popover': '#ffffff',
            '--chat-compose-color': '#ffffff',
            '--chat-searcher-color': '#ffffff',
            '--chat-searcher-wrapper': '#f0f2f5',
            '--chat-sider-color': '#ffffff',
            '--chat-border-color': 'rgba(134, 150, 160, 0.15)',
            '--chat-connect-color': '#ffffff',
            '--chat-comment-color': '#ffffff',
            '--chat-messenger-color': '#efeae2',
            '--chat-messenger-opacity': 0.6,
            '--chat-context-color': '#f0f2f5',
            '--chat-column-color': '#ffffff',
            '--chat-column-hover-color': '#f0f2f5',
            '--custom-element-current-color': '#d9fdd3',
            '--custom-element-other-color': '#ffffff',
            '--custom-document-current-color': '#d1f4cc',
            '--custom-document-other-color': '#f5f6f6'

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
            '--chat-layer-color': '#111b21',
            '--chat-carte-color': '#202c33',
            '--chat-carte-popover': '#202c33',
            '--chat-compose-color': '#111b21',
            '--chat-searcher-color': '#111b21',
            '--chat-searcher-wrapper': '#202c33',
            '--chat-sider-color': '#111b21',
            '--chat-border-color': 'rgba(134, 150, 160, 0.15)',
            '--chat-connect-color': '#202c33',
            '--chat-comment-color': '#202c33',
            '--chat-messenger-color': '#0b141a',
            '--chat-messenger-opacity': 0.1,
            '--chat-context-color': '#0b141a',
            '--chat-column-color': '#111b21',
            '--chat-column-hover-color': '#202c33',
            '--custom-element-current-color': '#005c4b',
            '--custom-element-other-color': '#212c33',
            '--custom-document-current-color': '#025144',
            '--custom-document-other-color': '#1d282f'

            // '--chat-layout-color': '#0d1317',
            // '--chat-layout-context': '#232e35',
            // '--chat-carte-color': '#111b21',
            // '--chat-header-color': '#202c33',
            // '--chat-header-text-color': 'var(--text-color-2)',
            // '--layer-common-color': '#111b21',
            // '--layer-resolver-form-item': '#0d1317'
        }
    }))

    /**切换主题模式**/
    async function fetchThemeUpdate() {
        return await divineHandler(inverted.value, {
            handler: () => configer.setTheme('light'),
            failure: () => configer.setTheme('dark')
        })
    }

    return { theme, themeOverrides, vars, inverted, fetchThemeUpdate }
}
