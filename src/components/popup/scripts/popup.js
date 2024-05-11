// const popup_button = document
//   .getElementById("popup_button")
//   .addEventListener("click", () => {
//     // alert("Hello WOrd");
//   });

const encrypt_button = document.getElementById("encryption");

encrypt_button.onclick = async () => {
  console.log("clicked");
  if(window.location.hostname.includes("home")){
    window.location
  }
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
  const privateKeyBlob = new Blob(
    [await crypto.subtle.exportKey("pkcs8", privateKey)],
    { type: "application/octet-stream" }
  ); // Changed type to application/octet-stream for binary data
  chrome.downloads.download({
    url: URL.createObjectURL(privateKeyBlob),
    filename: "decent/decent_private_key.pkcs8", // Changed filename extension to .pkcs8 to match the format
  });
  const publicKeyBlob = new Blob(
    [await crypto.subtle.exportKey("pkcs8", privateKey)],
    { type: "application/octet-stream" }
  ); // Changed type to application/octet-stream for binary data
  const formData = new FormData();
  formData.append("username", uniqueId);
  formData.append("public_key", publicKeyBlob, `${uniqueId}.pkcs8`);
  fetch(
    "https://f636-110-44-116-4https://f636-110-44-116-42.ngrok-free.app/api/v1/user/register2.ngrok-free.app/api/v1/user/register",
    {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(publicKey, privateKey);

};

// chrome.runtime.sendMessage({ name: "getDogImage" }, (response) => {
//   console.log(response);
// });
// chrome.runtime.sendMessage({ action: "getUserId" }, function (response) {
//   if (response && response.userId) {
//     console.log("User ID received in popup.js: " + response.userId);
//     document.getElementById("idText").textContent = response.userId;
//   } else {
//     console.log("User ID not received");
//   }
// });
