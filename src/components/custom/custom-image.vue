<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { divineWherer } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'CustomImage',
    props: {
        largeWidth: { type: Number, default: 420 },
        smallWidth: { type: Number, default: 260 },
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props) {
        const media = computed(() => (props.node.medias.length > 0 ? props.node.medias[0] : null))
        const maxWidth = computed(() => {
            if (media.value && media.value.width > media.value.height) {
                return props.largeWidth
            }
            return props.smallWidth
        })

        return () => (
            <div class="custom-image n-chunk n-center n-middle n-disover" style={{ '--custom-max-width': maxWidth.value + 'px' }}>
                {media.value && (
                    <div class="custom-scale">
                        <n-image show-toolbar={false} src={media.value.fileURL} />
                    </div>
                )}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.custom-image {
    user-select: none;
    max-width: var(--custom-max-width);
    border-radius: 6px;
    max-height: 420px;
    :deep(.n-image),
    :deep(img) {
        width: 100%;
        display: block;
    }
}
</style>
