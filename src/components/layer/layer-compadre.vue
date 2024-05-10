<script lang="tsx">
import { defineComponent, onMounted, computed, Fragment, PropType } from 'vue'
import { useUser, useNotification, useStore } from '@/store'
import { useModal } from '@/hooks/hook-layer'
import { useState } from '@/hooks/hook-state'
import { divineRender, divineNotice } from '@/utils/utils-component'
import { divineTransfer } from '@/utils/utils-transfer'
import { divineWherer } from '@/utils/utils-common'
import { httpUserCurrentResolver, httpNotificationUpdate } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'LayerCompadre',
    emits: ['close', 'submit'],
    props: {
        node: { type: Object as PropType<env.SchemaNotification>, required: true }
    },
    setup(props, { emit }) {
        const { uid } = useStore(useUser)
        const { fetchNotificationColumn } = useStore(useNotification)
        const { visible, chunkContent, fetchState } = useModal({ width: 500 })
        const userId = computed(() => {
            return divineWherer(props.node.userId === uid.value, props.node.niveId, props.node.userId)
        })

        onMounted(async () => {
            await fetchState({ visible: true })
        })

        /**更新通知状态**/
        async function fetchNotificationUpdate({ done, status }: { status: env.EnumNotificationStatus; done: Function }) {
            try {
                await done({ loading: true })
                return await httpNotificationUpdate({ status: status, uid: props.node.uid }).then(async ({ message }) => {
                    await fetchNotificationColumn()
                    await divineNotice({ type: 'success', content: message })
                    return await emit('close', { done: fetchState })
                })
            } catch (e) {
                return await divineNotice({ type: 'error', content: e.message }).then(async () => {
                    return await done({ loading: false })
                })
            }
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
                title={divineRender(<done-title content="查看联系人"></done-title>)}
            >
                <n-element class="layer-compadre n-chunk n-column n-disover">
                    <next-user-resolver
                        footer
                        user-id={userId.value}
                        status={props.node.status}
                        style={{ margin: '10px 0 0' }}
                        onUpdate={fetchNotificationUpdate}
                    >
                        <div class="n-chunk n-column n-auto n-disover" style={{ paddingTop: '14px' }}>
                            <n-text depth={3} style={{ lineHeight: '20px' }}>
                                备注
                            </n-text>
                            <n-text depth={2} type="success" style={{ fontSize: '16px', lineHeight: '28px' }}>
                                <n-ellipsis tooltip={false}>{props.node.comment}</n-ellipsis>
                            </n-text>
                        </div>
                    </next-user-resolver>
                </n-element>
            </n-modal>
        )
    }
})
</script>
