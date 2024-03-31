import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**发送邮件验证码**/
export function httpNodemailerSender(data: Omix<env.BodyNodemailerSender>) {
    return request<env.NoticeResolver>({ url: `/common/mail/sender`, method: 'POST', data })
}
