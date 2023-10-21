//import dayjs from 'dayjs';
//import * as dayjs from 'dayjs'

let APIkey = "3ea7e44fe8cae8888a2fcecf8667f496";

function fetchCurrentWeatherData(city_name, lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then(resp => {return resp.json()})
    .then(json => {
        console.log('json: ', json)
        // console.log('current weather: ', json.main.temp, json.wind.speed, json.main.humidity)
        // console.log('converted temperature: ', (json.main.temp-273.15)*9/5+32)
        populateCurrentWeather(city_name, json);
    }
    )
}

function fetchFutureWeatherData(lat, lon) {
    //console.log('fetching weather data')
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then(resp => {
        //console.log(resp)
        return resp.json()
    })
    .then(json => makeForecast(json.list));
}

function makeForecast(data) {
    let newData = new Array(0);
    for (let i = 0; i < data.length; i+=8) {
        newData.push(data[i]);
    }
    console.log("newData: ", newData);
    //console.log("typeof newData: ", typeof newData);
    //return newData;
}

function fetchGeoCoordinates(city_name, limit) {
    console.log('fetching geo coordinates')
    console.log ("city name: ", city_name, ", limit: ", limit)
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=${limit}&appid=${APIkey}`)
    .then(resp =>{
        //console.log(resp)
        return resp.json()})
    .then(json => {
        console.log(json)
    
        fetchCurrentWeatherData(city_name, json[0].lat, json[0].lon)
        fetchFutureWeatherData(json[0].lat, json[0].lon)
        
        // return [json[0].lat, json[0].lon]
        
    }
        //console.log('json[0].lat: ', json[0].lat, ', json[0].lon: ', json[0].lon)
        // return {
        //     latitude: json[0].lat,
        //     longitude: json[0].lon
        // };
    ); //console.log('typeof json[0].lat: ' + typeof json[0].lat + ', typeof json[0].lon: ' + typeof json[0].lon));

    //console.log('json[0]: ', json[0]);
}

fetchGeoCoordinates("Chicken", 10);
//fetchWeatherData(fetchGeoCoordinates("Chicago", 5));
//let [latitude, longitude] = fetchGeoCoordinates("Chicago", 5);
//fetchGeoCoordinates("Chicago", 5);
//console.log('latitude: ', latitude, ', longitude: ', longitude);
//console.log(fetchGeoCoordinates("Chicago", 5));
//let {lat, lon} = fetchGeoCoordinates("Chicago", 5);
//console.log('lat: ', lat, ', lon: ', lon);
//console.log('latitude: ', latAndLon);
//console.log('longitude: ', latAndLon);

let cityName = document.getElementById("city-name");
let currentDate = document.getElementById("current-date");
let currentWeatherIcon = document.getElementById("current-weather-icon");
let currentTemperature = document.getElementById("current-temperature");
let currentWind = document.getElementById("current-wind");
let currentHumidity = document.getElementById("current-humidity");

let dateOneDayOut = document.getElementById("date-one-day-out");
let weatherIconOneDayOut = document.getElementById("weather-icon-one-day-out");
let temperatureOneDayOut = document.getElementById("temperature-one-day-out");
let windOneDayOut = document.getElementById("wind-one-day-out");
let humidityOneDayOut = document.getElementById("humidity-one-day-out");

let dateTwoDaysOut = document.getElementById("date-two-days-out");
let weatherIconTwoDaysOut = document.getElementById("weather-icon-two-days-out");
let temperatureTwoDaysOut = document.getElementById("temperature-two-days-out");
let windTwoDaysOut = document.getElementById("wind-two-days-out");
let humidityTwoDaysOut = document.getElementById("humidity-two-days-out");

let dateThreeDaysOut = document.getElementById("date-three-days-out");
let weatherIconThreeDaysOut = document.getElementById("weather-icon-three-days-out");
let temperatureThreeDaysOut = document.getElementById("temperature-three-days-out");
let windThreeDaysOut = document.getElementById("wind-three-days-out");
let humidityThreeDaysOut = document.getElementById("humidity-three-days-out");

let dateFourDaysOut = document.getElementById("date-four-days-out");
let weatherIconFourDaysOut = document.getElementById("weather-icon-four-days-out");
let temperatureFourDaysOut = document.getElementById("temperature-four-days-out");
let windFourDaysOut = document.getElementById("wind-four-days-out");
let humidityFourDaysOut = document.getElementById("humidity-four-days-out");

let dateFiveDaysOut = document.getElementById("date-five-days-out");
let weatherIconFiveDaysOut = document.getElementById("weather-icon-five-days-out");
let temperatureFiveDaysOut = document.getElementById("temperature-five-days-out");
let windFiveDaysOut = document.getElementById("wind-five-days-out");
let humidityFiveDaysOut = document.getElementById("humidity-five-days-out");

function populateCurrentWeather(city_name, object) {
    cityName.textContent = city_name;
    currentDate.textContent = dayjs().format('M/DD/YYYY');
    // source for how to get current date in dayjs(): https://day.js.org/docs/en/parse/now
    // source for how to format date in dayjs(): https://day.js.org/docs/en/display/format
    currentWeatherIcon.textContent = selectWeatherIcon(object.weather[0].description);
    currentTemperature.textContent = convertTemperature(object.main.temp).toFixed(2); // toFixed(2) rounds to two decimal places
    // source for how to round a number to two decimal places: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
    currentWind.textContent = object.wind.speed;
    currentHumidity.textContent = object.main.humidity;
}

function selectWeatherIcon(description) {
    if (description === "scattered clouds") {
        return '🌥️';
    }
}

function convertTemperature(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

/*
function fetchCatImage() {
    let image = document.getElementById("cat-image");
    fetch('https://api.thecatapi.com/v1/images/search')
        // this api does not require a key, source: https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
        .then(resp => resp.json())
        .then(json => image.src = json[0].url);
    // in this case, json is a one-entry array with four objects: {id: url: width: height: }. the url object is the image url, so this line creates a src field for the img with the id "cat-image" and sets it to the image url.
}

const fact_url = 'https://meowfacts.p.rapidapi.com/?lang=eng';
const fact_options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '41afa2b638msh3f22d0547e8ca2ap195e88jsn66cc9c003763',
        // this API key was created by TA Michael Seaman. without a valid API key, clicking on the random cat and fact button produces an error message in the console: "401: You are not subscribed to this API".
        'X-RapidAPI-Host': 'meowfacts.p.rapidapi.com',
    }
}

function fetchCatFact() {
    let fact = document.getElementById("cat-fact");
    fetch(fact_url, fact_options)
        .then(resp => resp.json())
        .then(json => fact.textContent = json.data); // sets the text content of the element with the id "cat-fact" to the data retrieved by fetching. the fact element is empty until the random cat and fact button is clicked.
}
*/

// function getValue(name, age) {
//     console.log(name, age)
// }
// var username = getValue(["John", 25], true);
// console.log(username)

function getStoredCities() {
    let storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities === null) {
        storedCities = [];
    }
    return storedCities;
}

function saveNewCity(city) {
    let storedCities = getStoredCities();
    storedCities.push(city);
    localStorage.setItem("cities", JSON.stringify(storedCities));
}
