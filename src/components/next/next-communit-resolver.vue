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
    setup(props, { emit }) {
        const { uid } = useStore(useUser)
        const { state, setState } = useState({
            loading: false,
            name: '',
            comment: '',
            poster: '',
            nickname: '',
            avatar: ''
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
                    await setState({ name, comment, poster: poster.fileURL, nickname: own.nickname, avatar: own.avatar })
                    return await emit('ready', data)
                })
            } catch (e) {
                return await setState({ loading: false })
            }
        }

        return () => (
            <div class="n-chunk n-column n-disover">
                <div class="n-chunk n-center n-disover" style={{ columnGap: '10px', paddingBottom: '14px' }}>
                    <chat-avatar size={64} src={state.poster}></chat-avatar>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-h2 style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 500, margin: 0 }}>
                            <n-ellipsis line-clamp={2} tooltip={false}>
                                {state.name}
                            </n-ellipsis>
                        </n-h2>
                    </div>
                </div>
                <n-text class="n-chunk n-column n-disover" depth={3} style={{ lineHeight: '20px', paddingBottom: '14px' }}>
                    <n-ellipsis expand-trigger="click" tooltip={false} line-clamp={3}>
                        {state.comment}
                    </n-ellipsis>
                </n-text>
                <div class="n-chunk n-center n-disover" style={{ columnGap: '10px' }}>
                    <chat-avatar size={40} radius={20} src={state.avatar}></chat-avatar>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-h2 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500, margin: 0 }}>
                            <n-ellipsis tooltip={false}>{state.nickname}</n-ellipsis>
                        </n-h2>
                    </div>
                </div>
            </div>
        )
    }
})
</script>
