import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**文件上传**/
export function httpStreamUploader(data: FormData) {
    return request<env.RestStreamUploader>({
        url: `/uploader/stream`,
        method: 'POST',
        data
    })
}
