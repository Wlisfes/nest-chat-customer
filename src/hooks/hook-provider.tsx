import { computed } from 'vue'
import { useThemeVars, darkTheme, lightTheme, GlobalThemeOverrides } from 'naive-ui'
import { useConfiger } from '@/store/configer'

export function useProvider() {
    const configer = useConfiger()
    const vars = useThemeVars()
    const inverted = computed(() => {
        return configer.theme === 'dark'
    })
    const theme = computed(() => {
        return inverted.value ? darkTheme : lightTheme
    })
    const themeOverrides = computed(() => {
        return inverted.value ? darkThemeOverrides.value : lightThemeOverrides.value
    })
    const lightThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            fontWeightStrong: '600',
            primaryColor: configer.primaryColor
        }
    }))
    const darkThemeOverrides = computed<GlobalThemeOverrides>(() => ({
        common: {
            fontWeightStrong: '600'
        }
    }))

    return { theme, themeOverrides, vars, inverted, setTheme: configer.setTheme }
}
