function updateWeatherData(response) {
    let tempElement = document.querySelector("#temp");
    let temp = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let weatherDescriptionElement = document.querySelector("#weatherDescription");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#windSpeed");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");
    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(new Date(response.data.time * 1000));
    weatherDescriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    tempElement.innerHTML = Math.round(temp);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-current-temp-icon" />`;
  
    getForecast(response.data.city);
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function searchCity(city) {
    let apiKey = "6t1a3f1d4o919a3d9f9bce38e73030bb";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(updateWeatherData);
  }
  
  function searchNewCityData(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#searchFormInput");
  
    searchCity(searchInput.value);
  }
  
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];
  
    return days[date.getDay()];
  }
  
  function getForecast(city) {
    let apiKey = "6t1a3f1d4o919a3d9f9bce38e73030bb";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(searchForecast);
  }
  
  function searchForecast(response) {
    let forecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHtml +=
          `
          <div class="weather-app-forecast-weekDays">
            <div class="weekDay">${formatDay(day.time)}</div>
            <div class="weekDayIcon">
              <img src="${day.condition.icon_url}" class="weekDayIcon" />
            </div>
            <div class="weekDayTemps">
              <div class="weekDayTemp">
                <strong>${Math.round(day.temperature.maximum)}°</strong> 
              </div>
              <div class="weekDayTemp">${Math.round(day.temperature.minimum)}</div>
            </div>
          </div>
          `;
      }
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
  
  let searchFormElement = document.querySelector("#searchForm");
  searchFormElement.addEventListener("submit", searchNewCityData);
  
  // Start with default city
  searchCity("Orlando");
  