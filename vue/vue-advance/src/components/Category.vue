<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <!-- 默认插槽 -->
        <!-- <slot></slot> -->

        <!-- 具名插槽 -->
        <slot name="center"></slot>
        <slot name="footer"></slot>
    </div>
</template>

<script>
export default {
    name: "Category",
    props: ['title']
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