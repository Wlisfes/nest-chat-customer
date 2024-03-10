<script lang="tsx">
import { defineComponent } from 'vue'
import { useConfiger } from '@/store/configer'

export default defineComponent({
    name: 'AuthLayout',
    setup(props, { slots }) {
        const configer = useConfiger()

        return () => (
            <n-element class="auth-layout n-chunk n-column">
                <common-rainbow></common-rainbow>
                <div class="auth-layout__context n-chunk n-column">
                    {/* <n-h1 style={{ textAlign: 'center' }}>Log in</n-h1> */}
                    <n-form size="large" label-placement="top">
                        <n-form-item path="account" label="邮箱">
                            <n-input
                                //v-model:value={state.form.account}
                                //disabled={state.disabled || state.loading}
                                maxlength={32}
                                type="text"
                                input-props={{ autocomplete: 'off' }}
                                placeholder="请输入邮箱"
                                //onKeydown={(evt: KeyboardEvent) => enter(evt, onEventChecker)}
                            ></n-input>
                        </n-form-item>
                        <n-form-item path="password" label="密码">
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
                        <n-form-item show-label={false}>
                            <n-button
                                type="info"
                                style={{ width: '100%' }}
                                //disabled={state.disabled}
                                //loading={state.loading}
                                //onClick={(e: Event) => stop(e, onEventChecker)}
                                onClick={(scope: Omix) => configer.setTheme(configer.theme === 'light' ? 'dark' : 'light')}
                            >
                                立即登录
                            </n-button>
                        </n-form-item>
                        <n-space wrap-item={false} justify="space-between" style={{ width: '100%', marginBottom: '5px' }}>
                            <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                忘记密码
                            </n-button>
                            <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                注册
                            </n-button>
                        </n-space>
                        <n-space size={32} wrap-item={false} justify="center" align="center" style={{ margin: '24px 0 10px' }}>
                            <n-button text focusable={false}>
                                <n-icon size={44} component={<Iv-BsGithub />}></n-icon>
                            </n-button>
                            <n-icon size={24} color="#fff" component={<Iv-BsSpecor />}></n-icon>
                            <n-button text focusable={false}>
                                <n-icon size={44} component={<Iv-BsGoogle />}></n-icon>
                            </n-button>
                        </n-space>
                    </n-form>
                </div>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.auth-layout {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 28px;
    background-color: var(--base-color);
    transition: padding 0.3s var(--cubic-bezier-ease-in-out), background-color 0.3s var(--cubic-bezier-ease-in-out);
    background-image: url('@/assets/images/chat-layout-yellow.svg'), url('@/assets/images/chat-layout-pink.svg'),
        url('@/assets/images/chat-layout-blue.svg');
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-size: 481px 203px, 241px 192px, 181px 275px;
    background-position: 15% 0px, 3% 100%, 100% 32%;
    &__context {
        position: relative;
        width: 100%;
        max-width: 520px;
        margin: auto;
        box-sizing: border-box;
        box-shadow: var(--box-shadow-1);
        background-color: var(--action-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out), box-shadow 0.3s var(--cubic-bezier-ease-in-out);
        z-index: 2;
        padding: 24px;
        border-radius: 6px;
        :deep(.n-form) {
            .n-form-item {
                --n-label-font-size: 18px;
                --n-feedback-height: 30px;
            }
            .n-input {
                --n-height: 48px;
            }
            .n-button {
                --n-height: 48px;
                --n-font-size: 18px;
            }
        }
    }
}
</style>
