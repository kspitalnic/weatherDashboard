var apiKey = "a7162fb1fd8fd98f4327ec1e312082af";

var cityDate = document.getElementById("cityDate");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uv = document.getElementById("uv");

var historyID = document.getElementById("history");

var searchHistory = [];

renderSearchHistory;

//if there is searchHistory in localstorage, that will be the variable . otherwise it will be an EMPTY ARRAY 
if (localStorage.getItem("history") === null) {
    var searchHistory=[]
    }
else{
    var searchHistory=localStorage.getItem("history");
    }
console.log(searchHistory)

//Search city and display temp/wind/humidity data for current city
$("#searchBtn").click(function getWeather() {
    var location = document.getElementById("location").value.trim();
    console.log(location);
    document.getElementById("location").value="";


    var oneDayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    console.log(oneDayUrl)
    fetch(oneDayUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);


            var icon = data.weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            cityDate.innerHTML = data.name + "  " + moment().format("MMM DD, YYYY") + " ";
            { $("#icon").attr("src", iconurl) }

            var convertTemp = Math.round((((data.main.temp) - 273.15) * 1.8) + 32)
            temp.innerHTML = "Temperature: " + convertTemp + " \u00B0F";
            wind.innerHTML = "Wind: " + data.wind.speed + " MPH";
            humidity.innerHTML = "Humidity: " + data.main.humidity + "%";


            fetchWeather(data);

            searchHistory.push(location);
            searchHistory = JSON.stringify(searchHistory);
            localStorage.setItem("history", searchHistory);
            renderSearchHistory();

            return location;
        }).catch(function (error) {
            console.log(error)
            window.alert('Invalid city input. Please try again');
            return;
        })

})

//fetch city data for uv current and create 5 day forecast cards
function fetchWeather(data) {
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            uvi = (data.current.uvi);
            uv.innerHTML = "UV Index: <span id='uvindex'> </span ";
            uvindex.innerHTML = uvi;
            if (uvi >= 0 && uvi < 3) {
                uvindex.setAttribute("style", "background-color: green;")
            }
            else if (uvi >= 3 && uvi < 6) {
                uvindex.setAttribute("style", "background-color: yellow; color:black");
            }
            else if (uvi >= 6 && uvi < 8) {
                uvindex.setAttribute("style", "background-color: orange; color:black");
            }
            else {
                uvindex.setAttribute("style", "background-color: red;");
            };

            rendermyCard();


            var day = moment().format("MMM DD, YYYY")
            function rendermyCard() {
                var forecasts = document.querySelector(".forecasts");
                forecasts.innerHTML = "";
                for (i = 0; i < 5; i++) {
                    var cards = document.createElement("span");
                    cards.className = "cards";
                    day = moment().add(i, 'days').format("MMM DD, YYYY");
                    forecast = document.createElement("span");
                    forecast.className = "cards"
                    var dayName = document.querySelector(".forecasts");
                    dayName = document.createElement("h4");
                    dayName.innerHTML = day;
                    cards.appendChild(dayName);

                    var dayIcon = document.querySelector(".forecasts");
                    dayIcon = document.createElement("span")

                    var icons = data.daily[i].weather[0].icon;
                    var iconurls = "http://openweathermap.org/img/w/" + icons + ".png";
                    var img = document.createElement("img");
                    img.src = iconurls;

                    cards.appendChild(img);

                    var convertTemp = Math.round((((data.daily[i].temp.day) - 273.15) * 1.8) + 32)

                    document.createElement("li");
                    var dayTemp = document.querySelector(".forecasts");
                    dayTemp = document.createElement("ul");
                    dayTemp.innerHTML = "Temp: " + convertTemp + " \u00B0F";
                    cards.appendChild(dayTemp);
                    var dayWind = document.querySelector(".forecasts");
                    dayWind = document.createElement("ul");
                    dayWind.innerHTML = "Wind: " + data.daily[i].wind_speed + "MPH";
                    cards.appendChild(dayWind);
                    var dayHumidity = document.querySelector(".forecasts");
                    dayHumidity = document.createElement("ul");
                    dayHumidity.innerHTML = "Humidity: " + data.daily[i].humidity + "%";
                    cards.appendChild(dayHumidity);

                    forecasts.appendChild(cards);
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

renderSearchHistory(); 
//save search history and allow button click to view city location again
function renderSearchHistory() {
    if (searchHistory.length < 1) {
        return
    }
    historyID.innerHTML = "";

    for (var i = 0; i < searchHistory.length; i++) {

        searchHistory = JSON.parse(localStorage.getItem("history"));
        console.log(searchHistory);

        var searched = document.createElement("button");
        // searched.setAttribute("value", searchHistory[i]);
        console.log(searchHistory);
        searched.textContent = searchHistory[i];
        // JSON.stringify(searchHistory[i]);

        historyID.append(searched);

        console.log(searchHistory);

        searched.addEventListener("click", function getWeather() {
            console.log(this.innerHTML)
            var current = this.innerHTML
            var oneDayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + current + "&appid=" + apiKey;
            console.log(oneDayUrl)
            fetch(oneDayUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data);


                    var icon = data.weather[0].icon
                    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
                    cityDate.innerHTML = data.name + "  " + moment().format("MMM DD, YYYY") + " ";
                    { $("#icon").attr("src", iconurl) }

                    var convertTemp = Math.round((((data.main.temp) - 273.15) * 1.8) + 32)
                    temp.innerHTML = "Temperature: " + convertTemp + " \u00B0F";
                    wind.innerHTML = "Wind: " + data.wind.speed + " MPH";
                    humidity.innerHTML = "Humidity: " + data.main.humidity + "%";

                    fetchWeather(data);
                    return current;
                })
        })

        function fetchWeather(data) {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(apiURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    uvi = (data.current.uvi);
                    uv.innerHTML = "UV Index: <span id='uvindex'> </span ";
                    uvindex.innerHTML = uvi;
                    if (uvi >= 0 && uvi < 3) {
                        uvindex.setAttribute("style", "background-color: green;")
                    }
                    else if (uvi >= 3 && uvi < 6) {
                        uvindex.setAttribute("style", "background-color: yellow; color:black");
                    }
                    else if (uvi >= 6 && uvi < 8) {
                        uvindex.setAttribute("style", "background-color: orange; color:black");
                    }
                    else {
                        uvindex.setAttribute("style", "background-color: red;");
                    };

                    rendermyCard();


                    var day = moment().format("MMM DD, YYYY")
                    function rendermyCard() {
                        var forecasts = document.querySelector(".forecasts");
                        forecasts.innerHTML = "";
                        for (i = 0; i < 5; i++) {
                            var cards = document.createElement("span");
                            cards.className = "cards";
                            day = moment().add(i, 'days').format("MMM DD, YYYY");
                            forecast = document.createElement("span");
                            forecast.className = "cards"
                            var dayName = document.querySelector(".forecasts");
                            dayName = document.createElement("h4");
                            dayName.innerHTML = day;
                            cards.appendChild(dayName);
        
                            var dayIcon = document.querySelector(".forecasts");
                            dayIcon = document.createElement("span")
        
                            var icons = data.daily[i].weather[0].icon;
                            var iconurls = "http://openweathermap.org/img/w/" + icons + ".png";
                            var img = document.createElement("img");
                            img.src = iconurls;
        
                            cards.appendChild(img);
        
                            var convertTemp = Math.round((((data.daily[i].temp.day) - 273.15) * 1.8) + 32)
        
                            document.createElement("li");
                            var dayTemp = document.querySelector(".forecasts");
                            dayTemp = document.createElement("ul");
                            dayTemp.innerHTML = "Temp: " + convertTemp + " \u00B0F";
                            cards.appendChild(dayTemp);
                            var dayWind = document.querySelector(".forecasts");
                            dayWind = document.createElement("ul");
                            dayWind.innerHTML = "Wind: " + data.daily[i].wind_speed + "MPH";
                            cards.appendChild(dayWind);
                            var dayHumidity = document.querySelector(".forecasts");
                            dayHumidity = document.createElement("ul");
                            dayHumidity.innerHTML = "Humidity: " + data.daily[i].humidity + "%";
                            cards.appendChild(dayHumidity);
        
                            forecasts.appendChild(cards);
                        }
                    }
                })
        }
    }
}










/* To do: 
- css local storage 
- show local storage
*/















