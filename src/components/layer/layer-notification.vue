<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useNotification, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'

export default defineComponent({
    name: 'LayerNotification',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()
        const { dataSource, total, loading, fetchNotificationColumn } = useStore(useNotification)

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
                <n-element class="layer-notification n-chunk n-column n-auto n-disover">
                    <chat-header title="新对话" onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="chunk-operate n-chunk n-column n-disover">
                        <div class="column-operate n-chunk n-center n-disover">
                            <n-icon-wrapper size={46} color="#2aa886" icon-color="#ffffff" border-radius={4}>
                                <n-icon size={28} component={<Iv-NsSociety />}></n-icon>
                            </n-icon-wrapper>
                            <n-text depth={1} style={{ fontSize: '18px' }}>
                                新建社群
                            </n-text>
                        </div>
                    </div>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize" trigger="none" size={60}></n-scrollbar>
                    </div>
                </n-element>
            </n-drawer>
        )
    }
})
</script>

<style lang="scss" scoped>
.chunk-operate {
    .column-operate {
        user-select: none;
        overflow: hidden;
        padding: 14px;
        column-gap: 14px;
        background-color: var(--chat-column-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
        &:hover {
            background-color: var(--chat-column-hover-color);
        }
    }
}
</style>
