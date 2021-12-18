const extensionController  = {
    openInTab(event) {
        chrome.tabs.create({url: event.currentTarget.href});
        event.preventDefault();
    }
}
export default extensionController;