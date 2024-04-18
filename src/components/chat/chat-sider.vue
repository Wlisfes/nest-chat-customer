<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatSider',
    setup(props) {
        return () => (
            <div class="chat-sider n-chunk n-auto">
                <div class="chat-sider__carte n-chunk n-column">
                    <chat-carte></chat-carte>
                </div>
                <div class="chat-sider__container n-chunk n-column n-auto">
                    <chat-compose></chat-compose>
                    <chat-searcher></chat-searcher>
                    <div class="chat-sider__scrollbar n-chunk n-column">
                        <chat-sessioner></chat-sessioner>
                    </div>
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
    &__carte {
        width: 60px;
        overflow: hidden;
    }
    &__container {
        position: relative;
        overflow: hidden;
    }
    &__scrollbar {
        flex: 1;
        position: relative;
        overflow: hidden;
        background-color: var(--chat-searcher-color);
        transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    }
}
</style>
