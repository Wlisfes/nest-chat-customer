<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { useContact, useNotification, useStore } from '@/store'
import { divineHandler } from '@/utils/utils-common'
import { fetchInvite, fetchCompadre } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'NextJoinContact',
    props: {
        node: { type: Object as PropType<env.SchemaUser>, required: true }
    },
    setup(props) {
        const { dataContact } = useStore(useNotification)
        const { dataSource } = useStore(useContact)
        /**是否存在好友关系**/
        const isContact = computed(() => {
            return dataSource.value.some(item => [item.userId, item.niveId].includes(props.node.uid))
        })
        /**是否存在申请记录**/
        const notification = computed(() => {
            const item = dataContact.value.find(item => [item.userId, item.niveId].includes(props.node.uid))
            return item as env.SchemaNotification
        })

        /**申请添加联系人**/
        async function fetchUseInvite() {
            return await fetchInvite({
                title: '查看基本信息',
                userId: props.node.uid,
                source: env.EnumNotificationSource.contact,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount(),
                onSubmit: async ({ unmount, done }: Omix<{ unmount: Function; done: Function }>) => {
                    await done({ visible: false })
                    return await unmount()
                }
            })
        }

        /**联系人申请验证操作**/
        async function fetchUseCompadre() {
            return await fetchCompadre({
                node: notification.value,
                title: '查看基本信息',
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount(),
                onSubmit: ({ done }: Omix<{ unmount: Function; done: Function }>) => done({ visible: false })
            })
        }

        async function fetchClick() {
            if (notification.value) {
                return await divineHandler(
                    [env.EnumNotificationStatus.waitze, env.EnumNotificationStatus.resolve].includes(notification.value?.status),
                    { handler: fetchUseCompadre, failure: fetchUseInvite }
                )
            } else {
                return await fetchUseInvite()
            }
        }

        return () => (
            <common-element class="n-chunk n-center n-pointer" onClick={fetchClick}>
                <chat-avatar size={42} src={props.node.avatar}></chat-avatar>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                        <n-ellipsis tooltip={false}>{props.node.nickname}</n-ellipsis>
                    </n-h2>
                    <n-text depth={3} style={{ fontSize: '13px', lineHeight: '20px' }}>
                        <n-ellipsis tooltip={false}>{props.node.comment}</n-ellipsis>
                    </n-text>
                </div>
                <Fragment>
                    {isContact.value ? (
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
            </common-element>
        )
    }
})
</script>
