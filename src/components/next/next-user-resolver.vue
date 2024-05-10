<script lang="tsx">
import { defineComponent, onMounted, Fragment, PropType } from 'vue'
import { useUser, useStore } from '@/store'
import { useState } from '@/hooks/hook-state'
import { divineHandler } from '@/utils/utils-common'
import { httpUserCurrentResolver } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'NextUserResolver',
    emits: ['update', 'ready'],
    props: {
        userId: { type: String, required: true },
        footer: { type: Boolean, default: false },
        status: {
            type: String as PropType<env.EnumNotificationStatus>,
            default: env.EnumNotificationStatus.waitze
        }
    },
    setup(props, { slots, emit }) {
        const { uid } = useStore(useUser)
        const { state, setState } = useState({
            loading: false,
            userId: props.userId,
            comment: '',
            avatar: '',
            nickname: '',
            signature: '',
            email: ''
        })

        onMounted(async () => {
            return await divineHandler(Boolean(props.userId), {
                handler: fetchUserCurrentResolver
            })
        })

        /**查看用户信息**/
        async function fetchUserCurrentResolver() {
            try {
                await setState({ loading: true })
                return await httpUserCurrentResolver({ uid: props.userId }).then(async ({ data }) => {
                    await setState({
                        userId: data.uid,
                        // comment: node.comment,
                        signature: data.comment,
                        avatar: data.avatar,
                        nickname: data.nickname,
                        email: data.email
                    })
                    return await emit('ready', data)
                })
            } catch (e) {
                return await setState({ loading: false })
            }
        }

        return () => (
            <div class="n-chunk n-column n-disover">
                <div class="n-chunk n-center n-disover" style={{ columnGap: '10px', paddingBottom: '20px' }}>
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
                {slots.default && <Fragment>{slots.default(state)}</Fragment>}
                {props.footer && (
                    <Fragment>
                        {slots.footer ? (
                            slots.footer(state)
                        ) : (
                            <n-space wrap-item={false} size={16} justify="center" style={{ flex: 1, paddingTop: '24px' }}>
                                {props.status === env.EnumNotificationStatus.waitze ? (
                                    <Fragment>
                                        {props.userId === uid.value ? (
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
                                                            onClick={(evt: MouseEvent) => {
                                                                emit('update', { done, status: env.EnumNotificationStatus.reject })
                                                            }}
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
                                                            onClick={(evt: MouseEvent) => {
                                                                emit('update', { done, status: env.EnumNotificationStatus.resolve })
                                                            }}
                                                        >
                                                            通过验证
                                                        </n-button>
                                                    )}
                                                ></common-state>
                                            </n-space>
                                        )}
                                    </Fragment>
                                ) : props.status === env.EnumNotificationStatus.resolve ? (
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
                    </Fragment>
                )}
            </div>
        )
    }
})
</script>
