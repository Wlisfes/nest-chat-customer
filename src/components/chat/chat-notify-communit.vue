<script lang="tsx">
import { defineComponent, Fragment, PropType } from 'vue'
import { useUser, useStore } from '@/store'
import { useMoment } from '@/hooks/hook-common'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatNotifyCommunit',
    props: {
        node: { type: Object as PropType<env.SchemaNotification>, required: true }
    },
    setup(props) {
        const { uid } = useStore(useUser)
        const { divineDateMomentTransfor } = useMoment()

        return () => (
            <common-element class="n-chunk n-column n-pointer">
                <div class="n-chunk n-center" style={{ columnGap: '10px' }}>
                    <chat-avatar size={42} src={props.node.communit.poster.fileURL}></chat-avatar>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                            <n-ellipsis tooltip={false}>{props.node.communit.name}</n-ellipsis>
                        </n-h2>
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
                <n-text class="n-chunk n-column n-disover" depth={3} style={{ lineHeight: '20px' }}>
                    <n-ellipsis expand-trigger="click" tooltip={false} line-clamp={3}>
                        {props.node.communit.comment}
                    </n-ellipsis>
                </n-text>
                <div class="n-chunk n-center n-disover" style={{ columnGap: '10px' }}>
                    <chat-avatar size={28} radius={14} src={props.node.user.avatar}></chat-avatar>
                    <n-text depth={3} style={{ lineHeight: '20px', maxWidth: '120px' }}>
                        <n-ellipsis tooltip={false}>{props.node.user.nickname}</n-ellipsis>
                    </n-text>
                    <n-text depth={3} style={{ lineHeight: '20px' }}>
                        {divineDateMomentTransfor(props.node.updateTime)}
                    </n-text>
                </div>
            </common-element>
        )
    }
})
</script>
