var APIKey = "ae17a1c3ab60e66fadd0d139b5b7cf56";
var city;
var lat;
var lon;
var cityName = $(".cityName");
var cityTemp = $(".cityTemp");
var cityWind = $(".cityWind");
var cityIcon = $(".cityIcon");
var cityDescription = $(".cityDescription");
var cityUVIndex = $(".cityUVIndex");
var userInput = $(".form-control");
var forecastHeader = $(".forecastHeader");
var forecastCard = $(".forecastCard");
var Day1 = $("#day1");
var Day2 = $("#day2");
var Day3 = $("#day3");
var Day4 = $("#day4");
var Day5 = $("#day5");
submitBtn = $(".btn");

submitBtn.on("click", function () {
  event.preventDefault();
  city = userInput.val().trim();
  if (city) {
    forecastHeader.css("display", "block");
    forecastHeader.text("5-Day Forecast");
    getCityWeather();
    getForecast();
    cityName.text("");
    userInput.val("");
    cityIcon.empty("img");
    forecastCard.empty();
  } else {
    alert("Please enter a city");
  }
});

function init() {
  forecastHeader.css("display", "none");
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
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      lat = data.coord.lat;
      lon = data.coord.lon;
      return fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          APIKey +
          "&units=imperial"
      ).then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            var forecastArray = data.daily;
            console.log(forecastArray);
            cityUVIndex.text(data.current.uvi);
             if(parseInt(cityUVIndex.text()) <= 2){
            cityUVIndex.css("background-color","green")
             } else if(parseInt(cityUVIndex.text()) > 2 && parseInt(cityUVIndex.text())<= 6){
                 cityUVIndex.css("background-color","yellow")
             } else {
                 cityUVIndex.css("background-color","red")
             };
            for (var i = 0; i < forecastArray.length - 3; i++) {
              if (i === 0) {
                Day1.append(
                  "<div class ='maxTemp1'></div>",
                  "<div class ='minTemp1'></div>",
                  "<div class ='wind1'></div>",
                  "<div class ='humidity1'></div>"
                );
                $(".maxTemp1").text(forecastArray[0].temp.max + "℉");
                $(".minTemp1").text(forecastArray[0].temp.min + "℉");
                $(".wind1").text(forecastArray[0].wind_speed);
                $(".humidity1").text(forecastArray[0].humidity + " %");
              }
              if (i === 1) {
                Day2.append(
                  "<div class ='maxTemp2'></div>",
                  "<div class ='minTemp2'></div>",
                  "<div class ='wind2'></div>",
                  "<div class ='humidity2'></div>"
                );
                $(".maxTemp2").text(forecastArray[1].temp.max + "℉");
                $(".minTemp2").text(forecastArray[1].temp.min + "℉");
                $(".wind2").text(forecastArray[1].wind_speed);
                $(".humidity2").text(forecastArray[1].humidity + " %");
              }
              if (i === 2) {
                Day3.append(
                  "<div class ='maxTemp3'></div>",
                  "<div class ='minTemp3'></div>",
                  "<div class ='wind3'></div>",
                  "<div class ='humidity3'></div>"
                );
                $(".maxTemp3").text(forecastArray[2].temp.max + "℉");
                $(".minTemp3").text(forecastArray[2].temp.min + "℉");
                $(".wind3").text(forecastArray[2].wind_speed);
                $(".humidity3").text(forecastArray[2].humidity + " %");
              }
              if (i === 3) {
                Day4.append(
                  "<div class ='maxTemp4'></div>",
                  "<div class ='minTemp4'></div>",
                  "<div class ='wind4'></div>",
                  "<div class ='humidity4'></div>"
                );
                $(".maxTemp4").text(forecastArray[3].temp.max + "℉");
                $(".minTemp4").text(forecastArray[3].temp.min + "℉");
                $(".wind4").text(forecastArray[3].wind_speed);
                $(".humidity4").text(forecastArray[3].humidity + " %");
              }
              if (i === 4) {
                Day5.append(
                  "<div class ='maxTemp5'></div>",
                  "<div class ='minTemp5'></div>",
                  "<div class ='wind5'></div>",
                  "<div class ='humidity5'></div>"
                );
                $(".maxTemp5").text(forecastArray[4].temp.max + "℉");
                $(".minTemp5").text(forecastArray[4].temp.min + "℉");
                $(".wind5").text(forecastArray[4].wind_speed);
                $(".humidity5").text(forecastArray[4].humidity + " %");
              }
            }
          });
        }
      });
    });
};



init();