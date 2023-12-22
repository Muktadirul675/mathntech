<script setup>
import Loading from '@/components/Loading.vue';
import { useSeriesStore } from '@/stores/seriesStore';
import { ref, computed } from 'vue';
import Content from '@/components/blog/Content.vue';

const seriesStore = useSeriesStore()
const searchTxt = ref('')
const serieses = computed(()=>{
    if(seriesStore.isLoading){
        return null
    }else{
        return seriesStore.series
    }
})

const isLoading = computed(()=>{
    if(serieses.value === null){return true;}
    else{return false}
})

function onSubmit(event){
    event.preventDefault()
}

</script>


<template>
    <Loading v-if="seriesStore.loading"></Loading>
    <div v-else>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-8 p-3">
                    <form @submit="onSubmit" class="form-group">
                        <div class="input-group mb-3">
                            <button class="btn btn-warning dropdown-toggle1" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false"><i class="fi fi-rr-settings-sliders"></i></button>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink :to="{ name: 'blog' }" class="dropdown-item">
                                        Articles
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink :to="{ name: 'seriesBlog' }" class="dropdown-item">
                                        Series
                                    </RouterLink>
                                </li>
                            </ul>
                            <input type="text" class="form-control" v-model="searchTxt"
                                aria-label="Text input with dropdown button">
                            <button class="btn btn-warning text-white">
                                <i class="fi fi-rr-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div v-for="series in serieses" class="col-12 col-lg-3 col-xl-3">
                    <Content type="series" :article="series"></Content>
                </div>
            </div>
        </div>
    </div>
</template>