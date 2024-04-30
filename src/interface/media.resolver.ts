import * as env from '@/interface/instance.resolver'

/**媒体文件表: 文件类型**/
export enum EnumMediaEntierSource {
    image = 'image',
    document = 'document',
    audio = 'audio',
    video = 'video'
}

/**媒体文件表**/
export interface SchemaMedia extends env.CommonSchema {
    userId: string
    source: EnumMediaEntierSource
    fileId: string
    fileName: string
    fieldName: string
    fileSize: number
    folder: string
    fileURL: string
    width: number
    height: number
    depater: SchemaMedia
}

/**文件上传**/
export interface ResultStreamUploader {
    fieldName: string
    fileId: string
    fileName: string
    folder: string
    url: string
    message: string
}
