import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { isNotEmpty, divineWherer } from '@/utils/utils-common'

dayjs.extend(timezone)
dayjs.extend(utc)

/**dayjs实例**/
export const moment = dayjs

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
