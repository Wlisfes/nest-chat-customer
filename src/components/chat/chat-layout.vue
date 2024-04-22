<script lang="tsx">
import { defineComponent, ref, computed, onMounted, Transition, CSSProperties } from 'vue'
import { useCurrentElement, useElementSize, provideLocal } from '@vueuse/core'
import { useConfiger, useUser, useMessenger, useSession } from '@/store'
import { useState } from '@/hooks/hook-state'
import { divineWherer, divineHandler, divineDelay } from '@/utils/utils-common'
import { connectClient } from '@/utils/utils-websocket'
import * as vide from '@/utils/utils-provide'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatLayout',
    setup() {
        const layout = useCurrentElement<HTMLElement>()
        const element = ref<HTMLElement>()
        const configer = useConfiger()
        const user = useUser()
        const session = useSession()
        const messenge = useMessenger()
        const { state, setState } = useState({ loading: true, failure: false })
        const { width } = useElementSize(layout)
        const compute = computed<CSSProperties>(() => ({
            '--chat-layout-max-width': divineWherer(width.value > 2000, Math.floor(width.value * 0.8) + 'px', '1600px'),
            '--chat-layout-sider-width': divineWherer(width.value > 2000, '520px', divineWherer(width.value < 960, '0px', '420px')),
            '--chat-layout-sider-element-width': divineWherer(width.value > 2000, '520px', '420px')
        }))

        /**注入布局容器节点**/ //prettier-ignore
        provideLocal(vide.APP_CHAT_PROVIDE_LAYOUT, computed(() => layout.value))
        /**注入挂载容器节点**/ //prettier-ignore
        provideLocal(vide.APP_CHAT_PROVIDE_ELEMENT, computed(() => element.value))

        onMounted(async () => {
            await user.fetchUserResolver()
            await session.fetchSessionInitColumn()
            await divineConnectSocketClient()
        })

        /**开启socket连接**/
        async function divineConnectSocketClient() {
            return await connectClient().then(client => {
                /**监听socket连接**/
                client.on('connect', async () => {
                    return await setState({ loading: false })
                })
                /**监听socket断开连接**/
                client.on('disconnect', async reason => {
                    console.log(`disconnect:`, reason)
                    return await setState({ loading: false, failure: true })
                })
                /**监听socket错误**/
                client.on('connect_error', async err => {
                    console.log(`connect_error:`, err)
                    return await setState({ loading: false, failure: true })
                })
                /**监听消息推送**/
                client.on('server-customize-messager', async (data: Omix<env.SchemaMessager>) => {
                    console.log(data)
                    /**消息列表处理**/
                    await messenge.fetchSessionServerMessager(session.sid, data)
                    /**会话列表**/
                    await session.fetchSessionServerMessager(data)
                })
            })
        }

        return () => (
            <n-element class="chat-layout" style={compute.value}>
                {state.loading || state.failure ? (
                    <div class="chat-layout__loadiner n-chunk n-center n-middle">
                        <div class="chunk-loadiner n-chunk n-column n-center n-middle">
                            <n-icon size={56} color="var(--text-color-3)" style={{ opacity: 0.2 }} component={<Iv-BsChat />}></n-icon>
                            <n-skeleton height="4px" round />
                            <n-text depth={3} style={{ opacity: 0.5, fontSize: '16px' }}>
                                Chat 盒子
                            </n-text>
                        </div>
                    </div>
                ) : (
                    <div ref={element} class="chat-layout__context">
                        {user.uid && width.value > 0 && (
                            <div class="chat-layout__container n-chunk">
                                <div class="chunk-sider n-chunk n-column">
                                    <div class="chunk-sider__element n-chunk n-column n-auto">
                                        <chat-sider></chat-sider>
                                    </div>
                                </div>
                                <div class="chunk-context n-chunk n-column n-auto">
                                    <chat-context></chat-context>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-layout {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 24px;
    background-image: url('@/assets/images/auth-layout.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    transition: padding 0.3s var(--cubic-bezier-ease-in-out);
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--chat-layout-before);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
    @media (max-width: 1440px) {
        padding: 0;
    }
    &__loadiner {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
        background-color: var(--chat-layout-loadiner);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
        z-index: 9;
        .chunk-loadiner {
            width: 90%;
            max-width: 350px;
            margin: auto;
            row-gap: 24px;
        }
    }
    &__context {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: auto;
        box-sizing: border-box;
        max-width: var(--chat-layout-max-width);
        transition: max-width 0.3s var(--cubic-bezier-ease-in-out);
    }
    &__container {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: var(--box-shadow-2);
    }
}

.chunk-sider {
    overflow: hidden;
    width: var(--chat-layout-sider-width);
    transition: width 0.3s var(--cubic-bezier-ease-in-out);
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        border-right: 1px solid var(--chat-border-color);
        transition: border-right 0.3s var(--cubic-bezier-ease-in-out);
        z-index: 1;
    }
    &__element {
        overflow: hidden;
        width: var(--chat-layout-sider-element-width);
        transition: width 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
