<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useSession, useUser, useCommunit, useNotification, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'
import { divineNotice } from '@/utils/utils-component'
import { fetchSociety, fetchNotification } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatSociety',
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props) {
        const { state, fetchCommunitColumn } = useStore(useCommunit)
        const { dot } = useStore(useNotification)
        const { uid } = useStore(useUser)
        const { observer } = useDrawer({ observer: props.observer, mount: true, unmount: true })

        /**新建社群**/
        async function fetchUseSociety() {
            return await fetchSociety({
                observer,
                onClose: async ({ unmount }: Omix<{ unmount: Function }>) => {
                    return await unmount(300)
                },
                onSubmit: async ({ done, message }: Omix<{ message: string; done: Function }>) => {
                    await fetchCommunitColumn()
                    await divineNotice({ type: 'success', title: message })
                    return await done({ visible: false })
                }
            })
        }

        /**查找社群、通知组件**/
        async function fetchUseNotification() {
            return await fetchNotification({
                observer,
                title: '新对话',
                source: env.EnumNotificationSource.communit,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount()
            })
        }

        return () => (
            <div class="chat-society n-chunk n-column n-auto n-disover n-pointer">
                <chat-compose observer={observer} title="社群">
                    <n-badge
                        class="chat-compose-badge"
                        type="success"
                        processing
                        offset={[-12, 16]}
                        dot={dot.value.communit}
                        onClick={fetchUseNotification}
                    >
                        <common-icon circle size={40} icon-size={24} component={<Iv-BsAlert />}></common-icon>
                    </n-badge>
                </chat-compose>
                <div class="chunk-operate n-chunk n-center n-disover n-pointer" onClick={fetchUseSociety}>
                    <n-icon-wrapper size={42} color="#2aa886" icon-color="#ffffff" border-radius={4}>
                        <n-icon size={28} component={<Iv-NsSociety />}></n-icon>
                    </n-icon-wrapper>
                    <n-text depth={1} style={{ fontSize: '18px' }}>
                        新建社群
                    </n-text>
                </div>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-scrollbar class="is-customize" trigger="none" size={60}>
                        <n-element class="n-chunk n-column"></n-element>
                    </n-scrollbar>
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chunk-operate {
    user-select: none;
    overflow: hidden;
    padding: 14px;
    column-gap: 14px;
    background-color: var(--chat-column-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
        background-color: var(--chat-column-hover-color);
    }
    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background-color: var(--chat-border-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
