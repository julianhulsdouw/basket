<template>
    <li
        class="sidebar-item"
        :class="{ active: active, disabled: disabled }"
        :key="identifier"
        @click="click"
        @contextmenu.prevent="showContextMenu"
    >
        <div class="container">
            <img class="sidebar-logo" :src="icon" />
        </div>
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
                type: Object,
                default: () => {},
            },
            disabled: {
                required: false,
                type: Boolean,
                default: false,
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
        methods: {
            showContextMenu() {
                const menu = this.contextMenu;
                return menu.popup();
            },
        },
    };
</script>

<style lang="scss">
    .sidebar-item {
        padding: 10px 10px 0 10px;
        list-style-type: none;

        .container {
            width: 48px;
            height: 48px;
            border-radius: 4px;
        }

        &.active {
            .container {
                background-color: $pickled-bluewood;
            }
        }

        &:hover {
            .container {
                box-sizing: border-box;
                cursor: pointer;
                box-shadow: inset 0 0 0 2px $pickled-bluewood;
            }
        }

        .sidebar-logo {
            position: relative;
            width: 24px;
            height: 24px;
            padding: 12px;
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
            z-index: 9999;
        }
    }

    .bottom {
        .sidebar-item {
            padding: 10px 18px 0 18px;

            .container {
                width: 32px;
                height: 32px;
                border-radius: 4px;
            }

            &:hover {
                .container {
                    cursor: pointer;
                    background-color: $pickled-bluewood;
                    border-radius: 16px;
                }
            }
            .sidebar-logo {
                max-width: 16px;
                height: 16px;
                padding: 8px;
            }
        }
    }
</style>
