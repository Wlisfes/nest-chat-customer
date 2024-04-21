import { toRefs, ref, Ref, VNodeRef } from 'vue'
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
        next: false,
        loading: true
    })

    /**会话消息列表**/
    async function fetchSessionColumnMessager() {
        return await setState({ loading: true }).then(async () => {
            try {
                const sessionId = state.sessionId
                const { data } = await api.httpSessionColumnMessager({
                    sessionId: sessionId,
                    offset: state.dataSource.length,
                    limit: state.limit
                })
                if (sessionId === state.sessionId) {
                    return await setState({
                        loading: false,
                        next: data.total > data.list.length,
                        dataSource: data.list,
                        total: data.total
                    })
                }
                return state
            } catch (e) {
                return await setState({ loading: false, dataSource: [], total: 0, next: false })
            }
        })
    }

    return { state, ...toRefs(state), setState, fetchSessionColumnMessager }
})
