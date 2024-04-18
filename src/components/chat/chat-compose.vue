<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatCompose',
    props: {
        title: { type: String }
    },
    setup(props) {
        return () => (
            <div class="chat-compose n-chunk n-center n-space">
                <n-h1>{props.title}</n-h1>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-compose {
    height: 60px;
    padding: 10px 16px;
    box-sizing: border-box;
    background-color: var(--chat-compose-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    .n-h1 {
        font-size: 24px;
        line-height: 40px;
        font-weight: 500;
        margin: 0;
        user-select: none;
    }
}
</style>
