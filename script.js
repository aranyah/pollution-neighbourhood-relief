//
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 1: Create data that we can work with locally

// Sample data for testing before dynamic input
const disasterReliefRequests = [
  { name: "John Doe", phone: "555-1234", location: "Community Center", canDropOff: "Yes" },
  { name: "Jane Smith", phone: "555-5678", location: "Park", canDropOff: "No" },
  { name: "Sarah Lee", phone: "555-9876", location: "Town Hall", canDropOff: "Yes" },
];

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 2: Create a function that will create our HTML cards

function createReliefCard(request) {
  // our request parameter represents an object:
  // request = { name: "John Doe", phone: "555-1234", location: "Community Center", canDropOff: "Yes" }

  const cardElement = document.createElement("article"); //Creating the article element
  cardElement.classList.add("relief__request-card"); //Create a class for cardElement

  // Name Element
  const nameTag = document.createElement("p");
  nameTag.classList.add("relief__name");
  nameTag.innerText = `Name: ${request.name}`;

  // Phone Number Element
  const phoneTag = document.createElement("p");
  phoneTag.classList.add("relief__phone");
  phoneTag.innerText = `Phone: ${request.phone}`;

  // Location Element
  const locationTag = document.createElement("p");
  locationTag.classList.add("relief__location");
  locationTag.innerText = `Drop-off Location: ${request.location}`;

  // Can Drop-off Element
  const canDropOffTag = document.createElement("p");
  canDropOffTag.classList.add("relief__can-drop-off");
  canDropOffTag.innerText = `Can drop off resources: ${request.canDropOff}`;

  // Append all elements to the cardElement
  cardElement.appendChild(nameTag);
  cardElement.appendChild(phoneTag);
  cardElement.appendChild(locationTag);
  cardElement.appendChild(canDropOffTag);

  console.log(cardElement); // Console.log to test
  return cardElement; // Return the new card element
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 3: Create a function that will render our HTML on the browser

const renderReliefRequests = () => {
  // Point to the form element on our HTML file
  const myReliefRequestsEl = document.querySelector(".relief__requests-list");

  // Clear all the HTML inside .relief__requests-list
  myReliefRequestsEl.innerHTML = "";

  for (let i = 0; i < disasterReliefRequests.length; i++) {
    // Call createReliefCard with each index of the disasterReliefRequests array
    const card = createReliefCard(disasterReliefRequests[i]);

    // Append each object from disasterReliefRequests array to insertion point in HTML (i.e., .relief__requests-list div)
    myReliefRequestsEl.appendChild(card);
  }
};

// Invoke render function to show sample data
renderReliefRequests();

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 4: Get our Submit button to work

const formEl = document.querySelector(".relief-form");

// Add 'submit' event handler to form element
formEl.addEventListener("submit", submitHandler);

// Our handler function that we are passing in as an argument in our event listener
function submitHandler(event) {
  event.preventDefault(); // Prevent page from reloading

  // Store user input in an object (with the same properties as original object)
  let requestData = {
    name: event.target.name.value,
    phone: event.target.phone.value,
    location: event.target.location.value,
    canDropOff: event.target.canDropOff.checked ? "Yes" : "No", // Checkbox for drop-off
  };

  // Add object from user data to the disasterReliefRequests array
  disasterReliefRequests.push(requestData); // Will add elements to the end of the array

  // Did that work?
  console.log(disasterReliefRequests);

  // Call render function each time a form submission is made
  renderReliefRequests();
}
