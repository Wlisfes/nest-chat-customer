<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AuthLogin',
    setup(props) {
        return () => (
            <n-form size="large" show-label={false}>
                <n-h2 style={{ fontSize: '28px', fontWeight: 500 }}>
                    <n-text depth={2}>登录</n-text>
                </n-h2>
                <n-form-item path="account">
                    <n-input
                        //v-model:value={state.form.account}
                        //disabled={state.disabled || state.loading}
                        maxlength={32}
                        type="text"
                        input-props={{ autocomplete: 'off' }}
                        placeholder="请输入邮箱"
                        //onKeydown={(evt: KeyboardEvent) => enter(evt, onEventChecker)}
                        v-slots={{
                            prefix: () => <n-icon size={20} component={<Iv-BsChane />}></n-icon>
                        }}
                    ></n-input>
                </n-form-item>
                <n-form-item path="password">
                    <n-input
                        //v-model:value={state.form.password}
                        //disabled={state.disabled || state.loading}
                        maxlength={18}
                        type="password"
                        show-password-on="mousedown"
                        input-props={{ autocomplete: 'current-password' }}
                        placeholder="请输入登录密码"
                        //onKeydown={(evt: KeyboardEvent) => enter(evt, onEventChecker)}
                    ></n-input>
                </n-form-item>
                <n-form-item>
                    <n-button type="info" style={{ width: '100%' }}>
                        立即登录
                    </n-button>
                </n-form-item>
                <n-space wrap-item={false} justify="space-between" style={{ width: '100%' }}>
                    <n-button text focusable={false}>
                        忘记密码
                    </n-button>
                    <n-button text focusable={false}>
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
