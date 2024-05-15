<script lang="tsx">
import { defineComponent, onMounted, computed, PropType } from 'vue'
import { useUser, useNotification, useContact, useCommunit, useStore } from '@/store'
import { useModal } from '@/hooks/hook-layer'
import { divineRender, divineNotice } from '@/utils/utils-component'
import { divineTransfer } from '@/utils/utils-transfer'
import { divineHandler } from '@/utils/utils-common'
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
        const { fetchNotificationColumn, divineJsonComment, divineJsonUserId } = useStore(useNotification)
        const { visible, chunkContent, fetchState } = useModal({ width: 500 })
        const comment = computed(() => divineJsonComment(uid.value, props.node))
        const userId = computed(() => divineJsonUserId(uid.value, props.node))

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
                    {props.node.source === env.EnumNotificationSource.contact ? (
                        <next-user-resolver
                            footer
                            user-id={userId.value}
                            command={props.node.command}
                            status={props.node.status}
                            style={{ padding: '10px 0 0' }}
                            onUpdate={fetchNotificationUpdate}
                        >
                            <div class="n-chunk n-column n-auto n-disover" style={{ paddingTop: '14px' }}>
                                <n-blockquote class="n-chunk n-column" align-text style={{ margin: 0, paddingLeft: '8px' }}>
                                    <n-ellipsis tooltip={false} line-clamp={2} style={{ lineHeight: '24px' }}>
                                        <n-text type="success" depth={1}>
                                            备注：
                                        </n-text>
                                        {comment.value && <n-text depth={2}>{comment.value}</n-text>}
                                    </n-ellipsis>
                                </n-blockquote>
                            </div>
                        </next-user-resolver>
                    ) : (
                        <next-communit-resolver
                            footer
                            user-id={userId.value}
                            communit-id={props.node.communitId}
                            command={props.node.command}
                            status={props.node.status}
                            style={{ padding: '10px 0 0' }}
                            onUpdate={fetchNotificationUpdate}
                        >
                            {{
                                comment: () => (
                                    <div class="n-chunk n-column n-auto n-disover" style={{ padding: '14px 0 6px' }}>
                                        <n-blockquote class="n-chunk n-column" align-text style={{ margin: 0, paddingLeft: '8px' }}>
                                            <n-ellipsis tooltip={false} line-clamp={2} style={{ lineHeight: '24px' }}>
                                                <n-text type="success" depth={1}>
                                                    备注：
                                                </n-text>
                                                {comment.value && <n-text depth={2}>{comment.value}</n-text>}
                                            </n-ellipsis>
                                        </n-blockquote>
                                    </div>
                                )
                            }}
                        </next-communit-resolver>
                    )}
                </n-element>
            </n-modal>
        )
    }
})
</script>
