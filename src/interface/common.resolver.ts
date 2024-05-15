import * as env from '@/interface/instance.resolver'

/**颜色背景列表**/
export interface RestCommonWallpaper extends env.CommonSchema {
    waid: string
    light: string
    dark: string
}
