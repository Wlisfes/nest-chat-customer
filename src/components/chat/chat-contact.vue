<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useNotification, useContact, useStore } from '@/store'
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
        const { total, dataSource } = useStore(useContact)
        const { dot } = useStore(useNotification)

        /**新增联系人**/
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
                <common-element class="n-chunk n-center n-disover n-pointer" chunk-before={{ left: 0, right: 0 }} onClick={fetchUseJoiner}>
                    <n-icon-wrapper size={42} color="#2aa886" icon-color="#ffffff" border-radius={4}>
                        <n-icon size={28} component={<Iv-AsUser />}></n-icon>
                    </n-icon-wrapper>
                    <n-text depth={1} style={{ fontSize: '18px' }}>
                        新增联系人
                    </n-text>
                </common-element>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-scrollbar class="is-customize" trigger="none" size={60}>
                        {total.value === 0 ? (
                            <div class="n-chunk n-column n-disover" style={{ padding: '14px' }}>
                                <n-empty description="暂无联系人"></n-empty>
                            </div>
                        ) : (
                            <n-element class="n-chunk n-column n-auto n-disover">
                                {dataSource.value.map(item => (
                                    <next-column-contact key={item.keyId} node={item}></next-column-contact>
                                ))}
                            </n-element>
                        )}
                    </n-scrollbar>
                </div>
            </div>
        )
    }
})
</script>
