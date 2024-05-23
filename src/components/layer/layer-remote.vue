<script lang="tsx">
import { defineComponent, onMounted, Transition } from 'vue'
import { useCurrentElement } from '@vueuse/core'
import { useUser, useStore } from '@/store'
import { divineTransfer } from '@/utils/utils-transfer'

export default defineComponent({
    name: 'DoneCallmer',
    setup(props, ctx) {
        const element = useCurrentElement<HTMLElement>()
        const { avatar, nickname } = useStore(useUser)

        onMounted(async () => {
            return await divineTransfer(element.value, '.done-callmer')
        })

        return () => (
            <n-element class="n-chunk n-column">
                <div class="done-callmer">
                    <div class="n-chunk n-column n-center n-disover" style={{ gap: '10px' }}>
                        <chat-avatar size={68} radius={34} src={avatar.value}></chat-avatar>
                        <n-h2 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500, margin: 0 }}>
                            <n-ellipsis tooltip={false}>{nickname.value}</n-ellipsis>
                        </n-h2>
                    </div>
                    <div>
                        <n-button color="#ff0000">
                            <n-icon size={22} color="#ffffff" component={<Iv-BsCaller />}></n-icon>
                        </n-button>
                    </div>
                </div>
            </n-element>
        )
    }
})
</script>
