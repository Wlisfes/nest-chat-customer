import { toRefs, computed } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE } from '@/utils/utils-storage'
import { httpNotificationColumn } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export const useNotification = defineStore(APP_STORE.STORE_NOTIFICATION, () => {
    const { state, setState } = useState({
        dataSource: [] as Array<env.SchemaNotification>,
        total: 0,
        loading: true
    })
    /**社群通知**/
    const dataContact = computed(() => {
        return state.dataSource.filter(item => item.source === env.EnumNotificationSource.contact)
    })
    /**联系人通知**/
    const dataCommunit = computed(() => {
        return state.dataSource.filter(item => item.source === env.EnumNotificationSource.communit)
    })
    const dot = computed(() => {
        return {
            contact: dataContact.value.some(item => item.status === env.EnumNotificationStatus.waitze),
            communit: dataCommunit.value.some(item => item.status === env.EnumNotificationStatus.waitze)
        }
    })

    /**通知组件申请用户**/
    function divineJsonUserId(uid: string, node: env.SchemaNotification) {
        if (node.source === env.EnumNotificationSource.contact) {
            return node.userId === uid ? node.niveId : node.userId
        } else {
            return node.communit.ownId === uid ? node.userId : undefined
        }
    }

    /**通知组件备注**/
    function divineJsonComment(uid: string, node: env.SchemaNotification) {
        if (node.source === env.EnumNotificationSource.contact) {
            if (node.userId === uid) {
                return node.json[node.niveId] ? node.json[node.niveId].comment : node.json[node.userId].comment
            } else {
                return node.json[node.userId] ? node.json[node.userId].comment : node.json[node.niveId].comment
            }
        } else {
            if (node.userId === uid) {
                return node.json[node.communit.ownId] ? node.json[node.communit.ownId].comment : node.json[node.userId].comment
            } else {
                return node.json[node.userId] ? node.json[node.userId].comment : node.json[node.communit.ownId].comment
            }
        }
    }

    /**通知列表**/
    async function fetchNotificationColumn() {
        try {
            const { data } = await httpNotificationColumn()
            return await setState({ dataSource: data.list ?? [], total: data.total ?? 0, loading: false })
        } catch (e) {
            return await setState({ dataSource: [], total: 0, loading: false })
        }
    }

    /**socket推送通知消息处理**/
    async function fetchSocketServerNotification(node: env.SchemaNotification) {
        return await setState({
            dataSource: [node, ...state.dataSource.filter(item => item.uid !== node.uid)]
        })
    }

    return {
        state,
        dot,
        dataContact,
        dataCommunit,
        ...toRefs(state),
        setState,
        divineJsonComment,
        divineJsonUserId,
        fetchNotificationColumn,
        fetchSocketServerNotification
    }
})
