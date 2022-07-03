let search = document.getElementById("search");
let data;
let months = [" Jan" , " Feb" , " March" , " April" , " May" , "June" , " July" , " August" , " September" , " October" , " November" , " December"];
let days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
let country = document.getElementById("country");

//Temperature
let currentTemp = document.getElementById("currentTemp");
let currentIconTemp = document.getElementById("currentIconTemp");
let currentState = document.getElementById("currentState");
let nextMaxTemp = document.getElementById("nextMaxTemp");
let nextMinTemp = document.getElementById("nextMinTemp");
let nextState = document.getElementById("nextState");
let nextNextMaxTemp = document.getElementById("nextNextMaxTemp");
let nextNextMinTemp = document.getElementById("nextNextMinTemp");
let nextNextState = document.getElementById("nextNextState");
let nextStateImg = document.getElementById("nextStateImg");
let nextNextStateImg = document.getElementById("nextNextStateImg");

//Date
let currentDay = document.getElementById("currentDay");
let currentDate = document.getElementById("currentDate");
let nextDay = document.getElementById("nextDay");
let nextNextDay = document.getElementById("nextNextDay");
var cDate = new Date();
currentDay.innerHTML = days[cDate.getDay()];
if(cDate.getDay() == 6)
{
    nextDay.innerHTML = days[0];
    nextNextDay.innerHTML = days[1];
}
else if(cDate.getDay() == 5)
{
    nextDay.innerHTML = days[6];
    nextNextDay.innerHTML = days[0];
}
else
{
    nextDay.innerHTML = days[cDate.getDay() + 1];
    nextNextDay.innerHTML = days[cDate.getDay() + 2];
}
currentDate.innerHTML = " " + cDate.getDate() + months[cDate.getMonth()] ;

//Default Value is Cairo
async function getDefault(){
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=513530c8b4e24060a47193216222506&q=Cairo&days=3&aqi=no&alerts=no`); 
   // console.log(response); 
    data = await response.json(); 
    localStorage.setItem("Weather" , JSON.stringify(data));
    country.innerHTML = data.location.name;
    
    //Current
    currentTemp.innerHTML = data.current.temp_c +`&#176C`;
    currentIconTemp.src ="https:"+ data.current.condition.icon;
    currentState.innerHTML = data.current.condition.text;
    //Next Day
    nextMaxTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + `&#176C`;
    nextMinTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c + `&#176C`;
    nextState.innerHTML = data.forecast.forecastday[1].day.condition.text;
    nextStateImg.src = "https:"+ data.forecast.forecastday[1].day.condition.icon;

    //nextNext Day
        nextNextMaxTemp.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + `&#176C`;
        nextNextMinTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c + `&#176C`;
        nextNextState.innerHTML = data.forecast.forecastday[2].day.condition.text;
        nextNextStateImg.src = "https:"+ data.forecast.forecastday[2].day.condition.icon;
}
getDefault();
search.addEventListener("keyup" , function()
{
    if(localStorage.getItem("Weather") == null)
    {
        data = [];
    }
    else
    {
        data = JSON.parse(localStorage.getItem("Weather"));
    }
    var searchedValue = search.value;
   // console.log(searchedValue.length);
    if(searchedValue.length >= 3)
    {
        async function getData(){
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=513530c8b4e24060a47193216222506&q=${searchedValue}&days=3&aqi=no&alerts=no`); 
       // console.log(response); 
        data = await response.json(); 
        localStorage.setItem("Weather" , JSON.stringify(data));
        country.innerHTML = data.location.name;
        
        //Current
        currentTemp.innerHTML = data.current.temp_c +`&#176C`;
        currentIconTemp.src ="https:"+ data.current.condition.icon;
        currentState.innerHTML = data.current.condition.text;

        //Next Day
            nextMaxTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + `&#176C`;
            nextMinTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c + `&#176C`;
            nextState.innerHTML = data.forecast.forecastday[1].day.condition.text;
            nextStateImg.src = "https:"+ data.forecast.forecastday[1].day.condition.icon;
        }

        //nextNext Day
            nextNextMaxTemp.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + `&#176C`;
            nextNextMinTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c + `&#176C`;
            nextNextState.innerHTML = data.forecast.forecastday[2].day.condition.text;
            nextNextStateImg.src = "https:"+ data.forecast.forecastday[2].day.condition.icon;
        getData();
    }
});
console.log(data); 
