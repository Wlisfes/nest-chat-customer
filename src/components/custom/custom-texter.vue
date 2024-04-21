<script lang="tsx">
import { defineComponent, CSSProperties, PropType } from 'vue'

export default defineComponent({
    name: 'CustomTexter',
    props: {
        maxWidth: { type: Number, required: true },
        content: { type: String },
        customStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props) {
        return () => (
            <div class="custom-texter" style={{ '--custom-max-width': props.maxWidth + 'px', ...props.customStyle }}>
                <n-text>{props.content}</n-text>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.custom-texter {
    max-width: var(--custom-max-width);
    font-size: 14px;
    line-height: 22px;
}
</style>
