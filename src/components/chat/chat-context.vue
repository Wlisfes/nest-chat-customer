<script lang="tsx">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'ChatContext',
    props: {
        element: { type: Object as PropType<HTMLElement> }
    },
    setup(props) {
        return () => (
            <div class="chat-context n-chunk n-column n-auto">
                <chat-connect></chat-connect>
                <div class="chat-context__scrollbar n-chunk n-column n-auto">
                    <chat-messenger></chat-messenger>
                </div>
                <chat-comment></chat-comment>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-context {
    position: relative;
    overflow: hidden;
    &__scrollbar {
        flex: 1;
        position: relative;
        overflow: hidden;
    }
}
</style>
