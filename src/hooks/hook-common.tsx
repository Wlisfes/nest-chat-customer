import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { zh_CN, en, Faker } from '@faker-js/faker'
import { divineWherer } from '@/utils/utils-common'
import { isNotEmpty } from 'class-validator'
dayjs.extend(timezone)
dayjs.extend(utc)

/**dayjs实例**/
export const moment = dayjs

/**虚拟数据实例**/
export const faker = new Faker({
    locale: [zh_CN, en]
})

export function useMoment() {
    /**获取当前时区**/
    function divineTimezone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    /**时区时间转换**/
    function divineDateTransfor(value: string, scope: Partial<Omix<{ current: string; target: string; format: string }>> = {}) {
        const current = divineWherer(isNotEmpty(scope.current), scope.current, 'Asia/Shanghai')
        const target = divineWherer(isNotEmpty(scope.target), scope.target, divineTimezone())
        /**转换时间缓存**/
        const dateCache = moment.tz(new Date(value.replaceAll('-', '/')), current).format()
        const date = moment.tz(new Date(dateCache), target)
        return {
            target,
            utc: date.format('Z'),
            date: date.format(scope.format ?? 'YYYY-MM-DD HH:mm:ss')
        }
    }
    return { moment, divineTimezone, divineDateTransfor }
}
