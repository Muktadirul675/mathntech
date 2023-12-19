import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNameStore = defineStore('name', () => {
  let list = ref(['Mahi']);
  function add(name){
    let canAdd = false
    for(var i=0;i<name.length;i++){
      if(!(name[i]==' ')){
        name = name.substr(i)
        canAdd = true
        break;
      }
    }
    if(canAdd){list.value.push(name)}
  }
  function search(key){
    return list.value.filter((name)=>name.includes(key))
  }

  return {list, add, search}
})