<script lang="tsx">
import { defineComponent, onMounted, Fragment, PropType } from 'vue'
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
        const { visible, loading, chunkContent, fetchState } = useModal({ width: 500 })
        const { state, setState } = useState({
            userId: '',
            comment: '',
            avatar: '',
            nickname: '',
            signature: '',
            email: ''
        })

        onMounted(async () => {
            await fetchState({ visible: true, loading: true })
            return await fetchUserCurrentResolver(props.node)
        })

        /**查看用户信息**/
        async function fetchUserCurrentResolver(node: env.SchemaNotification) {
            try {
                return await httpUserCurrentResolver({
                    uid: divineWherer(node.userId === uid.value, node.niveId, node.userId)
                }).then(async ({ data }) => {
                    await fetchState({ loading: false })
                    return await setState({
                        userId: data.uid,
                        comment: node.comment,
                        signature: data.comment,
                        avatar: data.avatar,
                        nickname: data.nickname,
                        email: data.email
                    })
                })
            } catch (e) {
                return await fetchState({ loading: false })
            }
        }

        /**更新通知状态**/
        async function fetchNotificationUpdate(status: env.EnumNotificationStatus, done: Function) {
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

        async function fetchNotificationUpdateReject(done: Function) {
            return await fetchNotificationUpdate(env.EnumNotificationStatus.reject, done)
        }

        async function fetchNotificationUpdateResolve(done: Function) {
            return await fetchNotificationUpdate(env.EnumNotificationStatus.resolve, done)
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
                action={divineRender(
                    <n-space wrap-item={false} size={16} justify="center" style={{ flex: 1, padding: '10px 20px 0' }}>
                        {props.node.status === env.EnumNotificationStatus.waitze ? (
                            <Fragment>
                                {props.node.userId === uid.value ? (
                                    <n-button secondary type="warning" style={{ minWidth: '88px', cursor: 'not-allowed' }}>
                                        待验证
                                    </n-button>
                                ) : (
                                    <n-space wrap-item={false} size={16} justify="center">
                                        <common-state
                                            data-render={(scope: Omix<{ loading: boolean }>, done: Function) => (
                                                <n-button
                                                    secondary
                                                    type="error"
                                                    style={{ minWidth: '88px' }}
                                                    loading={scope.loading}
                                                    disabled={scope.loading}
                                                    onClick={(evt: MouseEvent) => fetchNotificationUpdateReject(done)}
                                                >
                                                    拒绝
                                                </n-button>
                                            )}
                                        ></common-state>
                                        <common-state
                                            data-render={(scope: Omix<{ loading: boolean }>, done: Function) => (
                                                <n-button
                                                    secondary
                                                    type="success"
                                                    style={{ minWidth: '88px' }}
                                                    loading={scope.loading}
                                                    disabled={scope.loading}
                                                    onClick={(evt: MouseEvent) => fetchNotificationUpdateResolve(done)}
                                                >
                                                    通过验证
                                                </n-button>
                                            )}
                                        ></common-state>
                                    </n-space>
                                )}
                            </Fragment>
                        ) : props.node.status === env.EnumNotificationStatus.resolve ? (
                            <n-button secondary type="success" style={{ minWidth: '88px', cursor: 'not-allowed' }}>
                                已验证
                            </n-button>
                        ) : (
                            <n-button secondary type="error" style={{ minWidth: '88px', cursor: 'not-allowed' }}>
                                已拒绝
                            </n-button>
                        )}
                    </n-space>
                )}
            >
                <n-element class="layer-compadre n-chunk n-column n-disover">
                    <div class="n-chunk n-center n-disover" style={{ columnGap: '15px', padding: '10px 0 0' }}>
                        <chat-avatar size={64} src={state.avatar}></chat-avatar>
                        <div class="n-chunk n-column n-auto n-disover" style={{ rowGap: '4px' }}>
                            <n-h2 style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 500, margin: 0 }}>
                                <n-ellipsis tooltip={false}>{state.nickname}</n-ellipsis>
                            </n-h2>
                            <n-text depth={3} class="n-chunk n-column" style={{ fontSize: '14px', lineHeight: '18px' }}>
                                <n-ellipsis line-clamp={2} tooltip={false}>
                                    {state.signature}
                                </n-ellipsis>
                            </n-text>
                        </div>
                    </div>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-text depth={3} style={{ lineHeight: '20px' }}>
                            备注
                        </n-text>
                        <n-text depth={2} type="success" style={{ fontSize: '16px', lineHeight: '28px' }}>
                            <n-ellipsis tooltip={false}>{state.comment}</n-ellipsis>
                        </n-text>
                    </div>
                    <n-grid cols={2} item-responsive x-gap={14} y-gap={14}>
                        <n-grid-item span="1 400:1 2">
                            <div class="n-chunk n-column n-auto n-disover">
                                <n-text depth={3} style={{ lineHeight: '20px' }}>
                                    UID
                                </n-text>
                                <n-text depth={2} style={{ fontSize: '16px', lineHeight: '28px' }}>
                                    <n-ellipsis tooltip={false}>{state.userId}</n-ellipsis>
                                </n-text>
                            </div>
                        </n-grid-item>
                        <n-grid-item span="0 400:1 2">
                            <div class="n-chunk n-column n-auto n-disover">
                                <n-text depth={3} style={{ lineHeight: '20px' }}>
                                    邮箱
                                </n-text>
                                <n-text depth={2} style={{ fontSize: '16px', lineHeight: '28px' }}>
                                    <n-ellipsis tooltip={false}>{state.email}</n-ellipsis>
                                </n-text>
                            </div>
                        </n-grid-item>
                    </n-grid>
                </n-element>
            </n-modal>
        )
    }
})
</script>

<style lang="scss" scoped>
.layer-compadre {
    row-gap: 14px;
    min-height: 198px;
}
</style>
