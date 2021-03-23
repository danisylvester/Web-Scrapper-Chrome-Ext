// Grabbing input value and trimming for file name
var titleArr = document.getElementById("focusOnMe").value.split(' ');
var truncTitle = titleArr.slice(0,5).join(' ');
console.log(`truncated: ${truncTitle}`);
var title = titleArr.join(' ');
console.log(`title: ${title}`);

// Grabbing language labels and translations values from webpage
var values = document.getElementsByClassName("translation");
var labels = document.getElementsByTagName("label");
// Declaring temp label and value arrays and final translation arr
var labelsArr = [];
var valuesArr = [];
var translations = [{key: 'truncInput', value: truncTitle}, {key: 'inputValue', value: title}];

// Getting label value
for (let i = 0; i < labels.length; i++) {
  let labelEl = labels[i].innerText;
  let end = labelEl.length - 17; 
  let label = labelEl.substring(0, end);

  labelsArr.push(label);
}
console.log(labelsArr);

// Getting translation value
for (let i = 0; i < values.length; i++) {
  valuesArr.push(values[i].innerHTML);
}

// Creating array of objects with translation label and value
for (let i = 0; i <= labelsArr.length; i++) {
  translations.push({
    key: labelsArr[i],
    value: valuesArr[i],
  });
}

// Sending captured translations to popup
chrome.extension.sendMessage(translations, function (response) {
  console.log(response);
});
