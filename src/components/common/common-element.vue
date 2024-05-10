<script lang="tsx">
import { defineComponent, computed, CSSProperties } from 'vue'

export default defineComponent({
    name: 'CommonElement',
    props: {
        select: { type: Boolean, default: true },
        lastChild: { type: Boolean, default: true },
        chunkBefore: { type: Object, default: () => ({ left: 14, right: 14 }) }
    },
    setup(props, { slots }) {
        const className = computed(() => ({
            'common-element chunk-before': true,
            'chunk-select': props.select,
            'chunk-last-child': props.lastChild
        }))
        const chunkStyle = computed<CSSProperties>(() => ({
            '--element-left-before': (props.chunkBefore.left ?? 14) + 'px',
            '--element-right-before': (props.chunkBefore.right ?? 14) + 'px'
        }))

        return () => (
            <div class={className.value} style={chunkStyle.value}>
                {slots.default && slots.default()}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-element {
    padding: 14px;
    column-gap: 14px;
    background-color: var(--chat-column-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
        background-color: var(--chat-column-hover-color);
    }
    &.chunk-select {
        user-select: none;
    }
    &.chunk-before::before {
        content: '';
        position: absolute;
        left: var(--element-left-before);
        right: var(--element-right-before);
        bottom: 0;
        height: 1px;
        background-color: var(--chat-border-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
    &.chunk-last-child:last-child::before {
        display: none;
    }
}
</style>
