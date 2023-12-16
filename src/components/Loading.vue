<script setup>
import { BreedingRhombusSpinner } from 'epic-spinners'
</script>

<template>
    <div class="spinner">
        <breeding-rhombus-spinner :animation-duration="2000" :size="65" color="#FFDE59" />
    </div>
</template>

<style>
    .spinner{
        position: absolute;
        top:0;
        left:0;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
