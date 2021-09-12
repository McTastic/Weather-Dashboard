var APIKey = "ae17a1c3ab60e66fadd0d139b5b7cf56";
var city;
var cityName = $(".cityName");
var cityTemp = $(".cityTemp");
var cityWind = $(".cityWind");
var cityIcon = $(".cityIcon");
var cityDescription = $(".cityDescription");
var userInput = $(".form-control");
submitBtn = $(".btn");

submitBtn.on("click", function(){
    event.preventDefault();
    city = userInput.val().trim(); 
    if(city){
    getCityWeather(city);
    cityName.text("");
    userInput.val("");
    cityIcon.empty("img");
    }else{
        alert("Please enter a city")
    }
})
var getCityWeather = function(){
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
fetch(queryURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var cityNameVal = data.name;
        var cityTempVal = data.main.temp;
        var cityWindVal = data.wind.speed;
        var cityIconVal = $("<img />", {src: "http://openweathermap.org/img/wn/"+ data.weather[0].icon + "@4x.png"});
        var cityDescriptionVal = data.weather[0].description;
          cityName.text(cityNameVal);
          cityTemp.text("Temp: " + cityTempVal +"℉");
          cityWind.text("Wind: " + cityWindVal +" M/hr");
          cityIcon.append(cityIconVal); 
          cityDescription.text(cityDescriptionVal);
        console.log(data);
      });
    } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
        alert('Unable to connect to OpenWeather');
      });
  };

//   var getCityIcon = function(){
//     var queryURL = "http://openweathermap.org/img/wn/"+ cityIconCode + "@2x.png";
//     fetch(queryURL).then(function (response) {
//         if (response.ok) {
//           response.json().then(function (data) {
//              var cityIconVal = data["weather"][0]["icon"];

//   }

// var cityIconVal = "http://openweathermap.org/img/wn/"+data.weather[0].icon + ".png";