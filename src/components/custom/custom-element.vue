<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'CustomElement',
    props: {
        current: { type: Boolean, default: false },
        maxWidth: { type: Number, required: true },
        width: { type: String, default: '100%' },
        read: { type: Boolean, default: false },
        node: { type: Object as PropType<Omix<env.SchemaMessager>>, required: true }
    },
    setup(props, { slots }) {
        return () => (
            <div class="custom-element n-chunk n-column" style={{ width: props.width, maxWidth: props.maxWidth + 'px' }}>
                <div class={{ 'custom-component': true, 'chunk-current': props.current, 'chunk-other': !props.current }}>
                    {slots.default && slots.default()}
                </div>
                <div class="element-date n-chunk n-center n-end">
                    <n-text depth={3} style={{ paddingTop: '2px' }}>
                        {props.node.createTime}
                    </n-text>
                    {props.current && (
                        <div class="n-chunk n-center" style={{ paddingLeft: '4px' }}>
                            {props.read ? (
                                <n-icon size={14} color="#25d366" component={<Iv-BsReadr />}></n-icon>
                            ) : props.node.status === env.EnumMessagerStatus.sending ? (
                                <n-icon size={14} color="var(--text-color-3)" component={<Iv-BsCheck />}></n-icon>
                            ) : props.node.status === env.EnumMessagerStatus.delivered ? (
                                <n-icon size={14} color="var(--text-color-3)" component={<Iv-BsReadr />}></n-icon>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.element-date {
    padding: 4px 5px 0;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1;
    user-select: none;
    :deep(.n-icon) {
        transition: color 0.3s var(--cubic-bezier-ease-in-out);
    }
}

.custom-component {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 34px;
    padding: 3px;
    border-radius: 6px;
    box-sizing: content-box;
    transition: background-color 0.3s var(--cubic-bezier-ease-in-out);
    &.chunk-current {
        background-color: var(--custom-element-current-color);
    }
    &.chunk-other {
        background-color: var(--custom-element-other-color);
    }
}
</style>
