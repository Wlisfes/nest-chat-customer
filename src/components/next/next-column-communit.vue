<script lang="tsx">
import { defineComponent, Fragment, PropType } from 'vue'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'ChatContact',
    props: {
        node: { type: Object as PropType<env.SchemaCommunit>, required: true }
    },
    setup(props) {
        return () => (
            <common-element class="n-chunk n-center n-pointer">
                <chat-avatar size={42} src={props.node.poster.fileURL}></chat-avatar>
                <div class="n-chunk n-column n-auto n-disover">DSADA</div>
            </common-element>
        )
    }
})
</script>
