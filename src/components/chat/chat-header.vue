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
            <div class="chat-header n-chunk n-center n-disover">
                <n-button text onClick={(evt: Event) => emit('close', evt)}>
                    <n-icon size={24} component={<Iv-BsBack />}></n-icon>
                </n-button>
                <div class="n-chunk n-auto n-disover">
                    <n-text depth={2}>{props.title}</n-text>
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-header {
    overflow: hidden;
    padding: 16px 24px;
    font-size: 18px;
    line-height: 32px;
    column-gap: 20px;
    box-sizing: border-box;
}
</style>
