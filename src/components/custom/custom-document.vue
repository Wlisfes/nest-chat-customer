<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { divineWherer, divineHandler } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'
import pdf from '@/assets/images/chat-pdf.png'

export default defineComponent({
    name: 'CustomTexter',
    props: {
        maxWidth: { type: Number, required: true },
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props) {
        const media = computed(() => (props.node.medias.length > 0 ? props.node.medias[0] : null))
        const suffix = computed(() => media.value?.fileName.split('.').pop()?.toLowerCase())
        // const fileIcon = computed(() => {
        //     const suffix = media.value?.fileName.split('.').pop().toLowerCase()
        //     const
        // })

        console.log(suffix.value)

        return () => (
            <div class="custom-document n-chunk n-column n-disover" style={{ '--custom-max-width': props.maxWidth + 'px' }}>
                {media.value && (
                    <Fragment>
                        {suffix.value === 'pdf' && (
                            <div class="document-cover">
                                <div class="document-cover__container">
                                    <n-image preview-disabled src={media.value.depater.fileURL} />
                                </div>
                            </div>
                        )}
                        <div class="document-depater n-chunk">
                            <n-image preview-disabled src={pdf} />
                            <div>
                                <div>
                                    <n-text>{media.value?.fileName}</n-text>
                                </div>
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
.custom-document {
    width: var(--custom-max-width);
}

.document-depater {
    padding: 10px;
    background-color: var(--custom-element-other-color);
}

.document-cover {
    position: relative;
    padding-bottom: 50%;
    border-radius: 4px;
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
