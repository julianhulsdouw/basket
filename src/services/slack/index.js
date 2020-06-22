const SELECTOR_CHANNELS_UNREAD =
    '.p-channel_sidebar__channel--unread:not(.p-channel_sidebar__channel--muted)';

window.checkMessageCount = () => {
    const allMessages = document.querySelectorAll(SELECTOR_CHANNELS_UNREAD);

    let messageCount = 0;
    allMessages.forEach((chat) => {
        const mentionBadge = chat.querySelector('[data-qa="mention_badge"]');

        let addCount = 1;
        if (mentionBadge) {
            addCount = parseInt(mentionBadge.innerHTML);
        }

        messageCount += addCount;
    });

    return messageCount;
};
