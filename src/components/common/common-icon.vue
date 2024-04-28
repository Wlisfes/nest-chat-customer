<script lang="tsx">
import { defineComponent, computed, PropType, VNode, CSSProperties } from 'vue'

export default defineComponent({
    name: 'CommonIcon',
    emits: ['click'],
    props: {
        component: { type: Object as PropType<VNode> },
        spin: { type: Object as PropType<VNode> },
        size: { type: Number, default: 24 },
        iconSize: { type: Number, default: 24 },
        commonStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        circle: { type: Boolean, default: false }
    },
    setup(props, { emit }) {
        const compute = computed<CSSProperties>(() => ({
            '--n-padding': '0px',
            '--n-height': props.size + 'px',
            '--n-width': props.size + 'px',
            ...props.commonStyle
        }))

        async function onHandle(data: Omix, done: Function, evt: MouseEvent) {
            return emit('click', Object.assign(data, { done, evt }))
        }

        return () => (
            <div class="common-state n-chunk n-column n-center n-middle" style={{ display: 'inline-flex' }}>
                <common-state
                    v-slots={{
                        default: (data: Omix<{ disabled: boolean; loading: boolean }>, done: Function) => (
                            <n-button
                                quaternary
                                focusable={false}
                                circle={props.circle}
                                disabled={data.disabled || data.loading}
                                style={compute.value}
                                onClick={(evt: MouseEvent) => onHandle(data, done, evt)}
                            >
                                {data.loading || data.disabled ? (
                                    props.spin ?? null
                                ) : (
                                    <n-icon size={props.iconSize} component={props.component}></n-icon>
                                )}
                            </n-button>
                        )
                    }}
                ></common-state>
            </div>
        )
    }
})
</script>
