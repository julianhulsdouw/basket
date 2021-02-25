const { remote } = require('electron');

const webContents = remote.getCurrentWebContents();
const { session } = webContents;

setTimeout(() => {
    const elem = document.querySelector('.landing-title.version-title');
    if (elem && elem.innerText.toLowerCase().includes('google chrome')) {
        window.location.reload();
    }
}, 1000);

const isMutedIcon = (element) =>
    element.parentElement.parentElement.querySelectorAll('*[data-icon="muted"]')
        .length !== 0;
const isPinnedIcon = (element) => element.classList.contains('_1EFSv');

window.checkMessageCount = () => {
    const allMessages = document.querySelectorAll(
        '.CxUIE, .unread, ._0LqQ, .m61XR .ZKn2B, .VOr2j, ._2TiQe ._38M1B',
    );

    let messageCount = 0;
    allMessages.forEach((chat) => {
        if (!isMutedIcon(chat) && !isPinnedIcon(chat)) {
            messageCount += parseInt(chat.innerHTML);
        }
    });

    return messageCount;
};

window.addEventListener('beforeunload', async () => {
    try {
        session.flushStorageData();
        session.clearStorageData({
            storages: [
                'appcache',
                'serviceworkers',
                'cachestorage',
                'websql',
                'indexdb',
            ],
        });

        const registrations = await window.navigator.serviceWorker.getRegistrations();

        registrations.forEach((r) => {
            r.unregister();
            console.log('ServiceWorker unregistered');
        });
    } catch (err) {
        console.err(err);
    }
});
