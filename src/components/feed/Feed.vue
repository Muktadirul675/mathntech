<script setup>
import FeaturedPost from '@/components/feed/FeaturedPost.vue'
import About from './About.vue';
import Subscribe from './Subscribe.vue';
import FeedSeries from './FeedSeries.vue';
import FeedPosts from './FeedPosts.vue';
import FeedArticles from './FeedArticles.vue';
</script>

<template>
    <div class="container p-3">
        <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-10">
                <div class="row">
                    <div class="col-12 col-lg-8 col-xl-8">
                        <FeaturedPost></FeaturedPost>
                    </div>
                    <div class="col-12 col-lg-4 col-xl-4">
                        <div class="row">
                            <div class="col-12">
                                <About></About>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <Subscribe></Subscribe>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-lg-4 col-xl-4 my-2">
                        <FeedSeries></FeedSeries>
                    </div>
                    <div class="col-12 col-lg-4 col-xl-4 my-2 p-3">
                        <FeedArticles></FeedArticles>
                    </div>
                    <div class="col-12 col-lg-4 col-xl-4 my-2 p-3">
                        <FeedPosts></FeedPosts>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
