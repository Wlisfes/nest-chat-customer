import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { APP_STORE } from '@/utils/utils-storage'
import { httpContactColumn } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export const useContact = defineStore(APP_STORE.STORE_CONTACT, () => {
    const { state, setState } = useState({
        dataSource: [] as Array<env.SchemaContact>,
        total: 0,
        loading: true
    })

    /**好友列表**/
    async function fetchContactColumn() {
        try {
            const { data } = await httpContactColumn()
            return await setState({
                dataSource: data.list ?? [],
                total: data.total ?? 0,
                loading: false
            })
        } catch (e) {
            return await setState({ dataSource: [], total: 0, loading: false })
        }
    }

    return { state, ...toRefs(state), setState, fetchContactColumn }
})
