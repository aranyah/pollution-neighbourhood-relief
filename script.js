// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 1: Create data that we can work with locally
const dailyReminders = [
  { reminder: "Get fresh air", date: "2024-10-11" },
  { reminder: "Drink water", date: "2024-10-11" },
  { reminder: "Say something nice about myself", date: "2024-10-11" },
];

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 2: Create a function that will create our HTML

// The createNoteCard function will create the following HTML:
/* 
   <article class="reminders__note-card">
        <p class="reminders__reminder">Reminder</p>
        <span class="reminders__date">Date</span>
    </article>; 
*/

function createNoteCard(note) {
  // our note parameter represents an object:
  // note =  { reminder: "Get fresh air", date: "2024-10-11" }

  const cardElement = document.createElement("article"); //Creating the article element
  cardElement.classList.add("reminders__note-card"); //Create a class for cardElement

  const pTag = document.createElement("p"); //Creating the p element
  pTag.classList.add("reminders__reminder"); //Create a class for pTag
  pTag.innerText = note.reminder; //Create inner text for pTag

  const dateElement = document.createElement("span"); //Creating the span element
  dateElement.classList.add("reminders__date"); //Create a class for span
  dateElement.innerText = note.date; //Create inner text for span

  //Appending our elements to the article tag so they are nested within it
  cardElement.appendChild(pTag);
  cardElement.appendChild(dateElement);

  console.log(cardElement); //Console.log to test
  return cardElement; //A return needed to create a new reminder card
}

//Invoking to test
createNoteCard({ reminder: "Learn JS", date: " 2024-12-19" });
createNoteCard({ reminder: "Do laundry", date: " 2024-12-19" });

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 3: Create a function that will render our HTML on the browser

const renderNoteCards = () => {
  //Point to the form element on our HTML file
  const myReminderEl = document.querySelector(".reminders__list");

  //Clear all the HTML inside .reminders__list,
  //so only most recent version of objects array is used to render to screen
  myReminderEl.innerHTML = "";

  for (let i = 0; i < dailyReminders.length; i++) {
    //call createNoteCard with each index of the dailyReminders array by iterating through it
    //dailyReminders[i] represents each object in your dailyReminders array
    const card = createNoteCard(dailyReminders[i]);

    //append each object from dailyReminders array to insertion point in HTML (i.e. .reminders_list div)
    myReminderEl.appendChild(card);
  }
};

//invoke render function
renderNoteCards();

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 4: Get our Submit button to work

const formEl = document.querySelector(".notes-form");

// add 'submit' event handler to form element
formEl.addEventListener("submit", submitHandler);

//our handler function that we are passing in as an argument in our event listener
function submitHandler(event) {
  event.preventDefault(); // prevent page from reloading

  // store date from user input in an object (with same properties as original object)
  let cardData = {
    reminder: event.target.reminder.value,
    date: event.target.date.value,
  };

  // add object from user data to original hard coded reminders array
  dailyReminders.push(cardData); //will add elements to the end of the array

  //This will add the newest elements to the front of the array
  // dailyReminders.unshift(cardData);

  // did that work
  console.log(dailyReminders);

  // call render appointmetns each time a form submission is made
  renderNoteCards();
}
