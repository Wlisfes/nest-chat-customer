<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'LayerProfile',
    props: {
        element: { type: Object as PropType<HTMLElement> },
        width: { type: Number, default: 420 }
    },
    setup(props) {
        const { state, setState } = useState({ visible: false })

        onMounted(() => {
            return setState({ visible: true })
        })

        return () => (
            <n-drawer
                v-model:show={state.visible}
                width={props.width}
                to={props.element ?? document.body}
                auto-focus={false}
                mask-closable={false}
                show-mask={false}
                placement="left"
            ></n-drawer>
        )
    }
})
</script>
