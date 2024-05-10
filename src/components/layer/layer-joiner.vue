<script lang="tsx">
import { defineComponent, ref, Ref, onMounted, PropType } from 'vue'
import { useUser, useNotification, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { useState } from '@/hooks/hook-state'
import { Observer } from '@/utils/utils-observer'
import { divineWherer } from '@/utils/utils-common'
import { divineRender, divineNotice } from '@/utils/utils-component'
import { httpUserCurrentResolver, httpNotificationUpdate } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'LayerJoiner',
    emits: ['close', 'submit'],
    props: {
        title: { type: String, default: '新增联系人' },
        source: { type: String as PropType<env.EnumNotificationSource>, required: true },
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { uid } = useStore(useUser)
        const { fetchNotificationColumn } = useStore(useNotification)
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        return () => (
            <n-drawer
                v-model:show={visible.value}
                width="100%"
                to={element.value}
                content-style={chunkContent.value}
                placement="right"
                auto-focus={false}
                mask-closable={false}
                show-mask={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-joiner n-chunk n-column n-auto n-disover">
                    <chat-header title={props.title} onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="n-chunk n-column" style={{ padding: '0px 14px 14px', rowGap: '8px' }}>
                        <chat-searcher auto-focus></chat-searcher>
                    </div>
                </n-element>
            </n-drawer>
        )
    }
})
</script>
