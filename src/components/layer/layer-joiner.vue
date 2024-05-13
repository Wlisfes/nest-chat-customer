<script lang="tsx">
import { defineComponent, onMounted, Fragment, PropType } from 'vue'
import { useContact, useCommunit, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { useState } from '@/hooks/hook-state'
import { Observer } from '@/utils/utils-observer'
import { divineHandler } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'
import _ from 'lodash'

export default defineComponent({
    name: 'LayerJoiner',
    emits: ['close', 'submit'],
    props: {
        title: { type: String, default: '查找联系人' },
        placeholder: { type: String, default: 'UID/邮箱/用户昵称' },
        source: { type: String as PropType<env.EnumNotificationSource>, required: true },
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { dataContact, fetchContactColumnSearch } = useStore(useContact)
        const { dataCommunit, fetchCommunitColumnSearch } = useStore(useCommunit)
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()
        const { state, setState } = useState({ keyword: '', loading: false })

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineLayerUnmounted(props.observer, async () => {
                await setState({ keyword: '', loading: false })
                return await fetchState({ visible: false })
            })
        })

        const onUpdate = _.debounce(
            async (keyword: string) => {
                await setState({ loading: true })
                await divineHandler(props.source === env.EnumNotificationSource.contact, {
                    handler: () => fetchContactColumnSearch(keyword),
                    failure: () => fetchCommunitColumnSearch(keyword)
                })
                return await setState({ loading: false })
            },
            500,
            { trailing: true }
        )

        return () => (
            <n-drawer
                v-model:show={visible.value}
                to={element.value}
                content-style={chunkContent.value}
                width="100%"
                placement="right"
                show-mask="transparent"
                auto-focus={false}
                mask-closable={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-joiner n-chunk n-column n-auto n-disover">
                    <chat-header title={props.title} onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="n-chunk n-column" style={{ padding: '0px 14px 14px' }}>
                        <chat-searcher
                            auto-focus
                            v-model:content={state.keyword}
                            placeholder={props.placeholder}
                            onUpdate={onUpdate}
                        ></chat-searcher>
                    </div>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-scrollbar class="is-customize" trigger="none" size={60}>
                            {state.loading && (
                                <div class="n-chunk n-column n-center n-middle" style={{ padding: '0 20px 20px' }}>
                                    <common-loadiner size={32} size-border={4}></common-loadiner>
                                </div>
                            )}
                            {props.source === env.EnumNotificationSource.contact ? (
                                <Fragment>
                                    {!state.loading && dataContact.value.length === 0 && (
                                        <div class="n-chunk n-column n-disover" style={{ padding: '14px' }}>
                                            <n-empty description="暂无用户"></n-empty>
                                        </div>
                                    )}
                                    {dataContact.value.length > 0 && (
                                        <div class="n-chunk n-column n-disover">
                                            {dataContact.value.map(item => (
                                                <next-join-contact key={item.keyId} node={item}></next-join-contact>
                                            ))}
                                        </div>
                                    )}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {!state.loading && dataCommunit.value.length === 0 && (
                                        <div class="n-chunk n-column n-disover" style={{ padding: '14px' }}>
                                            <n-empty description="暂无社群"></n-empty>
                                        </div>
                                    )}
                                    {dataCommunit.value.length > 0 && (
                                        <div class="n-chunk n-column n-disover">
                                            {dataCommunit.value.map(item => (
                                                <next-join-communit key={item.keyId} node={item}></next-join-communit>
                                            ))}
                                        </div>
                                    )}
                                </Fragment>
                            )}
                        </n-scrollbar>
                    </div>
                </n-element>
            </n-drawer>
        )
    }
})
</script>

<style lang="scss" scoped>
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
