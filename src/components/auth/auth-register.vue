<script lang="tsx">
import { defineComponent } from 'vue'
import { useConfiger } from '@/store/configer'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'AuthRegister',
    setup(props) {
        const configer = useConfiger()
        const { inverted } = useProvider()

        return () => (
            <n-form size="large" show-label={false}>
                <n-h2 style={{ fontSize: '28px', fontWeight: 500 }}>
                    <n-text depth={2}>注册</n-text>
                </n-h2>
                <n-form-item path="nickname">
                    <n-input
                        maxlength={32}
                        type="text"
                        placeholder="请输入昵称"
                        v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuUser />}></n-icon> }}
                    ></n-input>
                </n-form-item>
                <n-form-item path="email">
                    <n-space wrap-item={false} style={{ width: '100%' }}>
                        <n-input
                            style={{ flex: 1 }}
                            type="text"
                            maxlength={64}
                            placeholder="请输入邮箱"
                            v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuMobile />}></n-icon> }}
                        ></n-input>
                        <n-button secondary={inverted.value}>获取验证码</n-button>
                    </n-space>
                </n-form-item>
                <n-form-item path="nickname">
                    <n-input
                        maxlength={6}
                        type="text"
                        placeholder="请输入邮箱验证码"
                        v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuCodex />}></n-icon> }}
                    ></n-input>
                </n-form-item>
                <n-form-item path="password">
                    <n-input
                        maxlength={32}
                        type="password"
                        placeholder="请输入登录密码"
                        v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuOckes />}></n-icon> }}
                    ></n-input>
                </n-form-item>
                <n-form-item>
                    <n-button type="info" style={{ width: '100%' }} onClick={(evt: Event) => configer.setTheme('dark')}>
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
