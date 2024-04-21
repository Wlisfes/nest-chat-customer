<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CustomAvatar',
    props: {
        src: { type: String },
        size: { type: Number, default: 42 }
    },
    setup(props) {
        return () => (
            <div class="custom-avatar n-chunk n-center n-middle n-disover" style={{ '--custom-size': props.size + 'px' }}>
                <n-image preview-disabled src={props.src} />
            </div>
        )
    }
})
</script>

<style lang="scss" scoped>
.custom-avatar {
    width: var(--custom-size);
    height: var(--custom-size);
    min-width: var(--custom-size);
    min-height: var(--custom-size);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    :deep(.n-image),
    :deep(img) {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
