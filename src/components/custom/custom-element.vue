<script lang="tsx">
import { defineComponent, computed, Fragment, CSSProperties, PropType } from 'vue'
import { useUser, useSession } from '@/store'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'CustomElement',
    props: {
        current: { type: Boolean, default: false },
        maxWidth: { type: Number, required: true },
        width: { type: String, default: '100%' },
        customComponent: { type: Object as PropType<CSSProperties>, default: () => ({}) },
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props, { slots }) {
        const user = useUser()
        const session = useSession()
        /**排除自己以外的社群成员列表**/
        const member = computed(() => {
            if (session.schema.source === env.EnumSessionSource.communit) {
                return (session.communit?.member ?? []).filter(item => item.userId !== user.uid)
            }
            return []
        })
        /**排除自己以外的已读用户列表**/
        const reads = computed(() => {
            return props.node.reads.filter(item => item.userId !== user.uid)
        })

        return () => (
            <div class="custom-element n-chunk n-column" style={{ width: props.width, maxWidth: props.maxWidth + 'px' }}>
                <div
                    class={{ 'custom-component': true, 'chunk-current': props.current, 'chunk-other': !props.current }}
                    style={props.customComponent}
                >
                    {slots.default && slots.default()}
                </div>
                <div class="element-date n-chunk n-center n-end">
                    <n-text depth={3} style={{ paddingTop: '2px' }}>
                        {props.node.createTime}
                    </n-text>
                    {props.current && (
                        <div class="n-chunk n-center" style={{ paddingLeft: '4px' }}>
                            {session.schema.source === env.EnumSessionSource.contact ? (
                                <Fragment>
                                    {reads.value.length > 0 ? (
                                        <n-icon size={16} color="#25d366" component={<Iv-BsReadr />}></n-icon>
                                    ) : props.node.status === env.EnumMessagerStatus.sending ? (
                                        <n-icon size={16} color="var(--text-color-3)" component={<Iv-BsCheck />}></n-icon>
                                    ) : props.node.status === env.EnumMessagerStatus.delivered ? (
                                        <n-icon size={16} color="var(--text-color-3)" component={<Iv-BsReadr />}></n-icon>
                                    ) : null}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {reads.value.length > 0 && reads.value.length < member.value.length ? (
                                        <n-popover
                                            trigger="click"
                                            placement="bottom-end"
                                            z-index={1}
                                            v-slots={{
                                                trigger: () => (
                                                    <n-icon class="n-pointer" size={16} color="#ff0000" component={<Iv-BsReadr />}></n-icon>
                                                ),
                                                default: () => <div>dsadasd</div>
                                            }}
                                        ></n-popover>
                                    ) : reads.value.length > 0 && reads.value.length >= member.value.length ? (
                                        <n-icon class="n-pointer" size={16} color="#25d366" component={<Iv-BsReadr />}></n-icon>
                                    ) : props.node.status === env.EnumMessagerStatus.sending ? (
                                        <n-icon size={16} color="var(--text-color-3)" component={<Iv-BsCheck />}></n-icon>
                                    ) : props.node.status === env.EnumMessagerStatus.delivered ? (
                                        <n-icon size={16} color="var(--text-color-3)" component={<Iv-BsReadr />}></n-icon>
                                    ) : null}
                                </Fragment>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.element-date {
    padding: 4px 5px 0;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1;
    user-select: none;
    :deep(.n-icon) {
        transition: color 0.3s var(--cubic-bezier-ease-in-out);
    }
}

.custom-component {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 34px;
    padding: 3px;
    border-radius: 6px;
    box-sizing: content-box;
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &.chunk-current {
        background-color: var(--custom-element-current-color);
    }
    &.chunk-other {
        background-color: var(--custom-element-other-color);
    }
}
</style>
