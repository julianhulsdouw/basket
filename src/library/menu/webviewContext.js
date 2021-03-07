import { shell } from 'electron';
import searchProviders from '../searchProviders';
import i18n from '../../config/i18n';

class WebviewContext {
    constructor(settings, selectedText) {
        const searchActions = settings
            .getSync('settings.enabledSearchProviders')
            .filter((searchProvider) => {
                return searchProvider in searchProviders;
            })
            .map((searchProvider) => {
                return {
                    label: `${i18n.t('search', {
                        provider: searchProvider,
                    })} "${
                        selectedText.length > 15
                            ? `${selectedText.slice(0, 15)}...`
                            : selectedText
                    }"`,
                    visible: true,
                    click() {
                        const url = searchProviders[searchProvider].replace(
                            'SEARCH',
                            selectedText,
                        );
                        shell.openExternal(url);
                    },
                };
            });

        return [...searchActions];
    }
}

export default WebviewContext;
