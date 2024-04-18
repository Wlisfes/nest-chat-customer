<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatSociety',
    setup(props, { emit }) {
        return () => (
            <div class="chat-society n-chunk n-column n-auto n-disover">
                <chat-compose title="社群"></chat-compose>
            </div>
        )
    }
})
</script>
