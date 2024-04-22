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
        const className = computed(() => ({
            'chunk-messenger n-chunk n-auto n-disover': true,
            'chunk-current n-end': current.value,
            'chunk-other': !current.value
        }))

        return () => (
            <div class="chat-node-messenger" style={{ order: props.order }}>
                {current.value ? (
                    <div class="n-chunk n-end n-disover" style={{ columnGap: '10px' }}>
                        {/* <custom-element v-model:node={node.value} current={current.value}>
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
                        </custom-element> */}
                        <div class={className.value}>
                            {node.value.source === env.EnumMessagerSource.text ? (
                                <custom-texter current={current.value} max-width={540}>
                                    <n-text>{node.value.text}</n-text>
                                </custom-texter>
                            ) : node.value.source === env.EnumMessagerSource.image ? (
                                <custom-image current={current.value} node={node.value}></custom-image>
                            ) : node.value.source === env.EnumMessagerSource.document ? (
                                <custom-document max-width={360} current={current.value} node={node.value}></custom-document>
                            ) : (
                                <custom-texter current={current.value} max-width={540}>
                                    <n-text>{node.value.text}</n-text>
                                </custom-texter>
                            )}
                        </div>
                        <custom-avatar src={node.value.user.avatar}></custom-avatar>
                    </div>
                ) : (
                    <div class="n-chunk n-disover" style={{ columnGap: '10px' }}>
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

<style lang="scss" scoped>
.chunk-messenger {
    min-height: 40px;
    box-sizing: border-box;
    &.chunk-current {
        padding-right: 10px;
        &::before {
            content: '';
            position: absolute;
            right: 0;
            top: 13px;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-bottom: 7px solid transparent;
            border-left: 10px solid var(--custom-element-current-color);
            transition: border 0.3s var(--cubic-bezier-ease-in-out);
        }
    }
    &.chunk-other {
        padding-left: 10px;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 13px;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-bottom: 7px solid transparent;
            border-right: 10px solid var(--custom-element-other-color);
            transition: border 0.3s var(--cubic-bezier-ease-in-out);
        }
    }
}
</style>
