let elements = document.getElementsByClassName("translation");
let labels = document.getElementsByTagName("label");

let translationValues = [];
let translationLabels = [];
let translations = [];

// Getting label value
for (let i = 0; i < labels.length; i++) {
  let labelEl = labels[i].innerText;
  let end = labelEl.length - 17;
  let label = labelEl.substring(0, end);

  translationLabels.push(label);
}
console.log(translationLabels);

// Getting translation value
for (let i = 0; i < elements.length; i++) {
  translationValues.push(elements[i].innerHTML);
}

// Creating array of objects with translation label and value
for (let i = 0; i < translationLabels.length; i++) {
  translations.push({
    key: translationLabels[i],
    value: translationValues[i],
  });
}

// Sending captured translations to popup
chrome.extension.sendMessage(translations, function (response) {
  console.log(response);
});
