<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatContext',
    setup(props) {
        return () => (
            <div class="chat-context n-chunk n-column n-auto n-disover">
                <chat-connect></chat-connect>
                <div class="n-chunk n-column n-auto n-disover">
                    <chat-messenger></chat-messenger>
                </div>
                <chat-comment></chat-comment>
            </div>
        )
    }
})
</script>
