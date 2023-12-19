<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from '@/lib/supabase'

const props = defineProps({
    comment: Object
})

const isUpdating = ref(false)
const collapseId = `collapse-${props.comment.id}`
const text = ref(props.comment.comment)
const bsCollapse = ref(null)

// onMounted(()=>{
//     bsCollapse.value = new bootstrap.Collapse(`#${collapseId}`).hide()
// })

async function updateArticle() {
    isUpdating.value = true
    // console.log('editing')
    const { error } = await supabase.from('comments').update({
        comment: text.value,
    }).eq('id', props.comment.id)
    if (error) { console.log(error) } else { isUpdating.value = false; new bootstrap.Collapse(`#${collapseId}`).hide()}
}

</script>

<template>
    <div>
        <span class="edit text-primary" data-bs-toggle="collapse" :href="`#${collapseId}`" role="button"
            aria-expanded="false" :aria-controls="collapseId">
            <i class="fi fi-tr-pen-field mx-2"></i>
        </span>
        <div class="collapse" :id="collapseId">
            <div class="">
                <div class="form">
                    <form class="form-group" @submit.prevent="updateArticle">
                        <div class="inputs">
                            <textarea v-model="text" type="text" name="" id="" placeholder="Edit"
                                class="form-control"></textarea>
                            <div>
                                <div v-if="isUpdating" class="spinner-border spinner-border-sm text-warning" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <button v-else type="submit" class="btn btn-warning">
                                    <i class="fi fi-tr-inbox-out"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.edit {
    cursor: pointer;
}

.form {
    width: 300px;
}

.inputs {
    display: flex;
}

@media(max-width:998px) {
    .form {
        width: fit-content
    }
}
</style>
