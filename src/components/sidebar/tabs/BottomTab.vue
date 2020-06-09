<template>
    <li class="sidebar-item small" :key="identifier" @click="click">
        <img class="sidebar-logo" :src="icon" />
    </li>
</template>

<script>
export default {
    name: "BottomTab",
    props: {
        icon: {
            required: true,
            type: String
        },
        identifier: {
            required: true,
            type: String
        },
        click: {
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.sidebar-item {
    margin-left: auto;
    margin-right: auto;
    padding: 8px;
    list-style-type: none;

    &.active {
        background-color: $bright-gray;
    }

    &:hover {
        background-color: $bright-gray;
        cursor: pointer;
    }

    &.small {
        padding-top: 4px;
        padding-bottom: 4px;
    }

    .sidebar-logo {
        margin-left: 4px;
        padding: 8px;
        height: 24px;
        width: 32px;
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

    &.is-reordering {
        z-index: 99999;
    }
}

.bottom .sidebar-item .sidebar-logo {
    height: 24px;
}
</style>
