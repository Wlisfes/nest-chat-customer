<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useUser, useSession } from '@/store'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatComment',
    setup(props) {
        const user = useUser()
        const session = useSession()

        return () => (
            <div class="chat-connect n-chunk n-center">
                {session.schema && (
                    <n-space align="center" wrap-item={false}>
                        {session.schema.source === env.EnumSessionSource.contact ? (
                            <Fragment>
                                {session.schema.contact.userId === user.uid ? (
                                    <chat-avatar size={34} src={session.schema.contact.nive.avatar}></chat-avatar>
                                ) : (
                                    <chat-avatar size={34} src={session.schema.contact.user.avatar}></chat-avatar>
                                )}
                                {session.schema.contact.userId === user.uid ? (
                                    <n-text depth={1} style={{ fontSize: '16px' }}>
                                        {session.schema.contact.nive.nickname}
                                    </n-text>
                                ) : (
                                    <n-text depth={1} style={{ fontSize: '16px' }}>
                                        {session.schema.contact.user.nickname}
                                    </n-text>
                                )}
                            </Fragment>
                        ) : session.schema.source === env.EnumSessionSource.communit ? (
                            <Fragment>
                                <chat-avatar size={34} src={session.schema.communit.poster.fileURL}></chat-avatar>
                                <n-text depth={1} style={{ fontSize: '16px' }}>
                                    {session.schema.communit.name}
                                </n-text>
                            </Fragment>
                        ) : null}
                    </n-space>
                )}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-connect {
    overflow: hidden;
    height: 60px;
    padding: 0 16px;
    background-color: var(--chat-connect-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    z-index: 10;
}
</style>
