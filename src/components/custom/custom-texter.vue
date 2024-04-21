<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CustomTexter',
    props: {
        maxWidth: { type: Number, required: true },
        content: { type: String }
    },
    setup(props) {
        return () => (
            <div class="custom-texter" style={{ '--custom-max-width': props.maxWidth + 'px' }}>
                <n-text>{props.content}</n-text>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.custom-texter {
    max-width: var(--custom-max-width);
    font-size: 14px;
    line-height: 22px;
}
</style>
