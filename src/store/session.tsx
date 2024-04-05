import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE, APP_COMMON, getStore, setStore } from '@/utils/utils-storage'
import * as env from '@/interface/instance.resolver'
import * as http from '@/api/instance.service'

export const useSession = defineStore(APP_STORE.STORE_SESSION, () => {
    const { state, setState } = useState({
        dataSource: [] as Array<env.SchemaCession>,
        total: 0,
        loading: true
    })

    /**会话列表**/
    async function fetchSessionColumner() {
        try {
            const { data } = await http.httpSessionColumner()
            return await setState({
                loading: false,
                dataSource: data.list ?? [],
                total: data.total ?? 0
            })
        } catch (e) {
            return await setState({ loading: false, dataSource: [], total: 0 })
        }
    }

    return { state, ...toRefs(state), fetchSessionColumner }
})
