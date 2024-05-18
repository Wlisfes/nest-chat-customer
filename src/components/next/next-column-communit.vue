<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { useSession, useStore } from '@/store'
import { useReduxtor } from '@/hooks/hook-reduxtor'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatContact',
    props: {
        node: { type: Object as PropType<env.SchemaCommunit>, required: true }
    },
    setup(props) {
        const { fetchUpdateCommonSelector } = useReduxtor()
        const { schema } = useStore(useSession)

        const present = computed(() => {
            if (Boolean(schema.value) && schema.value.source === env.EnumSessionSource.communit) {
                return schema.value.communitId === props.node.uid
            }
            return false
        })

        async function fetchUpdateSelector(evt: MouseEvent) {
            return await fetchUpdateCommonSelector(env.EnumSessionSource.communit, props.node.uid)
        }

        return () => (
            <common-element class="n-chunk n-column n-pointer" present={present.value} onClick={fetchUpdateSelector}>
                <div class="n-chunk n-center" style={{ columnGap: '10px' }}>
                    <chat-avatar size={42} src={props.node.poster.fileURL}></chat-avatar>
                    <div class="n-chunk n-column n-auto n-disover">
                        <n-h2 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 500, margin: 0 }}>
                            <n-ellipsis tooltip={false}>{props.node.name}</n-ellipsis>
                        </n-h2>
                    </div>
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
