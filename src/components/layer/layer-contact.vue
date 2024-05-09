<script lang="tsx">
import { defineComponent, ref, Ref, onMounted, nextTick } from 'vue'
import { useUser, useNotification, useStore } from '@/store'
import { useModal } from '@/hooks/hook-layer'
import { useState } from '@/hooks/hook-state'
import { divineRender, divineNotice } from '@/utils/utils-component'
import { divineTransfer } from '@/utils/utils-transfer'
import { divineWherer } from '@/utils/utils-common'
import { httpUserCurrentResolver, httpNotificationUpdate } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'LayerContact',
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const { uid } = useStore(useUser)
        const { fetchNotificationColumn } = useStore(useNotification)
        const { visible, loading, chunkContent, fetchState } = useModal({ width: 500 })

        return () => (
            <n-modal
                v-model:show={visible.value}
                auto-focus={false}
                mask-closable={false}
                show-icon={false}
                preset="dialog"
                style={chunkContent.value}
                onAfterEnter={(el: HTMLElement) => divineTransfer(el)}
                on-after-leave={() => emit('close')}
                title={divineRender(<done-title content="新增联系人"></done-title>)}
            ></n-modal>
        )
    }
})
</script>
