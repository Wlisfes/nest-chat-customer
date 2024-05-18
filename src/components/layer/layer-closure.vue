<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useModal } from '@/hooks/hook-layer'

export default defineComponent({
    name: 'LayerClosure',
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const { visible, chunkContent, chunkNegative, chunkPositive, fetchState } = useModal({ width: 500 })

        onMounted(async () => {
            await fetchState({ visible: true })
        })

        async function onClosure() {
            await fetchState({ visible: false })
            return await window.close()
        }

        return () => (
            <n-modal
                class="is-customize close-title"
                preset="dialog"
                v-model:show={visible.value}
                close-on-esc={false}
                auto-focus={false}
                mask-closable={false}
                show-icon={false}
                closable={false}
                style={chunkContent.value}
                positive-text="使用此窗口"
                negative-text="关闭此窗口"
                positive-button-props={{ ...chunkPositive.value, type: 'success' }}
                negative-button-props={{ ...chunkNegative.value, type: 'warning' }}
                on-after-leave={() => emit('close', { done: fetchState })}
                on-positive-click={() => emit('submit', { done: fetchState })}
                on-negative-click={onClosure}
            >
                <n-element class="layer-closure n-chunk n-column n-disover" style={{ paddingBottom: '40px' }}>
                    <n-text depth={3} style={{ fontSize: '16px' }}>
                        当前账户已在另一个窗口中打开，点击 “使用此窗口” 即可在当前窗口重新连接。
                    </n-text>
                </n-element>
            </n-modal>
        )
    }
})
</script>
