<script lang="tsx">
import { defineComponent, PropType, CSSProperties } from 'vue'

export default defineComponent({
    name: 'ChatAvatar',
    setup(props, { emit }) {
        return () => (
            <div class="chat-avatar n-chunk n-center n-middle n-pointer">
                <n-avatar
                    round
                    size={200}
                    src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg?x-oss-process=style/resize-1-1"
                />
            </div>
        )
    }
})
</script>
