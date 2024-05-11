// const isMetaMaskInstalled = () => {
//   return Boolean(window.ethereum && window.ethereum.isMetaMask);
// };

// const connectToMetaMask = async () => {
//   if (!isMetaMaskInstalled()) {
//     console.error('MetaMask is not installed');
//     return;
//   }

//   try {
//     const accounts = await window.ethereum.request({
//       method: 'eth_requestAccounts',
//     });
//     console.log('Connected accounts:', accounts);
//     return accounts;

//   } catch (error) {
//     console.error('Error connecting to MetaMask:', error);
//     return [];
//   }
// };

// connectToMetaMask();

// const handleSignIn = async () => {
//   if(!isMetaMaskInstalled()) {
//     console.error('MetaMask is not installed');
//     return;
//   }
//   else {
//     const accounts = await connectToMetaMask();
//     if(accounts.length > 0) {
//       const account = accounts[0];
//       const response = await fetch('', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({account}),
//       });
//       if(response.ok) {
//         console.log('User signed in');
//         const data = await response.json();
//         handleAuthentification(data)
//         console.log(data);
//       }

//     }

//     else {
//       console.error('User is not signed in');
//     }

//   }
// }

// const handleAuthentification = async () => {
//   const{token} = data;components
//   localStorage.setItem('token', token);

// }
// //this button doesnt exist just yet

// document.getElementById("SignInButton").addEventListener("click", handleSignIn);

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
