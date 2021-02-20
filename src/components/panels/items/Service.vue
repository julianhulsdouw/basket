<template>
    <panel :title="activeService.title">
        <h1>Service</h1>
    </panel>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Panel from '../Panel';

    export default {
        name: 'Preferences',
        components: {
            Panel,
        },
        computed: {
            activeService() {
                return this.serviceByIdentifier()(this.activePanelService());
            },
        },
        methods: {
            ...mapGetters('panels', ['activePanelService']),

            ...mapGetters('services', ['serviceByIdentifier']),
        },
    };
</script>
