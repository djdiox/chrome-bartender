<template>
 <div>
    <h2>Select Behaviour</h2>
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
    dov 

    <!--  -->
 </div>
</template>

<script>
import ExtensionController from '../controllers/extension-controller'
// import chromeP from 'webext-polyfill-kinda';
const extensionsController = new ExtensionController();
export default {
  name: 'App',
  data() {
    return {
      extensions: [],
    }
  },
  methods: {
    openTab(event) {
      console.log('Opening', event);
      chrome.tabs.create({url: event.currentTarget.href});
      event.preventDefault();
    },
    getIcon(extension) {
      if(!extension.icons || extension.icons.length == 0) {
        return '';
      }
      const icon = extension.icons[0];
      return icon.url;
    },
   async createShortcut(extension){
      const res = await chrome.management.createAppShortcut(extension.id);
      console.log('Created shortcut for ' + extension.shortName, res);
    } ,
    toggleExtension(extension) {
      console.log*(`Toggling ${extension.shortName} for value ${extension.enabled}`)
      return new Promise(resolve => {
          chrome.management.setEnabled(extension.id, extension.enabled, res => {
            resolve(res)
        });
      });
   }
  },
  async mounted() {
    const ext = await extensionsController.refreshExtensions();
    console.log('Retrieved', ext)
    const current = ext.filter(e => e.enabled)
    
    this.extensions = [...ext.filter(e => e.enabled), ...ext.filter(e => !e.enabled)];  
    // const extensions = await chromeP.management.getAll();
    console.log('Retrieved extensions', current);
    // this.extensions = extensions;
  }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
