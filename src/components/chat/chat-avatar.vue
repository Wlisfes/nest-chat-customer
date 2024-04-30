<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties, Fragment } from 'vue'
import { UploadFileInfo } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { fetchCropper } from '@/components/layer/layer.instance'

export default defineComponent({
    name: 'ChatAvatar',
    props: {
        upload: { type: Boolean, default: false },
        uploadDocument: { type: String, default: '更换头像' },
        src: { type: String },
        iconSize: { type: Number, default: 32 },
        size: { type: Number, default: 40 },
        radius: { type: Number, default: 4 },
        customStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props) {
        const { state, setState } = useState({ failure: false, loading: Boolean(props.src) })
        const elementStyle = computed<CSSProperties>(() => ({
            '--chat-avatar-size': props.size + 'px',
            '--chat-avatar-border-radius': props.radius + 'px',
            ...props.customStyle
        }))

        /**文件上传前拦截**/
        async function onBeforeUpload({ file }: { file: UploadFileInfo }) {
            return await fetchCropper({
                fileName: file.name,
                src: window.URL.createObjectURL(file.file as File),
                onClose: (scope: Omix<{ unmount: Function }>) => scope.unmount(300),
                onSubmit: async (scope: Omix<{ done: Function }>) => {
                    return await scope.done({ visible: false })
                }
            })
        }

        const ChunkUploader = (ctx: Omix<{ button: boolean }>) => {
            return (
                <n-upload
                    class="n-chunk n-column n-auto"
                    trigger-class="n-chunk n-column n-auto n-center n-middle"
                    accept=".jpg,.jpeg,.png,.webp"
                    show-file-list={false}
                    show-trigger={true}
                    default-upload={false}
                    on-before-upload={onBeforeUpload}
                >
                    {ctx.button ? (
                        <Fragment>
                            <n-icon size={props.iconSize} component={<Iv-BsCamera />}></n-icon>
                            {props.uploadDocument && <span style={{ marginTop: '10px', lineHeight: '20px' }}>{props.uploadDocument}</span>}
                        </Fragment>
                    ) : (
                        <Fragment>
                            <n-icon size={props.iconSize} component={<Iv-BsCamera />} color="#ffffff"></n-icon>
                            {props.uploadDocument && (
                                <span style={{ marginTop: '10px', lineHeight: '20px', color: '#ffffff' }}>{props.uploadDocument}</span>
                            )}
                        </Fragment>
                    )}
                </n-upload>
            )
        }

        return () => (
            <div class="chat-avatar n-chunk n-disover" style={elementStyle.value}>
                {props.src ? (
                    <div class="n-chunk n-column n-auto n-disover">
                        {props.upload && !state.loading && !state.failure && (
                            <div class="chunk-upload n-chunk n-column n-pointer">
                                <ChunkUploader button={false}></ChunkUploader>
                            </div>
                        )}
                        <n-image
                            preview-disabled
                            src={props.src}
                            on-error={(evt: Event) => setState({ loading: false, failure: true })}
                            on-load={(evt: Event) => setState({ loading: false, failure: false })}
                            v-slots={{
                                placeholder: () => (
                                    <div class="chunk-placeholder n-chunk n-column n-auto n-disover">
                                        {props.upload ? (
                                            <n-button class="full-chunk" text focusable={false}>
                                                <ChunkUploader button={true}></ChunkUploader>
                                            </n-button>
                                        ) : (
                                            <n-icon size={props.iconSize} component={<Iv-BsImage />} style={{ margin: 'auto' }}></n-icon>
                                        )}
                                    </div>
                                )
                            }}
                        />
                    </div>
                ) : (
                    <div class="chunk-placeholder n-chunk n-column n-auto n-disover">
                        {props.upload ? (
                            <n-button class="full-chunk" text focusable={false}>
                                <ChunkUploader button={true}></ChunkUploader>
                            </n-button>
                        ) : (
                            <n-icon size={props.iconSize} component={<Iv-BsImage />} style={{ margin: 'auto' }}></n-icon>
                        )}
                    </div>
                )}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-avatar {
    user-select: none;
    width: var(--chat-avatar-size);
    height: var(--chat-avatar-size);
    min-width: var(--chat-avatar-size);
    min-height: var(--chat-avatar-size);
    border-radius: var(--chat-avatar-border-radius);
    position: relative;
    overflow: hidden;
    :deep(.n-image),
    :deep(img) {
        width: 100%;
        height: 100%;
        display: block;
    }
    .chunk-upload {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.6);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out), opacity 0.3s var(--cubic-bezier-ease-in-out);
        &:hover {
            opacity: 1;
        }
    }

    .chunk-placeholder {
        height: 100%;
        background-color: var(--divider-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
    .n-button.full-chunk {
        --n-width: var(--chat-avatar-size);
        --n-height: var(--chat-avatar-size);
        :deep(.n-button__content) {
            width: var(--chat-avatar-size);
            height: var(--chat-avatar-size);
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
