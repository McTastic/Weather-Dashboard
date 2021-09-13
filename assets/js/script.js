var APIKey = "ae17a1c3ab60e66fadd0d139b5b7cf56";
var city;
var lat;
var lon;
var cityName = $(".cityName");
var cityTemp = $(".cityTemp");
var cityWind = $(".cityWind");
var cityIcon = $(".cityIcon");
var cityDescription = $(".cityDescription");
var userInput = $(".form-control");
var forecastHeader = $(".forecastHeader")
submitBtn = $(".btn");

submitBtn.on("click", function () {
  event.preventDefault();
  city = userInput.val().trim();
  if (city) {
    forecastHeader.css("display","block");
    forecastHeader.text("5-Day Forecast");
    getCityWeather();
    getForecast();
    cityName.text("");
    userInput.val("");
    cityIcon.empty("img");
  } else {
    alert("Please enter a city");
  }
});

function init(){
    forecastHeader.css("display","none");
}

var getCityWeather = function () {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var cityNameVal = data.name;
          var cityTempVal = data.main.temp;
          var cityWindVal = data.wind.speed;
          var cityIconVal = $("<img />", {
            src:
              "http://openweathermap.org/img/wn/" +
              data.weather[0].icon +
              "@4x.png",
          });
          var cityDescriptionVal = data.weather[0].description;
          cityName.text(cityNameVal);
          cityTemp.text("Temp: " + cityTempVal + "℉");
          cityWind.text("Wind: " + cityWindVal + " M/hr");
          cityIcon.append(cityIconVal);
          cityDescription.text(cityDescriptionVal);
        });
      } else {
        cityName.text("");
        cityTemp.text("");
        cityWind.text("");
        cityDescription.text("");
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

var getForecast = function () {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
  fetch(queryURL).then(
    function (response) {
        if(response.ok){
      return response.json();
        }else{
            return Promise.reject(response);
        }
    }).then(function(data){
         lat = data.coord.lat;
         lon = data.coord.lon;
        return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        APIKey +
        "&units=imperial").then(function(response){
            if(response.ok){
                console.log(response);
                response.json().then(function(data){

                })
            }
        })
    })
  }

  init();