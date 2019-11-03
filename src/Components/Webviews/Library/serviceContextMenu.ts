import {
    clipboard, remote, ipcRenderer, shell,
} from 'electron';

import { isMac } from '../../../Library/environment';
const { Menu } = remote;

const webContents = remote.getCurrentWebContents();

const buildMenu = (props) => {
    const { editFlags } = props;
    const selectedText = props.selectionText.trim();
    const hasText = selectedText.length > 0;

    const Menu: Electron.MenuItemConstructorOptions[] = [
        {
            id: 'searchTextSelection',
            label: `Search Google for "${selectedText.length > 15 ? `${selectedText.slice(0, 15)}...` : selectedText}"`,
            visible: hasText,
            click() {
                // TODO Open url based on "default browser preference"
                const url = `https://www.google.com/search?q=${selectedText}`;
                shell.openExternal(url);
            },
        },
        {
            type: 'separator',
        },
        {
            id: 'cut',
            label: 'Cut',
            click() {
                if (editFlags['canCut'] && hasText) {
                    webContents.cut();
                }
            },
            enabled: editFlags['canCut'],
            visible: hasText && props.isEditable,
            accelerator: 'CmdOrCtrl + x',
        }, {
            id: 'copy',
            label: 'Copy',
            click() {
                if (editFlags['canCopy'] && hasText) {
                    webContents.copy();
                }
            },
            enabled: editFlags['canCopy'],
            visible: props.isEditable || hasText,
            accelerator: 'CmdOrCtrl + c',
        }, {
            id: 'paste',
            label: 'Paste',
            click() {
                if (editFlags['canPaste']) {
                    webContents.paste();
                }
            },
            enabled: editFlags['canPaste'],
            visible: props.isEditable,
            accelerator: 'CmdOrCtrl + v',
        }
    ];

    return Menu;
}

export default function contextMenu() {
    webContents.on('context-menu', async (e, props) => {
        e.preventDefault();
        const menu = Menu.buildFromTemplate(buildMenu(props));
        menu.popup();
    });
}
