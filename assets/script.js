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

        var icon = data.weather[0].icon
        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
        cityDate.innerHTML = data.name + "  " + moment().format("MMM DD, YYYY") + " "; 
        {$("#icon").attr("src",iconurl)}

        var convertTemp=Math.round((((data.main.temp)-273.15)*1.8)+32)
        temp.innerHTML = "Temperature: " + convertTemp + " \u00B0F";
        wind.innerHTML = "Wind: " + data.wind.speed + " MPH";
        humidity.innerHTML = "Humidity: " + data.main.humidity + "%";


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
            uvi = (data.current.uvi);
            console.log(uvi);
            uv.innerHTML = "UV Index: <span id='uvindex'> </span ";
            uvindex.innerHTML = uvi;
            if (uvi>=0 && uvi<3){
                uvindex.setAttribute("style", "background-color: green;")
            }
            else if (uvi>=3 && uvi<6){
                uvindex.setAttribute("style", "background-color: yellow;")
            }
            else if (uvi>=6 && uvi<8){
                uvindex.setAttribute("style", "background-color: orange;")
            }
            else {
                uvindex.setAttribute("style", "background-color: red;")
            };
            console.log(uvi)


            //function rendermyCard(){};
            // function rendermyCard(){
            //     var forecast = document.querySelector(".forecasts");
            //     for (i=0; i< 5; i++) {
            //         forecasts.innerHTML = "";

            //     }
            // }
        })
        .catch(function(error){
            console.log(error);
        })
}




/* To do: 
- add weather image icon 
- add uv index (taken from second api)
- add class to uv index (color bar depending on level)
- create forecast cards (get data, add information visually, add/convert date and image)
- save local storage. show local storage history
*/ 

// current search display 5 day forecast 


// add city to local storage and show 












