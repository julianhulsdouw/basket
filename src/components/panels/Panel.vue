<template>
    <div class="panel-wrapper">
        <div class="top" :class="{ mac: isMacOs }">
            <span>{{ title }}</span>
        </div>

        <slot></slot>
    </div>
</template>

<script>
    import { isMac } from '../../library/environment';

    export default {
        name: 'Panel',
        props: {
            title: {
                required: true,
                type: String,
            },
        },
        data() {
            return {
                isMacOs: isMac,
            };
        },
    };
</script>

<style lang="scss">
    .panel-wrapper {
        position: relative;
        width: 450px;
        height: 100%;
        background-color: #d8dbe2;

        .top {
            width: 100%;
            height: 26px;
            background-color: $blue-stone;

            span {
                position: absolute;
                padding-top: 2px;
                margin-left: 10px;
                font-family: 'Lato', sans-serif;
                font-size: 16px;
                color: $gallery;
            }
        }

        .mac {
            height: 52px;

            span {
                padding-top: 25px;
            }
        }
    }
</style>
