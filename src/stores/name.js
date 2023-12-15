import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNameStore = defineStore('name', () => {
  let list = ref(['Mahi']);
  function add(name){
    list.value.push(name)
  }
  function search(key){
    return list.value.filter((name)=>name.includes(key))
  }

  return {list, add, search}
})