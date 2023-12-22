import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase';

export const useSeriesStore = defineStore('series', () => {
    const series = ref(null)
    const isLoading = ref(true)

    async function getSeries() {
        const { data, error } = await supabase.from('series').select('*')
        if (error) { console.log('error ', error) } else {
            series.value = data
            console.log(series.value)
            isLoading.value = false
        }
    }

    getSeries()

    function getSeriesWithId(id) {
        for(var i of series.value){
            if(i.id == id){
                return i
            }
        }
    }

    return { series,isLoading, getSeriesWithId }
})