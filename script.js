// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 1: Create data that we can work with locally
const locations = [
//  { city: "Toronto", lat: 43.6534817, lon: -79.3839347 }
{ city: "Calgary", lat: 50.6631, lon: -112.625 },
 // { city: "Vancouver", lat: 49.2608724, lon: -123.113952 },
];

// DOM: ADD TO CSS

function createForecastCard(aqi) {
  const forecastCard = document.createElement("div");
  forecastCard.classList.add("forecast-card");

  const forecastCardContainer = document.createElement("div");
  forecastCardContainer.classList.add("forecast-card__container");

  const forecastCardDesc = document.createElement("div");
  forecastCardDesc.classList.add("forecast-card--desc");

  const forecastCardValue = document.createElement("div");
  forecastCardValue.classList.add("forecast-card--value");
  forecastCardValue.innerText = `${aqi}`;

  forecastCardContainer.appendChild(forecastCardValue);
  forecastCardContainer.appendChild(forecastCardDesc);

  forecastCard.append(forecastCardContainer);

  console.log(forecastCard);
  return forecastCard;
}



  // createCommentBox ({name: "Celine", date: "2024-12-19", comment: "hello!"});
  // console.log(createCommentBox(0));






// const card = createForecastCard();
// todayAQI.append(card);


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// STEP 3: Create a function that will render our HTML on the browser
const fetchAQIData = () => {

  const locationsListEl = document.querySelector(".forecast-cards");

  // Clear existing content
  locationsListEl.innerHTML = "";

  // Calgary lag lon 
  const lat = 50.6631;
  const lon = -112.625;
  const apiKey = "2f503d7be3929fdf08e1a5932f0b683e";

  // Construct the URL using the fixed coordinates
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  console.log(url);
  // Make the API call
  axios
    .get(url)
    .then((response) => {
      const aqi = response.data.list[0].main.aqi;

      // Create card for this location
      const location = { city: "Calgary" }; 
      const locationCard = createForecastCard(location, aqi);
      locationsListEl.appendChild(locationCard);
    })
    .catch((error) => {
      console.error("Error fetching data for location:", error);
    });
};

// Invoke function to render the cards
fetchAQIData();
// Iterate over each location in our array
//   locations.forEach((location) => {
//     const { lat, lon } = location;
//     const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

//     axios
//       .get(url)
//       .then((response) => {
//         const aqi = response.data.list[0].main.aqi;

//         // Create and append a card for the current location
//         const locationCard = createLocationCard(location, aqi);
//         locationsListEl.appendChild(locationCard);
//       })
//       .catch((error) => {
//         console.error(
//           "Error fetching data for location:",
//           location.city,
//           error
//         );
//       });
//   });
// };

// // Invoke function to render the cards
// fetchAQIData();
