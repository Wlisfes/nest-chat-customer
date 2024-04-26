<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useUser } from '@/store'
import { useFormCustomize } from '@/hooks/hook-customize'

export default defineComponent({
    name: 'LayerDynamic',
    emits: ['close', 'submit'],
    props: {
        element: { type: Object as PropType<HTMLElement> },
        width: { type: [Number, String], default: 420 }
    },
    setup(props, { emit }) {
        const user = useUser()

        const { form, visible, setVisible } = useFormCustomize({
            form: {
                nickname: user.nickname,
                comment: user.comment
            }
        })

        onMounted(() => {
            return setVisible(true)
        })

        return () => (
            <n-drawer
                v-model:show={visible.value}
                width={props.width}
                to={props.element ?? document.body}
                content-style={{ overflow: 'hidden', userSelect: 'none' }}
                placement="left"
                auto-focus={false}
                mask-closable={false}
                show-mask={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-dynamic n-chunk n-column">
                    <chat-header title="动态" onClose={(evt: Event) => setVisible(false)}></chat-header>
                    <chat-avatar url={user.avatar} style={{ padding: '32px' }}></chat-avatar>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <n-scrollbar class="is-customize" trigger="none" size={60}></n-scrollbar>
                    </div>
                </n-element>
            </n-drawer>
        )
    }
})
</script>

<style lang="scss" scoped>
.layer-dynamic {
    height: 100%;
    overflow: hidden;
    background-color: var(--layer-common-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
