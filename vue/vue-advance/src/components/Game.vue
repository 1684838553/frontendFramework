<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <!-- 将games传给插槽的使用者 -->
        <slot :games="games"></slot>
    </div>
</template>

<script>
export default {
    name: "Game",
    props: ['title'],
    data() {
        return {
            games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
        }
    },
}
</script>

<style scope>
    .category {
        background: skyblue;
        width: 200px;
        height: 300px;
    }

    h3 {
        text-align: center;
    }

    img {
        width: 100%;
    }
</style>