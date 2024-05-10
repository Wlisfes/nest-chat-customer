<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'

export default defineComponent({
    name: 'LayerAnswer',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { visible, loading, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()

        return () => (
            <n-drawer
                v-model:show={visible.value}
                to={element.value}
                content-style={chunkContent.value}
                width="100%"
                placement="right"
                show-mask="transparent"
                auto-focus={false}
                mask-closable={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-answer n-chunk n-column">
                    <chat-header title="新对话" onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                </n-element>
            </n-drawer>
        )
    }
})
</script>

<style lang="scss" scoped>
.layer-answer {
    height: 100%;
    overflow: hidden;
    background-color: var(--layer-common-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
