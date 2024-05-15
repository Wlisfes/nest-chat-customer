<script lang="tsx">
import { defineComponent, computed, onMounted, PropType } from 'vue'
import { useCommunit, useNotification, useUser, useStore } from '@/store'
import { useFormCustomize } from '@/hooks/hook-customize'
import { divineNotice } from '@/utils/utils-component'
import { divineHandler } from '@/utils/utils-common'
import { httpCommunitInviteJoiner } from '@/api/instance.service'
import * as env from '@/interface/instance.resolver'

export default defineComponent({
    name: 'NextInviteCommunit',
    emits: ['submit'],
    props: {
        communitId: { type: String, required: true }
    },
    setup(props, { emit }) {
        const { nickname } = useStore(useUser)
        const { dataSource } = useStore(useCommunit)
        const { formRef, form, rules, loading, setForm, setLoading, divineFormValidater } = useFormCustomize({
            form: { uid: props.communitId, comment: '' },
            rules: {
                comment: { required: true, trigger: 'blur', min: 2, max: 64, message: '请输入2~64位字符' }
            }
        })
        /**是否已经加入社群**/
        const isCommunit = computed(() => {
            return dataSource.value.some(item => item.uid === props.communitId)
        })

        onMounted(async () => {
            return await setForm({ comment: `你好，我是${nickname.value}` })
        })

        async function onSubmit() {
            return await divineHandler(await divineFormValidater(), {
                handler: async () => {
                    try {
                        await setLoading(true)
                        return await httpCommunitInviteJoiner({ ...form.value }).then(async ({ message }) => {
                            await divineNotice({ type: 'success', content: message })
                            await setLoading(false)
                            return await emit('submit')
                        })
                    } catch (e) {
                        return await divineNotice({ type: 'error', content: e.message }).then(async () => {
                            return await setLoading(false)
                        })
                    }
                }
            })
        }

        return () => (
            <div class="next-invite-contact n-chunk n-column n-disover">
                <next-communit-resolver style={{ margin: '10px 0 0' }} communit-id={props.communitId}>
                    {!isCommunit.value && (
                        <div class="n-chunk n-column n-disover" style={{ padding: '14px 0 0', rowGap: '14px' }}>
                            <n-form ref={formRef} model={form.value} rules={rules.value} label-placement="top">
                                <n-form-item
                                    label="备注"
                                    path="comment"
                                    class="n-chunk n-column"
                                    label-style={{ '--n-label-height': '20px', lineHeight: '20px', color: 'var(--text-color-3)' }}
                                >
                                    <n-input
                                        type="textarea"
                                        placeholder="请填写备注"
                                        maxlength={64}
                                        v-model:value={form.value.comment}
                                        autosize={{ minRows: 2, maxRows: 4 }}
                                        style={{ '--n-padding-vertical': '3px', '--n-padding-right': '8px' }}
                                    />
                                </n-form-item>
                            </n-form>
                            <div class="n-chunk n-column n-center n-middle">
                                <n-button
                                    secondary
                                    type="success"
                                    style={{ minWidth: '88px' }}
                                    focusable={false}
                                    disabled={loading.value}
                                    loading={loading.value}
                                    onClick={onSubmit}
                                >
                                    提交申请
                                </n-button>
                            </div>
                        </div>
                    )}
                </next-communit-resolver>
            </div>
        )
    }
})
</script>
