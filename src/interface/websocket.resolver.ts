export interface WebSocketConnectOption {
    connect?: () => void
    disconnect?: (reason: string) => void
    connect_error?: (err: Error) => void
}
