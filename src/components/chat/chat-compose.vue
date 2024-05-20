<script lang="tsx">
import { defineComponent } from 'vue'
import { useNotification } from 'naive-ui'
import { useUser, useStore } from '@/store'

export default defineComponent({
    name: 'ChatCompose',
    props: {
        title: { type: String }
    },
    setup(props, { slots }) {
        const notification = useNotification()
        const { avatar } = useStore(useUser)

        async function createNotification() {
            const { destroy } = notification.create({
                closable: false,
                // avatar: () => <chat-avatar size={68} src={avatar.value}></chat-avatar>,
                // title: 'daskldjaskl ',
                // content: 'You can change the placement',
                content: () => <div>大师降低扫段首</div>
            })
        }

        return () => (
            <div class="chat-compose n-chunk n-center n-disover">
                <div class="n-chunk n-column n-auto n-disover" onClick={createNotification}>
                    <n-h1>{props.title}</n-h1>
                </div>
                {slots.default && slots.default()}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-compose {
    height: 60px;
    padding: 10px 14px;
    column-gap: 10px;
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
