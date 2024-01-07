import { ref, computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase.js'
import { useAuthStore } from './authStore.js'

export const useNotificationStore = defineStore('notifications', () => {
  let list = reactive([])
  let authStore = useAuthStore()
  let unChecked = ref(0)

  watch(list, (newVal) => {
    let count = 0
    for (var i of newVal) { if (!(i.checked)) { count++ } }
    unChecked.value = count
  })

  async function getNotifications() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data, error } = await supabase.from('notifications').select('*').eq('notifyTo', user.user_metadata.email).order('created_at', { ascending: false })
      for (var i of data) { list.push(i) }
    }
  }

  getNotifications()


  const updateChannels = supabase.channel('notifications')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'notifications' },
      (payload) => {
        if (payload.new.notifyTo == authStore.loggedUser.email) {
          for (var i in list) {
            if (list[i].id == payload.new.id) {
              list[i].checked = true
            }
          }
        }
      }
    )
    .subscribe()


  const insertChannels = supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'notifications' },
      (payload) => {
        // console.log("changed recieved",payload.new)
        if (payload.new.notifyTo == authStore.loggedUser.email) {
          // console.log("changed recieved to you",payload.new)
          list.unshift(payload.new)
        }
      }
    )
    .subscribe()


  const channels = supabase.channel('custom-delete-channel')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'notifications' },
      (payload) => {
        console.log('Change received!', payload)
        let index;
        for(var i in list){
          if(list[i].id == payload.old.id){
            index = i;
            break;
          }
        }
        list.splice(index,1)
      }
    )
    .subscribe()

  return { list, unChecked }
})