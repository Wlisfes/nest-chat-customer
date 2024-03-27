<script lang="tsx">
import { defineComponent, ref, onMounted, nextTick, Fragment } from 'vue'

export default defineComponent({
    name: 'ChatNodeSessioner',
    setup(props) {
        return () => (
            <div class="chat-node-sessioner n-chunk">
                <n-avatar
                    round
                    size={48}
                    src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg?x-oss-process=style/resize-1-1"
                />
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-node-sessioner {
    overflow: hidden;
}
</style>
