let elements = [];

// Listening for message from content file
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);

  for (let i = 0; i < request.length; i++) {
    elements.push({
      key: request[i].key,
      value: request[i].value,
    });
    console.log(elements[i]);
  }
  sendResponse(request);
});

// Converting elements array to text and downloading text file to user's computer
function downloadTranslations() {
  console.log(`elements check ${elements}`);

  let result = JSON.stringify(elements, null, 1);
  let formatResult = result
    .replace("[", "")
    .replace(/{/g, "")
    .replace(/}/g, "")
    .replace(/"/g, "")
    .replace("]", "")
    .replace(/,/g, "")
    .replace(/key/g, "Language")
    .replace(/value/g, "Translation");

  console.log(formatResult);

  let blob = new Blob([formatResult], { type: "text/plain" });

  console.log(blob);

  let url = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: url,
  });
}

window.onload = function () {
  document.getElementById("download").onclick = downloadTranslations;

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query(
      { active: true, windowId: currentWindow.id },
      function (activeTabs) {
        chrome.tabs.executeScript(activeTabs[0].id, {
          file: "content.js",
          allFrames: true,
        });
      }
    );
  });
};
