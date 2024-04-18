<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatDynamic',
    setup(props, { emit }) {
        return () => <div class="chat-dynamic">dynamic</div>
    }
})
</script>
