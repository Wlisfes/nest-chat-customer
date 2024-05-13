<script lang="tsx">
import { defineComponent, computed, Fragment, PropType } from 'vue'
import { useContact, useNotification, useStore } from '@/store'
import { divineHandler } from '@/utils/utils-common'
import { fetchInvite, fetchCompadre } from '@/components/layer/layer.instance'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'NextJoinContact',
    props: {
        node: { type: Object as PropType<env.SchemaCommunit>, required: true }
    },
    setup(props) {
        console.log(props)

        return () => <common-element class="n-chunk n-center n-pointer"></common-element>
    }
})
</script>
