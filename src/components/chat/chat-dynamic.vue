<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { useDrawer } from '@/hooks/hook-layer'
import { Observer } from '@/utils/utils-observer'

export default defineComponent({
    name: 'ChatDynamic',
    props: {
        observer: { type: Object as PropType<Observer<Omix>>, required: true }
    },
    setup(props, { emit }) {
        const { observer } = useDrawer({ observer: props.observer, mount: true, unmount: true })

        return () => (
            <div class="chat-dynamic n-chunk n-column n-auto n-disover">
                <chat-compose observer={props.observer} title="动态"></chat-compose>
            </div>
        )
    }
})
</script>
