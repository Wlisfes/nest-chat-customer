<script lang="tsx">
import { defineComponent, computed, CSSProperties, PropType } from 'vue'
import { divineWherer } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'CustomTexter',
    props: {
        current: { type: Boolean, default: false },
        maxWidth: { type: Number, default: 540 },
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true },
        customStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) }
    },
    setup(props) {
        const customComponent = computed(() => {
            return divineWherer(props.current, { marginLeft: 'auto' }, { marginRight: 'auto' })
        })

        return () => (
            <custom-element
                width="auto"
                current={props.current}
                max-width={props.maxWidth}
                read
                node={props.node}
                custom-component={customComponent.value}
            >
                <div class="custom-texter" style={props.customStyle}>
                    <n-text>{props.node.text}</n-text>
                </div>
            </custom-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.custom-texter {
    font-size: 14px;
    line-height: 20px;
    padding: 5px 10px;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 3px;
}
</style>
