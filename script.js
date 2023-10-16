const xhr = new XMLHttpRequest();

function getWeather(latitude, longitude) {
    const key = "1fec3e978e5fa1e5473510f97a9e7a2e";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

    xhr.open("GET", url, true);

    xhr.onload = () => {
        const weatherInfo = document.querySelector(".weather-info");

        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);

            document.querySelector(".cidade").innerHTML = `Weather in ${response.name}`;
            document.querySelector(".descricao").innerHTML = response.weather[0].description;
            document.querySelector(".temperatura").innerHTML = `${response.main.temp}°C`;
            document.querySelector(".umidade").innerHTML = `Humidity: ${response.main.humidity}%`;
        } else {
            weatherInfo.innerHTML = "City not found. Please try again."
            console.error(`Erro na requisição ${xhr.status}`);
        }
    };

    xhr.onerror = () => {
        console.error("Erro de rede");
    }

    xhr.send();
}

navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    getWeather(latitude, longitude)
});
