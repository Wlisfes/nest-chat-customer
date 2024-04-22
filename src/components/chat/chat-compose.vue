<script lang="tsx">
import { defineComponent } from 'vue'
import { useConfiger } from '@/store'

export default defineComponent({
    name: 'ChatCompose',
    props: {
        title: { type: String }
    },
    setup(props) {
        const configer = useConfiger()

        return () => (
            <div class="chat-compose n-chunk n-center n-space">
                <n-h1>{props.title}</n-h1>
                <n-button type="primary" onClick={(scope: Omix) => configer.setTheme(configer.theme === 'light' ? 'dark' : 'light')}>
                    {configer.theme}
                </n-button>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-compose {
    height: 60px;
    padding: 10px 14px;
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
