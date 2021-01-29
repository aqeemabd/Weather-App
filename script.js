//Api Key = 0e29e0b10ccf45e5834e09613012fe17
// Provider = https://api.weatherbit.io/v2.0/current?lat=3.205036833333334&lon=101.77229308333332&key=0e29e0b10ccf45e5834e09613012fe17&include=minutely

const iconElement = document.querySelector('.weather-icon')
const tempElement = document.querySelector('.temperature-value p')
const descElement = document.querySelector('.temperature-description p')
const locationElement = document.querySelector('.location')
const notificationElement = document.querySelector('.notification')


//App data
const weather = {}

weather.temperature = {
    unit: "celsius"
}


const key = "0e29e0b10ccf45e5834e09613012fe17"

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}else{
    notificationElement.style.display = "block"
    notificationElement.innerHTML = "<p>Please allow your location</p>"
}


function setPosition(position){
    let lat = position.coords.latitude
    let long = position.coords.longitude

    getWeather(lat, long)
}

function showError(error){
    notificationElement.style.display = "block"
    notificationElement.innerHTML = `<p>${error.message}</p>`
}

function getWeather(lat, long){
    let apiWeather = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${key}&include=minutely`
    console.log(apiWeather)

    fetch(apiWeather)
        .then(function(respone){
            let data = respone.json()
            return data
        })
        .then(function(data){
            weather.temperature.value  = data.data[0].temp
            weather.description = data.data[0].weather.description
            weather.iconId = data.data[0].weather.icon
            weather.name = data.data[0].timezone
        })
        .then(function(){
            displayWeather()
        })
}

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`
    tempElement.innerHTML = `${weather.temperature.value }°<span>C</span>`
    descElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.name}`
}


function celsiusToF(temperature){
   return (temperature * 9/5) + 32
}

tempElement.addEventListener("click", function(){
    if(weather.temperature.value == undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToF(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});