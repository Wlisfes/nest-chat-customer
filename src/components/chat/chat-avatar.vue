<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties } from 'vue'

export default defineComponent({
    name: 'ChatAvatar',
    props: {
        src: { type: String },
        size: { type: Number, default: 40 },
        radius: { type: Number, default: 4 },
        customStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props) {
        const element = computed<CSSProperties>(() => ({
            '--chat-avatar-size': props.size + 'px',
            '--chat-avatar-border-radius': props.radius + 'px',
            ...props.customStyle
        }))

        return () => (
            <div class="chat-avatar n-chunk n-center n-middle n-disover" style={element.value}>
                <n-image preview-disabled src={props.src} />
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
}
</style>
