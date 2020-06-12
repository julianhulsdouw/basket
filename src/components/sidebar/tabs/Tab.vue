<template>
    <li
        class="sidebar-item small"
        :class="{ active: active }"
        :key="identifier"
        @click="click"
        @contextmenu.prevent="contextMenu"
    >
        <img class="sidebar-logo" :src="icon" />
    </li>
</template>

<script>
    export default {
        name: 'Tab',
        props: {
            active: {
                required: false,
                type: Boolean,
                default: false,
            },
            click: {
                required: true,
                type: Function,
            },
            contextMenu: {
                required: false,
                type: Function,
                default: () => {},
            },
            identifier: {
                required: true,
                type: String,
            },
            icon: {
                required: true,
                type: String,
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
