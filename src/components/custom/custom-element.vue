<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties } from 'vue'

export default defineComponent({
    name: 'CustomElement',
    props: {
        current: { type: Boolean, default: false },
        customStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props, { slots }) {
        const className = computed(() => ({
            'custom-element n-chunk n-column n-middle': true,
            'chunk-current': props.current,
            'chunk-other': !props.current
        }))

        return () => (
            <div class={className.value} style={props.customStyle}>
                {slots.default && slots.default()}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
// .element-date {
//     height: 24px;
//     padding: 0 2px;
//     box-sizing: border-box;
//     font-size: 12px;
//     line-height: 1;
//     user-select: none;
// }

.custom-element {
    padding: 3px;
    border-radius: 6px;
    box-sizing: content-box;
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &.chunk-current {
        background-color: var(--custom-element-current-color);
    }
    &.chunk-other {
        background-color: var(--custom-element-other-color);
    }
}
</style>
