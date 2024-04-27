<script lang="tsx">
import { defineComponent } from 'vue'
import { useUser, useMessenger, useSession, useComment } from '@/store'

export default defineComponent({
    name: 'ChatSettings',
    setup(props, { emit }) {
        const user = useUser()

        return () => (
            <div class="chat-settings n-chunk n-column n-auto n-disover">
                <chat-compose title="设置"></chat-compose>
                <div class="n-chunk n-column n-auto">
                    <n-scrollbar>
                        <div class="n-chunk n-center n-disover" style={{ padding: '20px 14px', columnGap: '10px' }}>
                            <chat-avatar size={80} radius={40} src={user.avatar}></chat-avatar>
                            <div class="n-chunk n-column n-auto">
                                <n-text strong depth={1} style={{ fontSize: '18px' }}>
                                    {user.nickname}
                                </n-text>
                                <n-text>你好，我正在使用Chat盒子</n-text>
                            </div>
                        </div>
                    </n-scrollbar>
                </div>
            </div>
        )
    }
})
</script>
