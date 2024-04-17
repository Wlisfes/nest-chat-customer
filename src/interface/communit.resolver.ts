import * as env from '@/interface/instance.resolver'

/**社群记录表: 社群状态**/
export enum EnumCommunitStatus {
    enable = 'enable',
    dissolve = 'dissolve'
}

/**社群记录表**/
export interface SchemaCommunit extends env.CommonSchema {
    uid: string
    name: string
    poster: env.SchemaMedia
    ownId: string
    status: EnumCommunitStatus
    comment: string
    speak: boolean
}

/**新建社群**/
export interface BodyCommunitCreater extends Pick<SchemaCommunit, 'name'> {}
