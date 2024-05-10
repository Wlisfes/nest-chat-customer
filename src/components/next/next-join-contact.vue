<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { useContact, useStore } from '@/store'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'NextJoinContact',
    props: {
        node: { type: Object as PropType<env.SchemaUser>, required: true }
    },
    setup(props) {
        const { dataSource } = useStore(useContact)
        /**是否存在好友关系**/
        const isContact = computed(() => {
            return dataSource.value.some(item => [item.userId, item.niveId].includes(props.node.uid))
        })

        return () => (
            <common-element class="n-chunk n-center n-pointer">
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
                    ) : (
                        <n-button size="small" secondary focusable={false}>
                            查看
                        </n-button>
                    )}
                </Fragment>
            </common-element>
        )
    }
})
</script>
