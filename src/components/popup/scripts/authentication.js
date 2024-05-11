chrome.downloads.search({}, (result) => {
  console.log(result);
  const private_keys = result.filter((val) =>
    val.filename.includes("decent_private_key.sha256")
  );
  if (private_keys.length > 0) {
    console.log(private_keys[0]);
    window.location = "/src/components/popup/views/home/home.html";
  } else {
    window.location = "/src/components/popup/views/register/register.html";
  }
});
