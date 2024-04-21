<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { useVModels } from '@vueuse/core'
import { useUser, useMessenger } from '@/store'
import { useProvider } from '@/hooks/hook-provider'
import { useMoment } from '@/hooks/hook-common'
import { divineWherer, divineHandler } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatNodeMessenger',
    props: {
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const user = useUser()
        const current = computed(() => user.uid === node.value.userId)

        console.log(node.value)

        return () => (
            <div class="chat-node-messenger">
                {current.value ? (
                    <div class="chunk-messenger n-chunk n-end n-disover" style={{ columnGap: '10px' }}>
                        <custom-element v-model:node={node.value} current={current.value}>
                            {node.value.source === env.EnumMessagerSource.text ? (
                                <custom-texter content={node.value.text}></custom-texter>
                            ) : (
                                <custom-texter node={node.value}></custom-texter>
                            )}
                        </custom-element>
                        <custom-avatar src={node.value.user.avatar}></custom-avatar>
                    </div>
                ) : (
                    <div class="chunk-messenger n-chunk n-disover" style={{ columnGap: '10px' }}>
                        <custom-avatar src={node.value.user.avatar}></custom-avatar>
                        <custom-element v-model:node={node.value} current={current.value}></custom-element>
                    </div>
                )}
            </div>
        )
    }
})
</script>
