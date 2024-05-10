<script lang="tsx">
import { defineComponent, Fragment, PropType } from 'vue'
import { useNotification, useContact, useUser, useStore } from '@/store'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatNotifyCommunit',
    props: {
        node: { type: Object as PropType<env.SchemaNotification>, required: true }
    },
    setup(props) {
        return () => (
            <div class="chunk-block n-chunk n-pointer">
                <chat-avatar size={42} src={props.node.communit.poster.fileURL}></chat-avatar>
            </div>
        )
    }
})
</script>
