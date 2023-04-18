// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// TODO: Add code to display the current date in the header of the page.
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?

// First we get the current day header container and we get the current day
// with the help of the day.js() library and format it according the mock-up
// and add that current date to our header container
$(function () {
  var currentDayHeader = $("#currentDay");
  var currentDay = dayjs().format("dddd, MMMM D");
  currentDayHeader.text(currentDay);

  // We get the button who's gonna be responsable of saving our events
  // We add an event listener which will trigger aour function that first
  // will get our parent element id from that specific button
  var saveBTN = $(".saveBtn");
  saveBTN.on("click", function (event) {
    event.preventDefault();
    var parentEl = event.target.parentElement;
    var parentId = parentEl.id;

    // we need to acces the value of the parent - text area, we add an if statement
    var parentElDesc = parentEl.children.item(1);
    var txt = parentElDesc.value;

    // to prevent the user click the save button without writing any event

    if (txt === null || txt === "") {
      alert("Oops, seems like you need to introduce a task!");
      return;
    }
    console.log(parentEl);
    console.log("ID :", parentId);
    console.log(parentId, txt);
    console.log(txt);

    // We set our localStorgae with the parent id, and the value of the parent - text area
    localStorage.setItem(parentId, txt);
  });
});

// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?

//
function timeBlock() {
  var currentHour = dayjs().format("HH");
  console.log("Current Hour: ", currentHour);
  var divisions = document.querySelectorAll(".time-block");

  for (let i = 0; i < divisions.length; i++) {
    console.log("DIVISION : ", divisions[i]);
    console.log("DIVISION HOUR :", divisions[i].getAttribute("hour"));
    var divisionHour = divisions[i].getAttribute("hour");
    if (currentHour > divisionHour) {
      divisions[i].classList.remove("present");
      divisions[i].classList.remove("future");
      divisions[i].classList.add("past");
      divisions[i].children.item(1).value += "PAST EVENT";
      divisions[i].children.item(1).disabled = true;
    } else if (currentHour === divisionHour) {
      divisions[i].classList.remove("past");
      divisions[i].classList.remove("future");
      divisions[i].classList.add("present");
    } else if (currentHour < divisionHour) {
      divisions[i].classList.remove("present");
      divisions[i].classList.remove("past");
      divisions[i].classList.add("future");
    }
  }

  // console.log(parentEl);
  // var parentId = parentEl.id;

  // console.log("inside time block, id : ", parentId);
  // console.log("inisde timeBlock, parentId :", parentId);
  // var parentHour = parentEl;
  // var parentValue = parentHour.getAttribute("hour");
  // console.log("Parent Value : ", parentHour);
  // console.log("Actual hour:", parentValue);
  // if (currentHour > parentValue) {
  // }
}

timeBlock();

// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?

//

function renderEvents() {
  console.log("ALL DATA keys:", localStorage);

  for (let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i));
    var localKey = localStorage.key(i);

    var actualValue = localStorage.getItem(localKey);
    console.log(actualValue);

    var textAreaD = document.getElementById(localKey).children.item(1);
    console.log(textAreaD);
    textAreaD.value = actualValue;
  }
}
//   var divisions = document.querySelectorAll(".time-block");
//   // for (var j = 0; j < divisions.length; j++) {
//   //   if (divisions[j].classList.contains("past")) {
//   //     var pastKey = localStorage.key(j);
//   //     console.log("PAST KEY:", pastKey);
//   //     var pastValue = localStorage.getItem(pastKey);
//   //     //console.log("TRUE OR FALSE ", divisions[j].classList.contains("past"));
//   //     var pastTextArea = document.getElementById(pastKey).children.item(1);
//   //     pastTextArea.value = pastValue + " Past Event";
//   //   }
//   // }
//   // var eventDeschour11 = localStorage.getItem("hour-11") || "";
//   // console.log(eventDeschour11);
//   // var textAreaDesc = $(".description11");
//   // textAreaDesc.text(eventDeschour11);
// }

renderEvents();
