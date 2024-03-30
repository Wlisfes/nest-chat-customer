<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonGrapher',
    setup(props, { slots }) {
        const { inverted } = useProvider()
        const { state, setState } = useState({ initialize: true, loading: false, BaseURL: '' })

        onMounted(() => {
            onRepeat()
        })

        async function onRepeat() {
            return await setState({
                loading: true,
                BaseURL: `${import.meta.env.VITE_WEB_PREFIX}/common/grapher?t=${Math.random()}`
            })
        }

        async function setDone() {
            return setState({ initialize: false, loading: false })
        }

        return () => (
            <n-spin class="common-grapher n-chunk n-column" size="small" show={state.loading}>
                <n-button size="large" disabled={state.initialize || state.loading} secondary={inverted.value} onClick={onRepeat}>
                    <n-image preview-disabled src={state.BaseURL} on-load={setDone} on-error={setDone}>
                        {{
                            placeholder: () => (
                                <n-skeleton width={120} height={40} style={{ borderRadius: 'var(--n-border-radius)' }}></n-skeleton>
                            )
                        }}
                    </n-image>
                </n-button>
            </n-spin>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-grapher {
    :deep(.n-spin-content) {
        display: flex;
        flex-direction: column;
    }
    :deep(.n-button) {
        --n-padding: 0px;
    }
    .n-image,
    :deep(.n-image img) {
        width: 120px;
        height: 40px;
        display: block;
    }
}
</style>
