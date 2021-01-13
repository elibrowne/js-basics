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
  var tempList = localStorage.getItem('inputs');
  console.log(tempList);
  if (typeof tempList == 'array') {
    console.log("tempList existed");
    tempList.push(userResponses);
  } else {
    console.log("tempList wasn't an array, making new array");
    tempList = new Array();
    tempList.push([userResponses]);
  }
  // Add back to localStorage with the new values added
  localStorage.setItem('inputs', tempList);
}

// Display method runs to display the information on screen
// Parameters: list of data to use (one day), whether or not to replace all the window or just to append (boolean)
function display(data, replace) {
  // I'm collecting all the checkboxes in one list, and then I'll access this list
  // when making the data structure.
  /*var checkboxes = document.getElementsByName("breakfast"); // the elements clear later so it's necessary to create a separate list
  // Here is the JSON that I'll be using.
  var userResponses = {
    'name': document.getElementById('name').value,
    'ateBreakfast': document.getElementById('yesBreakfast').checked,
    'frequentlyEats': [
      ["eggs", checkboxes[0].checked], 
      ["pancakes", checkboxes[1].checked], 
      ["waffles", checkboxes[2].checked], 
      ["cereal", checkboxes[3].checked], 
      ["fruit", checkboxes[4].checked], 
      ["something else", checkboxes[5].checked] 
    ],
    'date': Date.now()
  };*/
  console.log(data);
  if (replace) {
    myDiv.innerHTML = "\n"; // replace the div tag's contents
  } else {
    myDiv.innerHTML += "\n"; // just add a new line
  }
  // Add the time of submission
  myDiv.innerHTML += "\t\t<p> Time of submission: " + data.date + " </p>\n";
  // Check if they checked off that they did eat breakfast
  if (data.ateBreakfast) {
    myDiv.innerHTML += "\t\t<h1> " + data.name + " did eat breakfast today. </h1>\n";
  } // just assume false/blank = no breakfast
  else {
    myDiv.innerHTML += "\t\t<h1> " + data.name + " did not eat breakfast today. </h1>\n";
  }
  // Add in a list of things that they eat.
  myDiv.innerHTML += "\t\t<p> Some of the things that " + data.name + " likes to eat for breakfast are... </p>\n";
  myDiv.innerHTML += "\t\t<ul>\n";
  // Go over each checkbox and see if it is eaten
  for (var food of data.frequentlyEats) {
    if (food[1]) {
      myDiv.innerHTML += "\t\t\t<li> " + data.name + " eats " + food[0] + " for breakfast sometimes. </li>\n";
    }
  }
}
