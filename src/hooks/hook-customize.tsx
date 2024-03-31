import { ref, reactive } from 'vue'
import { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { divineDelay, divineHandler } from '@/utils/utils-common'

export interface ScopeOption<T> {
    initialize?: boolean
    disabled?: boolean
    visible?: boolean
    loading?: boolean
    rules?: FormRules
    form: Omix<T>
}

/**自定义表单Hooks**/
export function useFormCustomize<T extends Omix>(scope: ScopeOption<T>) {
    const formRef = ref<FormInst & { $el: HTMLElement }>()
    const initialize = ref<boolean>(scope.initialize ?? true)
    const disabled = ref<boolean>(scope.disabled ?? false)
    const visible = ref<boolean>(scope.visible ?? false)
    const loading = ref<boolean>(scope.loading ?? false)
    const form = ref<typeof scope.form>(scope.form)
    const rules = ref<typeof scope.rules>(scope.rules)
    const state = reactive({ initialize, disabled, visible, loading, form, rules })

    async function setInitialize(value: boolean) {
        return (initialize.value = value)
    }

    async function setDisabled(value: boolean) {
        return (disabled.value = value)
    }

    async function setVisible(value: boolean) {
        return (visible.value = value)
    }

    async function setLoading(value: boolean) {
        return (loading.value = value)
    }

    async function setForm(value: Partial<T>) {
        return (form.value = { ...form.value, ...value })
    }

    /**验证表单**/
    function divineFormValidater(formatter?: (e: Omix<FormItemRule>) => boolean) {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            //prettier-ignore
            formRef.value.validate(async err => {
                if (!err) {
                    return resolve(true)
                }
            }, formatter).catch(err => {
                return resolve(false)
            })
        })
    }

    /**重置表单校验结果**/
    function divineFormRestore() {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            return resolve(formRef.value.restoreValidation())
        })
    }

    /**滚动到第一个报错表单选项**/
    async function divineFormScrollbar() {
        await divineDelay(0)
        return await divineHandler(Boolean(formRef.value), async () => {
            const element = formRef.value!.$el.querySelector('.el-form-item__error')
            return element!.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        })
    }

    return {
        initialize,
        disabled,
        visible,
        loading,
        form,
        rules,
        state,
        formRef,
        setInitialize,
        setDisabled,
        setVisible,
        setLoading,
        setForm,
        divineFormValidater,
        divineFormRestore,
        divineFormScrollbar
    }
}
