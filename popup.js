let translateBtn = document.getElementById("translate");

translateBtn.addEventListener("click", async () => {
    const clicked = true;
    let tab = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tab.sendMessage(tab.id, {clicked})
});