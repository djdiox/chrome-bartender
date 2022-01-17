<template>
  <div>
    <!-- <hello-world /> -->
    test 
    <div style="display:inline">
      <input type="text" name="searchInput" id="searchInput" @keyup="search" />
      <button @click="search">Search</button>
    </div>
    <ul>
      <li v-for="extension in extensions" :key="extension.id" style="padding:5px">
      <div style="display:flex">
       <img :src="getIcon(extension)" :alt="extension.shortName" style="margin-right:5px;width:16px;height:16px">
         <a :href="`chrome://extensions/?id=${extension.id}`"  @click.stop="openTab">
          {{extension.shortName}} 
       </a>
       <input type="checkbox" name="enabled" :checked="extension.enabled" v-model="extension.enabled" @change="toggleExtension(extension)">
       <button v-if="extension.isApp" :id="'linkApp' + extension.id" @click="createShortcut(extension)">
         Create Shortcut
         <!-- <i class="fas fa-desktop"></i> -->
       </button>
       <!-- <i class="fas fa-cog"></i> -->
      </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
// import chromeP from 'webext-polyfill-kinda';
import ExtensionController from '../controllers/extension-controller';
var extensionController = new ExtensionController();
export default {
  name: 'App',
  data() {
    extensions: []
  },
  async mounted() {
    console.log('Loaded App')
    var current = await extensionController.refreshExtensions();
    this.extensions = current;
    // try {
    //  	var extensions = (await chromeP.management.getAll())
		// 	.filter(({type, id}) => type === 'extension' && id !== myid)
		// 	.sort((a, b) => {
		// 		if (a.enabled === b.enabled) {
		// 			return a.name.localeCompare(b.name); // Sort by name
		// 		}
		// 		return a.enabled < b.enabled ? 1 : -1; // Sort by state
		// 	})
		// 	.map(extension => {
		// 		extension.shown = true;
		// 		extension.indexedName = extension.name.toLowerCase();
		// 		return extension;
		// 	});
		// // Update list on uninstall
		// chrome.management.onUninstalled.addListener(deleted => {
		// 	extensions = extensions.filter(({id}) => id !== deleted);
		// });
    // } catch (error) {
    //   console.error(error);
    // }
    
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
