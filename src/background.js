import axios from 'axios';
import chromeP from 'webext-polyfill-kinda';
browser.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  console.log('Hello from the background', { request: request, sender: sender, sendResponse: sendResponse })
  const response = await axios.get('chrome://system/');
  console.log(response.data);
  debugger;
  const res = await chromeP.management.getAll();
  console.log(res);
})
