<template>
  <div>
    <!-- <hello-world /> -->
    <div style="display:inline">
      <input type="text" name="searchInput" id="searchInput" @keyup="search" />
      <button @click="search">Search</button>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import chromeP from 'webext-polyfill-kinda'
export default {
  name: 'App',
  data() {
    extensions: []
  },
  async mounted() {
    debugger;
    try {
     	var extensions = (await chromeP.management.getAll())
			.filter(({type, id}) => type === 'extension' && id !== myid)
			.sort((a, b) => {
				if (a.enabled === b.enabled) {
					return a.name.localeCompare(b.name); // Sort by name
				}
				return a.enabled < b.enabled ? 1 : -1; // Sort by state
			})
			.map(extension => {
				extension.shown = true;
				extension.indexedName = extension.name.toLowerCase();
				return extension;
			});
		// Update list on uninstall
		chrome.management.onUninstalled.addListener(deleted => {
			extensions = extensions.filter(({id}) => id !== deleted);
		});
    } catch (error) {
      console.error(error);
    }
    
    debugger;

  },
  // methods: {
  //   async search(){
  //     console.log(window);
  //     const res = await chromeP.management.getAll();
  //     console.log(res);
  //     debugger;
  //   }
  // }
  // components: { HelloWorld }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
