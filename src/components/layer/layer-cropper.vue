<script lang="tsx">
import { defineComponent, ref, Ref, onMounted, nextTick } from 'vue'
import { UploadFileInfo } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { useModal } from '@/hooks/hook-layer'
import { divineRender, divineNotice } from '@/utils/utils-component'
import { divineTransfer } from '@/utils/utils-transfer'
import { divineHandler } from '@/utils/utils-common'
import Cropper from 'cropperjs'
import * as env from '@/interface/instance.resolver'
import * as api from '@/api/instance.service'

export default defineComponent({
    name: 'LayerCropper',
    emits: ['close', 'submit'],
    props: {
        src: { type: String },
        fileName: { type: String, default: 'image.jpeg' },
        ratio: { type: Number, default: 1 }
    },
    setup(props, { emit }) {
        const { state, setState } = useState({ src: props.src })
        const { visible, loading, chunkContent, fetchState } = useModal({ width: 500 })
        const image = ref<HTMLImageElement>() as Ref<HTMLImageElement>
        const cropper = ref<Cropper>() as Ref<Cropper>

        onMounted(async () => {
            await fetchState({ visible: true })
            await nextTick()
            return await divineHandler(Boolean(state.src), {
                handler: divineCropper
            })
        })

        /**初始化裁剪实例**/
        async function divineCropper() {
            return (cropper.value = new Cropper(image.value, {
                aspectRatio: props.ratio,
                initialAspectRatio: 1,
                viewMode: 1,
                dragMode: 'move',
                autoCropArea: 0.85,
                responsive: true,
                checkOrientation: false,
                restore: false,
                // guides: false,
                center: false,
                highlight: false,
                cropBoxMovable: false,
                cropBoxResizable: false,
                toggleDragModeOnDblclick: false,
                background: false
            }))
        }

        /**文件上传前拦截**/
        async function onBeforeUpload({ file }: { file: UploadFileInfo }) {
            return await setState({ src: window.URL.createObjectURL(file.file as File) }).then(async () => {
                await divineHandler(Boolean(cropper.value), {
                    failure: divineCropper,
                    handler: () => {
                        return cropper.value.replace(state.src as string)
                    }
                })
                return false
            })
        }

        /**文件上传**/
        async function fetchStreamUploader() {
            return cropper.value.getCroppedCanvas().toBlob(async blob => {
                try {
                    await fetchState({ loading: true })
                    const formData = new FormData()
                    formData.append('file', blob as Blob, props.fileName)
                    formData.append('source', env.EnumMediaEntierSource.image)
                    return await api.httpStreamUploader(formData).then(async ({ data }) => {
                        return await emit('submit', { ...data, done: fetchState })
                    })
                } catch (e) {
                    return await divineNotice({ type: 'error', title: e.message }).then(async () => {
                        return await fetchState({ loading: false })
                    })
                }
            }, 'image/webp')
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
                title={divineRender(<done-title content="拖动图片进行调整"></done-title>)}
                action={divineRender(
                    <n-space wrap-item={false} size={16} style={{ marginTop: '-18px', padding: '0 20px', zIndex: 1 }}>
                        <n-button text disabled={loading.value} style={{ '--n-opacity-disabled': 1 }}>
                            <n-upload
                                accept=".jpg,.jpeg,.png,.webp"
                                show-file-list={false}
                                show-trigger={true}
                                default-upload={false}
                                disabled={loading.value}
                                style={{ '--n-item-disabled-opacity': 1 }}
                                on-before-upload={onBeforeUpload}
                            >
                                <n-icon-wrapper size={36} color="#f0a020" icon-color="#ffffff" border-radius={18}>
                                    <n-icon size={24} component={<Iv-BsUpload />}></n-icon>
                                </n-icon-wrapper>
                            </n-upload>
                        </n-button>
                        <n-button
                            text
                            disabled={loading.value || !state.src}
                            style={{ '--n-opacity-disabled': 1 }}
                            onClick={fetchStreamUploader}
                        >
                            <n-icon-wrapper size={36} color="#18a058" icon-color="#ffffff" border-radius={18}>
                                {loading.value ? (
                                    <common-loadiner circle-color="var(--warning-color)"></common-loadiner>
                                ) : (
                                    <n-icon size={28} component={<Iv-BsCheck />}></n-icon>
                                )}
                            </n-icon-wrapper>
                        </n-button>
                    </n-space>
                )}
            >
                <div class="layer-cropper">
                    <div class="chunk-cropper">
                        {state.src ? (
                            <div class="chunk-render">
                                <img ref={image} src={state.src} />
                            </div>
                        ) : (
                            <div class="chunk-render"></div>
                        )}
                    </div>
                </div>
            </n-modal>
        )
    }
})
</script>

<style lang="scss" scoped>
.layer-cropper {
    position: relative;
    overflow: hidden;
    margin-top: 16px;
    padding-bottom: 72%;
    .chunk-render {
        position: relative;
        background-color: #161619;
        width: 100%;
        height: 100%;
        overflow: hidden;
        // :deep(.cropper-view-box),
        // :deep(.cropper-face) {
        //     border-radius: 50%;
        //     overflow: hidden;
        // }
    }
    .chunk-cropper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        img {
            max-width: 100%;
            display: block;
        }
    }
}
</style>
