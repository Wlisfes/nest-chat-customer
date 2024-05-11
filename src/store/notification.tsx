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

    function divineJsonWherer(uid: string, node: env.SchemaNotification) {
        if (node.userId === uid) {
            return node.json[node.niveId]
        }
        return node.json[node.userId]
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

    return { state, dot, dataContact, dataCommunit, ...toRefs(state), setState, divineJsonWherer, fetchNotificationColumn }
})
