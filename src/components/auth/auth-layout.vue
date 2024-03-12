<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useConfiger } from '@/store/configer'

export default defineComponent({
    name: 'AuthLayout',
    setup(props) {
        const configer = useConfiger()

        return () => (
            <n-element class="auth-layout n-chunk n-column">
                <common-rainbow></common-rainbow>
                <div class="auth-layout__context n-chunk n-column n-center n-middle">
                    {/* <div class="chunk-switch"></div> */}
                    {configer.authorize === 'login' ? (
                        <Fragment>
                            <auth-login></auth-login>
                        </Fragment>
                    ) : (
                        <auth-register></auth-register>
                    )}
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
    background-image: url('@/assets/images/auth-layout.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    &__context {
        position: relative;
        width: 100%;
        height: 100%;
        max-width: 520px;
        max-height: 520px;
        margin: auto;
        box-sizing: border-box;
        box-shadow: var(--box-shadow-1);
        background-color: var(--auth-layout-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out), box-shadow 0.3s var(--cubic-bezier-ease-in-out);
        z-index: 2;
        padding: 24px;
        border-radius: 6px;
        .chunk-switch {
            position: absolute;
            right: 0;
            top: 0;
            width: 80px;
            height: 80px;
            border-radius: 0 0 0 150%;
            background-color: #489ecf;
        }
        :deep(.n-form) {
            width: 100%;
            max-width: 375px;
            .n-input__prefix {
                margin-right: var(--n-padding-left);
            }
        }
    }
}
</style>
