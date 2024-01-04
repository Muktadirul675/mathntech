<script setup>
import { useNotificationStore } from '@/stores/notificationStore.js';
import {useAuthStore} from '@/stores/authStore.js'
import Notification from './Notification.vue';

const notificationStore = useNotificationStore()
const authStore = useAuthStore()

</script>

<template>
    <template v-if="authStore.loggedUser">
        <div style="max-height: 300px;overflow-y: auto;" class="shadow-sm p-3 bg-secondary-outline">
            <h3>Notifications</h3>
            <template v-if="notificationStore.list" v-for="not in notificationStore.list" :key="not.id">
                <Notification :notification="not"></Notification>
            </template>
        </div>
    </template>
</template>
