<template>
    <div class="user-profiles">
        <vue-carousel :navigation-enabled="isNavigationEnabled" :per-page="6" :autoplay="false">
            <slide v-for="(user, index) in users" :key="index">
                <div class="user-profile">
                    <div class="profile-image">
                        <img :src="user.imageSrc" :alt="user.name" />
                    </div>
                    <div class="profile-name">{{ user.name }}</div>
                </div>
            </slide>
        </vue-carousel>
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
    components: {
        VueCarousel: Carousel,
        Slide,
    },
    data() {
        return {
            isNavigationEnabled: false, // Set to true if you want to enable navigation arrows
            users: [
                { name: 'User 1', imageSrc: '/images/user1.jpg' },
                { name: 'User 2', imageSrc: '/images/user2.jpg' },
                { name: 'User 3', imageSrc: '/images/user3.jpg' },
                { name: 'User 4', imageSrc: '/images/user4.jpg' },
                { name: 'User 5', imageSrc: '/images/user5.jpg' },
                { name: 'User 6', imageSrc: '/images/user6.jpg' },
                { name: 'User 1', imageSrc: '/images/user1.jpg' },
                { name: 'User 2', imageSrc: '/images/user2.jpg' },
                { name: 'User 3', imageSrc: '/images/user3.jpg' },
                { name: 'User 4', imageSrc: '/images/user4.jpg' },
                { name: 'User 5', imageSrc: '/images/user5.jpg' },
                { name: 'User 6', imageSrc: '/images/user6.jpg' },
            ],
        }
    },
}
</script>
<style scoped>
.user-profiles {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
}

.user-profile {
    flex: 0 0 auto;
    margin-right: 16px;
}

.profile-image {
    width: 66px;
    height: 66px;
    border: 2px solid #ff0080;
    border-radius: 50%;
}

.profile-name {
    font-weight: bold;
    padding-top: 2px;
}
</style>
