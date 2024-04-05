import * as env from '@/interface/instance.resolver'

export interface SchemaCommunit extends env.CommonSchema {
    uid: string
    name: string
    poster: string
    creator: env.SchemaUser
    members: Array<env.SchemaUser>
}

/**新建社群**/
export interface BodyCommunitCreater extends Pick<SchemaCommunit, 'name'> {}
