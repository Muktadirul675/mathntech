<script setup>
import { ref, computed } from 'vue';
import { useCounterStore } from '../stores/counter'
import { useNameStore } from '../stores/name'
const store = useNameStore();
let key = ref('')

let names = computed(()=>{
  if(key.value == ''){return store.list}
  else{
    return store.search(key.value)
  }
})

function add(event){
  event.preventDefault();
  store.add(key.value)
  key.value = '';
}

</script>

<template>
  <main>
    <form @submit="add">
      <input type="text" name="" v-model="key" id="">
      <input type="submit" value="Add">
    </form>
    <ol>
      <li v-for="name in names">{{ name }}</li>
    </ol>
  </main>
</template>
