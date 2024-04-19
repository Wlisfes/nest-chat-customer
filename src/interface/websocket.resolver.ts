import * as env from '@/interface/instance.resolver'

export interface WebSocketConnectOption {
    connect?: () => void
    disconnect?: (reason: string) => void
    connectError?: (err: env.CustomizeError<Omix>) => void
}
