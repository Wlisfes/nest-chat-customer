<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatMarker',
    setup(props, { emit }) {
        return () => <div class="chat-marker">marker</div>
    }
})
</script>
