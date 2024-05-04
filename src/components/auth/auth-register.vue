<script lang="tsx">
import { defineComponent } from 'vue'
import { useConfiger } from '@/store/configer'
import { useProvider } from '@/hooks/hook-provider'
import { useLocale } from '@/hooks/hook-locale'
import { useFormCustomize } from '@/hooks/hook-customize'
import { useTimine } from '@/hooks/hook-common'
import { enter, divineHandler } from '@/utils/utils-common'
import { divineIsEmailChecker } from '@/utils/utils-validator'
import { divineNotice } from '@/utils/utils-component'
import { httpUserRegister, httpUserRegisterSender } from '@/api/instance.service'

export default defineComponent({
    name: 'AuthRegister',
    setup(props) {
        const { setAuthorize } = useConfiger()
        const { inverted } = useProvider()
        const { setupNotice } = useLocale()
        const { state, execute, setState, setDuration } = useTimine()
        const { formRef, form, rules, loading, setLoading, divineFormValidater } = useFormCustomize({
            form: { nickname: '', email: '', password: '', code: '' },
            rules: {
                nickname: { required: true, trigger: 'blur', min: 2, max: 32, message: '请输入昵称 (昵称必须保持2~32位)' },
                password: { required: true, trigger: 'blur', min: 6, max: 32, message: '请输入登录密码 (密码必须保持6~32位)' },
                code: { required: true, trigger: 'blur', message: '请输入验证码' },
                email: { key: 'email', required: true, trigger: 'blur', validator: divineIsEmailChecker }
            }
        })

        /**发送注册验证码**/
        async function fetchUserSender() {
            const valid = await divineFormValidater(rule => rule.key === 'email')
            return await divineHandler(Boolean(valid), {
                handler: async function () {
                    try {
                        await setState({ loading: true })
                        return await httpUserRegisterSender({ email: form.value.email }).then(async ({ data }) => {
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

        /**提交注册**/
        async function onSubmit() {
            const valid = await divineFormValidater()
            return await divineHandler(Boolean(valid), {
                handler: async function () {
                    try {
                        await setLoading(true)
                        const { data } = await httpUserRegister({
                            nickname: form.value.nickname,
                            email: form.value.email,
                            code: form.value.code,
                            password: window.btoa(encodeURIComponent(form.value.password))
                        })
                        return await divineNotice({ content: setupNotice(data.message) }).then(async () => {
                            await setLoading(false)
                            return await setAuthorize('login')
                        })
                    } catch (e) {
                        return await divineNotice({
                            type: 'error',
                            content: setupNotice(e),
                            onAfterEnter: () => setLoading(false)
                        })
                    }
                }
            })
        }

        return () => (
            <n-form size="large" ref={formRef} model={form.value} rules={rules.value} disabled={loading.value} show-label={false}>
                <n-h2 style={{ fontSize: '28px', fontWeight: 500 }}>
                    <n-text depth={2}>注册</n-text>
                </n-h2>
                <n-form-item path="nickname">
                    <n-input
                        class="n-deep-style"
                        type="text"
                        placeholder="请输入昵称"
                        maxlength={32}
                        input-props={{ autocomplete: 'on' }}
                        v-model:value={form.value.nickname}
                        onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
                        v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuUser />}></n-icon> }}
                    ></n-input>
                </n-form-item>
                <n-form-item path="email">
                    <n-input
                        class="n-deep-style"
                        type="text"
                        placeholder="请输入邮箱"
                        style={{ flex: 1 }}
                        maxlength={64}
                        input-props={{ autocomplete: 'on' }}
                        v-model:value={form.value.email}
                        onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
                        v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuMobile />}></n-icon> }}
                    ></n-input>
                </n-form-item>
                <n-form-item path="password">
                    <common-state
                        data-render={(scope: Omix<{ loading: boolean }>, done: Function) => (
                            <n-input
                                class="n-deep-style"
                                maxlength={32}
                                placeholder="请输入登录密码"
                                type={scope.loading ? 'text' : 'password'}
                                input-props={{ autocomplete: 'new-password' }}
                                style={{ '--input-password-right': '46px' }}
                                v-model:value={form.value.password}
                                onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
                                v-slots={{
                                    prefix: () => <n-icon size={22} component={<Iv-AuOckes />}></n-icon>,
                                    suffix: () => (
                                        <n-button
                                            text
                                            focusable={false}
                                            disabled={loading.value}
                                            onClick={(evt: Event) => done({ loading: !scope.loading })}
                                        >
                                            <n-icon
                                                color="var(--text-color-3)"
                                                size={22}
                                                component={scope.loading ? <Iv-BsEyc /> : <Iv-BsEye />}
                                            ></n-icon>
                                        </n-button>
                                    )
                                }}
                            ></n-input>
                        )}
                    ></common-state>
                </n-form-item>
                <n-form-item path="code">
                    <n-space wrap-item={false} style={{ width: '100%' }}>
                        <n-input
                            class="n-deep-style"
                            type="text"
                            placeholder="请输入邮箱验证码"
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
                            disabled={state.duration > 0 || state.loading || execute.value || !form.value.email || loading.value}
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
                <n-form-item>
                    <n-button
                        type="info"
                        focusable={false}
                        disabled={loading.value}
                        loading={loading.value}
                        style={{ width: '100%' }}
                        onClick={onSubmit}
                    >
                        立即注册
                    </n-button>
                </n-form-item>
                <n-space wrap-item={false} justify="space-between" style={{ width: '100%' }}>
                    <n-button text focusable={false}></n-button>
                    <n-button text focusable={false} onClick={(evt: Event) => setAuthorize('login')}>
                        返回登录
                    </n-button>
                </n-space>
            </n-form>
        )
    }
})
</script>
