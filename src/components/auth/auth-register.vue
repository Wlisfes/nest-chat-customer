<script lang="tsx">
import { defineComponent } from 'vue'
import { isEmpty, isEmail } from 'class-validator'
import { useConfiger } from '@/store/configer'
import { useProvider } from '@/hooks/hook-provider'
import { useFormCustomize } from '@/hooks/hook-customize'
import * as http from '@/api/instance.service'

export default defineComponent({
    name: 'AuthRegister',
    setup(props) {
        const configer = useConfiger()
        const { inverted } = useProvider()
        const { formRef, form, rules, loading, setLoading, divineFormValidater } = useFormCustomize({
            form: {
                nickname: '',
                email: '',
                password: '',
                code: ''
            },
            rules: {
                password: { required: true, trigger: 'blur', min: 6, max: 32, message: '请输入登录密码 (密码长度必须保存6~32位)' },
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

        function onSubmit() {
            divineFormValidater().then(async valid => {
                if (!valid) {
                    return false
                }
                try {
                    await setLoading(true)
                    const { data } = await http.httpUserRegister(form.value)

                    console.log(data)
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
                        <n-button secondary={inverted.value}>获取验证码</n-button>
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
