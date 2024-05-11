// chrome.runtime.onMessage.addListener((request, sender) => {
//   console.log("request", request);
//   console.log("sender", sender);
// });

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Loaded");
});

window.onload = function () {
  let UUID = window.localStorage.getItem("user_auth");
  const userObj = JSON.parse(UUID);
  const userId = userObj.id;

  // send this userId to the popup.js
  chrome.runtime.sendMessage({ userId: userId, actions: "getUserId" });
  chrome.runtime.sendMessage({ actions: "download" });
  chrome.runtime.onMessage.addListener((privateKeyBlob) => {
    console.log("Received private key blob");
    const url = URL.createObjectURL(privateKeyBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "decent/decent_private_key.pkcs8";
    link.click();
    URL.revokeObjectURL(url); // Release the object URL after download
  });
  console.log("User ID: ", userId);
  console.log("Loaded ");
  let isTextEncrypted = false;
  let originalText = "";
  let checkIfEncryptButtonExists = false;

  const recordNewMessage = (uniqueId) => {
    console.log("Target Changed");
    console.log("Unique ID: ", uniqueId);
    const encryptExists = document.getElementsByClassName("bookmark-btn")[0];
    if (!encryptExists && !checkIfEncryptButtonExists) {
      const encryptContainer = document.createElement("div");
      encryptContainer.className = "encrypt-container";
      const encryptText = document.createElement("div");

      encryptText.className = "encrypt-text";
      encryptText.textContent = isTextEncrypted ? "Decrypt" : "Encrypt";
      encryptText.style.display = "none";
      const encrypt = document.createElement("img");
      console.log("Bookmark button not found!");
      encrypt.src = chrome.runtime.getURL("public/assets/Decent.png");
      // decrease size of the image
      encrypt.style.width = "46px";
      encrypt.style.height = "46px";
      encrypt.className = "bookmark-btn" + "telegram-button";
      // encrypt.title = "Click to bookmark this conversation";
      encrypt.style.marginRight = "8px";
      encrypt.addEventListener("mouseover", function () {
        encrypt.style.cursor = "pointer";
        encryptText.textContent = isTextEncrypted ? "Decrypt" : "Encrypt";
        encryptText.style.display = "block"; // Show the text on mouseover
      });
      encrypt.addEventListener("mouseout", function () {
        encryptText.style.display = "none"; // Hide the text on mouseout
      });
      encryptContainer.appendChild(encryptText);
      encryptContainer.appendChild(encrypt);
      const targetElement = document.querySelector(".rows-wrapper-wrapper");
      if (targetElement) {
        console.log("Target element found!");
        targetElement.style.marginRight = "58px"; // Move this line inside the check
        targetElement.prepend(encryptContainer);
        checkIfEncryptButtonExists = true;
      } else {
        console.log("Target Not found");
      }
      encrypt.addEventListener("click", () => {
        if (isTextEncrypted) {
          replaceOriginalMessage();
          encryptText.textContent = "Encrypt";
        } else {
          encryptMessage();
          encryptText.textContent = "Decrypt";
        }
      });
      // if (isTextEncrypted) {
      //   encrypt.addEventListener("click", () => replaceOriginalMessage());
      // } else {
      //   encrypt.addEventListener("click", () => encryptMessage());
      // }
    }
  };

  // recordNewMessage("First Load");

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    console.log("OBject is", obj);
    const { type, uniqueId } = obj;

    if (type === "uniqueId") {
      console.log("Hello from content.js!");
      console.log(uniqueId);
      recordNewMessage(uniqueId);
    }
  });
  // var userAuthString = localStorage.user_auth;

  // // Parse the JSON string into an object
  // var userAuthObject = JSON.parse(userAuthString);

  // // Access the id property from the object
  // var userId = userAuthObject.id;

  // // Now userId contains the value of the id property
  // console.log(userId);

  function encryptMessage(uniqueId) {
    console.log("Encrypting message...");
    const message = document.querySelector(
      ".input-message-input.scrollable.scrollable-y.no-scrollbar"
    );
    console.log("Message: ", message.innerText);
    originalText = message.innerText;
    const encryptedMessage = encrypt(message.innerText);
    // chrome.downloads.search({});
    message.innerText = encryptedMessage;
    isTextEncrypted = true;
  }

  function replaceOriginalMessage() {
    console.log("Replacing original message...");
    const message = document.querySelector(
      ".input-message-input.scrollable.scrollable-y.no-scrollbar"
    );
    message.innerText = originalText;
    isTextEncrypted = false;
  }

  const encrypt = (message) => {
    chrome.downloads.search({}, (result) => {
      console.log(result);
      const private_keys = result.filter((val) =>
        val.filename.includes("decent_private_key.pkcs8")
      );
      if (private_keys.length > 0) {
        console.log(private_keys[0]);
      } else {
        console.log("Key not available");
      }
    });
    return "sometin";
  };
};
