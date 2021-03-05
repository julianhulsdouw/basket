import { remote, shell } from 'electron';
import i18n from '../../config/i18n';

const { Menu } = remote;

const webContents = remote.getCurrentWebContents();

const buildMenu = (props) => {
    const { editFlags } = props;
    const selectedText = props.selectionText.trim();
    const hasText = selectedText.length > 0;

    const ContextMenu = [
        {
            id: 'searchTextSelectionGoogle',
            label: `${i18n.t('search', { provider: 'Google' })} "${
                selectedText.length > 15
                    ? `${selectedText.slice(0, 15)}...`
                    : selectedText
            }"`,
            visible: hasText && window.searchProviders.includes('google'),
            click() {
                const url = `https://www.google.com/search?q=${selectedText}`;
                shell.openExternal(url);
            },
        },
        {
            id: 'searchTextSelectionDuckDuckGo',
            label: `${i18n.t('search', { provider: 'DuckDuckGo' })} "${
                selectedText.length > 15
                    ? `${selectedText.slice(0, 15)}...`
                    : selectedText
            }"`,
            visible: hasText && window.searchProviders.includes('duckduckgo'),
            click() {
                const url = `https://duckduckgo.com/?q=${selectedText}`;
                shell.openExternal(url);
            },
        },
        {
            id: 'searchTextSelectionBing',
            label: `${i18n.t('search', { provider: 'Bing' })} "${
                selectedText.length > 15
                    ? `${selectedText.slice(0, 15)}...`
                    : selectedText
            }"`,
            visible: hasText && window.searchProviders.includes('bing'),
            click() {
                const url = `https://www.bing.com/search?q=${selectedText}`;
                shell.openExternal(url);
            },
        },
        {
            type: 'separator',
        },
        {
            id: 'cut',
            label: i18n.t('cut'),
            click() {
                if (editFlags.canCut && hasText) {
                    webContents.cut();
                }
            },
            enabled: editFlags.canCut,
            visible: hasText && props.isEditable,
            accelerator: 'CmdOrCtrl + x',
        },
        {
            id: 'copy',
            label: i18n.t('copy'),
            click() {
                if (editFlags.canCopy && hasText) {
                    webContents.copy();
                }
            },
            enabled: editFlags.canCopy,
            visible: props.isEditable || hasText,
            accelerator: 'CmdOrCtrl + c',
        },
        {
            id: 'paste',
            label: i18n.t('paste'),
            click() {
                if (editFlags.canPaste) {
                    webContents.paste();
                }
            },
            enabled: editFlags.canPaste,
            visible: props.isEditable,
            accelerator: 'CmdOrCtrl + v',
        },
    ];

    return ContextMenu;
};

webContents.on('context-menu', async (e, props) => {
    e.preventDefault();
    const menu = Menu.buildFromTemplate(buildMenu(props));
    menu.popup();
});
