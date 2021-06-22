console.log('content script');

chrome.runtime.sendMessage("From content script", (response) => {
  console.log("response", response);
})