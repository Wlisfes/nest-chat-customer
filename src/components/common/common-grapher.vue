<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { useState } from '@/hooks/hook-state'
import { BaseURL } from '@/utils/utils-request'

export default defineComponent({
    name: 'CommonGrapher',
    props: {
        disabled: { type: Boolean }
    },
    setup(props, { expose }) {
        const { inverted } = useProvider()
        const { state, setState } = useState({ initialize: true, loading: false, BaseURL: '' })

        onMounted(() => {
            onRepeat(false)
        })

        async function onRepeat(loading: boolean = true) {
            return await setState({
                loading: Boolean(loading),
                BaseURL: `${BaseURL}/common/grapher?t=${Math.random()}`
            })
        }

        async function setDone() {
            return setState({ initialize: false, loading: false })
        }

        expose({ done: onRepeat })

        return () => (
            <n-spin class="common-grapher n-chunk n-column" size="small" show={state.loading}>
                <n-button
                    size="large"
                    disabled={state.initialize || state.loading || props.disabled}
                    secondary={inverted.value}
                    onClick={onRepeat}
                >
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
