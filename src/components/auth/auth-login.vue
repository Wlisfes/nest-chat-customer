<script lang="tsx">
import { defineComponent, ref, Ref } from 'vue'
import { isEmpty, isEmail } from 'class-validator'
import { useConfiger, useUser } from '@/store'
import { useLocale } from '@/hooks/hook-locale'
import { useFormCustomize } from '@/hooks/hook-customize'
import { enter, divineHandler } from '@/utils/utils-common'
import { divineNotice } from '@/utils/utils-component'
import { httpUserAuthorizer } from '@/api/instance.service'

export default defineComponent({
    name: 'AuthLogin',
    setup(props) {
        const refresh = ref() as Ref<Omix<{ done: Function }>>
        const { setAuthorize } = useConfiger()
        const { setToken, fetchUserResolver } = useUser()
        const { setupNotice } = useLocale()
        const { formRef, form, rules, loading, setLoading, divineFormValidater } = useFormCustomize({
            form: { email: '', password: '', code: '' },
            rules: {
                password: { required: true, trigger: 'blur', min: 6, max: 32, message: '请输入登录密码 (密码必须保持6~32位)' },
                code: { required: true, trigger: 'blur', message: '请输入验证码' },
                email: {
                    required: true,
                    trigger: 'blur',
                    validator: (rule, value) => {
                        if (isEmpty(value)) {
                            return new Error(`请输入登录邮箱`)
                        } else if (!isEmail(value)) {
                            return new Error(`邮箱格式不正确`)
                        }
                        return true
                    }
                }
            }
        })

        async function onSubmit() {
            return await divineHandler(await divineFormValidater(), {
                handler: async () => {
                    try {
                        await setLoading(true)
                        const { data, message } = await httpUserAuthorizer({
                            email: form.value.email,
                            code: form.value.code,
                            password: window.btoa(encodeURIComponent(form.value.password))
                        })
                        if (data.factor) {
                            /**开启双因子认证**/
                            return false
                        } else {
                            await setToken(data.token, data.expire * 1000)
                            await fetchUserResolver()
                            return await divineNotice({ content: setupNotice(message) }).then(() => {
                                return setLoading(false)
                            })
                        }
                    } catch (e) {
                        return await divineNotice({ type: 'error', content: setupNotice(e) }).then(async () => {
                            await setLoading(false)
                            return await refresh.value.done(true)
                        })
                    }
                }
            })

            // divineFormValidater().then(async valid => {
            //     if (!valid) {
            //         return false
            //     }
            //     try {
            //         await setLoading(true)
            //         return await httpUserAuthorizer({
            //             email: form.value.email,
            //             code: form.value.code,
            //             password: window.btoa(encodeURIComponent(form.value.password))
            //         }).then(async ({ data, message }) => {
            //             await setToken(data.token, data.expire * 1000)
            //             await fetchUserResolver()
            //             return await divineNotice({ content: setupNotice(message) }).then(() => {
            //                 return setLoading(false)
            //             })
            //         })
            //     } catch (e) {
            //         await divineNotice({ type: 'error', content: setupNotice(e) })
            //         return await setLoading(false).then(() => {
            //             return grapher.value?.done(true)
            //         })
            //     }
            // })
        }

        return () => (
            <n-form size="large" ref={formRef} model={form.value} rules={rules.value} disabled={loading.value} show-label={false}>
                <n-h2 style={{ fontSize: '28px', fontWeight: 500 }}>
                    <n-text depth={2}>登录</n-text>
                </n-h2>
                <n-form-item path="email">
                    <n-input
                        class="n-deep-style"
                        maxlength={32}
                        type="text"
                        placeholder="请输入登录邮箱"
                        v-model:value={form.value.email}
                        input-props={{ autocomplete: 'on' }}
                        onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
                        v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuUser />}></n-icon> }}
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
                            placeholder="验证码"
                            maxlength={4}
                            style={{ flex: 1 }}
                            v-model:value={form.value.code}
                            onKeydown={(evt: KeyboardEvent) => enter(evt, onSubmit)}
                            v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuCodex />}></n-icon> }}
                        ></n-input>
                        <common-grapher ref={refresh} disabled={loading.value}></common-grapher>
                    </n-space>
                </n-form-item>
                <n-form-item>
                    <n-button
                        style={{ width: '100%' }}
                        type="info"
                        focusable={false}
                        disabled={loading.value}
                        loading={loading.value}
                        onClick={onSubmit}
                    >
                        立即登录
                    </n-button>
                </n-form-item>
                <n-space wrap-item={false} justify="space-between" style={{ width: '100%' }}>
                    <n-button text focusable={false}>
                        忘记密码
                    </n-button>
                    <n-button text focusable={false} onClick={(evt: Event) => setAuthorize('register')}>
                        注册账号
                    </n-button>
                </n-space>
                <n-space size={32} wrap-item={false} justify="center" align="center" style={{ marginTop: '24px' }}>
                    <n-button text focusable={false}>
                        <n-icon size={44} component={<Iv-BsGithub />}></n-icon>
                    </n-button>
                    <n-button text focusable={false}>
                        <n-icon size={24} component={<Iv-BsSpecor />}></n-icon>
                    </n-button>
                    <n-button text focusable={false}>
                        <n-icon size={44} component={<Iv-BsGoogle />}></n-icon>
                    </n-button>
                </n-space>
            </n-form>
        )
    }
})
</script>
