<script lang="tsx">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'ChatChane',
    setup(props, { emit }) {
        return () => (
            <div class="chat-chane n-chunk n-column n-auto n-disover">
                <chat-compose title="频道"></chat-compose>
            </div>
        )
    }
})
</script>
