<template>
    <div class="panel-wrapper">
        <div class="top">
            <span>{{ title }}</span>
        </div>

        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'Panel',
        props: {
            title: {
                required: true,
                type: String,
            },
        },
        components: {},
        computed: {},
        methods: {},
    };
</script>

<style lang="scss">
    .panel-wrapper {
        position: relative;
        width: 325px;
        height: 100%;
        background-color: #d8dbe2;

        .top {
            width: 100%;
            height: 52px;
            background-color: $blue-stone;

            span {
                position: absolute;
                padding-top: 25px;
                margin-left: 10px;
                font-family: 'Lato', sans-serif;
                font-size: 16px;
                color: $gallery;
            }
        }
    }
</style>
