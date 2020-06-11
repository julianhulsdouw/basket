<template>
    <li class="sidebar-item small" :key="identifier" @click="click">
        <img class="sidebar-logo" :src="icon" />
    </li>
</template>

<script>
    export default {
        name: 'Tab',
        props: {
            icon: {
                required: true,
                type: String,
            },
            identifier: {
                required: true,
                type: String,
            },
            click: {
                required: true,
                type: Function,
            },
        },
    };
</script>

<style lang="scss">
    .sidebar-item {
        padding: 8px;
        margin-right: auto;
        margin-left: auto;
        list-style-type: none;

        &.active {
            background-color: $bright-gray;
        }

        &:hover {
            cursor: pointer;
            background-color: $bright-gray;
        }

        &.small {
            padding-top: 4px;
            padding-bottom: 4px;
        }

        .sidebar-logo {
            width: 32px;
            height: 24px;
            padding: 8px;
            margin-left: 4px;
            fill: $silver;
        }

        &.disabled {
            .sidebar-logo {
                filter: grayscale(100%);
            }

            &:hover {
                cursor: default;
            }
        }
    }

    .bottom .sidebar-item .sidebar-logo {
        height: 24px;
    }
</style>
