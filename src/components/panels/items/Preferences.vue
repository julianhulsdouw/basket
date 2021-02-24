<template>
    <panel :title="$t('preferences')">
        <v-container class="pa-6" fluid>
            <form @submit.prevent="submit">
                <v-row>
                    <v-switch
                        v-model="startWithOs"
                        flat
                        :label="$t('settings.boot_with_os')"
                        disabled
                    ></v-switch>
                </v-row>
                <v-row>
                    <v-switch
                        v-model="soundMuted"
                        flat
                        :label="$t('settings.disable_sound')"
                    ></v-switch>
                </v-row>
                <v-row>
                    <v-switch
                        v-model="notificationsMuted"
                        flat
                        :label="$t('settings.disable_notifications')"
                    ></v-switch>
                </v-row>
                <v-row>
                    <v-switch
                        v-model="dockBounce"
                        flat
                        :label="$t('settings.dock_bounce')"
                    ></v-switch>
                </v-row>

                <v-divider></v-divider>

                <v-row class="mt-4">
                    <v-select
                        v-model="selectedSearchProvider"
                        :items="searchProviders"
                        chips
                        :label="$t('settings.enabled_search_providers')"
                        multiple
                    ></v-select>
                </v-row>

                <v-row class="mt-4">
                    <v-select
                        v-model="selectedLanguage"
                        :items="languages"
                        item-text="value"
                        item-value="key"
                        :label="$t('settings.language')"
                    ></v-select>
                </v-row>

                <v-row>
                    <v-btn type="submit">
                        {{ $t('save') }}
                    </v-btn>
                </v-row>
            </form>
        </v-container>
    </panel>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import {
        VBtn,
        VContainer,
        VDivider,
        VRow,
        VSelect,
        VSwitch,
    } from 'vuetify/lib';
    import Panel from '../Panel';

    export default {
        name: 'Preferences',
        data() {
            return {
                startWithOs: false,
                notificationsMuted: true,
                soundMuted: true,
                dockBounce: true,
                selectedSearchProvider: [],
                searchProviders: ['google', 'bing', 'duckduckgo'],
                selectedLanguage: '',
                languages: [
                    { key: 'en', value: this.$t('language.en') },
                    { key: 'nl', value: this.$t('language.nl') },
                ],
            };
        },
        components: {
            Panel,
            VBtn,
            VContainer,
            VDivider,
            VRow,
            VSelect,
            VSwitch,
        },
        mounted() {
            this.setFormValues();
        },
        computed: {},
        methods: {
            setFormValues() {
                this.notificationsMuted = this.getNotificationsMuted();
                this.soundMuted = this.getSoundMuted();
                this.dockBounce = this.getDockBounce();
                this.selectedLanguage = this.getLanguage();
                this.selectedSearchProvider = this.getEnabledSearchProviders();
            },

            submit() {
                this.setDockBounce(this.dockBounce);
                this.setLanguage(this.selectedLanguage);
                this.setEnabledSearchProviders(this.selectedSearchProvider);
                this.setNotificationsMuted(this.notificationsMuted);
                this.setSoundMuted(this.soundMuted);

                this.persistState();

                // TODO: check if neccesary to reboot app
                // if so tell the user
            },

            ...mapActions('settings', [
                'setDockBounce',
                'setEnabledSearchProviders',
                'setLanguage',
                'setNotificationsMuted',
                'setSoundMuted',
                'persistState',
            ]),

            ...mapGetters('settings', [
                'getDockBounce',
                'getEnabledSearchProviders',
                'getLanguage',
                'getNotificationsMuted',
                'getSoundMuted',
            ]),
        },
    };
</script>
