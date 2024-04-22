<script lang="tsx">
import { defineComponent, CSSProperties, PropType } from 'vue'

export default defineComponent({
    name: 'CustomTexter',
    props: {
        current: { type: Boolean, default: false },
        maxWidth: { type: Number, required: true },
        content: { type: String },
        customStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props, { slots }) {
        return () => (
            <custom-element current={props.current}>
                <div class="custom-texter" style={{ maxWidth: props.maxWidth + 'px', ...props.customStyle }}>
                    <n-text>{props.content}</n-text>
                </div>
            </custom-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.custom-texter {
    font-size: 14px;
    line-height: 20px;
    padding: 7px 12px;
    overflow: hidden;
    border-radius: 3px;
}
</style>
