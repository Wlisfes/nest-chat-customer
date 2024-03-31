<script lang="tsx">
import { defineComponent } from 'vue'
import { isEmpty, isEmail } from 'class-validator'
import { useConfiger } from '@/store/configer'
import { useProvider } from '@/hooks/hook-provider'
import { useFormCustomize } from '@/hooks/hook-customize'
import { useTiminer } from '@/hooks/hook-common'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'AuthRegister',
    setup(props) {
        const configer = useConfiger()
        const { inverted } = useProvider()
        const { duration, complete, setDuration } = useTiminer()
        const { formRef, form, rules, loading, setLoading, divineFormValidater } = useFormCustomize({
            form: {
                nickname: '',
                email: '',
                password: '',
                code: ''
            },
            rules: {
                nickname: { required: true, trigger: 'blur', min: 2, max: 32, message: '请输入昵称 (昵称必须保持2~32位)' },
                password: { required: true, trigger: 'blur', min: 6, max: 32, message: '请输入登录密码 (密码必须保持6~32位)' },
                code: { required: true, trigger: 'blur', message: '请输入验证码' },
                email: {
                    key: 'email',
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

        /**发送邮件验证码**/
        function fetchNodemailerSender(done: Function) {
            divineFormValidater(rule => rule.key === 'email').then(async valid => {
                if (!valid) {
                    return false
                }
                try {
                    await done({ loading: true })
                    const { data } = await http.httpNodemailerSender({ email: form.value.email, source: 'register' })
                    await setDuration(60)

                    await done({ loading: false })
                } catch (e) {
                    await done({ loading: false })
                }
            })
        }

        function onSubmit() {
            divineFormValidater().then(async valid => {
                if (!valid) {
                    return false
                }
                try {
                    await setLoading(true)
                    const { data } = await http.httpUserRegister({
                        nickname: form.value.nickname,
                        email: form.value.email,
                        code: form.value.code,
                        password: window.btoa(form.value.password)
                    })
                    console.log(data)
                    await setLoading(false)
                    return configer.setAuthorize('login')
                } catch (e) {
                    return await setLoading(false)
                }
            })
        }

        return () => (
            <n-form size="large" ref={formRef} model={form.value} rules={rules.value} show-label={false}>
                <n-h2 style={{ fontSize: '28px', fontWeight: 500 }}>
                    <n-text depth={2}>注册</n-text>
                </n-h2>
                <n-form-item path="nickname">
                    <n-input
                        class="n-deep-style"
                        type="text"
                        placeholder="请输入昵称"
                        maxlength={32}
                        v-model:value={form.value.nickname}
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
                        v-model:value={form.value.email}
                        v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuMobile />}></n-icon> }}
                    ></n-input>
                </n-form-item>
                <n-form-item path="code">
                    <n-space wrap-item={false} style={{ width: '100%' }}>
                        <n-input
                            class="n-deep-style"
                            type="text"
                            placeholder="请输入邮箱验证码"
                            style={{ flex: 1 }}
                            maxlength={6}
                            v-model:value={form.value.code}
                            v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuCodex />}></n-icon> }}
                        ></n-input>
                        <common-state
                            data-render={(scope: Omix<{ loading: boolean }>, done: Function) => (
                                <n-button
                                    focusable={false}
                                    secondary={inverted.value}
                                    loading={scope.loading}
                                    disabled={duration.value > 0 || scope.loading || !form.value.email}
                                    onClick={(evt: Event) => fetchNodemailerSender(done)}
                                >
                                    {duration.value === 0 && complete.value ? (
                                        <span>发送验证码</span>
                                    ) : duration.value === 0 && !complete.value ? (
                                        <span>重新发送</span>
                                    ) : (
                                        <span>{`${duration.value} 秒后重新发送`}</span>
                                    )}
                                </n-button>
                            )}
                        ></common-state>
                    </n-space>
                </n-form-item>
                <n-form-item path="password">
                    <n-input
                        class="n-deep-style"
                        type="password"
                        placeholder="请输入登录密码"
                        maxlength={32}
                        style={{ '--input-password-right': '46px' }}
                        v-model:value={form.value.password}
                        v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuOckes />}></n-icon> }}
                    ></n-input>
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
                    <n-button text focusable={false} onClick={(evt: Event) => configer.setAuthorize('login')}>
                        返回登录
                    </n-button>
                </n-space>
            </n-form>
        )
    }
})
</script>
