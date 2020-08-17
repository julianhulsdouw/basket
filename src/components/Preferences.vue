<template>
    <div id="preferences">
        <div v-if="showPreferences" class="view view-active">
            <div class="menu">
                <a href="#" class="active">services</a>
                <a href="#">settings</a>
                <a href="#">theme?</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'Preferences',

        computed: {
            ...mapGetters('settings', ['showPreferences']),
        },
    };
</script>

<style lang="scss" scoped>
    .menu {
        display: flex;

        align-items: center;
        justify-content: center;
        width: 100%;
        height: 52px;

        a {
            padding: 8px;
            font-family: sans-serif;
            color: $gallery;
            text-decoration: none;
            background-color: #196773;
            border-radius: 8px;

            &:not(:first-child) {
                margin-left: 8px;
            }

            &:hover {
                background-color: #008397;
            }

            &.active {
                background-color: #327883;
            }
        }
    }
</style>
