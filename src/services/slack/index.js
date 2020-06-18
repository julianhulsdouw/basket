const SELECTOR_CHANNELS_UNREAD =
    '.p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted)';

window.checkMessageCount = () => {
    const allMessages = document.querySelectorAll(SELECTOR_CHANNELS_UNREAD);

    let messageCount = 0;
    allMessages.forEach((chat) => {
        messageCount += parseInt(
            chat.querySelector('[data-qa="mention_badge"]').innerHTML,
        );
    });

    return messageCount;
};
