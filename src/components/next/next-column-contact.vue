<script lang="tsx">
import { defineComponent, Fragment, PropType } from 'vue'
import { useUser, useStore } from '@/store'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatContact',
    props: {
        node: { type: Object as PropType<env.SchemaContact>, required: true }
    },
    setup(props) {
        const { uid } = useStore(useUser)

        return () => (
            <common-element class="n-chunk n-center n-pointer">
                <Fragment>
                    {props.node.user.uid === uid.value ? (
                        <chat-avatar size={42} src={props.node.nive.avatar}></chat-avatar>
                    ) : (
                        <chat-avatar size={42} src={props.node.user.avatar}></chat-avatar>
                    )}
                </Fragment>
                <div class="n-chunk n-column n-auto n-disover">
                    <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                        {props.node.user.uid === uid.value ? (
                            <n-ellipsis tooltip={false}>{props.node.nive.nickname}</n-ellipsis>
                        ) : (
                            <n-ellipsis tooltip={false}>{props.node.user.nickname}</n-ellipsis>
                        )}
                    </n-h2>
                </div>
            </common-element>
        )
    }
})
</script>
