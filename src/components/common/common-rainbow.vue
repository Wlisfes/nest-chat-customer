<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useCurrentElement } from '@vueuse/core'
import { createRainbowr } from '@/plugins/rainbow/rainbow.min'

export default defineComponent({
    name: 'CommonRainbow',
    setup(props) {
        const element = useCurrentElement()

        onMounted(() => {
            createRainbowr(element.value)
        })
        return () => <div class="common-rainbow"></div>
    }
})
</script>

<style lang="scss" scoped>
.common-rainbow {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
}
</style>
