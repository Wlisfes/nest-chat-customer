import { toRefs, ref, Ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ScrollbarInst } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { useWebSocket } from '@/hooks/hook-websocket'
import { APP_STORE } from '@/utils/utils-storage'
import { divineHandler, divineParameter } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'
import * as api from '@/api/instance.service'

/**右侧滚动消息记录容器**/
export const element = ref<HTMLElement>() as Ref<HTMLElement>
/**右侧滚动容器实例**/
export const instance = ref<ScrollbarInst>() as Ref<ScrollbarInst>

export const useMessenger = defineStore(APP_STORE.STORE_MESSANGER, () => {
    const { socket, connected, fetchSocketSessionColumnMessager } = useWebSocket()
    const { state, setState } = useState({
        sid: '',
        limit: 30,
        dataSource: [] as Array<env.SchemaMessager>,
        total: 0,
        loading: true,
        distance: 0
    })
    /**是否存在更多数据**/
    const next = computed(() => state.total > state.dataSource.length)

    /**会话消息列表**/
    async function fetchSessionColumnMessager(limit?: number) {
        try {
            if (connected.value) {
                const { data } = await fetchSocketSessionColumnMessager(socket.value, {
                    sessionId: state.sid,
                    offset: state.dataSource.length,
                    limit: limit ?? state.limit
                })
                return { total: data.total ?? 0, list: data.list ?? [] }
            } else {
                const { data } = await api.httpSessionColumnMessager({
                    sessionId: state.sid,
                    offset: state.dataSource.length,
                    limit: limit ?? state.limit
                })
                return { total: data.total ?? 0, list: data.list ?? [] }
            }
        } catch (e) {
            return { total: 0, list: [] }
        }
    }

    /**初始化页面数据**/
    async function fetchSessionColumnInitMessager(sid: string, limit?: number): Promise<{ compared: boolean }> {
        return await setState({ loading: true, sid: sid, dataSource: [], total: 0 }).then(async () => {
            const { list, total } = await fetchSessionColumnMessager(limit)
            return await divineHandler(state.sid === sid, {
                handler: async () => {
                    await setState({ dataSource: list, total: total, loading: false })
                    return await divineParameter({ compared: true })
                },
                failure: async () => {
                    return await divineParameter({ compared: false })
                }
            })
        })
    }

    /**分页加载**/
    async function fetchSessionColumnNextMessager(closure: boolean = false) {
        const sid = state.sid
        return await setState({ loading: true }).then(async () => {
            const { list, total } = await fetchSessionColumnMessager()
            return await divineHandler(state.sid === sid, {
                handler: async () => {
                    return await setState({
                        dataSource: state.dataSource.concat(list),
                        total: total,
                        loading: closure
                    })
                }
            })
        })
    }

    /**推入发送数据**/
    async function fetchSessionPushMessager(compose: Partial<env.SchemaMessager>) {
        return await setState({
            dataSource: [compose].concat(state.dataSource) as Array<env.SchemaMessager>
        })
    }

    /**socket消息推送会话处理**/
    async function fetchSocketServerMessager(scope: Omix<env.SchemaMessager>) {
        return await divineHandler(state.sid === scope.sessionId, {
            handler: async () => {
                return await fetchSessionPushMessager(scope)
            }
        })
    }

    return {
        state,
        next,
        ...toRefs(state),
        setState,
        fetchSessionColumnInitMessager,
        fetchSessionColumnNextMessager,
        fetchSessionPushMessager,
        fetchSocketServerMessager
    }
})
