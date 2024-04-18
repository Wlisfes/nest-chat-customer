<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatDynamic',
    setup(props, { emit }) {
        return () => (
            <div class="chat-dynamic n-chunk n-column n-auto n-disover">
                <chat-compose title="动态"></chat-compose>
            </div>
        )
    }
})
</script>
