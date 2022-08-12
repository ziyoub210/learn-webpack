<template>
    <div class="container">
        <img :src="head" alt="">
        <p>{{msg}}</p>
    </div>

</template>
<script>
import head  from '@/assets/head.jpg'
export default {
    name: 'App',
    data() {
        return {
            head: head,
            msg: '自由'
        }
    }
}
</script>
<style lang="less">
.container {
    width: 200px;
    height: 200px;
    background: pink;
    color: yellow;
    border-radius: 50%;
    transform: translateX(100px);
    img {
        width: 100px;
    }
}

</style>