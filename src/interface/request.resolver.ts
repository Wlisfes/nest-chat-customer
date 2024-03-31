export interface NoticeResolver {
    message: string
}

export interface ResultResolver<T = Omix> extends NoticeResolver {
    data: T
    code: number
    timestamp: string
    method: string
    url: string
}

export interface ColumnResolver<T = Omix> extends NoticeResolver {
    page: number
    size: number
    total: number
    list: Array<T>
}
