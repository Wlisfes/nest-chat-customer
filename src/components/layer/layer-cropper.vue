<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useModal } from '@/hooks/hook-layer'
import { divineRender } from '@/utils/utils-component'
import { divineTransfer } from '@/utils/utils-transfer'

export default defineComponent({
    name: 'LayerCropper',
    emits: ['close', 'submit'],
    setup(props, ctx) {
        const { state, chunkContent, setState } = useModal({ width: 540 })

        onMounted(() => {
            setState({ visible: true })
        })

        return () => (
            <n-modal
                v-model:show={state.visible}
                auto-focus={false}
                mask-closable={false}
                show-icon={false}
                preset="dialog"
                style={chunkContent.value}
                onAfterEnter={(el: HTMLElement) => divineTransfer(el)}
                title={divineRender(<done-title content="法律手段和反抗精神的回复"></done-title>)}
            ></n-modal>
        )
    }
})
</script>
