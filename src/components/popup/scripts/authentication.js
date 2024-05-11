chrome.downloads.search({}, (result) => {
  console.log(result);
  const private_keys = result.filter((val) =>
    val.filename.includes("decent_private_key.pkcs8")
  );
  if (private_keys.length > 0) {
    console.log(private_keys[0]);
    window.location = "/src/components/popup/views/home/home.html";
  } else {
    window.location = "/src/components/popup/views/register/register.html";
  }
});

const button = document.getElementById("download");
button.onclick = (e) => {
  chrome.downloads.download({
    url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DmUwcQzGLS-E&psig=AOvVaw1MCiS1VLqgquuQGJgXH2k6&ust=1715458616128000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPDpiL3zg4YDFQAAAAAdAAAAABAE",
    filename: "decent/decent_private_key.sha256",
  });
};

const showButton = document.getElementById("show");

showButton.onclick = (e) => {};
