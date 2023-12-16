<script setup>
import { BreedingRhombusSpinner } from 'epic-spinners';
import { ScalingSquaresSpinner } from 'epic-spinners';
import { CirclesToRhombusesSpinner } from 'epic-spinners';

let imgUrls = [
    'https://res.cloudinary.com/dsfybjdih/image/upload/v1702718654/mathntech/loading/book_n00f6c.gif',
    'https://res.cloudinary.com/dsfybjdih/image/upload/v1702718653/mathntech/loading/quote_quswaq.gif',
    'https://res.cloudinary.com/dsfybjdih/image/upload/v1702718651/mathntech/loading/copywriting_1_eilisr.gif',
    'https://res.cloudinary.com/dsfybjdih/image/upload/v1702718650/mathntech/loading/hand_hltlju.gif',
    'https://res.cloudinary.com/dsfybjdih/image/upload/v1702718650/mathntech/loading/copywriting_ji8yqs.gif',
    'https://res.cloudinary.com/dsfybjdih/image/upload/v1702718649/mathntech/loading/blog_kfnia0.gif',
]

function getImgUrl(){
    return imgUrls[Math.floor(Math.random() * imgUrls.length)]
}

</script>

<template>
    <div class="spinner">
        <div class="spinnerContainer">
            <img :src="getImgUrl()" class="loadingImg" alt=""> <br>
            Getting
            <circles-to-rhombuses-spinner :animation-duration="1200" :circles-num="3" :circle-size="15" color="#FFDE59" />
        </div>
        <!-- <scaling-squares-spinner :animation-duration="1250" :size="65" color="#FFDE59" /> -->
        <!-- <breeding-rhombus-spinner :animation-duration="2000" :size="65" color="#FFDE59" /> -->
    </div>
</template>

<style>
.spinner {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spinnerContainer{
    text-align: center;
}

.loadingImg{
    height: 80px;
    width:80px;
}

</style>
