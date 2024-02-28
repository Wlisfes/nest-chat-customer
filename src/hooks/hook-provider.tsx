import { computed, ComputedRef } from 'vue'
import { useThemeVars, darkTheme, lightTheme, GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'
import { useConfiger } from '@/store/configer'
export interface CustomThemeCommonVars extends ThemeCommonVars {}

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
            primaryColor: configer.primaryColor
            // layoutBackground: 'linear-gradient(var(--primary-color) 200px, #e3e3de 0)'
        }
    }))
    const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            fontWeightStrong: '600'
        }
    }))

    return { theme, themeOverrides, vars, inverted }
}
