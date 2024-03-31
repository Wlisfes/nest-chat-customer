import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { dateZhCN, dateEnUS } from 'naive-ui'
import { locale, messages, setI18nLocale, setupNotice, Path, I18nMessager } from '@/i18n'
export type I18nContext = Path<I18nMessager>
export type I18nNode<T> = Omix<T & { label: string; value: number | string }>
export type I18nScopet<T = any> = Omix<{ defaultValue: T; labelField: string; valueField: string }>

export function useLocale() {
    const ctx = useI18n()
    const DateLocale = computed(() => (locale.value === 'cn' ? dateZhCN : dateEnUS))
    const Locale = computed(() => (locale.value === 'cn' ? messages.cn : messages.en))

    //@ts-ignore、重载t方法
    function t(path: I18nContext, props: Omix = {}): string {
        return ctx.t(path, props)
    }

    //@ts-ignore、异步重载t方法
    function at(path: I18nContext, props: Omix = {}): () => string {
        return () => ctx.t(path, props)
    }

    //@ts-ignore、载tm方法
    function tm<T>(path: I18nContext): Array<Omix<I18nNode<T>>> {
        return ctx.tm(path)
    }

    //@ts-ignore、异步载tm方法
    function atm<T>(path: I18nContext): () => Array<Omix<I18nNode<T>>> {
        return () => ctx.tm(path)
    }

    //@ts-ignore、列表查找
    function atmNoder<T>(column: Array<T>, value: any, scope: Partial<Omix<I18nNode<T>>> = {}): Omix<I18nNode<T>> {
        const key = scope.valueField ?? 'value'
        const node = column.find(item => (item as Omix<I18nNode<T>>)[key] == value) ?? scope.defaultValue
        return node as Omix<I18nNode<T>>
    }

    //@ts-ignore、列表查找转换
    function atmColumnr<T>(column: Array<T>, value: any, scope: Partial<Omix<I18nNode<T>>> = {}): string {
        const key = scope.labelField ?? 'label'
        const node = atmNoder(column, value, scope)
        return (node && key ? node[key] ?? '' : node.label ?? '') as string
    }

    //@ts-ignore、文字转换
    function atmTransformr(data: { cn: number | string; en: number | string }): string | number {
        return data[locale.value] ?? ''
    }

    return {
        ctx,
        locale,
        Locale,
        DateLocale,
        t,
        at,
        tm,
        atm,
        atmNoder,
        atmColumnr,
        atmTransformr,
        setupNotice,
        setI18nLocale
    }
}
