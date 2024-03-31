import '@/style/index.scss'
import { createBootstrap } from '@/utils/utils-bootstrap'

async function bootstrap() {
    const { app } = createBootstrap()
    app.mount('#app')
}
bootstrap()
