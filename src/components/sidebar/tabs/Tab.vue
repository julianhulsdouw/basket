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

            <div
                v-if="!disabled && notificationCount"
                class="notificationCount"
            >
                <div>
                    {{ notificationCount }}
                </div>
            </div>
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
            notificationCount: {
                required: false,
                type: Number,
                default: 0,
            },
        },
        methods: {
            showContextMenu() {
                const menu = this.contextMenu;
                if (!menu) {
                    return null;
                }

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
            position: relative;
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
            position: absolute;
            width: 24px;
            height: 24px;
            fill: $silver;
        }

        .notificationCount {
            position: absolute;
            width: 16px;
            height: 16px;
            margin-top: 14px;
            margin-left: 14px;
            overflow: hidden;
            font-family: 'Lato', sans-serif;
            color: $white;
            text-align: center;
            background-color: $red;
            border-radius: 8px;

            div {
                margin-top: 1px;
                font-size: 10px;
            }
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

    .bottom {
        .sidebar-item {
            &:hover {
                .container {
                    cursor: pointer;
                    background-color: $pickled-bluewood;
                    border-radius: 20px;
                }
            }
        }
    }
</style>
