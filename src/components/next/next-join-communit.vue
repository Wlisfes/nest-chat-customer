<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { useCommunit, useNotification, useStore } from '@/store'
import { divineHandler } from '@/utils/utils-common'
import { fetchInvite, fetchCompadre } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'NextJoinContact',
    props: {
        node: { type: Object as PropType<env.SchemaCommunit>, required: true }
    },
    setup(props) {
        const { dataCommunit } = useStore(useNotification)
        const { dataSource } = useStore(useCommunit)
        /**是否已经加入社群**/
        const isCommunit = computed(() => {
            return dataSource.value.some(item => item.uid === props.node.uid)
        })
        /**是否存在申请记录**/
        const notification = computed(() => {
            const item = dataCommunit.value.find(item => item.communitId === props.node.uid)
            return item as env.SchemaNotification
        })

        /**申请添加社群**/
        async function fetchUseInvite() {
            console.log(props.node)
            return await fetchInvite({
                title: '查看基本信息',
                communitId: props.node.uid,
                source: env.EnumNotificationSource.communit,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount(),
                onSubmit: async ({ unmount, done }: Omix<{ unmount: Function; done: Function }>) => {
                    await done({ visible: false })
                    return await unmount()
                }
            })
        }

        async function fetchClick() {
            if (notification.value && false) {
                // return await divineHandler(
                //     [env.EnumNotificationStatus.waitze, env.EnumNotificationStatus.resolve].includes(notification.value?.status),
                //     { handler: fetchUseCompadre, failure: fetchUseInvite }
                // )
            } else {
                return await fetchUseInvite()
            }
        }

        return () => (
            <common-element y-gap={14} class="n-chunk n-column n-pointer" onClick={fetchClick}>
                <div class="n-chunk n-center" style={{ columnGap: '10px' }}>
                    <chat-avatar size={46} src={props.node.poster.fileURL}></chat-avatar>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-h2 style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 500, margin: 0 }}>
                            <n-ellipsis tooltip={false}>{props.node.name}</n-ellipsis>
                        </n-h2>
                    </div>
                    <Fragment>
                        {isCommunit.value ? (
                            <n-button text size="small" type="success" focusable={false}>
                                已添加
                            </n-button>
                        ) : !Boolean(notification.value) ? (
                            <n-button size="small" secondary focusable={false}>
                                查看
                            </n-button>
                        ) : (
                            <Fragment>
                                {notification.value.status === env.EnumNotificationStatus.waitze ? (
                                    <n-button size="small" type="warning" secondary focusable={false}>
                                        待验证
                                    </n-button>
                                ) : notification.value.status === env.EnumNotificationStatus.resolve ? (
                                    <n-button text size="small" type="success" focusable={false}>
                                        已添加
                                    </n-button>
                                ) : (
                                    <n-button size="small" secondary focusable={false}>
                                        查看
                                    </n-button>
                                )}
                            </Fragment>
                        )}
                    </Fragment>
                </div>
                <n-text class="n-chunk n-column n-disover" depth={3} style={{ lineHeight: '20px' }}>
                    <n-ellipsis expand-trigger="click" tooltip={false} line-clamp={3}>
                        {props.node.comment}
                    </n-ellipsis>
                </n-text>
            </common-element>
        )
    }
})
</script>
