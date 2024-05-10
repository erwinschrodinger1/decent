// window.onload = function () {
//   var button = document.createElement("button");
//   button.innerHTML = "Click Me";
//   const isClicked = document.getElementById("#hellobutton");
//   if (isClicked) {
//     alert("Button clicked");
//   } else {
//     console.log("Button not clicked");
//   }
//   // Add an event listener to the button
//   button.addEventListener("click", function () {
//     // Your click event logic goes here
//     console.log("Button clicked!");
//   });

//   // Select the target element and prepend the button to it
//   var targetElement = document.querySelector(".x78zum5.x1iyjqo2.x6q2ic0");
//   // targetElement.prepend(button);
// };

chrome.runtime.onMessage.addListener((request, sender) => {
  console.log("request", request);
  console.log("sender", sender);
});

window.onload = function () {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, uniqueId } = obj;
    if (type === "uniqueId") {
      console.log("Hello from content.js!");
      console.log(uniqueId);
      recordNewMessage(uniqueId);
    }
  });
  const recordNewMessage = (uniqueId) => {
    const encryptExists = document.getElementsByClassName("bookmark-btn")[0];
    if (!encryptExists) {
      const encrypt = document.createElement("img");
      console.log("Bookmark button not found!");
      encrypt.src = chrome.runtime.getURL("assets/logo.png");
      encrypt.className = "bookmark-btn" + "facebook-button";
      encrypt.title = "Click to bookmark this conversation";
      encrypt.style.marginLeft = "8px";
      encrypt.addEventListener("mouseover", function () {
        encrypt.style.cursor = "pointer";
      });
      const targetElement = document.querySelector(".x78zum5.x1iyjqo2.x6q2ic0");
      if (targetElement) {
        console.log("Target element found!");
        targetElement.appendChild(encrypt);
        encrypt.addEventListener("click", encryptMessage);
      } else {
        console.error("Target element not found!");
      }
    }
  };
  // recordNewMessage();
  const encryptMessage = () => {
    console.log("Encrypting message...");

    const message = document.querySelector(
      'span.x3jgonx[data-lexical-text="true"]'
    );
    console.log("Message: ", message.innerText);
    const encryptedMessage = encrypt(message.innerText);
    console.log("Encrypted message: ", encryptedMessage);
    const textbox = document.querySelector(
      ".xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.x1iyjqo2.x1gh3ibb.xisnujt.xeuugli.x1odjw0f.notranslate"
    );
    console.log("textbox", textbox);
    var spanElements = textbox.querySelectorAll(".x3jgonx");
    console.log("before", spanElements);
    console.log("Check", spanElements[0].innerText);
    spanElements[0].innerText = encryptedMessage;
    // spanElements.forEach(function (spanElement) {
    //   console.log("each" + spanElement.innerText);
    //   spanElement[0].innerText = encryptedMessage;
    //   console.log(spanElement.innerText);
    // });
    console.log("after" + spanElements[0].innerText);
    console.log("textbox span", spanElements);
    // const messageParent = document.querySelector(".xat24cr.xdj266r.xdpxx8g");
    // messageParent.removeChild(message);
    // message.parentNode.removeChild(message);
    // message.textContent = encryptedMessage;
    console.log("here" + message.textContent);
  };

  const encrypt = (message) => {
    // Simple Caesar Cipher encryption
    const shift = 3;
    let encryptedMessage = "";
    for (let i = 0; i < message.length; i++) {
      let charCode = message.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        charCode = ((charCode - 65 + shift) % 26) + 65;
      } else if (charCode >= 97 && charCode <= 122) {
        charCode = ((charCode - 97 + shift) % 26) + 97;
      }
      encryptedMessage += String.fromCharCode(charCode);
    }
    return encryptedMessage;
  };
};
