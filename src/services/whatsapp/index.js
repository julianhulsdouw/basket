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
        '.CxUIE, .unread, ._0LqQ, .m61XR .ZKn2B',
    );

    let messageCount = 0;
    allMessages.forEach((chat) => {
        if (!isMutedIcon(chat) && !isPinnedIcon(chat)) {
            chat.querySelectorAll('._31gEB').forEach((test) => {
                messageCount += parseInt(test.innerHTML);
            });
        }
    });

    return messageCount;
};
