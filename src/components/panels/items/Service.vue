<template>
    <panel :title="activeService.title">
        <v-container class="pa-6" fluid>
            <v-form>
                <v-text-field
                    v-model="title"
                    :rules="titleRules"
                    :label="$t('title')"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="url"
                    :rules="urlRules"
                    :label="$t('url')"
                    required
                ></v-text-field>

                <v-switch
                    v-model="soundEnabled"
                    :label="$t('settings.disable_sound')"
                ></v-switch>

                <v-switch
                    v-model="notificationsEnabled"
                    :label="$t('settings.disable_notifications')"
                ></v-switch>

                <v-switch
                    v-model="enabled"
                    :label="$t('settings.service_enabled')"
                ></v-switch>

                <v-btn class="mr-4" @click="save">
                    {{ $t('save') }}
                </v-btn>
            </v-form>
        </v-container>
    </panel>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { VBtn, VContainer, VForm, VSwitch, VTextField } from 'vuetify/lib';
    import Panel from '../Panel';

    export default {
        name: 'Service',
        data: () => ({
            title: '',
            titleRules: [(v) => !!v || 'Title is required'],
            url: '',
            urlRules: [(v) => !!v || 'URL is required'],
            notificationsEnabled: '',
            soundEnabled: '',
            enabled: '',
        }),
        mounted() {
            this.setFormValues();
        },
        components: {
            Panel,
            VBtn,
            VContainer,
            VForm,
            VSwitch,
            VTextField,
        },
        computed: {
            activeService() {
                return this.serviceByIdentifier()(this.activePanelService());
            },
        },
        methods: {
            save() {
                console.log('saved');
            },

            setFormValues() {
                this.title = this.activeService.title;
                this.url = this.activeService.url;
                this.notificationsEnabled = this.activeService.notificationsEnabled;
                this.soundEnabled = this.activeService.soundEnabled;
                this.enabled = this.activeService.enabled;
            },

            ...mapGetters('panels', ['activePanelService']),

            ...mapGetters('services', ['serviceByIdentifier']),
        },
        watch: {
            activeService() {
                this.setFormValues();
            },
        },
    };
</script>
