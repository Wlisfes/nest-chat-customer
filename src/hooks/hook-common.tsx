import { toRefs } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { isNotEmpty } from 'class-validator'
import { zh_CN, en, Faker } from '@faker-js/faker'
import { useState } from '@/hooks/hook-state'
import { divineWherer, divineHandler } from '@/utils/utils-common'
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
export function useTimine() {
    const { state, setState } = useState({ initialize: false, loading: false, duration: 0 })
    const { resume, pause, isActive } = useIntervalFn(
        async function handler() {
            await setState({ duration: state.duration - 1 })
            return await divineHandler(state.duration <= 0, {
                handler: pause
            })
        },
        1000,
        { immediate: state.duration > 0 }
    )

    async function setDuration(seconds: number) {
        await setState({ duration: seconds, initialize: true })
        return await divineHandler(seconds > 0, {
            handler: resume,
            failure: pause
        })
    }

    return { state, execute: isActive, ...toRefs(state), resume, pause, setState, setDuration }
}
