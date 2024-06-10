// addSearchBtn.addEventListener('click',)

const apiKey = '0db8b039912f94a75c82c91dbeaca7ec'
let town = JSON.parse(localStorage.getItem('city'));
let area = JSON.parse(localStorage.getItem('coords'));


function addTask(event) {
    event.preventDefault();
    let task = JSON.parse(localStorage.getItem('task')) || [];

    const tasks = {
        id: createCard(),

    }
}


function getLocation(cityName){
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
    fetch(apiUrl).then(function (response){
        return response.json()
    }).then(function(data){
        const lat = data[0].lat;
        const lon = data[0].lon;
        getWeather(lat, lon, cityName)
    })
}

function getWeather(lat, lon, cityName){
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    fetch(apiUrl).then(function (response){
        return response.json()
    }).then(function(data){
        console.log(data);

        // const cityName;
        const temp = data.list[0].main.temp;
        const wind = data.list[0].wind.speed;
        const humidity = data.list[0].main.humidity;
        const todaysForecast = `
        <div>
            <h2>${cityName}</h2>
            <p>Temp:${temp}°F</p>
            <p>Wind:${wind}MPH</p>
            <p>Humidity:${humidity}%</p>
        </div>
        `

        $('#today').append(todaysForecast);

        // loop over data.list and get every 8th value

    })
}
// getLocation('paris')

function createCard(weather){
    const card = $('<div>')
    .addClass(apiUrl)
    const cardDate = $('<div>').addClass('card-header h4').text(weather.date)
    const cardHeader = $('<div>').addClass('card-body').text(weather.temp);
    const cardBody = $('<div>').addClass('card-body').text(weather.humidity)
    const cardWind = $('<div>').addClass('card-body').text(weather.wind);
    const deleteBtn = $(`<button id='${weather.id}' class='deleteBtn btn btn-danger'>Delete</button>`)


    card.append(cardHeader);
    card.append(cardDate);
    card.append(cardWind);
    card.append(cardBody);
    card.append(deleteBtn);
}

$('#search-btn').on('click', function(event) {
    const city = $('#city-search').val().trim();

    getLocation(city);
});