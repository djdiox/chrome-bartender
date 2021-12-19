import chromeP from 'webext-polyfill-kinda';

export default class ExtensionController {
    extensions = [];
    constructor() {
        // this.refreshExtensions()
        // console.log('ExtensionController initialized ', this.extensions);
    }

    async refreshExtensions() {
        var updated = await this.loadExtensions();
        this.extensions = updated
        return updated;
    }

    async loadExtensions() {
        var current = await chromeP.management.getAll();
        console.log('Loaded extensions', current);
        return current
            .filter(({ type, id }) => type === 'extension')
            .map(ext => {
                return { ...ext, loaded: new Date() };
            })
            .sort((a, b) => {
				if (a.enabled === b.enabled) {
					return a.name.localeCompare(b.name); // Sort by name
				}
				return a.enabled < b.enabled ? 1 : -1; // Sort by state
			});
    }

    async openInTab(event, url) {
        const options = { url: event?.currentTarget?.href | url }
        console.log('opening tab', options)
        const res = await chromeP.tabs.create(options);
        console.log('Openened Tab', res)
        event.preventDefault();
        return res;
    }

    async openApp(id) {
        console.log('Opening App with ID: "' + id + '" ')
        const result = await chromeP.management.launchApp(
            id
        );
        console.log('Openened App', result);
        return result;
    }
}