<script lang="tsx">
import { defineComponent } from 'vue'
import { useConfiger } from '@/store/configer'

export default defineComponent({
    name: 'AuthLayout',
    setup(props, { slots }) {
        const configer = useConfiger()

        return () => (
            <n-element class="auth-layout n-chunk n-column">
                <common-rainbow style={{ zIndex: 2 }}></common-rainbow>
                <video src="https://oss.lisfes.cn/public/1699418106518.mp4" loop muted autoplay></video>
                <div class="auth-layout__context n-chunk">
                    <div class="n-chunk n-auto">
                        <n-button onClick={(scope: Omix) => configer.setTheme(configer.theme === 'light' ? 'dark' : 'light')}>
                            {configer.theme}
                        </n-button>
                    </div>
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
    padding: 24px;
    background-color: var(--base-color);
    transition: padding 0.3s var(--cubic-bezier-ease-in-out), background-color 0.3s var(--cubic-bezier-ease-in-out);
    video {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
    }
    &__context {
        position: relative;
        width: 100%;
        height: 460px;
        max-width: 828px;
        margin: auto;
        box-sizing: border-box;
        box-shadow: var(--box-shadow-1);
        z-index: 2;
        background-color: var(--auth-layout-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out), box-shadow 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
