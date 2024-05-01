<script lang="tsx">
import { defineComponent, computed, onMounted, PropType } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useDrawer } from '@/hooks/hook-layer'
import { divineNotice } from '@/utils/utils-component'
import { Observer } from '@/utils/utils-observer'
import * as env from '@/interface/instance.resolver'
import * as api from '@/api/instance.service'

export default defineComponent({
    name: 'LayerRespon',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
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
                to={element.value ?? document.body}
                content-style={chunkContent.value}
                placement="right"
                auto-focus={false}
                mask-closable={false}
                show-mask={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-respon n-chunk n-column n-auto n-disover">
                    <chat-header title="对话" onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize" trigger="none" size={60}></n-scrollbar>
                    </div>
                </n-element>
            </n-drawer>
        )
    }
})
</script>
