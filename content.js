chrome.runtime.onMessage.addListener((request) => {
  if (request.clicked) {
    let translatedArr = document.getElementsByClassName("translation")
      .innerHTML;
    console.log(translatedArr);
  }
});
