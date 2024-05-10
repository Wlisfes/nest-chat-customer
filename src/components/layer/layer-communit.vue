<script lang="tsx">
import { defineComponent, computed, onMounted, PropType } from 'vue'
import { useState } from '@/hooks/hook-state'
import { useDrawer } from '@/hooks/hook-layer'
import { divineNotice } from '@/utils/utils-component'
import { Observer } from '@/utils/utils-observer'
import * as env from '@/interface/instance.resolver'
import * as api from '@/api/instance.service'

export default defineComponent({
    name: 'LayerCommunit',
    emits: ['close', 'submit'],
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { visible, loading, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()
        const { state, setState } = useState({
            name: '',
            comment: '大家好！本社群可供成员在话题群组中交流，还可以及时获取重要公告。',
            poster: '',
            fileURL: ''
        })
        const disabled = computed(() => {
            if (!state.name || !state.comment || !state.poster || state.name.length < 3) {
                return true
            }
            return false
        })

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
        })

        /**接收图片上传回调**/
        async function onSubmitUpdate({ fileId, fileURL, done }: Omix<{ done: Function } & env.RestStreamUploader>) {
            await setState({ poster: fileId, fileURL })
            return await done({ visible: false })
        }

        /**新建社群**/
        async function fetchCommunitCreater() {
            try {
                return await fetchState({ loading: true }).then(async () => {
                    const { message } = await api.httpCommunitCreater({
                        name: state.name,
                        comment: state.comment,
                        poster: state.poster
                    })
                    return emit('submit', { message, done: fetchState })
                })
            } catch (e) {
                return await divineNotice({ type: 'error', title: e.message }).then(async () => {
                    return await fetchState({ loading: false })
                })
            }
        }

        return () => (
            <n-drawer
                v-model:show={visible.value}
                to={element.value}
                content-style={chunkContent.value}
                width="100%"
                placement="right"
                show-mask="transparent"
                auto-focus={false}
                mask-closable={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-communit n-chunk n-column n-auto n-disover">
                    <chat-header title="新建社群" onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize">
                            <n-form style={{ padding: '24px 0' }}>
                                <n-space vertical wrap-item={false} size={[0, 32]}>
                                    <n-form-item show-label={false}>
                                        <div class="n-chunk n-column n-auto n-center n-middle">
                                            <chat-avatar
                                                upload
                                                upload-document="上传社群封面"
                                                src={state.fileURL}
                                                size={200}
                                                radius={64}
                                                onSubmit={onSubmitUpdate}
                                            ></chat-avatar>
                                        </div>
                                    </n-form-item>
                                    <common-revise
                                        form-props={{ showLabel: false }}
                                        disabled={false}
                                        placeholder="社群名称"
                                        v-model:content={state.name}
                                    ></common-revise>
                                    <common-revise
                                        maxlength={128}
                                        disabled={false}
                                        autosize={{ minRows: 2, maxRows: 5 }}
                                        label="社群描述"
                                        placeholder="大家好！本社群可供成员在话题群组中交流，还可以及时获取重要公告。"
                                        v-model:content={state.comment}
                                    ></common-revise>
                                    <n-form-item show-label={false} show-feedback={false}>
                                        <div class="n-chunk n-column n-auto n-center n-middle">
                                            <n-button text disabled={disabled.value || loading.value} onClick={fetchCommunitCreater}>
                                                <n-icon-wrapper size={44} color="#2aa886" icon-color="#ffffff" border-radius={22}>
                                                    {loading.value ? (
                                                        <common-loadiner size={24} circle-color="var(--warning-color)"></common-loadiner>
                                                    ) : (
                                                        <n-icon size={28} component={<Iv-BsCheck />}></n-icon>
                                                    )}
                                                </n-icon-wrapper>
                                            </n-button>
                                        </div>
                                    </n-form-item>
                                </n-space>
                            </n-form>
                        </n-scrollbar>
                    </div>
                </n-element>
            </n-drawer>
        )
    }
})
</script>

<style lang="scss" scoped></style>
