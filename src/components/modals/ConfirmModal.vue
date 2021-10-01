<template>
    <div class="modal fade" :id="modalID" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title">{{ t('are_you_sure') }}</h5>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">{{ t('cancel') }}</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="confirm">{{ t('yes') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useI18n} from 'vue-i18n'
import {onMounted} from 'vue'
import {Modal} from 'bootstrap'

export default {
    name: 'ConfirmModal',
    props: {
        modalID: {
            type: String,
            required: true
        }
    },
    setup(props, context) {
        const {t} = useI18n()
        let confirmed = false
        let myModalEl = null
        onMounted(() => {
            myModalEl = document.getElementById(props.modalID)
            myModalEl.addEventListener('hidden.bs.modal', function (event) {
                if (confirmed) {
                    context.emit('confirmed', props.modalID)
                }
            })
        })
        const confirm = () => {
            confirmed = true
        }
        return {t, confirm}
    }
}
</script>

<style scoped>

</style>
