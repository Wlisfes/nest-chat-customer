<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'CustomComponent',
    props: {
        current: { type: Boolean, default: false },
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props) {
        const className = computed(() => ({
            'custom-component n-chunk n-auto n-disover': true,
            'is-current n-end': props.current,
            'is-other': !props.current
        }))

        return () => (
            <div class={className.value}>
                {props.node.source === env.EnumMessagerSource.text ? (
                    <custom-texter current={props.current} node={props.node}></custom-texter>
                ) : props.node.source === env.EnumMessagerSource.image ? (
                    <custom-image current={props.current} node={props.node}></custom-image>
                ) : props.node.source === env.EnumMessagerSource.document ? (
                    <custom-document current={props.current} node={props.node}></custom-document>
                ) : (
                    <custom-texter current={props.current} node={props.node}></custom-texter>
                )}
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.custom-component {
    min-height: 40px;
    box-sizing: border-box;
    &.is-current {
        padding-right: 10px;
        &::before {
            content: '';
            position: absolute;
            right: 0;
            top: 13px;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-bottom: 7px solid transparent;
            border-left: 10px solid var(--custom-element-current-color);
            transition: border 0.3s var(--cubic-bezier-ease-in-out);
        }
    }
    &.is-other {
        padding-left: 10px;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 13px;
            width: 0;
            height: 0;
            border-top: 7px solid transparent;
            border-bottom: 7px solid transparent;
            border-right: 10px solid var(--custom-element-other-color);
            transition: border 0.3s var(--cubic-bezier-ease-in-out);
        }
    }
}
</style>
