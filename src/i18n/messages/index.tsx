import { zhCN, enUS } from 'naive-ui'

export type I18nMessager = typeof messages.cn & typeof messages.en
export const messages = {
    cn: {
        ...zhCN
    },
    en: {
        ...enUS
    }
}
