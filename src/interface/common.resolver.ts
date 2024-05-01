import * as env from '@/interface/instance.resolver'

export interface BodyNodemailerSender {
    email: string
    source: 'register'
}

/**颜色背景列表**/
export interface RestCommonWallpaper extends env.CommonSchema {
    light: string
    dark: string
}
