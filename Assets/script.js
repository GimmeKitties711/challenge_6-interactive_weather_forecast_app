let APIkey = "3ea7e44fe8cae8888a2fcecf8667f496";

function fetchCurrentWeatherData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then(resp => {return resp.json()})
    .then(json => {
        populateCurrentWeather(json); // populate the current weather section
    });
}

function fetchFutureWeatherData(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then(resp => {return resp.json()})
    .then(json => {
        populateFutureWeather(makeForecast(json.list)); // populate the future weather section
    });
}

function makeForecast(data) {
    let newData = new Array(0);
    for (let i=0; i<data.length; i+=8) {
        newData.push(data[i]);
    }
    // the json.list array in fetchFutureWeatherData() contains data for every 3 hours for the next 5 days. this means that each day contains entries for the times 03:00, 06:00...21:00, 00:00. this adds up to 8 entries per day × 5 days = 40 entries. this function takes every 8th entry to return an array with data for every 24 hours instead of every 3 hours, reducing the number of entries to 5.
    return newData;
}

function fetchGeoCoordinatesWithoutProceeding(city_name, limit) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=${limit}&appid=${APIkey}`)
    .then(resp => resp.json()
    .then(json => ({
        data: json,
    }))
    .then(res => {
        appendSearchOptions(cityOptionsContainer, res.data);
        // this function fetches an array of up to 5 cities from the OpenWeatherMap API that match the user's input. the name of this function includes the words 'without proceeding' because searching for a city name takes the user to the choice container, where the options corresponding to the searched name are laid out as buttons for the user to select.
    }))
    // source for understanding JSON, promises, and .then(): https://stackoverflow.com/questions/37555031/why-does-json-return-a-promise-but-not-when-it-passes-through-then
}

// current day
let cityStateCountry = document.getElementById("city-state-country");
let currentDate = document.getElementById("current-date");
let currentWeatherDescription = document.getElementById("current-weather-description");
let currentWeatherIcon = document.getElementById("current-weather-icon");
let currentTemperature = document.getElementById("current-temperature");
let currentWind = document.getElementById("current-wind");
let currentHumidity = document.getElementById("current-humidity");

// forecast day one (one day from now)
let dateOneDayOut = document.getElementById("date-one-day-out");
let descriptionOneDayOut = document.getElementById("description-one-day-out");
let weatherIconOneDayOut = document.getElementById("weather-icon-one-day-out");
let temperatureOneDayOut = document.getElementById("temperature-one-day-out");
let windOneDayOut = document.getElementById("wind-one-day-out");
let humidityOneDayOut = document.getElementById("humidity-one-day-out");

// forecast day two
let dateTwoDaysOut = document.getElementById("date-two-days-out");
let descriptionTwoDaysOut = document.getElementById("description-two-days-out");
let weatherIconTwoDaysOut = document.getElementById("weather-icon-two-days-out");
let temperatureTwoDaysOut = document.getElementById("temperature-two-days-out");
let windTwoDaysOut = document.getElementById("wind-two-days-out");
let humidityTwoDaysOut = document.getElementById("humidity-two-days-out");

// forecast day three
let dateThreeDaysOut = document.getElementById("date-three-days-out");
let descriptionThreeDaysOut = document.getElementById("description-three-days-out");
let weatherIconThreeDaysOut = document.getElementById("weather-icon-three-days-out");
let temperatureThreeDaysOut = document.getElementById("temperature-three-days-out");
let windThreeDaysOut = document.getElementById("wind-three-days-out");
let humidityThreeDaysOut = document.getElementById("humidity-three-days-out");

// forecast day four
let dateFourDaysOut = document.getElementById("date-four-days-out");
let descriptionFourDaysOut = document.getElementById("description-four-days-out");
let weatherIconFourDaysOut = document.getElementById("weather-icon-four-days-out");
let temperatureFourDaysOut = document.getElementById("temperature-four-days-out");
let windFourDaysOut = document.getElementById("wind-four-days-out");
let humidityFourDaysOut = document.getElementById("humidity-four-days-out");

// forecast day five
let dateFiveDaysOut = document.getElementById("date-five-days-out");
let descriptionFiveDaysOut = document.getElementById("description-five-days-out");
let weatherIconFiveDaysOut = document.getElementById("weather-icon-five-days-out");
let temperatureFiveDaysOut = document.getElementById("temperature-five-days-out");
let windFiveDaysOut = document.getElementById("wind-five-days-out");
let humidityFiveDaysOut = document.getElementById("humidity-five-days-out");

// arrays for future weather data. these will be used in a for loop to populate the future weather section.
let futureDates = [dateOneDayOut, dateTwoDaysOut, dateThreeDaysOut, dateFourDaysOut, dateFiveDaysOut];
let futureDescriptions = [descriptionOneDayOut, descriptionTwoDaysOut, descriptionThreeDaysOut, descriptionFourDaysOut, descriptionFiveDaysOut];
let futureWeatherIcons = [weatherIconOneDayOut, weatherIconTwoDaysOut, weatherIconThreeDaysOut, weatherIconFourDaysOut, weatherIconFiveDaysOut];
let futureTemperatures = [temperatureOneDayOut, temperatureTwoDaysOut, temperatureThreeDaysOut, temperatureFourDaysOut, temperatureFiveDaysOut];
let futureWinds = [windOneDayOut, windTwoDaysOut, windThreeDaysOut, windFourDaysOut, windFiveDaysOut];
let futureHumidities = [humidityOneDayOut, humidityTwoDaysOut, humidityThreeDaysOut, humidityFourDaysOut, humidityFiveDaysOut];

function populateCurrentWeather(object) {
    currentDate.textContent = dayjs().format('M/DD/YYYY');
    // source for how to get the current date in dayjs: https://day.js.org/docs/en/parse/now
    // source for how to format a date in dayjs: https://day.js.org/docs/en/display/format
    currentWeatherDescription.textContent = object.weather[0].description;
    let weatherIcon = object.weather[0].icon;
    let weatherIconURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    currentWeatherIcon.setAttribute('src', weatherIconURL);
    // source for weather icons, their meanings, and how to use them: https://openweathermap.org/weather-conditions
    currentTemperature.textContent = convertTemperature(object.main.temp).toFixed(2); // toFixed(2) rounds a number to 2 decimal places
    // source for how to round a number to 2 decimal places: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
    currentWind.textContent = object.wind.speed.toFixed(2);
    currentHumidity.textContent = object.main.humidity;
}

function convertTemperature(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
    // kelvin - 273.15 converts kelvin to celsius, then (celsius * 9/5) + 32 converts celsius to fahrenheit
}

function populateFutureWeather(object) {
    let weatherIcon;
    let weatherIconURL;

    // this function is similar to populateCurrentWeather(), but weatherIcon and weatherIconURL are declared outside the for loop, because it is better to not have to keep redefining them for each iteration of the loop.
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
    let cityRegex = /^[A-Za-z\s,.]+$/; // only letters and spaces, commas, and periods are allowed
    let match = cityForm.match(cityRegex);
    if (!match) { // if the user enters anything except the allowed characters
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

// the following function has been commented out because I could only get it to work in the console, not in the actual code. I am not sure why this is the case.
/*
function removeDuplicateCities(elem) {
    let textContents = [];
    for (i=0; i<elem.children.length; i++) {
        textContents.push(elem.children[i].textContent);
        // go through the children of the element and add their textContent to the textContents array
    }

    for (i=0; i<textContents.length; i++) {
        if (textContents.slice(0, i).includes(textContents[i])) {
            elem.children[i].textContent = 'flagged for deletion';
            // for every item in the textContents array, if the item is a duplicate of an item that came before it, change the textContent of the corresponding child to 'flagged for deletion'
        }
    }

    textContents = [];
    for (i=0; i<elem.children.length; i++) {
        textContents.push(elem.children[i].textContent);
        // update the textContents array to include the new textContent of the children because at least one of the children's textContent has been changed to 'flagged for deletion'
    }

    for (i=textContents.length-1; i>=0; i--) {
        if (textContents[i] === 'flagged for deletion') {
            elem.removeChild(elem.children[i]);
            // remove the children that are marked as 'flagged for deletion'
        }
    }
}
*/

searchBtn.addEventListener("click", function() {
    if (validateForm()) { // if the user enters a valid city name
        showChoiceContainer();
        fetchGeoCoordinatesWithoutProceeding(cityInput.value, 10);
        // show the choice container and populate it with city options based on the user's input
        // removeDuplicateCities(cityOptionsContainer); // I would call removeDuplicateCities() here if it worked properly
    }
});

function showClearHistoryButton() {
    clearHistoryBtn.style.display = "block";
}

function replaceUndefinedWithNA(string) {
    return string.replaceAll('undefined', 'N/A'); // it is better to display 'N/A' than 'undefined'
    // source for the replaceAll() method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
}

let cityOptionsQuestion = document.getElementById("city-options-question");

function appendSearchOptions(elem, object) {
    if (elem.hasChildNodes()) { // if there are already search options on the page
    // source for the hasChildNodes() method: https://www.w3schools.com/jsref/met_node_haschildnodes.asp
        elem.innerHTML = ''; // remove the search options from the page
    }
    if (object.length === 0) { // if there are no search results for the city that the user entered
        cityOptionsQuestion.style.visibility = "hidden"; // hide the question 'Which city would you like to see?' because there are no search results
        let noResults = document.createElement('h2');
        noResults.innerText = 'No results found. Please enter a different city and try again.';
        elem.appendChild(noResults);
    } else {
        cityOptionsQuestion.style.visibility = "visible";
    }
    for (i=0; i<object.length; i++) { // if there is at least one search result
        let searchOption = document.createElement('button');
        searchOption.style.display = 'block';
        searchOption.style.margin = '5px 5px 5px 0';
        searchOption.style.backgroundColor = "lightgrey";
        searchOption.style.border = "1px black solid";
        searchOption.style.borderRadius = "5px";
        searchOption.addEventListener("mouseover", (event) => {
            event.target.style.backgroundColor = "deepskyblue"; // turn the button deepskyblue when the user hovers over it
        });
        // source for mouseover event: https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event
        searchOption.addEventListener("mouseout", (event) => {
            event.target.style.backgroundColor = "lightgrey"; // turn the button back to lightgrey when the user stops hovering over it
        });
        // source for mouseleave and mouseout events: https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event
        let searchOptionString = 'City: ' + object[i].name + '\nState: ' + object[i].state + '\nCountry: ' + object[i].country + '\nLatitude: ' + object[i].lat + '\nLongitude: ' + object[i].lon; // display the city name, state, country, latitude, and longitude of each search result
        searchOptionString = replaceUndefinedWithNA(searchOptionString);
        searchOption.innerText = searchOptionString;
        let chosenCity = object[i].name;
        let chosenState = object[i].state;
        let chosenCountry = object[i].country;
        let chosenLat = object[i].lat;
        let chosenLon = object[i].lon;
        searchOption.addEventListener("click", function() {
            showForecastContainer();
            let locationString = chosenCity + ', ' + chosenState + ', ' + chosenCountry;
            locationString = replaceUndefinedWithNA(locationString);
            cityStateCountry.textContent = locationString; // city, state, country. if any of the fields are undefined (this happens most often with the state field), they are replaced with 'N/A'
            fetchCurrentWeatherData(chosenLat, chosenLon);
            fetchFutureWeatherData(chosenLat, chosenLon);
            // fetch current and future weather data for the chosen city
            saveNewCity(chosenCity, chosenState, chosenCountry, chosenLat, chosenLon); // save the chosen city to localStorage
            appendSearchHistoryEntries(searchHistoryContainer); // add it to the search history list in the search history container
            showClearHistoryButton(); // the clear history button is revealed if it was hidden before
        });
        elem.appendChild(searchOption);
    }
}

function appendSearchHistoryEntries(elem) {
    let storedCities = getStoredCities();
    if (elem.hasChildNodes() || storedCities.length === 0) { // if there are already search history entries on the page, or if no cities have been searched
        elem.innerHTML = ''; // remove any existing search history entries. this prevents the entries from being duplicated every time the page loads or a new search is made.
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
        let searchHistoryEntryString = storedCities[i].city + ', ' + storedCities[i].state + ', ' + storedCities[i].country; // latitude and longitude are not included in the search history entries to keep the entries brief
        searchHistoryEntryString = replaceUndefinedWithNA(searchHistoryEntryString);
        searchHistoryEntry.innerText = searchHistoryEntryString;
        let chosenLat = storedCities[i].lat;
        let chosenLon = storedCities[i].lon;
        searchHistoryEntry.addEventListener("click", function() {
            showForecastContainer(); // show the forecast container (this action will hide the choice container if it is showing)
            let locationString = searchHistoryEntryString;
            locationString = replaceUndefinedWithNA(locationString);
            cityStateCountry.textContent = locationString;
            fetchCurrentWeatherData(chosenLat, chosenLon);
            fetchFutureWeatherData(chosenLat, chosenLon);
            // fetch current and future weather data for the previously searched city that the user clicked on
        });
        elem.appendChild(searchHistoryEntry);
    }
}

function showForecastContainer() {
    choiceContainer.style.display = "none";
    forecastContainer.style.display = "block";
}

homePageBtn.addEventListener("click", showForecastContainer);
// when the button that says 'Go Back' is clicked, the page goes back to the forecast container and the choice container is hidden

function getStoredCities() {
    let storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities === null) { // if localStorage does not have an item called 'cities'. this if condition is necessary because clearSearchHistory() removes the 'cities' item from localStorage.
        storedCities = []; // empty array with length 0
    }
    return storedCities;
}

function saveNewCity(city, state, country, lat, lon) {
    let storedCities = getStoredCities();
    let newCity = {"city": city, "state": state, "country": country, "lat": lat, "lon": lon}; // object with all 5 properties
    for (i=storedCities.length-1; i>=0; i--) {
        if (storedCities[i].lat === newCity.lat && storedCities[i].lon === newCity.lon) {
            storedCities.splice(i, 1); // remove the city from the array. we start from the end of the array and work backwards because splice() changes the length of the array, and if we start from the beginning, the indexes of the remaining elements will change as we remove elements from the array.
        }
    }
    storedCities.push(newCity); // add the new city to the end of the array
    localStorage.setItem("cities", JSON.stringify(storedCities));
}

document.addEventListener("DOMContentLoaded", function() {
    appendSearchHistoryEntries(searchHistoryContainer);
    let storedCities = getStoredCities();
    if (storedCities.length > 0) { // if at least one city has been searched
        showClearHistoryButton();
    } else { // if no cities have been searched
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
        // if no cities have been searched, load the data for Berkeley, CA by default
    } else {
        // if at least one city has been searched, load the data for the most recently searched city
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
    hideClearHistoryButton(); // hide the clear history button after the user clicks it because there should not be a button that says 'Clear Search History' when there is no search history
});
