import * as env from '@/interface/instance.resolver'

export interface WebSocketConnectOption {
    connect?: () => void
    disconnect?: (reason: string) => void
    connectError?: (err: env.CustomizeError<Omix>) => void
}

/**远程呼叫查询入参**/
export interface BodySocketCallRemote {
    sid: string
    source: env.EnumSessionSource
    contactId?: string
    communitId?: string
}
/**远程呼叫查询**/
export interface RestSocketCallRemoteResolver {
    nive: env.SchemaUser
    user: env.SchemaUser
    communit: Array<string>
}
