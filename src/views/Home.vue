<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    setup(props) {
        return () => (
            <layout-provider>
                {{
                    sider: () => <chat-sider></chat-sider>,
                    default: () => <chat-context></chat-context>
                }}
            </layout-provider>
        )
    }
})
</script>
