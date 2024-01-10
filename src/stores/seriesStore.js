import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase.js';

export const useSeriesStore = defineStore('series', () => {
    const series = reactive([])
    const isLoading = ref(true)

    async function getSeries() {
        const { data, error } = await supabase.from('series').select('*').order('created_at',{ascending:false})
        if (error) { console.log('error ', error) } else {
            data.forEach((i)=>{
                i.show = true
                series.push(i)
            })
            isLoading.value = false
        }
    }

    getSeries()

    function getSeriesWithId(id) {
        for(var i of series){
            if(i.id == id){
                return i
            }
        }
    }

    function insertLocalSeries(newSeries){
        series.push(newSeries)
    }

    return { series,isLoading, getSeriesWithId, insertLocalSeries }
})