<script lang="tsx">
import { defineComponent } from 'vue'
import { useConfiger } from '@/store/configer'

export default defineComponent({
    name: 'AuthLogin',
    setup(props) {
        const configer = useConfiger()

        return () => (
            <n-form size="large" show-label={false}>
                <n-h2 style={{ fontSize: '28px', fontWeight: 500 }}>
                    <n-text depth={2}>登录</n-text>
                </n-h2>
                <n-form-item path="email">
                    <n-input
                        maxlength={32}
                        type="text"
                        placeholder="请输入邮箱"
                        v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuUser />}></n-icon> }}
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
                <n-form-item path="email">
                    <n-space wrap-item={false} style={{ width: '100%' }}>
                        <n-input
                            style={{ flex: 1 }}
                            type="text"
                            maxlength={64}
                            placeholder="请输入邮箱"
                            v-slots={{ prefix: () => <n-icon size={22} component={<Iv-AuCodex />}></n-icon> }}
                        ></n-input>
                        <common-grapher></common-grapher>
                    </n-space>
                </n-form-item>
                <n-form-item>
                    <n-button type="info" style={{ width: '100%' }} onClick={(evt: Event) => configer.setTheme('light')}>
                        立即登录
                    </n-button>
                </n-form-item>
                <n-space wrap-item={false} justify="space-between" style={{ width: '100%' }}>
                    <n-button text focusable={false}>
                        忘记密码
                    </n-button>
                    <n-button text focusable={false} onClick={(evt: Event) => configer.setAuthorize('register')}>
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
