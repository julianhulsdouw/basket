export function GetWebview(identifier) {
    const container = document.getElementById(identifier);
    const webview = container.querySelector('webview');

    return webview;
}
