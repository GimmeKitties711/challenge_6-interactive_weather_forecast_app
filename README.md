# Challenge 6

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
when you start up the application, you will be presented with a city input form and previous search history options (if applicable) on the left, and on the right you will find the current weather data on the top and the weather forecast up to 5 days from now on the bottom. If you have previously searched at least one city, the data for your most recently searched city will be loaded.

![Forecast page with search history](Assets/Images/forecast_page_with_search_history.png)

but if you don't have any previous searches, `Berkeley, CA` is loaded by default

![Forecast page with no search history](Assets/Images/forecast_page_no_search_history.png)

when you search for a name, only letters, spaces, periods, and commas are allowed. **Important:** the search is not case sensitive, but it is required that the name you enter matches the city name without typos or extra spaces.

![No results found because of typo (space)](Assets/Images/no_results_found_space_typo.png)

![No results found because of typo (letter)](Assets/Images/no_results_found_letter_typo.png)

Once you enter the city name properly, you can view the list of up to 5 options:

![Successful search reveals choices page](Assets/Images/choices_page_successful_search.png)

once you click on the option whose weather you want to see, you will be taken back to the forecast page where you will see the weather data, which is retrieved using latitude and longitude

![New city added to search history](Assets/Images/new_city_added_to_search_history.png)

note, if you search a city that you have previously searched already, it will be moved to the front of the search history array, as shown here:

![Previous city searched again](Assets/Images/previous_city_searched_again.png)

A link the the deployed application can be found [here](insert link here)

**Special case:** Searching `Reno` yields two identical results for `Reno, Georgia`:

![Two results for Reno Georgia](Assets/Images/special_case_two_reno_georgia.png)

However, this is not something to be concerned about, as both options return the same data. I attempted to remove the duplicate option, but unfortunately, my efforts were unsuccessful.

## Credits
Received assistance from students Michael Taraschi, Avery Myers, and Kevin Smith. Also received help from TA Michael Seaman and instructor Robbert Wijtman.

The following web resources helped me write the code for this project:

1. [Stack Overflow: How to position two divs side-by-side](https://stackoverflow.com/questions/5387392/how-to-get-these-two-divs-side-by-side)
2. [Stack Overflow: Understanding JSON, promises, and .then()](https://stackoverflow.com/questions/37555031/why-does-json-return-a-promise-but-not-when-it-passes-through-then)
3. [How to get current date in dayjs](https://day.js.org/docs/en/parse/now)
4. [How to format a date in dayjs](https://day.js.org/docs/en/display/format)
5. [Weather icons, their meanings, and how to use them](https://openweathermap.org/weather-conditions)
6. [How to round a number to 2 decimal places](https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary)
7. [The replaceAll() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
8. [The hasChildNodes() method](https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes)
9. [The mouseover event](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event)
10. [The mouseleave and mouseout events](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event)

## Contributing
This application currently does not have the functionality to delete individual search history entries. If someone could help me figure out how to implement that, I would greatly appreciate it.

## Tests
No tests have been written for this application.

## License
No license is attached to this repository.

## Questions
If you have any questions for me, you can [follow me on GitHub](https://github.com/GimmeKitties711) or email me at eric20wang.wang@gmail.com.
