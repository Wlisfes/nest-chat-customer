<script lang="tsx">
import { defineComponent, ref, Ref, onMounted } from 'vue'
import { useVModels } from '@vueuse/core'
import { InputInst } from 'naive-ui'
import { divineDelay, divineHandler } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatSearcher',
    emits: ['update', 'update:content'],
    props: {
        autoFocus: { type: Boolean, default: false },
        delay: { type: Number, default: 300 },
        placeholder: { type: String, default: '搜索对话' },
        content: { type: String, default: '' }
    },
    setup(props, { emit }) {
        const input = ref<InputInst>() as Ref<InputInst>
        const { content } = useVModels(props, emit)

        onMounted(async () => {
            return await divineHandler(props.autoFocus, {
                handler: async () => {
                    await divineDelay(props.delay)
                    return input.value.focus()
                }
            })
        })

        return () => (
            <div class="chat-searcher n-chunk n-column n-disover">
                <n-input
                    ref={input}
                    placeholder={props.placeholder}
                    v-model:value={content.value}
                    onUpdateValue={(value: string) => emit('update', value)}
                >
                    {{
                        prefix: () => <n-icon size={18} component={<Iv-BsSearch />} style={{ marginRight: '10px' }}></n-icon>
                    }}
                </n-input>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-searcher {
    background-color: var(--chat-searcher-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    :deep(.n-input) {
        --n-border: none;
        --n-border-hover: none;
        --n-border-focus: none;
        --n-box-shadow-focus: none;
        --n-color-focus: transparent;
        --n-color: var(--chat-searcher-wrapper);
        --n-color-focus: var(--chat-searcher-wrapper);
    }
}
</style>
