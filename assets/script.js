var apiKey = "a7162fb1fd8fd98f4327ec1e312082af";

$("#searchBtn").click (function getWeather() {
    var location = document.getElementById("location").value.trim(); 
    console.log(location);

    var oneDayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    console.log(oneDayUrl)
    fetch(oneDayUrl)
    .then(function(response){
        return response.json()
    }) .then(function(data){
        console.log(data);
        fetchWeather(data);
    }) .catch(function(error){
        console.log(error)
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








    //attempt using geocoder 

    // getCoordinates();
    // function getCoordinates(request){
    //     fetch("https://maps.googleapis.com/maps/api/js?key=AIzaSyBsxqmtTs7-gPZXL68yoiN01dtF9hL5vfI")
    //     .then((result) => {
    //         var { results } = result; 
    //         map.setCenter(results[0].geometry.location);
    //         marker.setPosition(results[0].geometry.location);
    //         marker.setMap(map);
    //         responseDiv.style.display = "block";
    //         response.innerText = JSON.stringify(result, null, 2);
    //         console.log(results);
    //         return results;
    //       })
    //       .catch((e) => {
    //         alert("Geocode was not successful for the following reason: " + e);
    //       });
    //   }
    //     })



