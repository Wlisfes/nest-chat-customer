<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { faker } from '@/hooks/hook-common'
import { divineWherer } from '@/utils/utils-common'
import { socket, divineSocketCustomizeMessager } from '@/utils/utils-websocket'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatComment',
    setup(props) {
        const { inverted } = useProvider()

        function onSender() {
            divineSocketCustomizeMessager(socket.value, {
                sessionId: `2156085601013678080`,
                source: env.EnumMessagerSource.text,
                text: faker.lorem.text()
                // fileId: '2156661373931700224'
            }).then(response => {
                console.log(response)
            })
        }

        return () => (
            <div class="chat-comment n-chunk">
                <n-button onClick={onSender}>Sender</n-button>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-comment {
    overflow: hidden;
    height: 64px;
    background-color: var(--chat-comment-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
