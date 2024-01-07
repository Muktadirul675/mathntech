<script setup>
import { useNotificationStore } from '@/stores/notificationStore.js';
import {useAuthStore} from '@/stores/authStore.js'
import Notification from './Notification.vue';

const notificationStore = useNotificationStore()
const authStore = useAuthStore()

</script>

<template>
    <template v-if="authStore.loggedUser">
        <div class="p-3">
            <template v-if="notificationStore.list" v-for="not in notificationStore.list" :key="not.id">
                <Notification :notification="not"></Notification>
            </template>
            <template v-else>
                No notification for now!
            </template>
        </div>
    </template>
</template>
