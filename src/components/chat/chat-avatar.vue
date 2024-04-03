<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatAvatar',
    props: {
        url: { type: String }
    },
    setup(props, { emit }) {
        return () => (
            <div class="chat-avatar n-chunk n-center n-middle">
                <div class="chat-pointer n-chunk n-center n-middle">
                    <n-avatar round size={200} src={props.url} />
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-pointer {
    cursor: pointer;
    overflow: hidden;
}
</style>
