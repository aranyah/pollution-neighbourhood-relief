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

// Coordinates for Queen Mary Park, Edmonton
const latitude = 53.5647;
const longitude = -113.5298;

// OpenWeatherMap API key (replace this with your actual API key)
const apiKey = '95eacae1050c4e55747358ffee9ced74';

// Function to fetch weather data
async function fetchWeatherData() {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,daily&appid=${apiKey}&units=metric`;

  try {
    // Fetch weather data from OpenWeatherMap API
    const response = await fetch(url);
    const data = await response.json();

    // Display current weather (e.g., temperature, wind speed)
    displayCurrentWeather(data.current);

    // Display hourly weather forecast for the next few hours
    displayHourlyForecast(data.hourly);

  } catch (error) {
    console.error("Error fetching weather data:", error);
    displayErrorMessage("Unable to fetch weather data.");
  }
}

// Function to display current weather data on the page
function displayCurrentWeather(currentData) {
  const currentWeatherElement = document.getElementById("current-weather");
  
  // Clear any previous content
  currentWeatherElement.innerText = '';

  // Create and append new elements for current weather
  const tempElement = document.createElement("p");
  tempElement.innerText = `Temperature: ${currentData.temp}°C`;
  currentWeatherElement.appendChild(tempElement);

  const windElement = document.createElement("p");
  windElement.innerText = `Wind Speed: ${currentData.wind_speed} m/s`;
  currentWeatherElement.appendChild(windElement);

  const humidityElement = document.createElement("p");
  humidityElement.innerText = `Humidity: ${currentData.humidity}%`;
  currentWeatherElement.appendChild(humidityElement);
}

// Function to display hourly weather forecast for the next few hours
function displayHourlyForecast(hourlyData) {
  const forecastElement = document.getElementById("weather-forecast");

  // Clear any previous forecast data
  forecastElement.innerText = '';

  // Loop through the first 6 hours of the forecast data
  for (let i = 0; i < 6; i++) {
    const hour = hourlyData[i];
    
    // Convert UNIX timestamp to hours and minutes
    const date = new Date(hour.dt * 1000); // Convert to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Format the hours and minutes to be 2 digits (e.g., 9 -> 09, 5 -> 05)
    const time = `${padTime(hours)}:${padTime(minutes)}`;
    
    // Get the temperature, wind speed, and humidity for this hour
    const temperature = hour.temp;
    const windSpeed = hour.wind_speed;
    const humidity = hour.humidity;

    // Create a new div element to hold the forecast data for this hour
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    // Create and append the time element
    const timeElement = document.createElement("p");
    timeElement.classList.add("forecast-time");
    timeElement.innerText = `Time: ${time}`;
    forecastCard.appendChild(timeElement);

    // Create and append the temperature element
    const tempElement = document.createElement("p");
    tempElement.classList.add("forecast-temp");
    tempElement.innerText = `Temp: ${temperature}°C`;
    forecastCard.appendChild(tempElement);

    // Create and append the wind speed element
    const windElement = document.createElement("p");
    windElement.classList.add("forecast-wind");
    windElement.innerText = `Wind: ${windSpeed} m/s`;
    forecastCard.appendChild(windElement);

    // Create and append the humidity element
    const humidityElement = document.createElement("p");
    humidityElement.classList.add("forecast-humidity");
    humidityElement.innerText = `Humidity: ${humidity}%`;
    forecastCard.appendChild(humidityElement);

    // Append the forecast card to the forecast section
    forecastElement.appendChild(forecastCard);
  }
}

// Helper function to pad time (make single digits into two digits)
function padTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Function to display an error message in case of failure
function displayErrorMessage(message) {
  const errorElement = document.getElementById("error-message");
  errorElement.innerText = message;
}

// Call the fetchWeatherData function when the page loads
fetchWeatherData();
