<script lang="tsx">
import { defineComponent } from 'vue'
import { useNotification, useLoadingBar, useDialog, useMessage } from 'naive-ui'

export default defineComponent({
    name: 'CommonBeforer',
    setup(props, { slots }) {
        return () => <n-element class="auth-provider">auth-provider</n-element>
    }
})
</script>
