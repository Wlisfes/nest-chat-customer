import { ref } from 'vue'
import { isNotEmpty } from 'class-validator'
import { zh_CN, en, Faker } from '@faker-js/faker'
import { divineWherer } from '@/utils/utils-common'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import weekday from 'dayjs/plugin/weekday'
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(weekday)

/**dayjs实例**/
export const moment = dayjs

/**虚拟数据实例**/
export const faker = new Faker({
    locale: [zh_CN, en]
})

/**时间处理hook**/
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

    /**会话、记录日期时间转换**/
    function divineDateMomentTransfor(date: Date | string, currentDate?: Date | string) {
        const currentTime = moment(currentDate)
        const targetTime = dayjs(date)
        const yesterdayTime = currentTime.subtract(1, 'day').startOf('day')
        if (currentTime.isSame(targetTime, 'day')) {
            /**今天**/
            return moment(date).format('HH:mm')
        } else if (targetTime.isSame(yesterdayTime, 'day')) {
            /**昨天**/
            return moment(date).format('昨天 HH:mm')
        } else if (currentTime.diff(targetTime, 'day') <= 7) {
            /**一周内**/
        } else {
            /**其他时间**/
            return moment(date).format('YYYY-MM-DD')
        }
    }

    return { moment, divineTimezone, divineDateTransfor, divineDateMomentTransfor }
}

/**倒计时处理**/
export function useTimine(scope: Partial<Omix<{ seconds: number }>> = {}) {
    const complete = ref<boolean>(true)
    const duration = ref<number>(scope.seconds ?? 0)
    const run = ref<NodeJS.Timeout>()

    function pause() {
        if (run.value) {
            clearInterval(run.value)
            run.value = undefined
        }
    }

    function resume() {
        run.value = setInterval(() => {
            duration.value--
            if (duration.value <= 0) {
                pause()
            }
        }, 1000)
    }

    async function setDuration(seconds: number) {
        if (duration.value > 0 || seconds <= 0) {
            return
        } else {
            duration.value = seconds
            complete.value = false
            if (seconds > 0) {
                return resume()
            } else {
                return pause()
            }
        }
    }

    return { complete, duration, setDuration }
}
