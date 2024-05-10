<script lang="tsx">
import { defineComponent, ref, Ref, onMounted } from 'vue'
import { InputInst } from 'naive-ui'
import { divineDelay, divineHandler } from '@/utils/utils-common'

export default defineComponent({
    name: 'ChatSearcher',
    props: {
        autoFocus: { type: Boolean, default: false },
        delay: { type: Number, default: 300 }
    },
    setup(props) {
        const input = ref<InputInst>() as Ref<InputInst>

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
                <n-input ref={input} placeholder="搜索对话">
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
