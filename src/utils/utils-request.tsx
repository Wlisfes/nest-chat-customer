import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { APP_COMMON, getCookie } from '@/utils/utils-cookie'
import { getDefaultLocale } from '@/i18n'

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
        const token = getCookie<string>(APP_COMMON.CHAT_TOKEN)
        config.headers['x-locale'] = getDefaultLocale()
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    error => Promise.reject(error)
)

request.interceptors.response.use(
    (response: AxiosResponse) => inizeNotice(response),
    error => Promise.reject(error)
)
