chrome.runtime.onMessage.addListener((request, sender, response) => {
  console.log("request", request);
  console.log("sender", sender);
  console.log("response", response());
});

// chrome.bookmarks.onMoved.addListener(() => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.tabs.sendMessage(tabs[0].id, { message: "moved" });
//   });
// });
