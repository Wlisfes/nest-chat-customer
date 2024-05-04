<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { setupNotice } from '@/i18n'
import { useModal } from '@/hooks/hook-layer'
import { useProvider } from '@/hooks/hook-provider'
import { useTimine } from '@/hooks/hook-common'
import { useFormCustomize } from '@/hooks/hook-customize'
import { divineRender, divineNotice } from '@/utils/utils-component'
import { enter, divineHandler } from '@/utils/utils-common'
import { divineTransfer } from '@/utils/utils-transfer'
import { httpUserfactorSender, httpUserfactor } from '@/api/instance.service'

export default defineComponent({
    name: 'LayerFactor',
    emits: ['close', 'submit'],
    props: {
        uid: { type: String, required: true },
        email: { type: String, required: true }
    },
    setup(props, { emit }) {
        const { inverted } = useProvider()
        const { state, execute, setState, setDuration } = useTimine()
        const { visible, loading, chunkContent, chunkNegative, chunkPositive, fetchState } = useModal({ width: 500 })
        const { formRef, form, rules, divineFormValidater } = useFormCustomize({
            form: { email: props.email, code: '' },
            rules: {
                code: { required: true, trigger: 'blur', message: '请输入验证码' }
            }
        })

        onMounted(async () => {
            await fetchState({ visible: true })
            return await divineHandler(Boolean(props.uid), {
                handler: fetchUserSender
            })
        })

        /**发送双因子验证码**/
        async function fetchUserSender() {
            return await divineHandler(Boolean(props.uid), {
                handler: async () => {
                    try {
                        await setState({ loading: true })
                        return await httpUserfactorSender({ uid: props.uid }).then(async ({ data }) => {
                            await setDuration(60)
                            await divineNotice({ content: setupNotice(data.message) })
                            return await setState({ loading: false })
                        })
                    } catch (e) {
                        return await divineNotice({
                            type: 'error',
                            content: setupNotice(e),
                            onAfterEnter: () => setState({ loading: false })
                        })
                    }
                }
            })
        }

        /**双因子认证**/
        async function onSubmit() {
            const valid = await divineFormValidater()
            return await divineHandler(Boolean(valid), {
                failure: () => false,
                handler: async function () {
                    try {
                        await fetchState({ loading: true, disabled: true })
                        return await httpUserfactor({ uid: props.uid, code: form.value.code }).then(async ({ data }) => {
                            await fetchState({ visible: false })
                            return await divineNotice({
                                content: setupNotice(data.message),
                                onAfterEnter: () => emit('submit', { ...data, done: fetchState })
                            })
                        })
                    } catch (e) {
                        return await divineNotice({ type: 'error', content: setupNotice(e) }).then(async () => {
                            await fetchState({ loading: false, disabled: false })
                            return false
                        })
                    }
                }
            })
        }

        return () => (
            <n-modal
                v-model:show={visible.value}
                auto-focus={false}
                mask-closable={false}
                show-icon={false}
                preset="dialog"
                style={chunkContent.value}
                onAfterEnter={(el: HTMLElement) => divineTransfer(el)}
                on-after-leave={() => emit('close')}
                title={divineRender(<done-title content="双因子认证"></done-title>)}
                negative-text="取消"
                positive-text="登录"
                negative-button-props={chunkNegative.value}
                positive-button-props={{ ...chunkPositive.value, type: 'success' }}
                on-positive-click={onSubmit}
            >
                <n-form
                    size="large"
                    ref={formRef}
                    model={form.value}
                    rules={rules.value}
                    disabled={loading.value}
                    show-label={false}
                    style={{ padding: '20px 0 14px' }}
                >
                    <n-form-item path="email">
                        <n-input
                            disabled
                            placeholder="请输入登录邮箱"
                            v-model:value={form.value.email}
                            v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuUser />}></n-icon> }}
                        ></n-input>
                    </n-form-item>
                    <n-form-item path="code">
                        <n-space wrap-item={false} style={{ width: '100%' }}>
                            <n-input
                                type="text"
                                placeholder="请输入验证码"
                                maxlength={6}
                                style={{ flex: 1 }}
                                v-model:value={form.value.code}
                                onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
                                v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuCodex />}></n-icon> }}
                            ></n-input>
                            <n-button
                                focusable={false}
                                secondary={inverted.value}
                                loading={state.loading}
                                disabled={state.duration > 0 || state.loading || execute.value || loading.value}
                                onClick={fetchUserSender}
                            >
                                {state.duration === 0 && !state.initialize ? (
                                    <span>发送验证码</span>
                                ) : state.duration === 0 && state.initialize ? (
                                    <span>重新发送</span>
                                ) : (
                                    <span>{`${state.duration} 秒后重新发送`}</span>
                                )}
                            </n-button>
                        </n-space>
                    </n-form-item>
                </n-form>
            </n-modal>
        )
    }
})
</script>
