# Challenge 6

![GitHub license](https://img.shields.io/badge/License-BSD_3--Clause-orange.svg)

## Description
Traveling to new places and creating new memories can be rewarding. However, there can be great variations in weather depending on location, and trying to plan ahead and taking things like temperature, wind speed, and humidity into account can be difficult. This application solves that problem by fetching current and future weather data for any city from the OpenWeatherAPI. When you search for a city, you will be able to choose a city from a list of options, which will then show you the current weather and forecast data for the location you chose. This project taught me how to fetch and process data from an API, show and hide certain sections of the page, and attach event listeners to buttons using a for loop.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
No installation is required for this project.

## Usage
when you start up the application, you will be presented with a city input form and previous search history options (if applicable) on the left, and on the right you will find the current weather data on the top and the weather forecast up to 5 days from now on the bottom. If you have previously searched at least one city, the data for your most recently searched city will be loaded (pic of previous city forecast loaded here). but if you don't have any previous searches, `Berkeley, CA` is loaded by default: (insert no previous search history here) when you search for a name, only letters, spaces, periods, and commas are allowed. **Important:** the search is not case sensitive, but it is required that the name you enter matches the city name without typos or extra spaces. (insert pic of Balti more here) (insert pic of Blatimore here) Once you enter the city name properly, you can view the list of up to 5 options: (insert pic of baltimore choice container with button of chosen city hovered over) once you click on the option whose weather you want to see, you will be taken back to the forecast page where you will see the weather data, which is retrieved using latitude and longitude (insert pic of data for newly searched city here). note, if you search a city that you have previously searched already, it will be moved to the front of the search history array, as shown here: (insert pic of previous searched city being searched again and moved up to front here) A link the the deployed application can be found [here](insert link here)

MENTION SPECIAL CASE FOR RENO DUPLICATE ENTRIES (insert picture of reno duplicate entries here)

## Credits
Received assistance from students Michael Taraschi, Avery Myers, and Kevin Smith. Also received help from TA Michael Seaman and instructor Robbert Wijtman. The following web resources helped me write the code for this project: (insert web sources here)

## Contributing
This application currently does not have the functionality to delete individual search history entries. If someone could help me figure out how to implement that, I would greatly appreciate it.

## Tests
No tests have been written for this application.

## License
This project was created using the BSD 3-Clause "New" or "Revised" License. More information about the license can be found [here](https://opensource.org/license/bsd-3-clause/).

## Questions
If you have any questions for me, you can [follow me on GitHub](https://github.com/GimmeKitties711) or email me at eric20wang.wang@gmail.com.
