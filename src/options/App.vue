<template>
 <div>
    <h2>Select Behaviour</h2>
    <ul>
      <li v-for="extension in extensions" :key="extension.id">
       <a href="#" @click.stop="openTab">
          {{extension.shortName}}
       </a>
      </li>
    </ul>
 </div>
</template>

<script>
import ExtensionController from '../controllers/extension-controller'
// import chromeP from 'webext-polyfill-kinda';q
var extensionsController = new ExtensionController();
export default {
  name: 'App',
  data() {
    return {
      extensions: []
    }
  },
  methods: {
    openInTab(event) {
      console.log('Opening', event);
      chrome.tabs.create({url: event.currentTarget.href});
      event.preventDefault();
    }
  },
  async mounted() {
    const current = await extensionsController.refreshExtensions();
    this.extensions = current;  
    debugger;
    // const extensions = await chromeP.management.getAll();
    console.log('Retrieved extensions', extensions);
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
