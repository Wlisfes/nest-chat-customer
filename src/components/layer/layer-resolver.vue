<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useUser } from '@/store'
import { useLayer } from '@/hooks/hook-layer'
import { useFormCustomize } from '@/hooks/hook-customize'
import { stop, divineHandler, divineDelay } from '@/utils/utils-common'

export default defineComponent({
    name: 'LayerResolver',
    emits: ['close', 'submit'],
    props: {
        width: { type: [Number, String], default: 420 }
    },
    setup(props, { emit }) {
        const user = useUser()

        const { form, visible, setVisible } = useFormCustomize({
            form: {
                nickname: user.nickname,
                comment: user.comment
            }
        })
        const { element } = useLayer(() => {
            setVisible(false)
        })

        onMounted(() => setVisible(true))

        return () => (
            <n-drawer
                v-model:show={visible.value}
                width={props.width}
                to={element.value ?? document.body}
                content-style={{ overflow: 'hidden', userSelect: 'none' }}
                placement="left"
                auto-focus={false}
                mask-closable={false}
                show-mask={false}
                on-after-leave={() => emit('close')}
            ></n-drawer>
        )
    }
})
</script>

<!-- <script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useUser } from '@/store'
import { useFormCustomize } from '@/hooks/hook-customize'
import { stop, divineHandler, divineDelay } from '@/utils/utils-common'

export default defineComponent({
    name: 'LayerResolver',
    emits: ['close', 'submit'],
    props: {
        element: { type: Object as PropType<HTMLElement> },
        width: { type: [Number, String], default: 420 }
    },
    setup(props, { emit }) {
        const user = useUser()

        const { form, visible, setVisible } = useFormCustomize({
            form: {
                nickname: user.nickname,
                comment: user.comment
            }
        })

        onMounted(() => {
            return setVisible(true)
        })

        /**回车事件拦截**/
        function onKeydownHandler(evt: KeyboardEvent) {
            return divineHandler(evt.key === 'Enter', {
                handler: () => {
                    return stop(evt, async () => {
                        console.log(evt)
                    })
                }
            })
        }

        async function onNicknameUpdate(scope: Omix, done: Function) {
            if (!scope.disabled) {
                return await done({ disabled: true })
            } else if (!scope.loading) {
                await done({ loading: true })
                return await divineDelay(1500, () => done({ loading: false, disabled: false }))
            }
        }

        async function onCommentUpdate(scope: Omix, done: Function) {
            if (!scope.disabled) {
                return await done({ disabled: true })
            } else if (!scope.loading) {
                await done({ loading: true })
                return await divineDelay(1500, () => done({ loading: false, disabled: false }))
            }
        }

        return () => (
            <n-drawer
                v-model:show={visible.value}
                width={props.width}
                to={props.element ?? document.body}
                content-style={{ overflow: 'hidden', userSelect: 'none' }}
                placement="left"
                auto-focus={false}
                mask-closable={false}
                show-mask={false}
                on-after-leave={() => emit('close')}
            >
                <n-element class="layer-resolver n-chunk n-column">
                    <chat-header title="个人信息" onClose={(evt: Event) => setVisible(false)}></chat-header>
                    <chat-avatar url={user.avatar} style={{ padding: '32px' }}></chat-avatar>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <n-scrollbar class="is-customize" trigger="none" size={60}>
                            <n-form size="large" label-placement="top" show-feedback={false}>
                                <n-form-item label="昵称">
                                    <common-state
                                        data-render={(scope: Omix, done: Function) => (
                                            <n-input
                                                readonly={scope.loading || !scope.disabled}
                                                type="textarea"
                                                maxlength={32}
                                                autosize={{ minRows: 1, maxRows: 3 }}
                                                onKeydown={onKeydownHandler}
                                                v-model:value={form.value.nickname}
                                                v-slots={{
                                                    suffix: () => (
                                                        <n-button
                                                            disabled={scope.loading}
                                                            text
                                                            focusable={false}
                                                            onClick={(evt: Event) => onNicknameUpdate(scope, done)}
                                                        >
                                                            {scope.loading ? (
                                                                <common-loadiner size={22} size-iner={3}></common-loadiner>
                                                            ) : scope.disabled ? (
                                                                <n-icon size={28} component={<Iv-BsCheck />}></n-icon>
                                                            ) : (
                                                                <n-icon size={28} component={<Iv-BsEdit />}></n-icon>
                                                            )}
                                                        </n-button>
                                                    )
                                                }}
                                            />
                                        )}
                                    ></common-state>
                                </n-form-item>
                                <n-form-item label="状态">
                                    <common-state
                                        data-render={(scope: Omix, done: Function) => (
                                            <n-input
                                                readonly={scope.loading || !scope.disabled}
                                                type="textarea"
                                                maxlength={32}
                                                autosize={{ minRows: 1, maxRows: 3 }}
                                                onKeydown={onKeydownHandler}
                                                v-model:value={form.value.comment}
                                                v-slots={{
                                                    suffix: () => (
                                                        <n-button
                                                            disabled={scope.loading}
                                                            text
                                                            focusable={false}
                                                            onClick={(evt: Event) => onCommentUpdate(scope, done)}
                                                        >
                                                            {scope.loading ? (
                                                                <common-loadiner size={22} size-iner={3}></common-loadiner>
                                                            ) : scope.disabled ? (
                                                                <n-icon size={28} component={<Iv-BsCheck />}></n-icon>
                                                            ) : (
                                                                <n-icon size={28} component={<Iv-BsEdit />}></n-icon>
                                                            )}
                                                        </n-button>
                                                    )
                                                }}
                                            />
                                        )}
                                    ></common-state>
                                </n-form-item>
                            </n-form>
                        </n-scrollbar>
                    </div>
                </n-element>
            </n-drawer>
        )
    }
})
</script>

<style lang="scss" scoped>
.layer-resolver {
    height: 100%;
    overflow: hidden;
    background-color: var(--layer-common-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    :deep(.n-form-item) {
        --n-label-height: 20px;
        --n-blank-height: 20px;
        padding: 14px 24px 10px;
        margin-bottom: 32px;
        background-color: var(--layer-resolver-form-item);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
        .n-form-item-label {
            font-size: 14px;
            line-height: 20px;
            display: flex;
            align-items: center;
            padding-bottom: 10px;
            padding-left: 0;
        }
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
        --n-padding-vertical: 0;
        --n-line-height-textarea: 28px;
        font-size: 16px;
        .n-input__suffix {
            position: absolute;
            margin: 0;
            right: 0;
            top: 0;
        }
    }
}
</style> -->
