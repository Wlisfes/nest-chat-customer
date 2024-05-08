<script lang="tsx">
import { defineComponent, ref, PropType } from 'vue'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'

export default defineComponent({
    name: 'ChatChane',
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { observer } = useDrawer({ observer: props.observer, mount: true, unmount: true })

        return () => (
            <div class="chat-chane n-chunk n-column n-auto n-disover">
                <chat-compose title="频道"></chat-compose>
            </div>
        )
    }
})
</script>
