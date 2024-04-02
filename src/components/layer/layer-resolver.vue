<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'LayerResolver',
    emits: ['close', 'submit'],
    props: {
        element: { type: Object as PropType<HTMLElement> },
        width: { type: Number, default: 420 }
    },
    setup(props, { emit }) {
        const { state, setState } = useState({ visible: false })

        onMounted(() => {
            return setState({ visible: true })
        })

        return () => (
            <n-drawer
                v-model:show={state.visible}
                width={props.width}
                to={props.element ?? document.body}
                content-style={{ overflow: 'hidden', userSelect: 'none' }}
                placement="left"
                auto-focus={false}
                mask-closable={false}
                show-mask={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="n-chunk n-column" style={{ height: '100%', overflow: 'hidden' }}>
                    <chat-header title="个人信息" onClose={(evt: Event) => setState({ visible: false })}></chat-header>

                    <chat-avatar></chat-avatar>
                </n-element>
            </n-drawer>
        )
    }
})
</script>
