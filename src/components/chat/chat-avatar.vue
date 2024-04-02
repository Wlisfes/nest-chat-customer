<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatAvatar',
    props: {
        title: { type: String }
    },
    setup(props, { emit }) {
        return () => (
            <div class="chat-avatar n-pointer">
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

<style lang="scss" scoped>
.chat-avatar {
    padding: 24px;
}
</style>
