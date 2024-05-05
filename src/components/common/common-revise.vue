<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties } from 'vue'
import { FormItemProps } from 'naive-ui'
import { useVModels } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'
import { stop, divineWherer, divineHandler } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonRevise',
    emits: ['submit', 'revise', 'update:content'],
    props: {
        content: { type: String as PropType<string>, default: '' },
        label: { type: String as PropType<string> },
        placeholder: { type: String as PropType<string> },
        maxlength: { type: Number, default: 32 },
        autosize: { type: Object, default: () => ({ minRows: 1, maxRows: 3 }) },
        suffix: { type: Array as PropType<Array<'controller' | 'enoji' | 'show-count'>>, default: () => [] },
        loading: { type: Boolean, default: false },
        disabled: { type: Boolean, default: true },
        proxy: { type: Boolean, default: false },
        formProps: { type: Object as PropType<FormItemProps>, default: () => ({}) }
    },
    setup(props, { emit }) {
        const { content } = useVModels(props, emit)
        const { state, setState } = useState({ loading: props.loading, disabled: props.disabled })
        const chunkInputStyle = computed<CSSProperties>(() => ({
            '--n-input-padding-right': divineWherer(props.suffix.length === 0, '0px', 14 + 26 * props.suffix.length + 'px')
        }))

        /**开启、提交操作事件**/
        async function fetchUpdate() {
            if (props.proxy) {
                return emit('revise', { content: content.value, done: setState })
            } else if (state.disabled) {
                return await setState({ disabled: false })
            } else if (!state.loading) {
                return await setState({ loading: true, disabled: true }).then(() => {
                    emit('submit', { content: content.value, done: setState })
                })
            }
        }

        /**回车事件拦截**/
        async function divineEnterHandler(evt: KeyboardEvent) {
            return await divineHandler(evt.key === 'Enter', {
                handler: () => stop(evt)
            })
        }

        return () => (
            <n-form-item
                class={{ 'common-revise': true, 'chunk-start': !state.disabled || state.loading }}
                label={props.label}
                {...props.formProps}
            >
                <n-input
                    type="textarea"
                    disabled={state.disabled || state.loading}
                    placeholder={props.placeholder}
                    autosize={props.autosize}
                    maxlength={props.maxlength}
                    style={chunkInputStyle.value}
                    v-model:value={content.value}
                    onKeydown={divineEnterHandler}
                    v-slots={{
                        suffix: () => {
                            return props.suffix.length === 0 ? null : (
                                <n-button
                                    disabled={state.loading || !content.value}
                                    text
                                    focusable={false}
                                    onClick={(evt: Event) => stop(evt, fetchUpdate)}
                                >
                                    {state.loading ? (
                                        <common-loadiner size={22} size-iner={3}></common-loadiner>
                                    ) : state.disabled ? (
                                        <n-icon size={24} component={<Iv-BsEdit />}></n-icon>
                                    ) : (
                                        <n-icon size={26} color="var(--n-text-color-hover)" component={<Iv-BsCheck />}></n-icon>
                                    )}
                                </n-button>
                            )
                        }
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
    :deep(.n-button):not(.n-button--disabled) .n-icon {
        color: var(--n-text-color);
        &:hover {
            color: var(--n-text-color-hover);
        }
    }
    :deep(.n-input__suffix) {
        position: absolute;
        margin: 0;
        right: 0;
        top: 0;
        .n-icon {
            transition: color 0.3s var(--cubic-bezier-ease-in-out);
        }
    }
    :deep(.n-input__textarea-el) {
        word-break: break-all;
    }
    :deep(.n-input) {
        --n-border: none;
        --n-border-disabled: none;
        --n-border-hover: none;
        --n-border-focus: none;
        --n-box-shadow-focus: none;
        --n-color: transparent;
        --n-padding-left: 0;
        --n-padding-right: var(--n-input-padding-right);
        --n-color-focus: transparent;
        --n-color-disabled: transparent;
        --n-padding-vertical: 0;
        --n-border-radius: 0;
        --n-line-height-textarea: 28px;
        --n-text-color-disabled: var(--text-color-2);
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
