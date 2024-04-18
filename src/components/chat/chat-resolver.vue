<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatResolver',
    setup(props, { emit }) {
        return () => (
            <div class="chat-resolver n-chunk n-column n-auto n-disover">
                <chat-compose title="个人信息"></chat-compose>
            </div>
        )
    }
})
</script>
