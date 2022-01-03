var apiKey = "a7162fb1fd8fd98f4327ec1e312082af";

var cityDate = document.getElementById("cityDate");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uv = document.getElementById("uv");

var historyID = document.getElementById("history");


$("#searchBtn").click (function getWeather() {
    var location = document.getElementById("location").value.trim(); 
    console.log(location);

    var history = JSON.parse(localStorage.getItem("location")) || [];
    history.push(location);
    history = JSON.stringify(location);
    localStorage.setItem("history", history);
    renderSearchHistory();


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
        return location; 
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
            uv.innerHTML = "UV Index: <span id='uvindex'> </span ";
            uvindex.innerHTML = uvi;
            if (uvi>=0 && uvi<3){
                uvindex.setAttribute("style", "background-color: green;")
            }
            else if (uvi>=3 && uvi<6){
                uvindex.setAttribute("style", "background-color: yellow; color:black");
            }
            else if (uvi>=6 && uvi<8){
                uvindex.setAttribute("style", "background-color: orange; color:black");
            }
            else {
                uvindex.setAttribute("style", "background-color: red;");
            };

            rendermyCard();



            var day = moment().format("MMM DD, YYYY")
            function rendermyCard(){
                var forecasts = document.querySelector(".forecasts");
                for (i=0; i<5; i++) {
                    day = moment().add(i,'days').format("MMM DD, YYYY");
                    forecast = document.createElement("span");
                    forecast.className="card"
                    var dayName = document.querySelector(".forecasts");
                    dayName = document.createElement("h4");
                    dayName.innerHTML = day;
                    forecasts.appendChild(dayName);

                    var dayIcon = document.querySelector(".forecasts");
                    dayIcon = document.createElement("span")

                    var icons = data.daily[i].weather[0].icon;
                    var iconurls = "http://openweathermap.org/img/w/" + icons + ".png";
                    var img = document.createElement("img");
                    img.src = iconurls;

                    forecasts.appendChild(img);

                    var convertTemp=Math.round((((data.daily[i].temp.day)-273.15)*1.8)+32)

                    document.createElement("li");
                    var dayTemp = document.querySelector(".forecasts");
                        dayTemp = document.createElement("ul");
                        dayTemp.innerHTML = "Temp: " + convertTemp + " \u00B0F";
                        forecasts.appendChild(dayTemp);
                    var dayWind = document.querySelector(".forecasts");
                        dayWind = document.createElement("ul");
                        dayWind.innerHTML = "Wind: " + data.daily[i].wind_speed + "MPH";
                        forecasts.appendChild(dayWind);
                    var dayHumidity = document.querySelector(".forecasts");
                        dayHumidity = document.createElement("ul");
                        dayHumidity.innerHTML = "Humidity: " + data.daily[i].humidity + "%";
                        forecasts.appendChild(dayHumidity);
                }
            }
        })
        .catch(function(error){
            console.log(error);
        })
}


function renderSearchHistory(){
    var searched = document.createElement("button"); 
    for (var i = 0; i < history.length; i++) {
        searched.setAttribute("type", "text");
        searched.setAttribute("value",searched[i]);
        searched.addEventListener("click", function(){
            getWeather(searched.value)
        })
    }
    historyID.append(searched);
}
renderSearchHistory();









/* To do: 
- create forecast cards (get data, add information visually, add/convert date and image)
- clear forecast cards after new search
- save local storage. show local storage history
- css local storage 
- show local storage
*/ 















