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
  // URL
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
   })
 }
})



function showWeather(results) {
 //Location for city name, icons, temp, wind and humiditiy
 const cityName = results.name;
 console.log(cityName);
 const cityWeatherIcon = results.weather.icon;
 console.log(cityWeatherIcon);
 const cityTemp = results.main.temp;
 console.log(cityTemp);
 const cityWind = results.wind.speed;
 console.log(cityWind);
 const cityHumidity = results.main.humidity;
 console.log(cityHumidity);

}






