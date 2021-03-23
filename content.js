// Grabbing input value for our download title and trimming if more than 5 words
var titleArr = document.getElementById("focusOnMe").value.split(' ');
if(titleArr.length > 5){
  var title = titleArr.slice(0,5).join().replace(/,/g,' ');
  title += '...'
} else{
  var title = titleArr.join().replace(/,/g, ' ');
}
console.log(title);

// Grabbing language labels and translations values from webpage
var elements = document.getElementsByClassName("translation");
var labels = document.getElementsByTagName("label");
// Declaring temp label and value arrays and final translation arr
var translationLabels = [];
var translationValues = [];
var translations = [{key: 'Original', value: title}];

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
for (let i = 0; i <= translationLabels.length; i++) {
  translations.push({
    key: translationLabels[i],
    value: translationValues[i],
  });
}

// Sending captured translations to popup
chrome.extension.sendMessage(translations, function (response) {
  console.log(response);
});
