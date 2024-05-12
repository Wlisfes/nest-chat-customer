import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE } from '@/utils/utils-storage'
import { httpCommunitColumn } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export const useCommunit = defineStore(APP_STORE.STORE_COMMUNIT, () => {
    const { state, setState } = useState({
        dataCommunit: [] as Array<env.SchemaCommunit>,
        dataSource: [] as Array<env.SchemaCommunit>,
        total: 0,
        loading: true
    })

    /**社群列表**/
    async function fetchCommunitColumn() {
        try {
            const { data } = await httpCommunitColumn()
            return await setState({ dataSource: data.list ?? [], total: data.total ?? 0, loading: false })
        } catch (e) {
            return await setState({ dataSource: [], total: 0, loading: false })
        }
    }

    return { state, ...toRefs(state), setState, fetchCommunitColumn }
})
