// TODO: Turn into magic regex array.
export default function decideService(url) {
    if (url.includes('web.whatsapp.com')) {
        return 'whatsapp';
    }

    if (url.includes('slack.com')) {
        return 'slack';
    }

    if (url.includes('web.telegram.com')) {
        return 'telegram';
    }

    return undefined;
}
