<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useUser } from '@/store'
import { useState } from '@/hooks/hook-state'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'LayerProfile',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()
        const { nickname, comment, avatar, setState: setUser, fetchUserUpdate } = useUser()
        const { state, setState } = useState({ nickname, comment, avatar })

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        /**更新头像**/
        async function fetchUpdateAvatar({ url, fileId, done }: Omix<{ done: Function } & env.RestStreamUploader>) {
            return await fetchUserUpdate({ fileId }, {}, () => done({ loading: false })).then(async () => {
                await setState({ avatar: url })
                await setUser({ avatar: url })
                return await done({ visible: false })
            })
        }

        /**更新昵称、状态**/
        async function fetchBasicUpdate(scope: { nickname?: string; comment?: string }, done: Function) {
            return await fetchUserUpdate(scope, {}, async () => {
                await setUser(scope)
                return await done({ loading: false })
            })
        }

        return () => (
            <n-drawer
                v-model:show={visible.value}
                width="100%"
                to={element.value ?? document.body}
                content-style={chunkContent.value}
                placement="right"
                auto-focus={false}
                mask-closable={false}
                show-mask={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-profile n-chunk n-column n-auto n-disover">
                    <chat-header title="个人信息" onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="n-chunk n-center n-middle" style={{ padding: '24px' }}>
                        <chat-avatar upload={true} src={state.avatar} size={200} radius={100} onSubmit={fetchUpdateAvatar}></chat-avatar>
                    </div>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize" trigger="none" size={60}>
                            <common-revise
                                label="昵称"
                                placeholder="昵称"
                                suffix={['controller']}
                                v-model:content={state.nickname}
                                onSubmit={(scope: Omix) => fetchBasicUpdate({ nickname: scope.content }, scope.done)}
                            ></common-revise>
                            <common-revise
                                label="状态"
                                placeholder="状态"
                                suffix={['controller']}
                                v-model:content={state.comment}
                                onSubmit={(scope: Omix) => fetchBasicUpdate({ comment: scope.content }, scope.done)}
                            ></common-revise>
                        </n-scrollbar>
                    </div>
                </n-element>
            </n-drawer>
        )
    }
})
</script>
