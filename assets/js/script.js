var APIKey = "ae17a1c3ab60e66fadd0d139b5b7cf56";
var city;
var lat;
var lon;
var cityList = $(".cityList");
var cityInfo = $(".cityInfo");
var cityName = $(".cityName");
var cityTemp = $(".cityTemp");
var cityWind = $(".cityWind");
var cityIcon = $(".cityIcon");
var cityDescription = $(".cityDescription");
var cityUVIndex = $(".cityUVIndex");
var UVIText = $(".UVIText");
var userInput = $(".form-control");
var forecastHeader = $(".forecastHeader");
var forecastCard = $(".forecastCard");
var Day1 = $("#day1");
var Day2 = $("#day2");
var Day3 = $("#day3");
var Day4 = $("#day4");
var Day5 = $("#day5");
var submitBtn = $(".btn");
var savedCityCount = 0

submitBtn.on("click", function () {
  event.preventDefault();
  city = userInput.val().trim();
  if (city) {
    getCityWeather();
    getForecast();
    saveCity();
    cityName.text("");
    userInput.val("");
    cityIcon.empty("img");
    forecastCard.empty();
    UVIText.empty();
    savedCityCount++
    localStorage.setItem("count",savedCityCount);
  } else {
    alert("Please enter a city");
  }
});
// listener for saved city buttons
$("body").on("click","#cityBtn", function(){ 
    event.preventDefault();
    city = this.textContent;
    getCityWeather();
    getForecast();
    cityIcon.empty("img");
    forecastCard.empty();
    UVIText.empty();
});
// function to save cities as buttons below the search box
function saveCity(){
    localStorage.setItem(savedCityCount, city);
    var getCity = localStorage.getItem(savedCityCount);
    cityList.append("<li><button id='cityBtn'>"+getCity+"</button></li>");
}

function init() {
  var currentCount = localStorage.getItem("count");
 if(currentCount !== null){
  savedCityCount = currentCount;
 }else {
   currentCount = 0
 };
//   renders saved cities to page on load 
  for (var i=0; i < currentCount; i++){
      var index = [i];
      var displaySaved = localStorage.getItem(index)
      cityList.append("<li><button id='cityBtn'>"+displaySaved+"</button></li>");
  }
}
// api call to get current weather
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
            cityInfo.css("background-color", "#485461")
            cityInfo.css("background-image", "linear-gradient(315deg, #485461 0%, #28313b 74%)");
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
// api call to get 5 day forecast
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
          response.json().then(function (data) {
              forecastCard
            var forecastArray = data.daily;
            forecastCard.css("background-color", "#485461")
            forecastCard.css("background-image", "linear-gradient(315deg, #485461 0%, #28313b 74%)");
            UVIText.append("<h5>UVI: </h5>");
            cityUVIndex.text(data.current.uvi);
             if(parseInt(cityUVIndex.text()) <= 2){
            cityUVIndex.css("background-color","green")
             }  if(parseInt(cityUVIndex.text()) > 2 && parseInt(cityUVIndex.text()) <= 6){
                 cityUVIndex.css("background-color","yellow")
             } if(parseInt(cityUVIndex.text()) > 6) {
                 cityUVIndex.css("background-color","red")
             };
            for (var i = 0; i < forecastArray.length - 3; i++) {
              if (i === 0) {
                var cityIconVal = $("<img />", {
                    src:
                      "http://openweathermap.org/img/wn/" +
                      data.daily[0].weather[0].icon +
                      "@2x.png",
                  });
                Day1.append(
                  "<h1 class ='date1'></h1>",
                  "<div class = 'icon1'></div>" ,
                  "<div class ='maxTemp1'></div>",
                  "<div class ='minTemp1'></div>",
                  "<div class ='wind1'></div>",
                  "<div class ='humidity1'></div>"
                );
                $(".date1").text(moment().add(1,"day").format("MM/DD"));
                $(".maxTemp1").text("High: " + forecastArray[0].temp.max + "℉");
                $(".minTemp1").text("Low: " + forecastArray[0].temp.min + "℉");
                $(".wind1").text("Wind: " + forecastArray[0].wind_speed + "M/hr");
                $(".humidity1").text("Humidity: " + forecastArray[0].humidity + " %");
                $(".icon1").append(cityIconVal);
              }
              if (i === 1) {
                var cityIconVal = $("<img />", {
                    src:
                      "http://openweathermap.org/img/wn/" +
                      data.daily[1].weather[0].icon +
                      "@2x.png",
                  });
                Day2.append(
                  "<h1 class ='date2'></h1>",
                  "<div class = 'icon2'></div>",
                  "<div class ='maxTemp2'></div>",
                  "<div class ='minTemp2'></div>",
                  "<div class ='wind2'></div>",
                  "<div class ='humidity2'></div>"
                );
                $(".date2").text(moment().add(2,"days").format("MM/DD"));
                $(".maxTemp2").text("High: " + forecastArray[1].temp.max + "℉");
                $(".minTemp2").text("Low: " +forecastArray[1].temp.min + "℉");
                $(".wind2").text("Wind: " + forecastArray[1].wind_speed + "M/hr");
                $(".humidity2").text("Humidity: " + forecastArray[1].humidity + " %");
                $(".icon2").append(cityIconVal);
              }
              if (i === 2) {
                var cityIconVal = $("<img />", {
                    src:
                      "http://openweathermap.org/img/wn/" +
                      data.daily[2].weather[0].icon +
                      "@2x.png",
                  });
                Day3.append(
                  "<h1 class ='date3'></h1>",
                  "<div class = 'icon3'></div>" ,
                  "<div class ='maxTemp3'></div>",
                  "<div class ='minTemp3'></div>",
                  "<div class ='wind3'></div>",
                  "<div class ='humidity3'></div>"
                );
                $(".date3").text(moment().add(3,"days").format("MM/DD"));
                $(".maxTemp3").text("High: " + forecastArray[2].temp.max + "℉");
                $(".minTemp3").text("Low: " + forecastArray[2].temp.min + "℉");
                $(".wind3").text("Wind: " + forecastArray[2].wind_speed + "M/hr");
                $(".humidity3").text("Humidity: " + forecastArray[2].humidity + " %");
                $(".icon3").append(cityIconVal);
              }
              if (i === 3) {
                var cityIconVal = $("<img />", {
                    src:
                      "http://openweathermap.org/img/wn/" +
                      data.daily[3].weather[0].icon +
                      "@2x.png",
                  });
                Day4.append(
                  "<h1 class ='date4'></h1>",
                  "<div class = 'icon4'></div>" ,
                  "<div class ='maxTemp4'></div>",
                  "<div class ='minTemp4'></div>",
                  "<div class ='wind4'></div>",
                  "<div class ='humidity4'></div>"
                );
                $(".date4").text(moment().add(4,"days").format("MM/DD"));
                $(".maxTemp4").text("High: " + forecastArray[3].temp.max + "℉");
                $(".minTemp4").text("Low: " + forecastArray[3].temp.min + "℉");
                $(".wind4").text("Wind: " + forecastArray[3].wind_speed + "M/hr");
                $(".humidity4").text("Humidity: " + forecastArray[3].humidity + " %");
                $(".icon4").append(cityIconVal);
              }
              if (i === 4) {
                var cityIconVal = $("<img />", {
                    src:
                      "http://openweathermap.org/img/wn/" +
                      data.daily[4].weather[0].icon +
                      "@2x.png",
                  });
                Day5.append(
                  "<h1 class ='date5'></h1>",
                  "<div class = 'icon5'></div>" ,
                  "<div class ='maxTemp5'></div>",
                  "<div class ='minTemp5'></div>",
                  "<div class ='wind5'></div>",
                  "<div class ='humidity5'></div>"
                );
                $(".date5").text(moment().add(5,"days").format("MM/DD"));
                $(".maxTemp5").text("High: " + forecastArray[4].temp.max + "℉");
                $(".minTemp5").text("Low: " + forecastArray[4].temp.min + "℉");
                $(".wind5").text("Wind: " + forecastArray[4].wind_speed + "M/hr");
                $(".humidity5").text("Humidity: " + forecastArray[4].humidity + " %");
                $(".icon5").append(cityIconVal);
              }
            }
          });
        }
      });
    });
};
init();
