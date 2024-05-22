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
        const { avatar, nickname } = useStore(useUser)

        async function createNotification() {
            const { destroy } = notification.create({
                closable: false,
                content: () => (
                    <n-element class="n-chunk n-column" style={{ padding: '16px', width: '240px' }}>
                        <div class="n-chunk n-center n-disover" style={{ gap: '14px' }}>
                            <chat-avatar size={60} src={avatar.value}></chat-avatar>
                            <div class="n-chunk n-column n-auto n-disover">
                                <n-h2 style={{ fontSize: '20px', lineHeight: '28px', fontWeight: 500, margin: 0 }}>
                                    <n-ellipsis tooltip={false}>{nickname.value}</n-ellipsis>
                                </n-h2>
                            </div>
                        </div>
                    </n-element>
                )
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
