<script lang="tsx">
import { defineComponent, onMounted, Fragment, PropType } from 'vue'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatNodeSociety',
    props: {
        node: { type: Object as PropType<Omix<env.SchemaSession>>, required: true }
    },
    setup() {
        return () => <div class="chat-node-society n-chunk n-disover n-pointer"></div>
    }
})
</script>
