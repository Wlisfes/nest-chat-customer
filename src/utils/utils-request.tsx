import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { APP_COMMON, getStore } from '@/utils/utils-storage'
import { locale } from '@/i18n'

export const BaseURL = `/web-service`
export const request = axios.create({
    baseURL: BaseURL,
    timeout: 60000
}) as Request

function inizeNotice(response: AxiosResponse) {
    if (response.data.code !== 200) {
        return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
}

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getStore<string>(APP_COMMON.CHAT_TOKEN)
        if (token) {
            config.headers.Authorization = token
        }
        config.headers['x-locale'] = locale.value
        return config
    },
    error => Promise.reject(error)
)

request.interceptors.response.use(
    (response: AxiosResponse) => inizeNotice(response),
    error => Promise.reject(error)
)
