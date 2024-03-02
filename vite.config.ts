import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)

    return {
        plugins: [
            Vue(),
            VueJsx(),
            AutoImport({
                resolvers: [NaiveUiResolver(), IconsResolver()]
            }),
            Components({
                dts: true,
                deep: true,
                extensions: ['vue', 'tsx'],
                include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.tsx\?tsx/],
                dirs: ['src/components', 'src/layouts'],
                resolvers: [
                    NaiveUiResolver(),
                    IconsResolver({
                        prefix: false,
                        enabledCollections: ['iv']
                    })
                ]
            }),
            Icons({
                scale: 1,
                autoInstall: true,
                compiler: 'vue3',
                customCollections: {
                    iv: FileSystemIconLoader('./src/assets/icons')
                }
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        build: {
            outDir: 'dist',
            assetsDir: 'static'
        },
        css: {
            modules: {
                generateScopedName: '[local]___[hash:5]',
                localsConvention: 'camelCase'
            }
        },
        server: {
            hmr: true,
            port: 5050,
            host: '127.0.0.1'
        }
    }
})
