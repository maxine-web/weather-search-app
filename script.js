//weather api
let appId = "834db3670a1099f5c8bdc9e8c30cf50d";
//variable sets units
let units = "imperial";
//variable sets search method
let searchMethod;

//working button
document.getElementById("searchButton").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) searchWeather(searchTerm);
});

//determines search type
function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  )
    searchMethod = "zip";
  else searchMethod = "q";
}

//gathers weather details and sets picture
function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      init(result);
    });

  function init(serverResult) {
    switch (serverResult.weather[0].main) {
      case "Clear":
        document.body.style.backgroundImage = 'url("img/clear.jpg")';
        break;
      case "Clouds":
        document.body.style.backgroundImage = 'url("img/cloudy.jpg")';
        break;
      case "Rain":
      case "Drizzle":
      case "Mist":
        document.body.style.backgroundImage = 'url("img/rain.jpg")';
        break;
      case "Thunderstorm":
        document.body.style.backgroundImage = 'url("img/storm.jpg")';
        break;
      case "Snow":
        document.body.style.backgroundImage = 'url("img/snow.jpg")';
        break;
    }

    let weatherDescription = document.getElementById("weatherDescription");
    let temperatureElement = document.getElementById("temperature");
    let humidityElement = document.getElementById("humidity");
    let windSpeedElement = document.getElementById("windSpeed");
    let cityHeader = document.getElementById("cityHeader");

    let resultDescription = serverResult.weather[0].description;
    weatherHeader.innerText =
      resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(serverResult.main.temp) + "&#176";
    windSpeedElement.innerHTML =
      "Winds at " + Math.floor(serverResult.wind.speed) + "mph";
    cityHeader.innerHTML = serverResult.name;
    humidityElement.innerHTML =
      "Humidity levels at " + serverResult.main.humidity + "%";

    setPosition();
  }
}

//sets square's position and visibility
function setPosition() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 2}px)`;
  weatherContainer.style.visibility = "visible";
}
