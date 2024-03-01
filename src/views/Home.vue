<script lang="tsx">
import { defineComponent, ref, onMounted, nextTick, Fragment } from 'vue'

export default defineComponent({
    name: 'Home',
    setup(props) {
        return () => (
            <layout-provider
                v-slots={{
                    sider: () => <chat-sider></chat-sider>,
                    default: () => <chat-context></chat-context>
                }}
            ></layout-provider>
        )
    }
})
</script>

<style lang="scss" scoped></style>
