<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChatCompose',
    setup(props) {
        return () => (
            <div class="chat-compose">
                <n-avatar
                    round
                    size={40}
                    src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg?x-oss-process=style/resize-1-1"
                />
                <common-icon
                    component={<Iv-BsDynamic />}
                    spin={<common-loadiner />}
                    onClick={(scope: Omix) => scope.done({ loading: true })}
                ></common-icon>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-compose {
    height: 60px;
    padding: 10px 16px;
    box-sizing: border-box;
    background-color: var(--chat-compose-color);
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
}
</style>
