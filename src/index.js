//display current date
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//let day = currentTime.getDay();
//day = days[currentTime.getDay()];
//let hour = currentTime.getHours();
//let minutes = currentTime.getMinutes();

let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMin = now.getMinutes();

let timeNow = document.querySelector("#date");
timeNow.innerHTML = `${currentDay}, ${currentHour}:${currentMin}`;

function showCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-city");

  let units = "imperial";
  let apiKey = "a0bfa17bffa1f4d73943657968423b37";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temperature}`;

  let city = response.data.name;
  let changeCity = document.querySelector("#change-city");
  changeCity.innerHTML = `${city}`;

  let humidity = Math.round(response.data.main.humidity);
  let changeHumidity = document.querySelector("#humidity");
  changeHumidity.innerHTML = `${humidity}`;

  let wind = Math.round(response.data.wind.speed);
  let changeWind = document.querySelector("#wind");
  changeWind.innerHTML = `${wind}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "a0bfa17bffa1f4d73943657968423b37";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  //console.log(apiURL);

  axios.get(apiURL).then(showTemperature);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let search = document.querySelector("#enter-city");
search.addEventListener("submit", showCity);

let current = document.querySelector("#current-button");
current.addEventListener("click", getCurrent);
