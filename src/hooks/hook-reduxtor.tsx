import { computed } from 'vue'
import { useMessenger, useSession, useComment } from '@/store'
import { instance } from '@/store/messenger'
import { divineWherer, divineHandler } from '@/utils/utils-common'
import * as env from '@/interface/instance.resolver'

export function useReduxtor() {
    const session = useSession()
    const message = useMessenger()
    const comment = useComment()
    const sid = computed(() => session.sid)

    /**选择、切换会话**/
    async function fetchUpdateNodeSelector(sid: string) {
        const node = session.dataSource.find(item => item.sid === sid) as env.SchemaSession
        return await divineHandler(Boolean(node) && session.sid !== sid, {
            handler: async function () {
                const limit = divineWherer(node.unread.length < message.limit, message.limit, node.unread.length)
                await session.setState({ sid })
                await session.fetchSessionOneResolver()
                await comment.setState({ message: '' })
                return await message.fetchSessionColumnInitMessager(sid, limit).then(async ({ compared }) => {
                    return await divineHandler(compared && Boolean(instance.value), {
                        handler: async () => {
                            await fetchUpdateNodeUnreader(sid, [])
                            return instance.value.scrollTo({ top: 999999, behavior: 'auto' })
                        }
                    })
                })
            }
        })
    }

    /**更新会话未读列表**/
    async function fetchUpdateNodeUnreader(sid: string, unread: Array<env.SchemaMessager>) {
        const node = session.dataSource.find(item => item.sid === sid) as env.SchemaSession
        return await divineHandler(Boolean(node), {
            handler: async function () {
                node.unread = unread
                return node
            }
        })
    }

    return { sid, fetchUpdateNodeUnreader, fetchUpdateNodeSelector }
}
