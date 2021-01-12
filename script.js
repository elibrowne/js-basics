// Display method runs when the button is clicked
function display() {
  // Get the values that were input into the two text boxes.
  var name = document.getElementById('name').value;
  localStorage.setItem("name", name);
  // You only need to know one value to know both for the radios being checked.
  var ateBreakfast = document.getElementById('yesBreakfast').checked;
  // Check each item on the list of possible breakfasts
  // TODO is there a problem here?
  var checkboxes = document.getElementsByName("breakfast"); // the elements clear later so it's necessary to create a separate list
  var foodList = [
    ["eggs", checkboxes[0].checked], ["pancakes", checkboxes[1].checked], ["waffles", checkboxes[2].checked], 
    ["cereal", checkboxes[3].checked], ["fruit", checkboxes[4].checked], ["something else", checkboxes[5].checked], 
  ]
  myDiv.innerHTML = "\n"; // replace the div tag's contents
  // Check if they checked off that they did eat breakfast
  if (ateBreakfast) {
    myDiv.innerHTML += "\t\t<h1> " + name + " did eat breakfast today. </h1>\n";
  } // just assume false/blank = no breakfast
  else {
    myDiv.innerHTML += "\t\t<h1> " + name + " did not eat breakfast today. </h1>\n";
  }
  // Add in a list of things that they eat.
  myDiv.innerHTML += "\t\t<p> Some of the things that " + name + " likes to eat for breakfast are... </p>\n";
  myDiv.innerHTML += "\t\t<ul>\n";
  // Go over each checkbox and see if it is eaten
  for (var food of foodList) {
    if (food[1]) {
      myDiv.innerHTML += "\t\t\t<li> " + name + " eats " + food[0] + " for breakfast sometimes. </li>\n";
    }
  }
}
