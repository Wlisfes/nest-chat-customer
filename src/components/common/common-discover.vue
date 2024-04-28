<script lang="tsx">
import { defineComponent, PropType, VNode } from 'vue'

export default defineComponent({
    name: 'CommonDiscover',
    props: {
        icon: { type: Object as PropType<VNode> },
        content: { type: String },
        closable: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        return () => (
            <n-element class={{ 'common-discover n-chunk n-auto n-disover': true, 'is-closable': props.closable }}>
                {props.icon && <div class="n-chunk n-center">{props.icon}</div>}
                <div class="n-chunk n-column n-auto n-disover">
                    {slots.default ? (
                        slots.default()
                    ) : (
                        <n-text style={{ fontSize: '18px', lineHeight: '28px', fontWeight: 500 }}>{props.content}</n-text>
                    )}
                </div>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-discover {
    user-select: none;
    column-gap: 10px;
    &.is-closable {
        padding-right: 30px;
    }
}
</style>
