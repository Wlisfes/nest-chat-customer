<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useUser } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { divineNotice } from '@/utils/utils-component'
import { Observer } from '@/utils/utils-observer'
import * as env from '@/interface/instance.resolver'
import * as api from '@/api/instance.service'

export default defineComponent({
    name: 'LayerResolver',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const user = useUser()
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        /**更新头像**/
        async function fetchUserUpdateAvatar(scope: Omix<{ done: Function } & env.RestStreamUploader>) {
            try {
                return await api.httpUserUpdate({ fileId: scope.fileId }).then(async ({ message }) => {
                    await user.fetchUserResolver()
                    await divineNotice({ type: 'success', title: message })
                    return await scope.done({ visible: false })
                })
            } catch (e) {
                return await divineNotice({ type: 'error', title: e.message }).then(async () => {
                    return await scope.done({ loading: false })
                })
            }
        }

        /**更新昵称、状态**/
        async function fetchUserUpdate({ done, comment, nickname }: Omix<{ done: Function; nickname?: string; comment?: string }>) {
            try {
                return await api.httpUserUpdate({ nickname, comment }).then(async ({ message }) => {
                    await user.fetchUserResolver()
                    await divineNotice({ type: 'success', title: message })
                    return await done({ loading: false })
                })
            } catch (e) {
                return await divineNotice({ type: 'error', title: e.message }).then(async () => {
                    return await done({ loading: false })
                })
            }
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
                <n-element class="layer-resolver n-chunk n-column n-auto n-disover">
                    <chat-header title="个人信息" onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="n-chunk n-center n-middle" style={{ padding: '24px' }}>
                        <chat-avatar upload={true} src={user.avatar} size={200} radius={100} onSubmit={fetchUserUpdateAvatar}></chat-avatar>
                    </div>
                    <common-revise
                        label="昵称"
                        placeholder="昵称"
                        content={user.nickname}
                        onSubmit={({ done, content }: Omix) => fetchUserUpdate({ done, nickname: content })}
                    ></common-revise>
                    <common-revise
                        label="状态"
                        placeholder="状态"
                        content={user.comment}
                        onSubmit={({ done, content }: Omix) => fetchUserUpdate({ done, comment: content })}
                    ></common-revise>
                </n-element>
            </n-drawer>
        )
    }
})
</script>
