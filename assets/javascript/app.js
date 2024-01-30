
//Global Scope
let searchForCity;

//local storage to save up to 5 cities 
function storeCity(cityName) {

  //get the cities from the local storage / present an empty  array
  const storeCities = JSON.parse(localStorage.getItem("storeCities")) || []
  console.log(storeCities);

  // ensure the city is already in the array
  if (!storeCities.includes(cityName)) {

    storeCities.push(cityName); // add it in the array 
  }

  //Max it to 5 cities for storing 
  if (storeCities.length > 5) {
    storeCities = storeCities.slice(-5);
  }

  //Save the updated arr and link it with the local storage
  localStorage.setItem("storeCities", JSON.stringify(storeCities));

  // To update the historical data
  showCities();
}

//To present the cities from the local storage 
function showCities() {

  const storeCities = JSON.parse(localStorage.getItem("storeCities")) || []
  console.log("This is the stored Cities", storeCities);
  const localStorageContainer = $(".historicalCards");

  localStorageContainer.empty();

  //iterate through the cities that are stores and present it on the page 
  storeCities.forEach(cities => {
    const card = $("<div>").addClass("card mb-2 historyCard");
    const cardBody = $("<div>").addClass("card-body historicCard");
    const cityEl = $("<h5>").addClass("card-title").text(cities);

    //append to show the cards
    cardBody.append(cityEl);
    card.append(cardBody);

    // apply the card to the historical data card section 
    localStorageContainer.append(card)
  });
  console.log("The City has been Successfully", storeCities);
}

// 5 day forecast
function fiveFetchForecast() {

  const apiKey = "4fd0d648b21702bcd98b75342a9bb88f";
  const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchForCity}&appid=${apiKey}`;


  console.log("API URL", fiveDayUrl);

  return fetch(fiveDayUrl)
    .then(function (response) {
      return response.json(); //This process is waiting for the response and parsing it into JSON format
    })
    .catch(function (error) {  // if it isn't passing through this error will appear
      console.error(`Error Occurred when Fetching the Weather ${error}`);
      throw error;
    });
}

//Searching for a cities weather 
$("#search-button").on("click", function (event) {
  event.preventDefault();

  //API Key
  const apiKey = "4fd0d648b21702bcd98b75342a9bb88f";

  //getting the city from the searchbar
  searchForCity = $("#search-input").val();
  console.log("City name:", searchForCity);

  //Ability to search for a city 
  if (searchForCity) {
    // URL current API
    const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchForCity}&appid=${apiKey}`;
    console.log("API URL", queryUrl);


    //Fetching the API Call 
    fetch(queryUrl, {

    })
      .then(function (response) {
        return response.json(); //This process is waiting for the response and parsing it into JSON format
      })

      .then(function (results) {
        showWeather(results);
        storeCity(searchForCity);  // Saving the searched city to the local storage
        return fiveFetchForecast(searchForCity);   //Fetching 5 day forecast data 

      })
      .then(function (fivedayData) {
        displayFiveForecast(fivedayData);
      })
      .catch(function (error) {
        console.error(`Error Occurred when Fetching the Weather ${error}`);    //handling if an error occurs when fetching 
      });
  } else {   //Display an error if a user has not entered a city 
    const alertTime = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Attention! Please enter a city!</strong> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    $("#alert-container").append(alertTime);
  }
});

function showWeather(results) {
  //Location for city name, icons, temp, wind and humiditiy
  const cityName = results.name;
  const cityWeatherIcon = results.weather[0].icon;
  const cityTemp = results.main.temp - 273.15;
  const cityWind = results.wind.speed;
  const cityHumidity = results.main.humidity;

  const imgUrl = "https://openweathermap.org/img/wn/";
  const imgnUrl = `${imgUrl}${cityWeatherIcon}@2x.png`;
  const imgEl = $("<img>").attr("src", imgnUrl);

  //Weather information console.log
  console.log(`city name: ${cityName}`);
  console.log(`Icon: ${cityWeatherIcon}`);
  console.log(`The cities temperature: ${cityTemp}`);
  console.log(`The cities wind: ${cityWind}`);
  console.log(`The cities Humidity: ${cityHumidity}`);

  //Append
  $(".cityName").eq(0).text(cityName);
  $(".weatherIcon").eq(0).empty().append(imgEl);
  $(".cityTemperature").eq(0).text(cityTemp.toFixed(2) + "°C");
  $(".cityWindSpeed").eq(0).text(cityWind + "KPH");
  $(".cityHumid").eq(0).text(cityHumidity + "%");
}

//  Show the five day forecaste for the searched city 
function displayFiveForecast(fivedayData) {

  const fiveDayContainer = $(".fiveDayContainer");
  console.log(fiveDayContainer);

  //empty Array
  const forecastContainerDate = {};


  fivedayData.list.forEach((results) => {
    const date = results.dt_txt.split(" ")[0]; // getting the date 
    // console.log(date);

    if (!forecastContainerDate[date]) {
      forecastContainerDate[date] = []    //initailizing as an array

      // console.log(forecastCont);
    }
    //push it into the results
    forecastContainerDate[date].push(results);

  });

  //iterating the forecastCont to show the forecast on each day 
  Object.entries(forecastContainerDate).forEach(([date, forecastEnt], index) => {
    forecastEnt.forEach((results, weatherIndex) => {

      const weatherFiveIcon = results.weather[0].icon;
      const cityFiveTemp = (results.main.temp - 273.15).toFixed(2);
      const cityFiveWind = results.wind.speed;
      const cityFiveHumidity = results.main.humidity;

      const imgUrl = "https://openweathermap.org/img/wn/";
      const imageFiveUrl = `${imgUrl}${weatherFiveIcon}@2x.png`;


      console.log(`Icon: ${weatherFiveIcon}`);
      console.log(`URL: ${imageFiveUrl}`);


      //Append to the html to update it with the weather data
      $(".weatherDate").eq(index + weatherIndex).text(date);
      $(".weatherIconImage").eq(index + weatherIndex).html(`<p><img src=${imageFiveUrl} alt="Icon"/></p>`);
      $(".cityFiveTemperature").eq(index + weatherIndex).text(`${cityFiveTemp}°C`)

      // (cityFiveTemp.toFixed(2) + "°C");
      $(".cityFiveWindSpeed").eq(index + weatherIndex).text(`${cityFiveWind}KPH`)
      // (cityFiveWind + "KPH");
      $(".cityFiveHumid").eq(index + weatherIndex).text(`${cityFiveHumidity}%`)
    });
  });

  //Created for the saved cities to be shown when a user searches for a city
  function showStorageCard() {
    document.querySelector(".historicalCards").style.display = "flex"
  }

  showStorageCard();
}





















