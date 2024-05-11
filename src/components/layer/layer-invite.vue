<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useNotification, useStore } from '@/store'
import { useModal } from '@/hooks/hook-layer'
import { divineHandler } from '@/utils/utils-common'
import { divineRender } from '@/utils/utils-component'
import { divineTransfer } from '@/utils/utils-transfer'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'LayerInvite',
    emits: ['close', 'submit'],
    props: {
        userId: { type: String },
        communitId: { type: String },
        title: { type: String, required: true },
        source: { type: String as PropType<env.EnumNotificationSource>, required: true }
    },
    setup(props, { emit }) {
        const { fetchNotificationColumn } = useStore(useNotification)
        const { visible, chunkContent, fetchState } = useModal({ width: 500 })

        onMounted(async () => {
            await fetchState({ visible: true })
        })

        async function onSubmit() {
            return await divineHandler(props.source === env.EnumNotificationSource.contact, {
                handler: fetchNotificationColumn
            }).then(() => {
                return emit('submit', { done: fetchState })
            })
        }

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
                title={divineRender(<done-title content={props.title}></done-title>)}
            >
                <n-element class="layer-invite n-chunk n-column n-disover">
                    {props.source === env.EnumNotificationSource.contact ? (
                        <next-invite-contact user-id={props.userId} onSubmit={onSubmit}></next-invite-contact>
                    ) : null}
                </n-element>
            </n-modal>
        )
    }
})
</script>
