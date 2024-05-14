import { ref, toRefs, Ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE } from '@/utils/utils-storage'
import { divineHandler } from '@/utils/utils-common'
import { httpContactResolver, httpCommunitResolver, httpSessionColumn, httpSessionOneResolver } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export const useSession = defineStore(APP_STORE.STORE_SESSION, () => {
    const communit = ref() as Ref<env.SchemaCommunit>
    const contact = ref() as Ref<env.SchemaContact>
    const { state, setState } = useState({
        sid: '',
        filter: 'entire',
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

    /**会话类型详情**/
    async function fetchSessionOneResolver() {
        if (schema.value.source === env.EnumSessionSource.contact) {
            try {
                const contactId = schema.value.contactId
                return await httpContactResolver({ uid: contactId }).then(async ({ data }) => {
                    return await divineHandler(contactId === state.sid, {
                        handler: () => (contact.value = data)
                    })
                })
            } catch (e) {
                return (contact.value = undefined as never)
            }
        } else if (schema.value.source === env.EnumSessionSource.communit) {
            try {
                const communitId = schema.value.communitId
                return await httpCommunitResolver({ uid: schema.value.communitId }).then(async ({ data }) => {
                    return await divineHandler(communitId === state.sid, {
                        handler: () => (communit.value = data)
                    })
                })
            } catch (e) {
                return (communit.value = undefined as never)
            }
        }
    }

    /**会话列表**/
    async function fetchSessionColumn() {
        try {
            const { data } = await httpSessionColumn()
            return { total: data.total ?? 0, list: data.list ?? [] }
        } catch (e) {
            return { total: 0, list: [] }
        }
    }

    /**初始化会话列表**/
    async function fetchSessionInitColumn() {
        return await setState({ loading: true, dataSource: [], total: 0 }).then(async () => {
            const { list, total } = await fetchSessionColumn()
            return await setState({ dataSource: list, total: total, loading: false })
        })
    }

    /**分页加载**/
    async function fetchSessionNextColumn(closure: boolean = false) {
        return await setState({ loading: true }).then(async () => {
            const { list, total } = await fetchSessionColumn()
            return await setState({ dataSource: state.dataSource.concat(list), total: total, loading: closure })
        })
    }

    /**主动发送消息更新绑定会话**/
    async function fetchSessionPushUpdate(scope: Omix<env.SchemaMessager>) {
        const node = state.dataSource.find(item => item.sid === scope.sessionId) as env.SchemaSession
        return await divineHandler(Boolean(node), {
            handler: async () => {
                node.message.createTime = scope.createTime
                node.message.source = scope.source
                node.message.status = scope.status
                node.message.text = scope.text
                node.message.userId = scope.userId
                return node
            }
        })
    }

    /**修改单条会话未读数量**/
    async function fetchSessionUnreadUpdate(sessionId: string, sid: string) {
        const node = state.dataSource.find(item => item.sid === sessionId) as env.SchemaSession
        return await divineHandler(Boolean(node), {
            handler: async () => {
                return (node.unread = node.unread.filter(item => item.sid !== sid))
            }
        })
    }

    /**主动发送消息更新绑定会话SID**/
    async function fetchSessionPushSidUpdate(scope: Omix<{ sessionId: string; sid: string }>) {
        const node = state.dataSource.find(item => item.sid === scope.sessionId) as env.SchemaSession
        return await divineHandler(Boolean(node), {
            handler: async () => {
                return (node.message.sid = scope.sid)
            }
        })
    }

    /**socket新会话消息推送会话处理**/
    async function fetchNewServerMessager(scope: Omix<env.SchemaMessager>) {
        const node = state.dataSource.find(item => item.sid === scope.sessionId) as env.SchemaSession
        return await divineHandler(!Boolean(node), {
            handler: async () => {
                const { data } = await httpSessionOneResolver({ sid: scope.sessionId })
                return await setState({
                    dataSource: [data, ...state.dataSource.filter(item => item.sid !== scope.sessionId)]
                })
            }
        })
    }

    /**消息已读、递减未读数**/
    async function fetchSessionReadUpdate(scope: Omix<env.BodySocketChangeMessager>) {
        const node = state.dataSource.find(item => item.sid === scope.sessionId) as env.SchemaSession
        return await divineHandler(Boolean(node), {
            handler: async () => {
                const read = node.unread.some(item => item.sid === scope.sid)
                if (read) {
                    node.unread = node.unread.filter(item => item.sid !== scope.sid)
                }
                return node
            }
        })
    }

    return {
        state,
        communit,
        contact,
        next,
        schema,
        ...toRefs(state),
        setState,
        fetchSessionOneResolver,
        fetchSessionInitColumn,
        fetchSessionNextColumn,
        fetchNewServerMessager,
        fetchSessionPushUpdate,
        fetchSessionPushSidUpdate,
        fetchSessionReadUpdate,
        fetchSessionUnreadUpdate
    }
})
