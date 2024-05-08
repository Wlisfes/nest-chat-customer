<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { fetchNotification } from '@/components/layer/layer.instance'
import { Observer } from '@/utils/utils-observer'

export default defineComponent({
    name: 'ChatCompose',
    props: {
        title: { type: String },
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props) {
        async function fetchUseNotification() {
            return await fetchNotification({
                observer: props.observer,
                onClose: ({ unmount }: Omix<{ unmount: Function }>) => unmount(300)
            })
        }

        return () => (
            <div class="chat-compose n-chunk n-center n-disover">
                <div class="n-chunk n-column n-auto n-disover">
                    <n-h1>{props.title}</n-h1>
                </div>
                <n-badge dot processing offset={[0, 3]} type="error">
                    <n-button text focusable={false} onClick={fetchUseNotification}>
                        <n-icon size={24} component={<Iv-BsDialog />}></n-icon>
                    </n-button>
                </n-badge>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-compose {
    height: 60px;
    padding: 10px 14px;
    column-gap: 10px;
    box-sizing: border-box;
    background-color: var(--chat-compose-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    .n-h1 {
        font-size: 24px;
        line-height: 40px;
        font-weight: 500;
        margin: 0;
        user-select: none;
    }
    :deep(.n-badge) > .n-badge-sup {
        min-width: 6px;
        width: 6px;
        height: 6px;
    }
}
</style>
