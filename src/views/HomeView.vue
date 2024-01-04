<script setup>
import Feed from '@/components/feed/Feed.vue'
import { onMounted, ref } from 'vue';
import {supabase} from '@/lib/supabase.js'

</script>

<template>
  <main>
    <Feed></Feed> <br>
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center" style="background-color: whitesmoke; height: 200px;">
        <div style="text-align: center;">
          <h5>MathNTech <a class="text-primary"
              href="https://www.facebook.com/profile.php?id=61553656239694&mibextid=zLoPMf" target="_blank"> <img
                height="15px" src="https://res.cloudinary.com/dsfybjdih/image/upload/v1703769195/facebook_cnqgoy.png"
                alt=""> </a></h5>
          <i class="fi fi-rr-site-alt"></i> <span class="text-muted">https://mathntech.xyz</span> <br>
          <i class="fi fi-rr-envelope"></i> <span class="text-muted">blog@mathntech.xyz</span> <br>
          <span class="text-muted">Md Muktadirul Islam Mahi (Author)</span> <a class="text-primary"
            href="https://www.facebook.com/muktadirul.islam.mahi?mibextid=ZbWKwL" target="_blank"> <img height="15px"
              src="https://res.cloudinary.com/dsfybjdih/image/upload/v1703769195/facebook_cnqgoy.png" alt=""> </a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
