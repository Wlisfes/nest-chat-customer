<script lang="tsx">
import { defineComponent, ref, onMounted, nextTick, Fragment } from 'vue'

export default defineComponent({
    name: 'ChatSider',
    setup(props) {
        return () => (
            <div class="chat-sider n-chunk n-column n-auto">
                <chat-compose></chat-compose>
                <chat-searcher></chat-searcher>
                <div class="chat-sider__scrollbar n-chunk n-column">
                    <chat-sessioner></chat-sessioner>
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-sider {
    position: relative;
    overflow: hidden;
    &__scrollbar {
        flex: 1;
        position: relative;
        overflow: hidden;
        background-color: var(--chat-searcher-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
