// Storage method stores the information from the user after they input it
function storeData() {
  // The elements clear later, so one has to store their information before it's too late.
  var checkboxes = document.getElementsByName("breakfast"); 
  var dateString = (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-" + new Date().getFullYear();

  // Create a JSON object for the day's responses
  var userResponses = {
    'name': document.getElementById('name').value,
    'ateBreakfast': document.getElementById('yesBreakfast').checked,
    'date': dateString,
    'frequentlyEats': [
      ["eggs", checkboxes[0].checked], 
      ["pancakes or waffles", checkboxes[1].checked], 
      ["bacon or sausage", checkboxes[2].checked], 
      ["cereal", checkboxes[3].checked], 
      ["fruit", checkboxes[4].checked], 
      ["something else", checkboxes[5].checked],
      ["nothing", checkboxes[6].checked]
    ]
  };

  // Now, replace the window with the new data (true to replace all contents)
  display(userResponses, true); 
  // Add to the localStorage data
  var tempList = localStorage.getItem('data');

  // If the data is empty, change it to a JSON object before adding to it.
  // This is to make sure that it works even when localStorage is empty.
  if (tempList == null || tempList == "{}") {
    tempList = "{\"data\":[]}";
  }
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
      targetDiv.innerHTML += "\t\t\t<li> " + data.name + " ate " + food[0] + " for breakfast today. </li>\n";
    }
  }
  targetDiv.innerHTML += "\t\t</ul>\n\t\t<br />\n"; // close the unordered list

  // Add "see past answers" when there was a replacement of all the page content
  // This method is also used to add new data, and we don't need a new search 
  if (replace) {
    // Add search bars and the ability for the user to pick certain types of data from the overall list
    targetDiv.innerHTML += "\t\t\t<hr />\n";
    targetDiv.innerHTML += "\t\t\t<h2> Search your previous answers! Enter in no fields, one field, or both. </h2>\n";
    targetDiv.innerHTML += "\t\t\t<p> If you don't enter anything in a field, it won't be considered. Leave both fields empty to see every result.\n";
    targetDiv.innerHTML += "\t\t\tEnter a name to look for: <input id='nameSearch'></input> <br />\n";
    targetDiv.innerHTML += "\t\t\tEnter a date to look for (m-d-yyyy, ie 1-1-2021): <input id='dateSearch'></input> <br /> <br />\n";
    targetDiv.innerHTML += "\t\t\t<button onclick='displaySearchResults()'> Search your past responses. </button> <br /> <hr />\n";
  }
}

function displaySearchResults() {
  resultsBox.innerHTML = "\n"; // a new search - empty the search results box
  var userData = JSON.parse(localStorage.getItem("data")).data;
  // Variables to store user inputs for easy accessibility 
  var desiredName = document.getElementById('nameSearch').value;
  var desiredDate = document.getElementById('dateSearch').value;

  // Different searches need to be ran when different search terms are used --
  // here, leaving a field empty means that it isn't searched for.
  // Search for both name and date
  if (desiredName != '' && desiredDate != '') {
    console.log("Wanted date and name");
    for (var i = 0; i < userData.length; i++) {
      if (userData[i].name == desiredName && userData[i].date == desiredDate) {
        display(userData[i], false);
      }
    }
  }
  // Only search for the name; the date was empty
  else if (desiredName != '') { 
    var desiredName = document.getElementById('nameSearch').value;
    console.log("Wanted name");
    for (var i = 0; i < userData.length; i++) {
      if (userData[i].name == desiredName) {
        display(userData[i], false);
      }
    }
  }
  // Only search for the date; the name was empty
  else if (desiredDate != '') { 
    console.log("Wanted date");
    for (var i = 0; i < userData.length; i++) { 
      if (userData[i].date == desiredDate) {
        display(userData[i], false);
      }
    }
  }
  // When the user doesn't apply any search terms, just display everything.
  else { 
    for (var i = 0; i < userData.length; i++) { 
      display(userData[i], false);
    }
  }
}