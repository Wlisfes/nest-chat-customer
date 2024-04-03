<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useUser } from '@/store/instance.store'
import { useState } from '@/hooks/hook-state'
import { useFormCustomize } from '@/hooks/hook-customize'
import { stop, divineHandler, divineDelay } from '@/utils/utils-common'

export default defineComponent({
    name: 'LayerSociety',
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
                <n-element class="layer-society n-chunk n-column">
                    <chat-header title="新建社群" onClose={(evt: Event) => setVisible(false)}></chat-header>
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
.layer-society {
    height: 100%;
    overflow: hidden;
    background-color: var(--layer-common-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
