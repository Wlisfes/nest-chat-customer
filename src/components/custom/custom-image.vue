<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties } from 'vue'
import { useState } from '@/hooks/hook-state'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'CustomImage',
    props: {
        current: { type: Boolean, default: false },
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props) {
        const { state } = useState({ large: 420, small: 260 })
        const media = computed(() => (props.node.medias.length > 0 ? props.node.medias[0] : null))
        const scale = computed(() => media.value && media.value.width > media.value.height)
        const width = computed(() => (scale.value ? state.large : state.small))
        const height = computed(() => {
            if (scale.value && media.value) {
                return (width.value / media.value.width) * media.value.height
            } else if (media.value) {
                const h = (width.value / media.value.width) * media.value.height
                return h > state.large ? state.large : h
            }
            return 0
        })
        const element = computed<CSSProperties>(() => ({
            width: '100%',
            paddingBottom: (height.value / width.value) * 100 + '%'
        }))

        return () => (
            <custom-element current={props.current} custom-style={{ width: '100%', maxWidth: width.value + 'px' }}>
                {media.value && (
                    <div class="custom-scale" style={element.value}>
                        <div class="custom-scale__component n-chunk n-disover">
                            <n-image object-fit="cover" show-toolbar={false} src={media.value.fileURL} />
                        </div>
                    </div>
                )}
            </custom-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.custom-scale {
    position: relative;
    border-radius: 3px;
    overflow: hidden;
    &__component {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .n-image,
    :deep(img) {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
