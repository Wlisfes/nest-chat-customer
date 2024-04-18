<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatSettings',
    setup(props, { emit }) {
        return () => (
            <div class="chat-settings n-chunk n-column n-auto n-disover">
                <chat-compose title="设置"></chat-compose>
            </div>
        )
    }
})
</script>
