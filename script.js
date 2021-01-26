// Storage method stores the information from the user after they input it
function storeData() {
  // I'm collecting all the checkboxes in one list, and then I'll access this list
  // when making the data structure.
  var checkboxes = document.getElementsByName("breakfast"); // the elements clear later so it's necessary to create a separate list
  var dateString = (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-" + new Date().getFullYear();
  // Here is the JSON that I'll be using.
  var userResponses = {
    'name': document.getElementById('name').value,
    'ateBreakfast': document.getElementById('yesBreakfast').checked,
    'date': dateString,
    'frequentlyEats': [
      ["eggs", checkboxes[0].checked], 
      ["pancakes", checkboxes[1].checked], 
      ["waffles", checkboxes[2].checked], 
      ["cereal", checkboxes[3].checked], 
      ["fruit", checkboxes[4].checked], 
      ["something else", checkboxes[5].checked] 
    ]
  };
  // Now, replace the window with the new data
  display(userResponses, true); // true is to replace, false is to append
  // Add to the localStorage data
  var tempList = localStorage.getItem('data');
  // If the data is empty, change it to a JSON object before adding to it.
  if (tempList == null || tempList == "{}") {
    tempList = "{\"data\":[]}";
  }
  console.log(tempList);
  tempList = JSON.parse(tempList);
  // Add userResponses to the data section
  tempList.data.push(userResponses);
  // Add back to localStorage with the new values added
  localStorage.setItem('data', JSON.stringify(tempList));
}

// Display method runs to display the information on screen
// Parameters: list of data to use (one day), whether or not to replace all the window or just to append (boolean)
function display(data, replace) {
  var targetDiv; // used to determine where the editing occurs
  if (replace) {
    targetDiv = myDiv;
    myDiv.innerHTML = "\n"; // empty the div
  } else {
    targetDiv = resultsBox;
  }
  // Add the time of submission
  targetDiv.innerHTML += "\t\t<p> Time of submission: " + data.date + " </p>\n";
  // Check if they checked off that they did eat breakfast
  if (data.ateBreakfast) {
    targetDiv.innerHTML += "\t\t<h1> " + data.name + " did eat breakfast today. </h1>\n";
  } // just assume false/blank = no breakfast
  else {
    targetDiv.innerHTML += "\t\t<h1> " + data.name + " did not eat breakfast today. </h1>\n";
  }
  // Add in a list of things that they eat.
  targetDiv.innerHTML += "\t\t<p> Some of the things that " + data.name + " likes to eat for breakfast are... </p>\n";
  targetDiv.innerHTML += "\t\t<ul>\n";
  // Go over each checkbox and see if it is eaten
  for (var food of data.frequentlyEats) {
    if (food[1]) {
      targetDiv.innerHTML += "\t\t\t<li> " + data.name + " eats " + food[0] + " for breakfast sometimes. </li>\n";
    }
  }
  targetDiv.innerHTML += "\t\t</ul>\n\t\t<br />\n"; // close the unordered list
  // Add "see past answers" when there was a replacement of all the page content
  if (replace) {
    // Add search bars and the ability for the user to pick certain types of data from the overall list
    targetDiv.innerHTML += "\t\t\t<hr />Search your previous answers! Enter in no fields, one field, or both. <br />\n";
    targetDiv.innerHTML += "\t\t\tEnter a name to look for: <input id='nameSearch'></input> <br />\n";
    targetDiv.innerHTML += "\t\t\tEnter a date to look for (mm-dd-yy, ie 1-1-2021): <input id='dateSearch'></input> <br />\n";
    targetDiv.innerHTML += "\t\t\t<button onclick='displayPast()'> Search your past responses. </button>\n";
  }
}

function displayPast() {
  console.log("Displaying...");
  resultsBox.innerHTML = "\n"; // a new search - empty the search box
  var userData = JSON.parse(localStorage.getItem("data")).data;
  // Run this loop if both conditions are specified
  if (document.getElementById('nameSearch').value != '' && document.getElementById('dateSearch').value != '') {
    console.log("Wanted date and name");
    var desiredName = document.getElementById('nameSearch').value;
    var desiredDate = document.getElementById('nameSearch').value;
    // Run this loop if no conditions are specified: display all the data
    for (var i = 0; i < userData.length; i++) {
      if (userData[i].name == desiredName && userData[i].date == desiredDate) {
        display(userData[i], false);
      }
    }
  }
  else if (document.getElementById('nameSearch').value != '') { // only search for the name, the date was empty
    var desiredName = document.getElementById('nameSearch').value;
    console.log("Wanted name");
    // Run this loop if no conditions are specified: display all the data
    for (var i = 0; i < userData.length; i++) {
      if (userData[i].name == desiredName) {
        display(userData[i], false);
      }
    }
  }
  else if (document.getElementById('dateSearch').value != '') { // only search for the date, the name was empty 
    console.log("Wanted date");
    var desiredDate = document.getElementById('dateSearch').value;
    // Run this loop if no conditions are specified: display all the data
    for (var i = 0; i < userData.length; i++) { 
      if (userData[i].date == desiredDate) {
        display(userData[i], false);
      }
    }
  }
  else { 
    // Run this loop if no conditions are specified: display all the data
    for (var i = 0; i < userData.length - 1; i++) { // subtract 1 because the most recent one has already been displayed
      display(userData[i], false);
    }
  }
}