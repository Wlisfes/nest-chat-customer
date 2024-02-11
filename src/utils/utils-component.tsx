import { createApp } from 'vue'
import { setupI18n } from '@/i18n'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import App from '@/App.vue'

export function createBootstrap(props: Omix = {}) {
    const app = createApp(
        <common-provider>
            <common-beforer>
                <App {...props} />
            </common-beforer>
        </common-provider>
    )

    setupStore(app)
    setupI18n(app)
    setupRouter(app)

    return { app }
}
