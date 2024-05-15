<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { useUser, useNotification, useStore } from '@/store'
import { fetchCompadre } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'NextNotifyCommunit',
    props: {
        node: { type: Object as PropType<env.SchemaNotification>, required: true }
    },
    setup(props) {
        const { uid } = useStore(useUser)
        const { divineJsonComment } = useStore(useNotification)
        const comment = computed(() => divineJsonComment(uid.value, props.node))

        /**社群申请验证操作**/
        async function fetchUseCompadre() {
            return await fetchCompadre({
                node: props.node,
                title: '查看基本信息',
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount(),
                onSubmit: ({ done }: Omix<{ unmount: Function; done: Function }>) => done({ visible: false })
            })
        }

        return () => (
            <common-element y-gap={14} class="n-chunk n-column n-pointer" onClick={fetchUseCompadre}>
                <div class="n-chunk n-center" style={{ columnGap: '10px' }}>
                    {props.node.userId === uid.value ? (
                        <chat-avatar size={46} src={props.node.communit.own.avatar}></chat-avatar>
                    ) : (
                        <chat-avatar size={46} src={props.node.user.avatar}></chat-avatar>
                    )}
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-h2 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500, margin: 0 }}>
                            {props.node.userId === uid.value ? (
                                <n-ellipsis tooltip={false}>{props.node.communit.own.nickname}</n-ellipsis>
                            ) : (
                                <n-ellipsis tooltip={false}>{props.node.user.nickname}</n-ellipsis>
                            )}
                        </n-h2>
                        <n-text depth={3} style={{ lineHeight: '20px' }}>
                            {props.node.updateTime}
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
                <n-blockquote class="n-chunk n-column" align-text style={{ margin: 0, paddingLeft: '8px' }}>
                    <n-ellipsis tooltip={false} line-clamp={2} style={{ lineHeight: '24px' }}>
                        <n-text type="success" depth={1}>
                            备注：
                        </n-text>
                        {comment.value && <n-text depth={2}>{comment.value}</n-text>}
                    </n-ellipsis>
                </n-blockquote>
                <div class="n-chunk n-column n-disover" style={{ rowGap: '10px' }}>
                    <div class="n-chunk n-center n-disover" style={{ columnGap: '10px' }}>
                        <chat-avatar size={34} src={props.node.communit.poster.fileURL}></chat-avatar>
                        <div class="n-chunk n-column n-auto n-disover">
                            <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                                <n-ellipsis tooltip={false}>{props.node.communit.name}</n-ellipsis>
                            </n-h2>
                        </div>
                    </div>
                    <n-text class="n-chunk n-column n-disover" depth={3} style={{ lineHeight: '20px' }}>
                        <n-ellipsis tooltip={false} line-clamp={2}>
                            {props.node.communit.comment}
                        </n-ellipsis>
                    </n-text>
                </div>
            </common-element>
        )
    }
})
</script>
