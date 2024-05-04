import { isEmpty, isEmail } from 'class-validator'
import { FormItemRule } from 'naive-ui'

/**验证邮箱**/
export function divineIsEmailChecker(rule: FormItemRule, value: string) {
    if (isEmpty(value)) {
        return new Error(`请输入登录邮箱`)
    } else if (!isEmail(value)) {
        return new Error(`邮箱格式不正确`)
    }
    return true
}
