<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { divineBytefor } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'
import pdf from '@/assets/images/chat-pdf.png'

export default defineComponent({
    name: 'CustomTexter',
    props: {
        current: { type: Boolean, default: false },
        maxWidth: { type: Number, required: true },
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props) {
        const media = computed(() => (props.node.medias.length > 0 ? props.node.medias[0] : null))
        const suffix = computed(() => media.value?.fileName.split('.').pop()?.toUpperCase())

        return () => (
            <div class={{ 'custom-document n-chunk n-column n-disover': true }} style={{ width: props.maxWidth + 'px' }}>
                {media.value && (
                    <Fragment>
                        {suffix.value === 'PDF' && (
                            <div class="document-cover">
                                <div class="document-cover__container">
                                    <n-image preview-disabled src={media.value.depater.fileURL} />
                                </div>
                            </div>
                        )}
                        <div
                            class={{ 'document-depater n-chunk': true, 'current-depater': props.current, 'other-depater': !props.current }}
                        >
                            <div class="document-depater__icon n-chunk n-column n-center n-middle">
                                <n-image preview-disabled src={pdf} width={30} />
                            </div>
                            <div class="n-chunk n-column n-auto">
                                <div style={{ fontSize: '14px', lineHeight: '22px' }}>
                                    <n-text depth={1}>
                                        <n-ellipsis tooltip={false}>{media.value?.fileName}</n-ellipsis>
                                    </n-text>
                                </div>
                                <div class="n-chunk n-center" style={{ fontSize: '12px', lineHeight: '20px' }}>
                                    {suffix.value && (
                                        <Fragment>
                                            <n-text depth={3}>{suffix.value}</n-text>
                                            <n-text depth={3} style={{ padding: '0 5px' }}>
                                                •
                                            </n-text>
                                        </Fragment>
                                    )}
                                    <n-text depth={3}>{divineBytefor(media.value?.fileSize ?? 0)}</n-text>
                                </div>
                            </div>
                            <div class="n-chunk n-center n-middle" style={{ width: '42px' }}>
                                <common-icon
                                    circle
                                    size={42}
                                    icon-size={24}
                                    spin={<common-loadiner size={24}></common-loadiner>}
                                    component={<Iv-BsDownload />}
                                    onClick={(scope: Omix<{ done: Function }>) => scope.done({ loading: true })}
                                ></common-icon>
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.document-depater {
    column-gap: 10px;
    padding: 10px;
    border-radius: 0 0 3px 3px;
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &.current-depater {
        background-color: var(--custom-document-current-color);
    }
    &.other-depater {
        background-color: var(--custom-document-other-color);
    }
}

.document-cover {
    position: relative;
    padding-bottom: 50%;
    border-radius: 3px 3px 0 0;
    overflow: hidden;
    &__container {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    :deep(.n-image),
    :deep(img) {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
