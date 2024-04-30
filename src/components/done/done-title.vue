<script lang="tsx">
import { defineComponent, computed, createVNode, Fragment, PropType, VNode, CSSProperties } from 'vue'

export default defineComponent({
    name: 'DoneTitle',
    props: {
        type: { type: String, default: 'default' },
        icon: { type: [String, Object] as PropType<String | VNode> },
        content: { type: String },
        closable: { type: Boolean, default: false },
        commonStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props, { slots }) {
        const color = computed(() => {
            const Colors = {
                ['default']: 'var(--warning-color)',
                ['info']: 'var(--info-color)',
                ['warning']: 'var(--warning-color)',
                ['success']: 'var(--success-color)',
                ['error']: 'var(--error-color)'
            }
            return Colors[props.type as keyof typeof Colors]
        })
        const titleStyle = computed<CSSProperties>(() => ({
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: 500,
            ...props.commonStyle
        }))

        return () => (
            <n-element class={{ 'done-title n-chunk n-auto n-disover': true, 'is-closable': props.closable }}>
                {props.icon && (
                    <div class="n-chunk n-center">
                        {typeof props.icon === 'string' ? (
                            <Fragment>
                                {props.icon === 'BsMistake' ? (
                                    <n-icon size={26} color={color.value} component={<Iv-BsMistake />}></n-icon>
                                ) : props.icon === 'BsCorrect' ? (
                                    <n-icon size={26} color={color.value} component={<Iv-BsCorrect />}></n-icon>
                                ) : (
                                    createVNode(props.icon, { color: color.value })
                                )}
                            </Fragment>
                        ) : (
                            props.icon
                        )}
                    </div>
                )}
                <div class="n-chunk n-column n-auto n-disover">
                    {slots.default ? (
                        slots.default()
                    ) : (
                        <n-text depth={1} style={titleStyle.value}>
                            {props.content}
                        </n-text>
                    )}
                </div>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.done-title {
    user-select: none;
    column-gap: 10px;
    &.is-closable {
        padding-right: 30px;
    }
}
</style>
