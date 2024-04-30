<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useState } from '@/hooks/hook-state'
import { stop } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonRevise',
    emits: ['submit'],
    props: {
        content: { type: String as PropType<string>, default: '' },
        label: { type: String as PropType<string> },
        placeholder: { type: String as PropType<string> }
    },
    setup(props, { emit }) {
        const { state, setState } = useState({
            loading: false,
            disabled: true,
            content: props.content ?? ''
        })

        async function fetchUpdate() {
            if (state.disabled) {
                return await setState({ disabled: false })
            } else if (!state.loading) {
                return await setState({ loading: true, disabled: true }).then(() => {
                    emit('submit', { ...state, done: setState })
                })
            }
        }

        return () => (
            <n-form-item class={{ 'common-revise': true, 'chunk-start': !state.disabled || state.loading }} label={props.label}>
                <n-input
                    disabled={state.disabled || state.loading}
                    placeholder={props.placeholder}
                    type="textarea"
                    maxlength={32}
                    autosize={{ minRows: 1, maxRows: 3 }}
                    v-model:value={state.content}
                    v-slots={{
                        suffix: () => (
                            <n-button
                                disabled={state.loading || !state.content}
                                text
                                focusable={false}
                                onClick={(evt: Event) => stop(evt, fetchUpdate)}
                            >
                                {state.loading ? (
                                    <common-loadiner size={22} size-iner={3}></common-loadiner>
                                ) : state.disabled ? (
                                    <n-icon size={24} color="var(--text-color-2)" component={<Iv-BsEdit />}></n-icon>
                                ) : (
                                    <n-icon size={26} color="var(--text-color-2)" component={<Iv-BsCheck />}></n-icon>
                                )}
                            </n-button>
                        )
                    }}
                ></n-input>
            </n-form-item>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-revise {
    --n-label-height: 20px;
    --n-blank-height: 20px;
    padding: 0 24px;
    background-color: var(--layer-resolver-form-item);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &.chunk-start {
        :deep(.n-input) {
            border-bottom-color: var(--text-color-3);
        }
    }
    :deep(.n-form-item-label) {
        font-size: 14px;
        line-height: 24px;
        color: var(--primary-color);
        display: flex;
        align-items: center;
        padding-bottom: 5px;
        padding-left: 0;
    }
    :deep(.n-input__suffix) {
        position: absolute;
        margin: 0;
        right: 0;
        top: 0;
    }
    :deep(.n-input) {
        --n-border: none;
        --n-border-disabled: none;
        --n-border-hover: none;
        --n-border-focus: none;
        --n-box-shadow-focus: none;
        --n-color: transparent;
        --n-padding-left: 0;
        --n-padding-right: 40px;
        --n-color-focus: transparent;
        --n-color-disabled: transparent;
        --n-padding-vertical: 0;
        --n-border-radius: 0;
        --n-line-height-textarea: 28px;
        --n-text-color-disabled: var(--text-color-2);
        word-break: break-all;
        font-size: 16px;
        padding-bottom: 5px;
        border-bottom: 2px solid #0000;
        transition: border-bottom-color 0.3s var(--cubic-bezier-ease-in-out);
        &.n-input--focus {
            border-bottom-color: var(--primary-color);
        }
    }
}
</style>
