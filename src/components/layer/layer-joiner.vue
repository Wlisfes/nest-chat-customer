<script lang="tsx">
import { defineComponent, ref, Ref, onMounted, Fragment, PropType } from 'vue'
import { useUser, useNotification, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { useState } from '@/hooks/hook-state'
import { Observer } from '@/utils/utils-observer'
import { divineWherer, divineHandler } from '@/utils/utils-common'
import { divineRender, divineNotice } from '@/utils/utils-component'
import { httpContactSearch, httpNotificationUpdate } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'
import _ from 'lodash'

export default defineComponent({
    name: 'LayerJoiner',
    emits: ['close', 'submit'],
    props: {
        title: { type: String, default: '新增联系人' },
        placeholder: { type: String, default: 'UID/邮箱/用户昵称' },
        source: { type: String as PropType<env.EnumNotificationSource>, required: true },
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { uid } = useStore(useUser)
        const { fetchNotificationColumn } = useStore(useNotification)
        const { visible, element, chunkContent, fetchState, divineLayerUnmounted } = useDrawer()
        const { state, setState } = useState({
            keyword: '',
            loading: false,
            dataContact: [] as Array<env.SchemaUser>,
            dataCommunit: []
        })

        onMounted(async () => {
            await fetchState({ visible: true })
            await divineLayerUnmounted(props.observer, () => {
                return fetchState({ visible: false })
            })
            return await divineHandler(props.source === env.EnumNotificationSource.contact, {
                handler: fetchContactSearch
            })
        })

        /**用户关键字列表搜索**/
        async function fetchContactSearch() {
            try {
                await setState({ loading: true })
                const { data } = await httpContactSearch({ keyword: state.keyword })
                return await setState({ loading: false, dataCommunit: [], dataContact: data.list })
            } catch (e) {
                return await setState({ loading: false, dataCommunit: [], dataContact: [] })
            }
        }

        const onUpdateThrottle = _.debounce(
            async value => {
                return await divineHandler(props.source === env.EnumNotificationSource.contact, {
                    handler: fetchContactSearch
                })
            },
            500,
            { trailing: true }
        )

        return () => (
            <n-drawer
                v-model:show={visible.value}
                width="100%"
                to={element.value}
                content-style={chunkContent.value}
                placement="right"
                auto-focus={false}
                mask-closable={false}
                show-mask="transparent"
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-joiner n-chunk n-column n-auto n-disover">
                    <chat-header title={props.title} onClose={(evt: Event) => fetchState({ visible: false })}></chat-header>
                    <div class="n-chunk n-column" style={{ padding: '0px 14px 14px' }}>
                        <chat-searcher
                            auto-focus
                            v-model:content={state.keyword}
                            placeholder={props.placeholder}
                            onUpdate={onUpdateThrottle}
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
                                    {!state.loading && state.dataContact.length === 0 && (
                                        <div class="n-chunk n-column n-disover" style={{ padding: '14px' }}>
                                            <n-empty description="暂无数据"></n-empty>
                                        </div>
                                    )}
                                    {state.dataContact.length > 0 && (
                                        <div class="n-chunk n-column n-disover">
                                            {state.dataContact.map(item => (
                                                <next-join-contact key={item.keyId} node={item}></next-join-contact>
                                            ))}
                                        </div>
                                    )}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {!state.loading && state.dataCommunit.length === 0 && (
                                        <div class="n-chunk n-column n-disover" style={{ padding: '14px' }}>
                                            <n-empty description="暂无数据"></n-empty>
                                        </div>
                                    )}
                                    {state.dataCommunit.length > 0 && <div class="n-chunk n-column n-disover">DSA</div>}
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
