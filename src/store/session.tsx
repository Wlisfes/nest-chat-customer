import { toRefs, computed } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE } from '@/utils/utils-storage'
import { divineHandler } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'
import * as api from '@/api/instance.service'

export const useSession = defineStore(APP_STORE.STORE_SESSION, () => {
    const { state, setState } = useState({
        sid: '',
        dataSource: [] as Array<env.SchemaSession>,
        total: 0,
        loading: true
    })
    /**是否存在更多数据**/
    const next = computed<boolean>(() => state.total > state.dataSource.length)
    /**当前选中会话**/
    const schema = computed<env.SchemaSession>(() => {
        return state.dataSource.find(item => item.sid === state.sid) as env.SchemaSession
    })

    /**会话列表**/
    async function fetchSessionColumn() {
        try {
            const { data } = await api.httpSessionColumn()
            return { total: data.total ?? 0, list: data.list ?? [] }
        } catch (e) {
            return { total: 0, list: [] }
        }
    }

    /**初始化会话列表**/
    async function fetchSessionInitColumn() {
        await setState({ loading: true, dataSource: [], total: 0 })
        return await fetchSessionColumn().then(async ({ total, list }) => {
            return await setState({
                dataSource: list,
                total: total,
                loading: false
            })
        })
    }

    /**分页加载**/
    async function fetchSessionNextColumn(closure: boolean = false) {
        await setState({ loading: true })
        return await fetchSessionColumn().then(async ({ total, list }) => {
            return await setState({
                dataSource: state.dataSource.concat(list),
                total: total,
                loading: closure
            })
        })
    }

    /**socket消息推送会话处理**/
    async function fetchSessionServerMessager(scope: Omix<env.SchemaMessager>) {
        const node = state.dataSource.find(item => item.sid === scope.sessionId) as env.SchemaSession
        /**会话存在**/
        await divineHandler(Boolean(node), async () => {
            node.message.createTime = scope.createTime
            node.message.sid = scope.sid
            node.message.source = scope.source
            node.message.status = scope.status
            node.message.text = scope.text
            node.message.userId = scope.userId
            node.unread = node.unread.concat([
                { sessionId: scope.sessionId, sid: scope.sid, source: scope.source, status: scope.status, userId: scope.userId }
            ] as never)
        })
        /**会话不存在**/
        await divineHandler(!Boolean(node), async () => {})
    }

    return { state, next, schema, ...toRefs(state), setState, fetchSessionInitColumn, fetchSessionNextColumn, fetchSessionServerMessager }
})
