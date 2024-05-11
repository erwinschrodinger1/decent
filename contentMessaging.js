window.onload(testMessage());

function testMessage() {
  chrome.runtime.sendMessage({ message: "Hello from content.js!" }, () =>
    console.log("Message sent!")
  );
}

chrome.runtime.onMessage.addListener((request, sender) => {
  console.log("request", request);
  console.log("sender", sender);
});
