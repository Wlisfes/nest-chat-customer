<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useCommunit, useNotification, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'
import { divineNotice } from '@/utils/utils-component'
import { fetchCommunit, fetchNotification, fetchJoiner } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatCommunit',
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props) {
        const { total, dataSource, fetchCommunitColumn } = useStore(useCommunit)
        const { dot } = useStore(useNotification)
        const { observer } = useDrawer({ observer: props.observer, mount: true, unmount: true })

        /**新建社群**/
        async function fetchUseCommunit() {
            return await fetchCommunit({
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

        /**查找社群**/
        async function fetchUseJoiner() {
            return await fetchJoiner({
                observer,
                title: '查找社群',
                placeholder: 'UID/社群名称',
                source: env.EnumNotificationSource.communit,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount()
            })
        }

        /**通知组件**/
        async function fetchUseNotification() {
            return await fetchNotification({
                observer,
                title: '新对话',
                source: env.EnumNotificationSource.communit,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount()
            })
        }

        return () => (
            <div class="chat-communit n-chunk n-column n-auto n-disover n-pointer">
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
                <common-element class="n-chunk n-center n-disover n-pointer" onClick={fetchUseCommunit}>
                    <n-icon-wrapper size={42} color="#2aa886" icon-color="#ffffff" border-radius={4}>
                        <n-icon size={28} component={<Iv-NsSociety />}></n-icon>
                    </n-icon-wrapper>
                    <n-text depth={1} style={{ fontSize: '18px' }}>
                        新建社群
                    </n-text>
                </common-element>
                <common-element class="n-chunk n-center n-disover n-pointer" chunk-before={{ left: 0, right: 0 }} onClick={fetchUseJoiner}>
                    <n-icon-wrapper size={42} color="#f0a020" icon-color="#ffffff" border-radius={4}>
                        <n-icon size={28} component={<Iv-AsCommunit />}></n-icon>
                    </n-icon-wrapper>
                    <n-text depth={1} style={{ fontSize: '18px' }}>
                        查找社群
                    </n-text>
                </common-element>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-scrollbar class="is-customize" trigger="none" size={60}>
                        {total.value === 0 ? (
                            <div class="n-chunk n-column n-disover" style={{ padding: '14px' }}>
                                <n-empty description="暂无社群"></n-empty>
                            </div>
                        ) : (
                            <n-element class="n-chunk n-column n-auto n-disover">
                                {dataSource.value.map(item => (
                                    <next-column-communit key={item.keyId} node={item}></next-column-communit>
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

<style lang="scss" scoped>
.chunk-operate {
    user-select: none;
    overflow: hidden;
    padding: 14px;
    column-gap: 10px;
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
