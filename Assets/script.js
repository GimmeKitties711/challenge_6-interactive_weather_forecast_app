let APIkey = "3ea7e44fe8cae8888a2fcecf8667f496";

function fetchWeatherData(lat, lon) {
    console.log('fetching weather data')
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then(resp => {
        console.log(resp)
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
}

function fetchGeoCoordinates(city_name, limit) {
    console.log('fetching geo coordinates')
    console.log ("city name: ", city_name, ", limit: ", limit)
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=${limit}&appid=${APIkey}`)
    .then(resp =>{
        console.log(resp)
        return resp.json()})
    .then(json => {
        console.log(json)
    
        fetchWeatherData(json[0].lat, json[0].lon)
        
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

//fetchGeoCoordinates("Chicago", 5);
//fetchWeatherData(fetchGeoCoordinates("Chicago", 5));
//let [latitude, longitude] = fetchGeoCoordinates("Chicago", 5);
//fetchGeoCoordinates("Chicago", 5);
//console.log('latitude: ', latitude, ', longitude: ', longitude);
//console.log(fetchGeoCoordinates("Chicago", 5));
//let {lat, lon} = fetchGeoCoordinates("Chicago", 5);
//console.log('lat: ', lat, ', lon: ', lon);
//console.log('latitude: ', latAndLon);
//console.log('longitude: ', latAndLon);

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
