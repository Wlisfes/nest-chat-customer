<script lang="tsx">
import { defineComponent, onMounted, computed, PropType } from 'vue'
import { useUser, useNotification, useContact, useCommunit, useStore } from '@/store'
import { useModal } from '@/hooks/hook-layer'
import { divineRender, divineNotice } from '@/utils/utils-component'
import { divineTransfer } from '@/utils/utils-transfer'
import { divineWherer, divineHandler } from '@/utils/utils-common'
import { httpNotificationUpdate } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'LayerCompadre',
    emits: ['close', 'submit'],
    props: {
        title: { type: String, required: true },
        node: { type: Object as PropType<env.SchemaNotification>, required: true }
    },
    setup(props, { emit }) {
        const { uid } = useStore(useUser)
        const { fetchContactColumn } = useStore(useContact)
        const { fetchCommunitColumn } = useStore(useCommunit)
        const { fetchNotificationColumn, divineJsonWherer } = useStore(useNotification)
        const { visible, chunkContent, fetchState } = useModal({ width: 500 })
        const json = computed(() => divineJsonWherer(uid.value, props.node))
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
                    await divineHandler(props.node.source === env.EnumNotificationSource.contact, {
                        handler: fetchContactColumn,
                        failure: fetchCommunitColumn
                    })
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
                title={divineRender(<done-title content={props.title}></done-title>)}
            >
                <n-element class="layer-compadre n-chunk n-column n-disover">
                    <next-user-resolver
                        footer
                        user-id={userId.value}
                        command={props.node.command}
                        status={props.node.status}
                        style={{ margin: '10px 0 0' }}
                        onUpdate={fetchNotificationUpdate}
                    >
                        <div class="n-chunk n-column n-auto n-disover" style={{ paddingTop: '14px' }}>
                            <n-blockquote class="n-chunk n-column" align-text style={{ margin: 0, paddingLeft: '8px' }}>
                                <n-ellipsis tooltip={false} line-clamp={2} style={{ lineHeight: '24px' }}>
                                    <n-text type="success" depth={1}>
                                        备注：
                                    </n-text>
                                    <n-text depth={2}>{json.value.comment}</n-text>
                                </n-ellipsis>
                            </n-blockquote>
                        </div>
                        {props.node.source === env.EnumNotificationSource.communit && (
                            <div class="n-chunk n-column n-disover" style={{ rowGap: '10px', paddingTop: '24px' }}>
                                <div class="n-chunk n-center n-disover" style={{ columnGap: '10px' }}>
                                    <chat-avatar size={34} src={props.node.communit.poster.fileURL}></chat-avatar>
                                    <div class="n-chunk n-column n-auto n-disover">
                                        <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                                            <n-ellipsis tooltip={false}>{props.node.communit.name}</n-ellipsis>
                                        </n-h2>
                                    </div>
                                </div>
                                <n-text class="n-chunk n-column n-disover" depth={3} style={{ lineHeight: '20px' }}>
                                    <n-ellipsis expand-trigger="click" tooltip={false} line-clamp={3}>
                                        {props.node.communit.comment}
                                    </n-ellipsis>
                                </n-text>
                            </div>
                        )}
                    </next-user-resolver>
                </n-element>
            </n-modal>
        )
    }
})
</script>
