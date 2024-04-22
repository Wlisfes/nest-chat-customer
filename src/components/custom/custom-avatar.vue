<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties } from 'vue'

export default defineComponent({
    name: 'CustomAvatar',
    props: {
        src: { type: String },
        size: { type: Number, default: 40 },
        radius: { type: Number, default: 4 },
        customStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props) {
        const element = computed<CSSProperties>(() => ({
            '--custom-size-avatar': props.size + 'px',
            '--custom-border-radius': props.radius + 'px',
            ...props.customStyle
        }))

        return () => (
            <div class="custom-avatar n-chunk n-center n-middle n-disover" style={element.value}>
                <n-image preview-disabled src={props.src} />
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.custom-avatar {
    width: var(--custom-size-avatar);
    height: var(--custom-size-avatar);
    min-width: var(--custom-size-avatar);
    min-height: var(--custom-size-avatar);
    border-radius: var(--custom-border-radius);
    position: relative;
    overflow: hidden;
    :deep(.n-image),
    :deep(img) {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
