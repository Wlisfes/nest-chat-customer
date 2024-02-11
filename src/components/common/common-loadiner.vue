<script lang="tsx">
import { defineComponent, computed, CSSProperties } from 'vue'

export default defineComponent({
    name: 'CommonLoadiner',
    props: {
        size: { type: Number, default: 20 },
        sizeBorder: { type: Number, default: 3 },
        circle: { type: Number, default: 2 },
        circleColor: { type: String, default: '#24B89E' },
        circleLowColor: { type: String, default: 'rgba(212, 212, 212, 0.6)' }
    },
    setup(props) {
        const element = computed<CSSProperties>(() => {
            const styles: CSSProperties = {}
            if (props.circle === 1) {
                styles['border-top-color'] = 'var(--circle-low-color)'
                styles['border-right-color'] = 'var(--circle-low-color)'
                styles['border-bottom-color'] = 'var(--circle-low-color)'
            } else if (props.circle === 2) {
                styles['border-right-color'] = 'var(--circle-low-color)'
                styles['border-bottom-color'] = 'var(--circle-low-color)'
            } else if (props.circle === 3) {
                styles['border-top-color'] = 'var(--circle-low-color)'
            }
            return styles
        })

        return () => (
            <div
                class="common-loadiner"
                style={{
                    '--size': props.size + 'px',
                    '--size-border': props.sizeBorder + 'px',
                    '--circle-color': props.circleColor,
                    '--circle-low-color': props.circleLowColor,
                    ...element.value
                }}
            ></div>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-loadiner {
    display: inline-block;
    position: relative;
    width: var(--size);
    height: var(--size);
    border-style: solid;
    border-color: var(--circle-color);
    border-width: var(--size-border);
    border-radius: 100%;
    box-sizing: border-box;
    animation: circle infinite 0.75s linear;
    @keyframes circle {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
