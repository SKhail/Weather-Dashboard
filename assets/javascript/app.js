// 5 day forecast
function fiveDayForecast(cityName) {

 const apiKey = "4fd0d648b21702bcd98b75342a9bb88f";
 const fiveDayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchForCity}&appid=${apiKey}`;
 console.log("API URL", fiveDayUrl);

 return fetch(fiveDayUrl)
  .then(function (response) {
   return response.json(); //This process is waiting for the response and parsing it into JSON format
  })
  .catch(function (error) {  // if it isn't passing through this error will appear
   console.error(`Error Occurred when Fetching the Weather ${error}`);
  });
}





//Searching for a cities weather 
$("#search-button").on("click", function (event) {
 event.preventDefault();

 //API Key
 const apiKey = "4fd0d648b21702bcd98b75342a9bb88f";

 //getting the city from the searchbar
 let searchForCity = $("#search-input").val();
 console.log("City name:", searchForCity);

 //Ability to search for a city 
 if (searchForCity) {
  // URL current API
  const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchForCity}&appid=${apiKey}`;
  console.log("API URL", queryUrl);


  //Fetching the API Call 
  fetch(queryUrl)
   .then(function (response) {
    return response.json(); //This process is waiting for the response and parsing it into JSON format
   })
   .then(function (results) {
    showWeather(results);
   })
   //handling if an error occurs when fetching 
   .catch(function (error) {
    console.error(`Error Occurred when Fetching the Weather ${error}`);
   });
 } else {
  //Display an error if a user has not entered a city 
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
 $(".cityHumid").eq(0).text(cityHumidity);

}









