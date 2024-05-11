chrome.runtime.onMessage.addListener((request, sender) => {
  console.log("request", request);
  console.log("sender", sender);
});

window.onload = function () {
  console.log("Loaded ");
  let boxToReplace;
  let valueNotToChange;
  let testToChange;
  let removingElement;
  // chrome.runtime.onMessage.addListener((obj, sender, response) => {
  //   const { type, uniqueId } = obj;
  //   if (type === "uniqueId") {
  //     console.log("Hello from content.js!");
  //     console.log(uniqueId);
  //     recordNewMessage(uniqueId);
  //   }
  // });
  // const recordNewMessage = (uniqueId) => {
  chrome.runtime.onMessage.addListener((obs, sender, response) => {
    console.log("Target Changed");
    const encryptExists = document.getElementsByClassName("bookmark-btn")[0];
    const encrypt = document.inn("img");
    if (!encryptExists) {
      console.log("Bookmark button not found!");
      encrypt.src = "../../../public/assets/logo.png";
      encrypt.className = "bookmark-btn" + "facebook-button";
      encrypt.title = "Click to bookmark this conversation";
      encrypt.style.marginLeft = "8px";
      encrypt.addEventListener("mouseover", function () {
        encrypt.style.cursor = "pointer";
      });
    }
    const targetElement = document.querySelector(".x78zum5.x1iyjqo2.x6q2ic0");
    if (targetElement) {
      console.log("Target element found!");
      targetElement.appendChild(encrypt);
    } else {
      console.log("Target Not found");
    }
  });

  //       boxToReplace = document.querySelector(
  //         // ".xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.x1iyjqo2.x1gh3ibb.xisnujt.xeuugli.x1odjw0f.notranslate"
  //         ".x78zum5.x1iyjqo2.xq8finb.x16n37ib.x1xmf6yo.x1e56ztr.xeuugli.x1n2onr6"
  //         // ".x78zum5.x13a6bvl"
  //       );
  //       removingElement = document.querySelector(
  //         ".xi81zsa.x6ikm8r.x10wlt62.x47corl.x10l6tqk.x17qophe.xlyipyv.x13vifvy.x87ps6o.xuxw1ft.xh8yej3"
  //       );
  //       console.log("removingElement", removingElement);
  //       testToChange = document.querySelector(
  //         ".xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.x1iyjqo2.x1gh3ibb.xisnujt.xeuugli.x1odjw0f.notranslate"
  //         // ".x78zum5.x1iyjqo2.xq8finb.x16n37ib.x1xmf6yo.x1e56ztr.xeuugli.x1n2onr6"
  //       );
  //       //
  //       var divToRemove = document.querySelector(
  //         ".xi81zsa.x6ikm8r.x10wlt62.x47corl.x10l6tqk.x17qophe.xlyipyv.x13vifvy.x87ps6o.xuxw1ft.xh8yej3"
  //       );
  //       divToRemove.parentNode.removeChild(divToRemove);
  //       valueNotToChange = boxToReplace.cloneNode(true);
  //       console.log("valueNotToChange", valueNotToChange);
  //       console.log("boxToReplace", boxToReplace);
  //       console.log("testToChange", testToChange);
  //       encrypt.addEventListener("click", function () {
  //         encryptMessage(valueNotToChange);
  //       });
  //     } else {
  //       console.error("Target element not found!");
  //     }
  //   }
  // };
  // recordNewMessage();
  // function encryptMessage(valueNotToChange) {
  //   console.log("Encrypting message...");
  //   // console.log(boxToReplace);
  //   console.log("valueNotToChange", valueNotToChange);
  //   console.log("boxToReplace", boxToReplace);
  //   console.log("testToChange", testToChange);
  //   const message = document.querySelector(
  //     'span.x3jgonx[data-lexical-text="true"]'
  //   );
  //   console.log("Message: ", message.innerText);
  //   const encryptedMessage = encrypt(message.innerText);
  //   message.innerText = encryptedMessage;
  //   console.log("Encrypted message: ", encryptedMessage);

  //   const parentMessage = document.querySelector(
  //     ".x78zum5.x1iyjqo2.xq8finb.x16n37ib.x1xmf6yo.x1e56ztr.xeuugli.x1n2onr6"
  //   );
  //   parentMessage.removeChild(
  //     document.querySelector(
  //       ".xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.x1iyjqo2.x1gh3ibb.xisnujt.xeuugli.x1odjw0f.notranslate"
  //     )
  //   );
  //   console.log("parentMessage", parentMessage);
  //   console.log("valueNotToChange", valueNotToChange);
  //   const spanElement = valueNotToChange.querySelector("p");
  //   const replacingInnerHtml = `<p class="xat24cr xdj266r xdpxx8g" dir="ltr"><span class="x3jgonx" data-lexical-text="true">${encryptedMessage}</span></p>`;
  //   spanElement.innerHTML = replacingInnerHtml;
  //   console.log("replacingInnerHtml", replacingInnerHtml);

  //   console.log("spanElement.innerHtml", spanElement.innerHTML);
  //   console.log("valueNotToChnage", valueNotToChange);

  //   parentMessage.replaceWith(valueNotToChange);
  //   parentMessage.removeChild(removingElement);

  //   console.log("parentMessage", parentMessage);
  //   console.log("here" + message.textContent);
  // }

  // const encrypt = (message) => {
  //   // Simple Caesar Cipher encryption
  //   const shift = 3;
  //   let encryptedMessage = "";
  //   for (let i = 0; i < message.length; i++) {
  //     let charCode = message.charCodeAt(i);
  //     if (charCode >= 65 && charCode <= 90) {
  //       charCode = ((charCode - 65 + shift) % 26) + 65;
  //     } else if (charCode >= 97 && charCode <= 122) {
  //       charCode = ((charCode - 97 + shift) % 26) + 97;
  //     }
  //     encryptedMessage += String.fromCharCode(charCode);
  //   }
  //   return encryptedMessage;
  // };
};
