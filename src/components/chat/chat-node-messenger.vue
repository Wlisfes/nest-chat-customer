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
        order: { type: Number, default: 0 },
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const user = useUser()
        const current = computed(() => user.uid === node.value.userId)

        return () => (
            <div class="chat-node-messenger" style={{ order: props.order }}>
                {current.value ? (
                    <div class="chunk-messenger n-chunk n-end n-disover" style={{ columnGap: '10px' }}>
                        <custom-element v-model:node={node.value} current={current.value}>
                            {node.value.source === env.EnumMessagerSource.text ? (
                                <custom-texter
                                    max-width={540}
                                    content={node.value.text}
                                    custom-style={{ padding: '7px 12px' }}
                                ></custom-texter>
                            ) : node.value.source === env.EnumMessagerSource.image ? (
                                <custom-image node={node.value}></custom-image>
                            ) : node.value.source === env.EnumMessagerSource.document ? (
                                <custom-document max-width={360} current={current.value} node={node.value}></custom-document>
                            ) : (
                                <custom-texter max-width={540} node={node.value}></custom-texter>
                            )}
                        </custom-element>
                        <custom-avatar src={node.value.user.avatar}></custom-avatar>
                    </div>
                ) : (
                    <div class="chunk-messenger n-chunk n-disover" style={{ columnGap: '10px' }}>
                        <custom-avatar src={node.value.user.avatar}></custom-avatar>
                        <custom-element v-model:node={node.value} current={current.value}>
                            {node.value.source === env.EnumMessagerSource.text ? (
                                <custom-texter
                                    max-width={540}
                                    content={node.value.text}
                                    custom-style={{ padding: '7px 12px' }}
                                ></custom-texter>
                            ) : node.value.source === env.EnumMessagerSource.image ? (
                                <custom-image node={node.value}></custom-image>
                            ) : node.value.source === env.EnumMessagerSource.document ? (
                                <custom-document current={current.value} max-width={360} node={node.value}></custom-document>
                            ) : (
                                <custom-texter max-width={540} node={node.value}></custom-texter>
                            )}
                        </custom-element>
                    </div>
                )}
            </div>
        )
    }
})
</script>
