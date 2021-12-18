<template>
 <div>
    <h2>Select Behaviour</h2>
    <ul>
      <li v-for="extension in extensions" :key="extension.id">
       <a :href="`chrome://extensions/?id=${extension.id}`" target="_blank">
          {{extension.shortName}}
       </a>
      </li>
    </ul>
 </div>
</template>

<script>
import chromeP from 'webext-polyfill-kinda';
export default {
  name: 'App',
  data() {
    return {
      extensions: []
    }
  },
  async mounted() {
    const extensions = await chromeP.management.getAll();
    console.log('Retrieved extensions', extensions);
    this.extensions = extensions;
  }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
