<script lang="tsx">
import { defineComponent, Fragment, PropType } from 'vue'
import { useNotification, useContact, useUser, useStore } from '@/store'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'
import { fetchJoiner, fetchCompadre } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatNotifyContact',
    props: {
        node: { type: Object as PropType<env.SchemaNotification>, required: true }
    },
    setup(props) {
        const { uid } = useStore(useUser)

        /**联系人申请验证操作**/
        async function fetchUseCompadre() {
            return await fetchCompadre({
                node: props.node,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount()
            })
        }

        return () => (
            <div class="chat-notify-contact n-chunk n-center n-pointer" onClick={fetchUseCompadre}>
                <Fragment>
                    {props.node.userId === uid.value ? (
                        <chat-avatar size={42} src={props.node.nive.avatar}></chat-avatar>
                    ) : (
                        <chat-avatar size={42} src={props.node.user.avatar}></chat-avatar>
                    )}
                </Fragment>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                        {props.node.userId === uid.value ? (
                            <n-ellipsis tooltip={false}>{props.node.nive.nickname}</n-ellipsis>
                        ) : (
                            <n-ellipsis tooltip={false}>{props.node.user.nickname}</n-ellipsis>
                        )}
                    </n-h2>
                    <n-text depth={3} style={{ fontSize: '13px', lineHeight: '20px' }}>
                        {props.node.userId === uid.value ? (
                            <n-ellipsis tooltip={false}>{`我：${props.node.comment}`}</n-ellipsis>
                        ) : (
                            <n-ellipsis tooltip={false}>{props.node.comment}</n-ellipsis>
                        )}
                    </n-text>
                </div>
                <Fragment>
                    {props.node.status === env.EnumNotificationStatus.waitze && props.node.userId === uid.value ? (
                        <n-button size="small" type="warning" secondary focusable={false}>
                            待验证
                        </n-button>
                    ) : props.node.status === env.EnumNotificationStatus.waitze ? (
                        <n-button size="small" secondary focusable={false}>
                            查看
                        </n-button>
                    ) : props.node.status === env.EnumNotificationStatus.resolve && props.node.userId === uid.value ? (
                        <n-button text size="small" type="success" focusable={false}>
                            <div class="n-chunk n-center" style={{ columnGap: '3px' }}>
                                <n-icon size={16} component={<Iv-BsSender />} />
                                <span>已添加</span>
                            </div>
                        </n-button>
                    ) : props.node.status === env.EnumNotificationStatus.resolve ? (
                        <n-button text size="small" type="success" focusable={false}>
                            已添加
                        </n-button>
                    ) : (
                        <n-button text size="small" type="error" focusable={false}>
                            已拒绝
                        </n-button>
                    )}
                </Fragment>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-notify-contact {
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
