<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatHeader',
    emits: ['close'],
    props: {
        title: { type: String }
    },
    setup(props, { emit }) {
        return () => (
            <div class="chat-header n-chunk n-center">
                <n-button text onClick={(evt: Event) => emit('close', evt)}>
                    <n-icon size={24} color="var(--chat-header-text-color)" component={<Iv-BsBack />}></n-icon>
                </n-button>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    <n-ellipsis tooltip={false}>
                        <n-text style={{ color: 'var(--chat-header-text-color)' }}>{props.title}</n-text>
                    </n-ellipsis>
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-header {
    height: 128px;
    overflow: hidden;
    background-color: var(--chat-header-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    padding: 76px 24px 20px;
    font-size: 20px;
    line-height: 32px;
    gap: 20px;
    box-sizing: border-box;
}
</style>
