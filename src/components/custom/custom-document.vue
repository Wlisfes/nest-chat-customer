<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CustomTexter',
    props: {
        content: { type: String }
    },
    setup(props) {
        return () => <div class="custom-document">document</div>
    }
})
</script>

<style lang="scss" scoped>
.custom-document {
}
</style>
