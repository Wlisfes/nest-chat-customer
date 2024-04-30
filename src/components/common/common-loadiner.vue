<script lang="tsx">
import { defineComponent, computed, CSSProperties } from 'vue'

export default defineComponent({
    name: 'CommonLoadiner',
    props: {
        sizeIner: { type: Number, default: 2 },
        size: { type: Number, default: 20 },
        sizeBorder: { type: Number, default: 3 },
        circle: { type: Number, default: 2 },
        circleColor: { type: String, default: 'var(--primary-color)' },
        circleLowColor: { type: String, default: 'rgba(212, 212, 212, 0.6)' }
    },
    setup(props) {
        const compute = computed<CSSProperties>(() => {
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
            return Object.assign(styles, {
                '--circle-size': props.size + 'px',
                '--circle-size-border': props.sizeBorder + 'px',
                '--circle-color': props.circleColor,
                '--circle-low-color': props.circleLowColor
            })
        })

        return () => (
            <n-element class="common-loadiner" style={{ '--circle-size-iner': props.sizeIner + 'px' }}>
                <div class="common-loadiner__component" style={compute.value}></div>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-loadiner {
    display: inline-block;
    position: relative;
    padding: var(--circle-size-iner);
    &__component {
        position: relative;
        width: var(--circle-size);
        height: var(--circle-size);
        border-style: solid;
        border-color: var(--circle-color);
        border-width: var(--circle-size-border);
        border-radius: 100%;
        box-sizing: border-box;
        animation: circle infinite 0.75s linear;
    }
}
@keyframes circle {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
