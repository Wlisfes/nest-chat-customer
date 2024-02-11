import '@/style/index.scss'
import { createBootstrap } from '@/utils/utils-component'

async function bootstrap() {
    const { app } = createBootstrap()
    app.mount('#app')
}
bootstrap()
