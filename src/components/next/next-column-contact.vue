<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { useUser, useSession, useStore } from '@/store'
import { useReduxtor } from '@/hooks/hook-reduxtor'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatContact',
    props: {
        node: { type: Object as PropType<env.SchemaContact>, required: true }
    },
    setup(props) {
        const { fetchUpdateCommonSelector } = useReduxtor()
        const { uid } = useStore(useUser)
        const { schema } = useStore(useSession)

        const present = computed(() => {
            if (Boolean(schema.value) && schema.value.source === env.EnumSessionSource.contact) {
                return schema.value.contactId === props.node.uid
            }
            return false
        })

        async function fetchUpdateSelector(evt: MouseEvent) {
            return await fetchUpdateCommonSelector(env.EnumSessionSource.contact, props.node.uid)
        }

        return () => (
            <common-element class="n-chunk n-center n-pointer" present={present.value} onClick={fetchUpdateSelector}>
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
