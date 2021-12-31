var apiKey = "a7162fb1fd8fd98f4327ec1e312082af";

var cityDate = document.getElementById("cityDate");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uv = document.getElementById("uv");





$("#searchBtn").click (function getWeather() {
    var location = document.getElementById("location").value.trim(); 
    console.log(location);

    var oneDayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    console.log(oneDayUrl)
    fetch(oneDayUrl)
    .then(function(response){
        return response.json()
    }) 
    .then(function(data){
        console.log(data);

        cityDate.innerHTML = data.name + " - " + moment().format("MMM Do YY");
        // var icon = data.weather[0].icon;

        var convertTemp=Math.round((((data.main.temp)-273.15)*1.8)+32)
        temp.innerHTML = "Temperature: " + convertTemp + " \u00B0F";
        wind.innerHTML = "Wind: " + data.wind.speed + " MPH";
        humidity.innerHTML = "Humidity: " + data.main.humidity + "%";

        // cityName.innerHTML = "lksjdf";
        // console.log(cityName);
        // var current = response.data.dt*1000;
        // console.log(current)
        // var day = current.getDate();
        // var month = current.getMonth();
        // var year = current.getFullYear();

        // var date = document.getElementById("cityName");
        // console.log(date.val);
        //     date.innerHTML=data.name + moment().format("MMM Do YY") + data.weather.icon; 

        fetchWeather(data);

    }) .catch(function(error){
        console.log(error)
        window.alert('Invalid city input. Please try again');
    })
}) 

function fetchWeather(data){
    var lat = data.coord.lat; 
    var lon = data.coord.lon;
    var apiURL =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch (apiURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            //function rendermyCard(){};
        })
        .catch(function(error){
            console.log(error);
        })
}




// current search display current day details
// current search display 5 day forecast 


// add city to local storage and show 












