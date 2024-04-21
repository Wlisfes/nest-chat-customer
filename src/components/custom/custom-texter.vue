<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CustomTexter',
    props: {
        content: { type: String }
    },
    setup(props) {
        return () => (
            <div class="custom-texter">
                <n-text>{props.content}</n-text>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.custom-texter {
    font-size: 14px;
    line-height: 22px;
}
</style>
