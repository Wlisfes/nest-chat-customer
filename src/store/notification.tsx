import { toRefs } from 'vue'
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

    /**通知列表**/
    async function fetchNotificationColumn() {
        try {
            const { data } = await httpNotificationColumn()
            return await setState({
                dataSource: data.list ?? [],
                total: data.total ?? 0,
                loading: false
            })
        } catch (e) {
            return await setState({ dataSource: [], total: 0, loading: false })
        }
    }

    return { state, ...toRefs(state), setState, fetchNotificationColumn }
})
