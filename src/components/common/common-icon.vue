<script lang="tsx">
import { defineComponent, computed, PropType, VNode, CSSProperties } from 'vue'

export default defineComponent({
    name: 'CommonIcon',
    emits: ['click'],
    props: {
        component: { type: Object as PropType<VNode> },
        spin: { type: Object as PropType<VNode> },
        size: { type: Number, default: 24 },
        iconSize: { type: Number, default: 24 }
    },
    setup(props, { slots, emit }) {
        const compute = computed<CSSProperties>(() => ({
            '--n-padding': '0px',
            '--n-height': props.size + 'px',
            '--n-width': props.size + 'px'
        }))

        async function onHandle(data: Omix, done: Function, evt: MouseEvent) {
            return emit('click', Object.assign(data, { done, evt }))
        }

        return () => (
            <common-state>
                {{
                    default: (data: Omix<{ disabled: boolean; loading: boolean }>, done: Function) => (
                        <n-button
                            quaternary
                            focusable={false}
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
            </common-state>
        )
    }
})
</script>
