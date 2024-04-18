<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { useUser, useChat } from '@/store'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatCarte',
    setup(props, { emit }) {
        const chat = useChat()
        const user = useUser()
        const dataSource = ref([
            { title: '', value: 'session', icon: <Iv-BsSession />, select: <Iv-RsSession /> },
            { title: '', value: 'society', icon: <Iv-BsSociety />, select: <Iv-RsSociety /> },
            { title: '', value: 'chane', icon: <Iv-BsChane />, select: <Iv-RsChane /> },
            { title: '', value: 'dynamic', icon: <Iv-BsDynamic />, select: <Iv-RsDynamic /> }
        ])

        function divineCommonStyleWherer(value: string) {
            return divineWherer(value === chat.current, { '--n-color': 'var(--n-color-hover)' }, {})
        }

        return () => (
            <div class="chat-carte n-chunk n-column n-auto n-space">
                <n-space vertical wrap-item={false} size={[0, 14]}>
                    {dataSource.value.map(item => (
                        <common-icon
                            key={item.value}
                            circle
                            size={40}
                            icon-size={24}
                            component={item.icon}
                            common-style={divineCommonStyleWherer(item.value)}
                            onClick={(evt: Event) => chat.setState({ current: item.value })}
                        ></common-icon>
                    ))}
                </n-space>
                <n-space vertical wrap-item={false} size={[0, 14]}>
                    <common-icon
                        circle
                        size={40}
                        icon-size={22}
                        component={<Iv-RsSettings />}
                        common-style={divineCommonStyleWherer('settings')}
                        onClick={(evt: Event) => chat.setState({ current: 'settings' })}
                    ></common-icon>
                    <common-icon
                        circle
                        size={40}
                        icon-size={30}
                        component={<n-image preview-disabled src={user.avatar} />}
                        common-style={divineCommonStyleWherer('resolver')}
                        onClick={(evt: Event) => chat.setState({ current: 'resolver' })}
                    ></common-icon>
                </n-space>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-carte {
    overflow: hidden;
    padding: 12px 10px 20px 10px;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        border-right: 1px solid var(--chat-border-color);
        transition: border-right 0.3s var(--cubic-bezier-ease-in-out);
        z-index: 1;
    }
    :deep(.n-image),
    :deep(.n-image > img) {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
    }
}
</style>
