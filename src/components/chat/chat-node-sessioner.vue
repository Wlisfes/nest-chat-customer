<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatNodeSessioner',
    props: {
        node: { type: Object as PropType<Omix>, required: true }
    },
    setup(props) {
        const { inverted } = useProvider()
        const chunk = computed(() => ({
            '--chat-hover-node-sessioner': divineWherer(inverted.value, '#202c33', '#f0f2f5'),
            '--chat-active-node-sessioner': divineWherer(false, 'var(--chat-hover-node-sessioner)', 'transparent')
        }))
        const badge = computed(() => ({
            '--chat-badge-color': divineWherer(inverted.value, '', '#25d366'),
            '--chat-badge-text-color': divineWherer(inverted.value, '', '#ffffff')
        }))

        return () => (
            <div class="chat-node-sessioner n-chunk n-pointer" style={chunk.value}>
                <n-image class="chat-avatar" preview-disabled src={props.node.avatar} />
                <div class="chat-context n-chunk n-column n-auto" style={{ overflow: 'hidden' }}>
                    <div class="chat-source n-chunk n-center" style={{ columnGap: '10px', marginBottom: '6px' }}>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <n-h2 style={{ fontSize: '16px', lineHeight: '22px', margin: 0 }}>
                                <n-ellipsis tooltip={false}>{props.node.fullName}</n-ellipsis>
                            </n-h2>
                        </div>
                        <n-text depth={3} style={{ fontSize: '12px', lineHeight: '14px' }}>
                            星期一
                        </n-text>
                    </div>
                    <div class="chat-message n-chunk n-center" style={{ columnGap: '10px', overflow: 'hidden' }}>
                        <div style={{ flex: 1, overflow: 'hidden', lineHeight: '20px' }}>
                            <n-text depth={3} style={{ fontSize: '14px' }}>
                                <n-ellipsis tooltip={false}>{props.node.content}</n-ellipsis>
                            </n-text>
                        </div>
                        {false && (
                            <div class="chat-badge n-chunk n-center n-middle" style={badge.value}>
                                9
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-node-sessioner {
    overflow: hidden;
    padding: 14px 20px 14px 16px;
    column-gap: 14px;
    background-color: var(--chat-active-node-sessioner);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &:hover {
        background-color: var(--chat-hover-node-sessioner);
    }
    &::before {
        content: '';
        position: absolute;
        left: 78px;
        right: 20px;
        bottom: 0;
        border-top: 1px solid var(--chat-border-color);
        transition: border-top 0.3s var(--cubic-bezier-ease-in-out);
    }
    &:last-child {
        --chat-border-color: transparent;
    }
    .chat-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        :deep(img) {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .chat-badge {
        min-width: 18px;
        height: 18px;
        padding: 0 4px;
        box-sizing: border-box;
        font-size: 12px;
        line-height: 1;
        color: var(--chat-badge-text-color);
        background-color: var(--chat-badge-color);
        border-radius: 9px;
    }
}
</style>
