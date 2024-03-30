<script lang="tsx">
import { defineComponent } from 'vue'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'CommonGrapher',

    setup(props, { slots }) {
        const { inverted } = useProvider()

        return () => (
            <n-button secondary={inverted.value} style={{ '--n-padding': '0px' }}>
                <n-image preview-disabled src="http://localhost:34570/web-service/common/grapher"></n-image>
            </n-button>
        )
    }
})
</script>
