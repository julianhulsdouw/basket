<template>
    <div v-if="showPreferences" class="view view-active">
        <h2>Preferences. TODO</h2>
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
