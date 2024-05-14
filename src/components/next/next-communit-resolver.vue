<script lang="tsx">
import { defineComponent, onMounted, Fragment, PropType } from 'vue'
import { useUser, useStore } from '@/store'
import { useState } from '@/hooks/hook-state'
import { divineHandler } from '@/utils/utils-common'
import { httpCommunitCurrentResolver } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'NextCommunitResolver',
    emits: ['update', 'ready'],
    props: {
        communitId: { type: String, required: true }
    },
    setup(props, { emit, slots }) {
        const { uid } = useStore(useUser)
        const { state, setState } = useState({
            loading: false,
            name: '',
            comment: '',
            poster: '',
            nickname: '',
            avatar: '',
            ownId: '',
            email: '',
            signature: ''
        })

        onMounted(async () => {
            return await divineHandler(Boolean(props.communitId), {
                handler: fetchCommunitCurrentResolver
            })
        })

        /**社群详情**/
        async function fetchCommunitCurrentResolver() {
            try {
                await setState({ loading: true })
                return await httpCommunitCurrentResolver({ uid: props.communitId }).then(async ({ data }) => {
                    const { name, comment, own, poster } = data
                    await setState({
                        name,
                        comment,
                        poster: poster.fileURL,
                        ownId: own.uid,
                        nickname: own.nickname,
                        avatar: own.avatar,
                        email: own.email,
                        signature: own.comment
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
                                <n-ellipsis tooltip={false}>{state.ownId}</n-ellipsis>
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
                <div class="n-chunk n-column n-disover" style={{ rowGap: '10px', paddingTop: '24px' }}>
                    <div class="n-chunk n-center n-disover" style={{ columnGap: '10px' }}>
                        <chat-avatar size={44} src={state.poster}></chat-avatar>
                        <div class="n-chunk n-column n-auto n-disover">
                            <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                                <n-ellipsis tooltip={false}>{state.name}</n-ellipsis>
                            </n-h2>
                        </div>
                    </div>
                    <n-text class="n-chunk n-column n-disover" depth={3} style={{ lineHeight: '20px' }}>
                        <n-ellipsis expand-trigger="click" tooltip={false} line-clamp={3}>
                            {state.comment}
                        </n-ellipsis>
                    </n-text>
                </div>
            </div>
        )
    }
})
</script>
