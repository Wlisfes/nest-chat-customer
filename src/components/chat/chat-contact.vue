<script lang="tsx">
import { defineComponent, Fragment, PropType } from 'vue'
import { useNotification, useContact, useUser, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'
import { fetchNotification, fetchJoiner } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatContact',
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props) {
        const { observer } = useDrawer({ observer: props.observer, mount: true, unmount: true })
        const { state } = useStore(useContact)
        const { dot } = useStore(useNotification)
        const { uid } = useStore(useUser)

        /**联系人、社群申请操作**/
        async function fetchUseJoiner() {
            return await fetchJoiner({
                observer,
                title: '新增联系人',
                placeholder: 'UID/邮箱/用户昵称',
                source: env.EnumNotificationSource.contact,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount()
            })
        }

        /**联系人新增、通知组件**/
        async function fetchUseNotification() {
            return await fetchNotification({
                observer,
                title: '新对话',
                source: env.EnumNotificationSource.contact,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount()
            })
        }

        return () => (
            <div class="chat-contact n-chunk n-column n-auto n-disover n-pointer">
                <chat-compose observer={observer} title="联系人">
                    <n-badge
                        class="chat-compose-badge"
                        type="success"
                        processing
                        offset={[-12, 16]}
                        dot={dot.value.contact}
                        onClick={fetchUseNotification}
                    >
                        <common-icon circle size={40} icon-size={24} component={<Iv-BsAlert />}></common-icon>
                    </n-badge>
                </chat-compose>
                <div class="chunk-operate n-chunk n-center n-disover n-pointer" onClick={fetchUseJoiner}>
                    <n-icon-wrapper size={42} color="#2aa886" icon-color="#ffffff" border-radius={4}>
                        <n-icon size={28} component={<Iv-AsUser />}></n-icon>
                    </n-icon-wrapper>
                    <n-text depth={1} style={{ fontSize: '18px' }}>
                        新增联系人
                    </n-text>
                </div>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-scrollbar class="is-customize" trigger="none" size={60}>
                        <n-element class="n-chunk n-column">
                            {state.value.total > 0 && (
                                <div class="n-chunk n-column n-auto n-disover">
                                    {state.value.dataSource.map(item => (
                                        <div class="chunk-block n-chunk n-center n-pointer" key={item.keyId}>
                                            <Fragment>
                                                {item.user.uid === uid.value ? (
                                                    <chat-avatar size={42} src={item.nive.avatar}></chat-avatar>
                                                ) : (
                                                    <chat-avatar size={42} src={item.user.avatar}></chat-avatar>
                                                )}
                                            </Fragment>
                                            <div class="n-chunk n-column n-auto n-disover">
                                                <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                                                    {item.user.uid === uid.value ? (
                                                        <n-ellipsis tooltip={false}>{item.nive.nickname}</n-ellipsis>
                                                    ) : (
                                                        <n-ellipsis tooltip={false}>{item.user.nickname}</n-ellipsis>
                                                    )}
                                                </n-h2>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </n-element>
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
.chunk-block {
    user-select: none;
    padding: 14px;
    column-gap: 10px;
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
        background-color: var(--chat-column-hover-color);
    }
    &:not(:last-child)::before {
        content: '';
        position: absolute;
        left: 20px;
        right: 20px;
        bottom: 0;
        height: 1px;
        background-color: var(--chat-border-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
