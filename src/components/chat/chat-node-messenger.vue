<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { useUser, useMessenger } from '@/store'
import { useProvider } from '@/hooks/hook-provider'
import { useMoment } from '@/hooks/hook-common'
import { divineWherer, divineHandler } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatNodeMessenger',
    props: {
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props, ctx) {
        return () => <div class="chat-node-messenger">{props.node.text}</div>
    }
})
</script>
