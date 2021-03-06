let elements = [];
let fileName = '';
let inputValue = '';

// Listening for message from content file
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  fileName = request[0].value;
  inputValue = `Source: "${request[1].value}"`;

  for (let i = 2; i < request.length; i++) {
    elements.push({
      key: request[i].key,
      value: request[i].value,
    });
  }
  sendResponse(request);
});

// Format blob
function formatTranslations(el) {
  return el
    .replace("[", "")
    .replace(/{/g, "")
    .replace(/}/g, "")
    .replace(/"/g, "")
    .replace("]", "")
    .replace(/,/g, "")
    .replace(/key/g, "Language")
    .replace(/value/g, "Translation");
}

// Converting elements array to text and downloading text file to user's computer
function downloadTranslations() {
  console.log(`el check in dwnload func ${elements}`);

  let result = JSON.stringify(elements, null, 1);
  let formatResult = formatTranslations(result);

  let a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  
  let blob = new Blob([inputValue, formatResult], { type: "text/plain" });
  let url = URL.createObjectURL(blob);

  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

// Grab modal download button and execute content.js file on load.
window.onload = function () {
  document.getElementById("download").onclick = downloadTranslations;

  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query(
      { active: true, windowId: currentWindow.id },
      function (activeTabs) {
        console.log(`current url: ${activeTabs[0].url}`);
        if(activeTabs[0].url === 'https://nicetranslator.com/'){
          console.log('url matches')
          document.getElementById("download").disabled = false;
          chrome.tabs.executeScript(activeTabs[0].id, {
            file: "content.js",
            allFrames: true,
          });
        } else {
          document.getElementById("download").disabled = true;
          console.log('url does not match')
        }
      }
    );
  });
};
