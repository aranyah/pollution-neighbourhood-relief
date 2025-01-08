// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 1: Create data that we can work with locally
const locations = [
  { city: "Toronto", lat: 43.6534817, lon: -79.3839347 },
  { city: "Calgary", lat: 50.6631, lon: -112.625 },
  { city: "Vancouver", lat: 49.2608724, lon: -123.113952 },
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

function createLocationCard(location, aqi) {
  const cardElement = document.createElement("article");
  cardElement.classList.add("locations__note-card");

  const cityNameTag = document.createElement("p");
  cityNameTag.classList.add("locations__city");
  cityNameTag.innerText = location.city;

  const aqiTag = document.createElement("span");
  aqiTag.classList.add("locations__aqi");
  aqiTag.innerText = `AQI: ${aqi}`;

  cardElement.appendChild(cityNameTag);
  cardElement.appendChild(aqiTag);

  return cardElement;
}

// Invoke the card
createLocationCard();

//Invoking to test
// createNoteCard({ reminder: "Learn JS", date: " 2024-12-19" });
// createNoteCard({ reminder: "Do laundry", date: " 2024-12-19" });

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 3: Create a function that will render our HTML on the browser
const fetchAQIData = () => {
  const apiKey = "2f503d7be3929fdf08e1a5932f0b683e";

  // Point to the div where the location cards will be displayed
  const locationsListEl = document.querySelector(".locations__list");

  // Clear existing content
  locationsListEl.innerHTML = "";

  // Iterate over each location in our array
  locations.forEach((location) => {
    const { lat, lon } = location;
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        const aqi = response.data.list[0].main.aqi;

        // Create and append a card for the current location
        const locationCard = createLocationCard(location, aqi);
        locationsListEl.appendChild(locationCard);
      })
      .catch((error) => {
        console.error(
          "Error fetching data for location:",
          location.city,
          error
        );
      });
  });
};

// Invoke function to render the cards
fetchAQIData();
