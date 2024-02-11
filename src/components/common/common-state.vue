<script lang="tsx">
import { defineComponent, Fragment, PropType, VNode } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonState',
    props: {
        dataRender: { type: Function as PropType<(e: Record<string, unknown>, c: unknown) => VNode> }
    },
    setup(props, { slots }) {
        const { state, setState } = useState({
            loading: false,
            disabled: false
        })

        return () => {
            return (
                <Fragment>
                    {props.dataRender ? (
                        <Fragment>{props.dataRender(state, setState)}</Fragment>
                    ) : slots.default ? (
                        <Fragment>{slots.default(state, setState)}</Fragment>
                    ) : null}
                </Fragment>
            )
        }
    }
})
</script>
