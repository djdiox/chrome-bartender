<template>
  <div class="home">
    test
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <p>
      {{JSON.stringify(extensions)}}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import chromeP from 'webext-polyfill-kinda';
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      extensions: []
    }
  },
  async mounted() {
    this.extensions = await chromeP.management.getAll()
  }
}
</script>
