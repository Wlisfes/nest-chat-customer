<script lang="tsx">
import { defineComponent, computed, Fragment } from 'vue'
import { useConfiger } from '@/store/configer'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'LayoutProvider',
    setup(props, { slots }) {
        const configer = useConfiger()

        return () => (
            <n-element class="layout-provider">
                <div class="layout-context n-chunk">
                    <div class="chunk-sider n-chunk n-column">{slots.sider && slots.sider()}</div>
                    <div class="chunk-context n-chunk n-column n-auto">{slots.default && slots.default()}</div>
                </div>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.layout-provider {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 24px;
    background-color: var(--chat-layout-color);
    transition: padding 0.3s var(--cubic-bezier-ease-in-out), background-color 0.3s var(--cubic-bezier-ease-in-out);
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 180px;
        background-color: var(--chat-layout-before);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
    @media (max-width: 1440px) {
        padding: 0;
    }
    .layout-context {
        position: relative;
        width: 100%;
        max-width: 1600px;
        height: 100%;
        margin: auto;
        box-sizing: border-box;
        box-shadow: var(--box-shadow-2);
        background-color: var(--chat-layout-context);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
}

.chunk-sider {
    overflow: hidden;
    width: 420px;
}
</style>
