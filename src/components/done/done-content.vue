<script lang="tsx">
import { defineComponent } from 'vue'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'DoneContent',
    props: {
        showIcon: { type: Boolean, default: false },
        content: { type: String }
    },
    setup(props, { slots }) {
        return () => (
            <n-element class="done-content n-chunk n-column n-disover" style={{ userSelect: 'none' }}>
                {slots.default ? (
                    slots.default()
                ) : (
                    <div class="n-chunk n-column" style={{ padding: divineWherer(props.showIcon, '10px 0 30px 0px', '10px 0 30px') }}>
                        <n-text depth={2} style={{ fontSize: '16px', lineHeight: '22px' }}>
                            {props.content}
                        </n-text>
                    </div>
                )}
            </n-element>
        )
    }
})
</script>
