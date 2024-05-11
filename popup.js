async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getCurrentTab();
  const segments = activeTab.url.split("/");
  const uniqueId = segments[segments.length - 1];

  if (activeTab.url.includes("facebook.com/messages/t") && uniqueId) {
    chrome.storage.sync.get([uniqueId], (data) => {
      const currentStatus = data[uniqueId];
    });
  } else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML =
      '<div class="title">This extensions works only for messaging platform.</div>';
  }
});
