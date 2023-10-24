let APIkey = "3ea7e44fe8cae8888a2fcecf8667f496";

function fetchCurrentWeatherData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then(resp => {return resp.json()})
    .then(json => {
        populateCurrentWeather(json);
    });
}

function fetchFutureWeatherData(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then(resp => {
        return resp.json()
    })
    .then(json => {
        populateFutureWeather(makeForecast(json.list))
    });
}

function makeForecast(data) {
    let newData = new Array(0);
    for (let i=0; i<data.length; i+=8) {
        newData.push(data[i]);
    }
    return newData;
}

function fetchGeoCoordinatesWithoutProceeding(city_name, limit) {
    console.log('fetching geo coordinates')
    console.log ("city name: ", city_name, ", limit: ", limit)
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=${limit}&appid=${APIkey}`)
    .then(resp => resp.json()
    .then(json => ({
        data: json,
    }))
    .then(res => {
        appendSearchOptions(cityOptionsContainer, res.data);
    }))
    // source for understanding JSON, promises, and .then(): https://stackoverflow.com/questions/37555031/why-does-json-return-a-promise-but-not-when-it-passes-through-then
}

let cityStateCountry = document.getElementById("city-state-country");
let currentDate = document.getElementById("current-date");
let currentWeatherDescription = document.getElementById("current-weather-description");
let currentWeatherIcon = document.getElementById("current-weather-icon");
let currentTemperature = document.getElementById("current-temperature");
let currentWind = document.getElementById("current-wind");
let currentHumidity = document.getElementById("current-humidity");

let dateOneDayOut = document.getElementById("date-one-day-out");
let descriptionOneDayOut = document.getElementById("description-one-day-out");
let weatherIconOneDayOut = document.getElementById("weather-icon-one-day-out");
let temperatureOneDayOut = document.getElementById("temperature-one-day-out");
let windOneDayOut = document.getElementById("wind-one-day-out");
let humidityOneDayOut = document.getElementById("humidity-one-day-out");

let dateTwoDaysOut = document.getElementById("date-two-days-out");
let descriptionTwoDaysOut = document.getElementById("description-two-days-out");
let weatherIconTwoDaysOut = document.getElementById("weather-icon-two-days-out");
let temperatureTwoDaysOut = document.getElementById("temperature-two-days-out");
let windTwoDaysOut = document.getElementById("wind-two-days-out");
let humidityTwoDaysOut = document.getElementById("humidity-two-days-out");

let dateThreeDaysOut = document.getElementById("date-three-days-out");
let descriptionThreeDaysOut = document.getElementById("description-three-days-out");
let weatherIconThreeDaysOut = document.getElementById("weather-icon-three-days-out");
let temperatureThreeDaysOut = document.getElementById("temperature-three-days-out");
let windThreeDaysOut = document.getElementById("wind-three-days-out");
let humidityThreeDaysOut = document.getElementById("humidity-three-days-out");

let dateFourDaysOut = document.getElementById("date-four-days-out");
let descriptionFourDaysOut = document.getElementById("description-four-days-out");
let weatherIconFourDaysOut = document.getElementById("weather-icon-four-days-out");
let temperatureFourDaysOut = document.getElementById("temperature-four-days-out");
let windFourDaysOut = document.getElementById("wind-four-days-out");
let humidityFourDaysOut = document.getElementById("humidity-four-days-out");

let dateFiveDaysOut = document.getElementById("date-five-days-out");
let descriptionFiveDaysOut = document.getElementById("description-five-days-out");
let weatherIconFiveDaysOut = document.getElementById("weather-icon-five-days-out");
let temperatureFiveDaysOut = document.getElementById("temperature-five-days-out");
let windFiveDaysOut = document.getElementById("wind-five-days-out");
let humidityFiveDaysOut = document.getElementById("humidity-five-days-out");

let futureDates = [dateOneDayOut, dateTwoDaysOut, dateThreeDaysOut, dateFourDaysOut, dateFiveDaysOut];
let futureDescriptions = [descriptionOneDayOut, descriptionTwoDaysOut, descriptionThreeDaysOut, descriptionFourDaysOut, descriptionFiveDaysOut];
let futureWeatherIcons = [weatherIconOneDayOut, weatherIconTwoDaysOut, weatherIconThreeDaysOut, weatherIconFourDaysOut, weatherIconFiveDaysOut];
let futureTemperatures = [temperatureOneDayOut, temperatureTwoDaysOut, temperatureThreeDaysOut, temperatureFourDaysOut, temperatureFiveDaysOut];
let futureWinds = [windOneDayOut, windTwoDaysOut, windThreeDaysOut, windFourDaysOut, windFiveDaysOut];
let futureHumidities = [humidityOneDayOut, humidityTwoDaysOut, humidityThreeDaysOut, humidityFourDaysOut, humidityFiveDaysOut];

function populateCurrentWeather(object) {
    currentDate.textContent = dayjs().format('M/DD/YYYY');
    // source for how to get current date in dayjs(): https://day.js.org/docs/en/parse/now
    // source for how to format date in dayjs(): https://day.js.org/docs/en/display/format
    currentWeatherDescription.textContent = object.weather[0].description;
    let weatherIcon = object.weather[0].icon;
    let weatherIconURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    currentWeatherIcon.setAttribute('src', weatherIconURL);
    // source for weather icons, their meaning, and how to use them: https://openweathermap.org/weather-conditions
    currentTemperature.textContent = convertTemperature(object.main.temp).toFixed(2); // toFixed(2) rounds to two decimal places
    // source for how to round a number to two decimal places: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
    currentWind.textContent = object.wind.speed.toFixed(2);
    currentHumidity.textContent = object.main.humidity;
}

function convertTemperature(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

function populateFutureWeather(object) {
    let weatherIcon;
    let weatherIconURL;

    for (let i = 0; i < object.length; i++) {
        futureDates[i].textContent = dayjs().add(i+1, 'day').format('M/DD/YYYY');
        futureDescriptions[i].textContent = object[i].weather[0].description;
        weatherIcon = object[i].weather[0].icon;
        weatherIconURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        futureWeatherIcons[i].setAttribute('src', weatherIconURL);
        futureTemperatures[i].textContent = convertTemperature(object[i].main.temp).toFixed(2);
        futureWinds[i].textContent = object[i].wind.speed.toFixed(2);
        futureHumidities[i].textContent = object[i].main.humidity;
    }
}

let searchBtn = document.getElementById("search-btn");
let homePageBtn = document.getElementById("home-page-btn");
let cityInput = document.getElementById("city-input");
let choiceContainer = document.getElementById("choice-container");
let cityOptionsContainer = document.getElementById("city-options-container");
let forecastContainer = document.getElementById("forecast-container");

function validateForm() {
    let cityForm = document.forms["submitCity"]["cityName"].value;
    let cityRegex = /^[A-Za-z\s]+$/; // only letters and spaces
    let match = cityForm.match(cityRegex);
    if (!match) { // if the user enters anything except letters and spaces
      alert("Please enter a valid city name, e.g. 'San Francisco'");
      return false;
    }
    return true;
}

let submitCityForm = document.getElementById("submit-city");

submitCityForm.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent the form from automatically submitting and reloading the page
});

function showChoiceContainer() {
    choiceContainer.style.display = "block";
    forecastContainer.style.display = "none";
}

let searchHistoryContainer = document.getElementById("search-history-container");

searchBtn.addEventListener("click", function() {
    if (validateForm()) {
        showChoiceContainer();
        fetchGeoCoordinatesWithoutProceeding(cityInput.value, 10);
    }
});

function showClearHistoryButton() {
    clearHistoryBtn.style.display = "block";
}

function replaceUndefinedWithNA(string) {
    return string.replaceAll('undefined', 'N/A');
}

function appendSearchOptions(elem, object) {
    if (elem.hasChildNodes()) { // if there are already search options on the page
    // source for the hasChildNodes() function: https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes
        elem.innerHTML = ''; // remove the search options from the page
    }
    if (object.length === 0) {
        let noResults = document.createElement('h2');
        noResults.innerText = 'No results found. Please enter a different city and try again.';
        elem.appendChild(noResults);
    }
    for (i=0; i<object.length; i++) {
        let searchOption = document.createElement('button');
        searchOption.style.display = 'block';
        searchOption.style.margin = '5px 5px 5px 0';
        searchOption.style.backgroundColor = "lightgrey";
        searchOption.style.border = "1px black solid";
        searchOption.style.borderRadius = "5px";
        searchOption.addEventListener("mouseover", (event) => {
            event.target.style.backgroundColor = "deepskyblue";
        });
        // source for mouseover event: https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event
        searchOption.addEventListener("mouseout", (event) => {
            event.target.style.backgroundColor = "lightgrey";
        });
        // source for mouseleave and mouseout events: https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event
        let searchOptionString = 'City: ' + object[i].name + '\nState: ' + object[i].state + '\nCountry: ' + object[i].country + '\nLatitude: ' + object[i].lat + '\nLongitude: ' + object[i].lon;
        searchOptionString = replaceUndefinedWithNA(searchOptionString);
        // source for the replaceAll() method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
        searchOption.innerText = searchOptionString;
        console.log(object[i].lat, object[i].lon)
        let chosenCity = object[i].name;
        let chosenState = object[i].state;
        let chosenCountry = object[i].country;
        let chosenLat = object[i].lat;
        let chosenLon = object[i].lon;
        searchOption.addEventListener("click", function() {
            console.log('clicked')
            console.log('chosen city: ', chosenCity, ', chosen state: ', chosenState, ', chosen country: ', chosenCountry, ', chosen lat: ', chosenLat, ', chosen lon: ', chosenLon)
            showForecastContainer();
            let locationString = chosenCity + ', ' + chosenState + ', ' + chosenCountry;
            locationString = replaceUndefinedWithNA(locationString);
            cityStateCountry.textContent = locationString;
            fetchCurrentWeatherData(chosenLat, chosenLon);
            fetchFutureWeatherData(chosenLat, chosenLon);
            saveNewCity(chosenCity, chosenState, chosenCountry, chosenLat, chosenLon);
            appendSearchHistoryEntries(searchHistoryContainer);
            showClearHistoryButton();
            console.log('stored cities: ', getStoredCities())
        });
        elem.appendChild(searchOption);
    }
}

function appendSearchHistoryEntries(elem) {
    let storedCities = getStoredCities();
    if (elem.hasChildNodes() || storedCities.length === 0) { // if there are already search history entries on the page
        elem.innerHTML = '';
    }
    for (i=0; i<storedCities.length; i++) {
        let searchHistoryEntry = document.createElement('button');
        searchHistoryEntry.style.display = 'block';
        searchHistoryEntry.style.marginBottom = '5px';
        searchHistoryEntry.style.backgroundColor = "lightgrey";
        searchHistoryEntry.style.border = "1px black solid";
        searchHistoryEntry.style.borderRadius = "5px";
        searchHistoryEntry.addEventListener("mouseover", (event) => {
            event.target.style.backgroundColor = "deepskyblue";
        });
        searchHistoryEntry.addEventListener("mouseout", (event) => {
            event.target.style.backgroundColor = "lightgrey";
        });
        let searchHistoryEntryString = storedCities[i].city + ', ' + storedCities[i].state + ', ' + storedCities[i].country;
        searchHistoryEntryString = replaceUndefinedWithNA(searchHistoryEntryString);
        searchHistoryEntry.innerText = searchHistoryEntryString;
        let chosenLat = storedCities[i].lat;
        let chosenLon = storedCities[i].lon;
        searchHistoryEntry.addEventListener("click", function() {
            showForecastContainer();
            let locationString = searchHistoryEntryString;
            locationString = replaceUndefinedWithNA(locationString);
            cityStateCountry.textContent = locationString;
            fetchCurrentWeatherData(chosenLat, chosenLon);
            fetchFutureWeatherData(chosenLat, chosenLon);
        });
        elem.appendChild(searchHistoryEntry);
    }
}

function showForecastContainer() {
    choiceContainer.style.display = "none";
    forecastContainer.style.display = "block";
}

homePageBtn.addEventListener("click", showForecastContainer);

function getStoredCities() {
    let storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities === null) {
        storedCities = [];
    }
    return storedCities;
}

function saveNewCity(city, state, country, lat, lon) {
    let storedCities = getStoredCities();
    storedCities.push({"city": city, "state": state, "country": country, "lat": lat, "lon": lon});
    localStorage.setItem("cities", JSON.stringify(storedCities));
}

document.addEventListener("DOMContentLoaded", function() {
    appendSearchHistoryEntries(searchHistoryContainer);
    let storedCities = getStoredCities();
    if (storedCities.length > 0) {
        showClearHistoryButton();
    } else {
        hideClearHistoryButton();
    }
    loadMostRecentCity();
});

function loadMostRecentCity() {
    let storedCities = getStoredCities();
    if (storedCities.length === 0) {
        cityStateCountry.textContent = 'Berkeley, CA, US';
        fetchCurrentWeatherData(37.8708393, -122.272863);
        fetchFutureWeatherData(37.8708393, -122.272863);
        // if no cities have been searched, load Berkeley, CA by default
    } else {
        // if at least one city has been searched, load the most recently searched city
        let mostRecentCity = storedCities[storedCities.length-1];
        let locationString = mostRecentCity.city + ', ' + mostRecentCity.state + ', ' + mostRecentCity.country;
        locationString = replaceUndefinedWithNA(locationString);
        cityStateCountry.textContent = locationString;
        fetchCurrentWeatherData(mostRecentCity.lat, mostRecentCity.lon);
        fetchFutureWeatherData(mostRecentCity.lat, mostRecentCity.lon);
    }
}

let clearHistoryBtn = document.getElementById("clear-history-btn");

function clearSearchHistory() {
    localStorage.removeItem("cities");
    appendSearchHistoryEntries(searchHistoryContainer);
}

function hideClearHistoryButton() {
    clearHistoryBtn.style.display = "none";
}

clearHistoryBtn.addEventListener("click", function() {
    clearSearchHistory();
    hideClearHistoryButton();
});
