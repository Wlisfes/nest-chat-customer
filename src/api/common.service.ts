import { request } from '@/utils/utils-request'
import * as env from '@/interface/instance.resolver'

/**颜色背景列表**/
export function httpCommonWallpaper() {
    return request<env.ColumnResolver<env.RestCommonWallpaper>>({
        url: `/common/wallpaper`,
        method: 'GET'
    })
}
