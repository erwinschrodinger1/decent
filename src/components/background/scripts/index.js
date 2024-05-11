// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log("Hello from background.js from content.js!");
//   console.log(request);
//   if (request.type === "uniqueId") {
//     console.log("requestId" + request.uniqueId);
//   }
//   // if (request.name === "getDogImage") {
//   //   console.log("Inside getDogImage");
//   //   const apiCall = async () => {
//   //     const response = await fetch("https://dog.ceo/api/breeds/image/random");
//   //     const data = await response.json();
//   //     console.log("Data:" + data);
//   //     chrome.runtime.sendMessage(data);
//   //   };
//   //   apiCall();
//   // }
// });
chrome.runtime.onStartup.addListener(
  async (request, sender, sendResponse) => {}
);

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("Hello from background.js from content.js!");
  console.log(request);
  if (request.actions == "getUserId") {
    console.log("HEre");
    if (request.userId) {
      //getUserId here
      console.log("Received userId: " + request.userId);
    }
  }
  if (request.actions == "download") {
    console.log("Downloading private key...");
    const { publicKey, privateKey } = await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048, // can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: "SHA-256" }, // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, // whether the key is extractable (i.e. can be used in exportKey)
      ["encrypt", "decrypt"] // can be any combination of "encrypt" and "decrypt"
    );
    const privateKeyData = await crypto.subtle.exportKey("pkcs8", privateKey);

    // Create a Blob from the private key data
    const privateKeyBlob = new Blob([privateKeyData], {
      type: "application/octet-stream",
    });

    // Use chrome.downloads.download to download the private key
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, privateKeyBlob);
    });
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, tab) => {
  if (tab.url && tab.url.includes("web.telegram.org")) {
    const segments = tab.url.split("/");
    const uniqueId = segments[segments.length - 1];
    console.log("Hello from background.js!");
    console.log(uniqueId);
    chrome.tabs.sendMessage(tabId, {
      uniqueId: uniqueId,
      type: "uniqueId",
    });
  }
});
