<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { useUser, useNotification, useStore } from '@/store'
import { fetchCompadre } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'NextNotifyContact',
    props: {
        node: { type: Object as PropType<env.SchemaNotification>, required: true }
    },
    setup(props) {
        const { uid } = useStore(useUser)
        const { divineJsonWherer } = useStore(useNotification)
        const json = computed(() => divineJsonWherer(uid.value, props.node))

        /**联系人申请验证操作**/
        async function fetchUseCompadre() {
            return await fetchCompadre({
                node: props.node,
                title: '申请人基本信息',
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount()
            })
        }

        return () => (
            <common-element y-gap={14} class="n-chunk n-column n-pointer" onClick={fetchUseCompadre}>
                <div class="n-chunk n-center" style={{ columnGap: '10px' }}>
                    <Fragment>
                        {props.node.userId === uid.value ? (
                            <chat-avatar size={46} src={props.node.nive.avatar}></chat-avatar>
                        ) : (
                            <chat-avatar size={46} src={props.node.user.avatar}></chat-avatar>
                        )}
                    </Fragment>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-h2 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500, margin: 0 }}>
                            {props.node.userId === uid.value ? (
                                <n-ellipsis tooltip={false}>{props.node.nive.nickname}</n-ellipsis>
                            ) : (
                                <n-ellipsis tooltip={false}>{props.node.user.nickname}</n-ellipsis>
                            )}
                        </n-h2>
                        <n-text depth={3} style={{ lineHeight: '20px' }}>
                            {props.node.userId === uid.value ? (
                                <n-ellipsis tooltip={false}>{props.node.nive.comment}</n-ellipsis>
                            ) : (
                                <n-ellipsis tooltip={false}>{props.node.nive.comment}</n-ellipsis>
                            )}
                        </n-text>
                    </div>
                    <Fragment>
                        {props.node.status === env.EnumNotificationStatus.waitze ? (
                            <Fragment>
                                {props.node.command.includes(uid.value) ? (
                                    <n-button size="small" type="warning" secondary focusable={false}>
                                        待验证
                                    </n-button>
                                ) : (
                                    <n-button size="small" secondary focusable={false}>
                                        查看
                                    </n-button>
                                )}
                            </Fragment>
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
                        <n-text depth={2}>{json.value.comment}</n-text>
                    </n-ellipsis>
                </n-blockquote>
            </common-element>
        )
    }
})
</script>
