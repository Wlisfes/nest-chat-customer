import { toRefs, ref, Ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ScrollbarInst } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { APP_STORE, APP_COMMON, getStore, setStore } from '@/utils/utils-storage'
import * as env from '@/interface/instance.resolver'
import * as api from '@/api/instance.service'
export const element = ref<HTMLElement>() as Ref<HTMLElement>
export const instance = ref<ScrollbarInst>() as Ref<ScrollbarInst>

export const useMessenger = defineStore(APP_STORE.STORE_MESSANGER, () => {
    const { state, setState } = useState({
        sessionId: '',
        limit: 20,
        dataSource: [] as Array<env.SchemaMessager>,
        total: 0,
        loading: true,
        distance: 0
    })
    /**是否存在更多数据**/
    const next = computed(() => state.total > state.dataSource.length)

    /**会话消息列表**/
    async function fetchSessionColumnMessager() {
        try {
            const { data } = await api.httpSessionColumnMessager({
                sessionId: state.sessionId,
                offset: state.dataSource.length,
                limit: state.limit
            })
            return { total: data.total ?? 0, list: data.list ?? [] }
        } catch (e) {
            return { total: 0, list: [] }
        }
    }

    /**初始化页面数据**/
    async function fetchSessionColumnInitMessager(sid: string) {
        await setState({ loading: true, sessionId: sid, dataSource: [], total: 0 })
        return await fetchSessionColumnMessager().then(async ({ total, list }) => {
            return await setState({
                dataSource: list,
                total: total,
                loading: false
            })
        })
    }

    /**分页加载**/
    async function fetchSessionColumnNextMessager(closure: boolean = false) {
        await setState({ loading: true })
        return await fetchSessionColumnMessager().then(async ({ total, list }) => {
            return await setState({
                dataSource: state.dataSource.concat(list),
                total: total,
                loading: closure
            })
        })
    }

    return { state, next, ...toRefs(state), setState, fetchSessionColumnInitMessager, fetchSessionColumnNextMessager }
})
