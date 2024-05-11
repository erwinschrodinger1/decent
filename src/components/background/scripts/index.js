chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("facebook.com/messages/")) {
    const segments = tab.url.split("/");
    const uniqueId = segments[segments.length - 1];
    console.log("Hello from background.js!");
    console.log(uniqueId); // This will log the unique identifier (e.g., 100014464983630)
    chrome.tabs.sendMessage(tabId, {
      uniqueId: uniqueId,
      type: "uniqueId",
    });
  }
});
