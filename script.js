const apiKey = "b943d29e71e39d52789569de0554a7bf";

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function getHourlyForecast(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hourly forecast data:", error);
  }
}

async function displayWeather() {
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const weatherData = await getWeather(city);
  const hourlyForecastData = await getHourlyForecast(city);

  if (weatherData && hourlyForecastData) {
    const weatherDiv = document.getElementById("weather");
    const weatherIcon = getWeatherIcon(weatherData.weather[0].icon);
    weatherDiv.innerHTML = `
    <h2>Weather in ${city}</h2>
    <i class="${weatherIcon} weather-icon"></i>
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Description: ${weatherData.weather[0].description}</p>
  `;

    changeBackgroundColor(weatherData.weather[0].description);

    showHourlyForecast(hourlyForecastData.list);
  }
}

function getWeatherIcon(iconCode) {
  switch (iconCode) {
    case "01d":
      return "fas fa-sun";
    case "01n":
      return "fas fa-moon";
    case "02d":
      return "fas fa-cloud-sun";
    case "02n":
      return "fas fa-cloud-moon";
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return "fas fa-cloud";
    case "09d":
    case "09n":
      return "fas fa-cloud-showers-heavy";
    case "10d":
    case "10n":
      return "fas fa-cloud-sun-rain";
    case "11d":
    case "11n":
      return "fas fa-bolt";
    case "13d":
    case "13n":
      return "fas fa-snowflake";
    case "50d":
    case "50n":
      return "fas fa-smog";
    default:
      return "fas fa-question";
  }
}

function showHourlyForecast(hourlyForecast) {
  const hourlyForecastDiv = document.getElementById("hourlyForecast");
  hourlyForecastDiv.innerHTML = "<h2>Hourly Forecast</h2>";
  const table = document.createElement("table");
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");

  const tableHeadRow = document.createElement("tr");
  const timeHeader = document.createElement("th");
  timeHeader.textContent = "Time";
  const tempHeader = document.createElement("th");
  tempHeader.textContent = "Temperature (°C)";
  tableHeadRow.appendChild(timeHeader);
  tableHeadRow.appendChild(tempHeader);
  tableHead.appendChild(tableHeadRow);
  table.appendChild(tableHead);

  hourlyForecast.forEach((hour) => {
    const date = new Date(hour.dt * 1000);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const temp = Math.round(hour.main.temp);
    const tableRow = document.createElement("tr");
    const timeCell = document.createElement("td");
    timeCell.textContent = time;
    const tempCell = document.createElement("td");
    tempCell.textContent = temp;
    tempCell.classList.add("temp");
    tableRow.appendChild(timeCell);
    tableRow.appendChild(tempCell);
    tableBody.appendChild(tableRow);
  });

  table.appendChild(tableBody);
  hourlyForecastDiv.appendChild(table);
  hourlyForecastDiv.style.display = "block";
}

function changeBackgroundColor(description) {
  const body = document.querySelector("body");
  switch (description.toLowerCase()) {
    case "clear sky":
      body.style.backgroundColor = "#87ceeb";
      break;
    case "few clouds":
    case "scattered clouds":
      body.style.backgroundColor = "#f0f8ff";
      break;
    case "broken clouds":
    case "overcast clouds":
      body.style.backgroundColor = "#778899";
      break;
    case "shower rain":
    case "rain":
      body.style.backgroundColor = "#708090";
      break;
    case "thunderstorm":
      body.style.backgroundColor = "#2f4f4f";
      break;
    case "snow":
      body.style.backgroundColor = "#fffafa";
      break;
    case "mist":
    case "smoke":
    case "haze":
    case "dust":
    case "fog":
    case "sand":
    case "dust":
    case "ash":
    case "squall":
    case "tornado":
      body.style.backgroundColor = "#d3d3d3";
      break;
    default:
      body.style.backgroundColor = "#ffffff";
      break;
  }
}
