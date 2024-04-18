<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatResolver',
    setup(props, { emit }) {
        return () => <div class="chat-resolver"></div>
    }
})
</script>
