<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
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
        const scale = computed(() => media.value && media.value.width > media.value.height)
        const width = computed(() => (scale.value ? props.largeWidth : props.smallWidth))
        const height = computed(() => {
            if (scale.value && media.value) {
                return (width.value / media.value.width) * media.value.height
            } else if (media.value) {
                const h = (width.value / media.value.width) * media.value.height
                return h > props.largeWidth ? props.largeWidth : h
            }
            return 0
        })

        return () => (
            <div class="custom-image n-chunk n-center n-middle n-disover">
                {media.value && (
                    <div class="custom-scale n-chunk n-disover" style={{ width: width.value + 'px', height: height.value + 'px' }}>
                        <n-image object-fit="cover" show-toolbar={false} src={media.value.fileURL} />
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
    border-radius: 3px;
    .n-image,
    :deep(img) {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
